# Dashboard 구현 워크플로우 (Vertical Slice)

> 아키텍처 규칙은 [ARCHITECTURE.md](ARCHITECTURE.md)를 따르며, 세부 요구사항은 [REQUIREMENTS.md](REQUIREMENTS.md)를 참고한다.

매일 끝날 때 **동작하는 결과물**이 있는 상태를 목표로 한다.

---

## Day 1. 파이프라인

화면에 Raw JSON이 뜨는 것을 확인하는 날.

### 작업 목록

1. 의존성 설치 (MSW, React Query, Zustand 등 누락분 확인)
2. MSW 세팅
   - `mocks/browser.ts` worker 생성
   - `mocks/handlers.ts`에 `GET /campaigns`, `GET /daily_stats`만 구현
   - `main.tsx`에서 dev 환경 MSW 초기화
3. QueryClient + Axios + Filter Store 뼈대
   - `hooks/queries/queryClient.ts` 생성
   - `App.tsx`에 `QueryClientProvider` 래핑
   - `store/filter-store.ts` 빈 스토어 생성
4. Raw 타입 정의
   - `domain/campaign/types.ts` — `RawCampaign` (Domain은 나중에)
   - `domain/daily-stats/types.ts` — `RawDailyStat`
5. API 함수
   - `api/campaigns.ts` — `fetchCampaigns`
   - `api/daily-stats.ts` — `fetchDailyStats`
6. React Query 훅
   - `hooks/queries/queryKeys.ts`
   - `hooks/queries/useCampaigns.ts` (select 없이, Raw 그대로)
   - `hooks/queries/useDailyStats.ts`
7. 임시 컴포넌트로 화면에 `<pre>{JSON.stringify(data)}</pre>` 출력

### 완료 기준

- 브라우저에서 campaigns와 daily_stats Raw 데이터가 화면에 표시된다.
- React Query DevTools에서 캐시 상태가 확인된다.

---

## Day 2. 일별 추이 차트 (Vertical Slice)

차트가 실제 데이터로 그려지는 것을 확인하는 날.

### 작업 목록

1. `domain/daily-stats/types.ts`에 `DailyStat` Domain 타입 추가
2. `domain/daily-stats/normalize.ts` — 이 차트에 필요한 정규화만 구현
   - null → 0 처리, `(campaignId, date)` 중복 발생 시 `id`가 가장 큰(최신) 레코드 유지
3. `hooks/queries/useDailyStats.ts`에 `select: normalizeDailyStats` 연결
4. `domain/daily-stats/aggregate.ts` — `aggregateByDate()` 구현
5. `hooks/derived/useTrendData.ts` — aggregate 결과를 useMemo로 반환
6. `components/trend-chart/TrendChart.tsx` — Recharts LineChart
7. `components/trend-chart/TrendMetricToggle.tsx` — 노출수/클릭수 토글
8. `pages/Dashboard.tsx`에 차트 위젯 배치

### 완료 기준

- 차트에 일별 추이 데이터가 실제로 그려진다.
- 메트릭 토글 시 차트 라인이 전환된다.

---

## Day 3. 글로벌 필터 + Campaign 정규화

필터 → 차트 연동이 동작하는 것을 확인하는 날.
필터링의 선행 조건인 **Campaign 정규화를 함께 처리**한다.

### 작업 목록

1. Campaign 정규화
   - `domain/campaign/types.ts`에 `Campaign`, `Platform`, `CampaignStatus` 추가
   - `domain/campaign/normalize.ts` 구현 (표준화/파싱, 규칙은 `SPEC.md §1.2` 참조)
   - `hooks/queries/useCampaigns.ts`의 `queryFn` 내부에서 `normalizeCampaigns` 호출
2. 필터 스토어 완성 (`store/filter-store.ts`)
   - `dateRange`, `statuses`, `platforms` 상태 + action 구현
   - 초기값은 `domain/filters/defaults.ts`의 `getDefaultDateRange()` 사용
     - 당월 1일~말일, 로컬 시간 기준 포맷팅 (`toISOString()` 금지)
3. 필터 판정 순수 함수 (`domain/filters/predicates.ts`)
   - `isDateRangeOverlapping()` — 캠페인 집행기간과 필터 기간 겹침 판정
   - `matchesArrayFilter()` — 빈 배열은 "전체 통과"
4. `hooks/derived/useFilteredData.ts` — 필터 적용된 campaigns / stats subset 반환
   - campaigns 필터링 → campaignId `Set` → dailyStats 필터링
   - `useMemo` 메모이제이션
5. `hooks/derived/useTrendData.ts`의 소스를 `useDailyStats` → `useFilteredData`로 교체
6. 필터 UI
   - `components/filter/FilterBar.tsx`
   - `components/filter/DateRangeFilter.tsx` — `min`/`max`로 역전 방지
   - `components/filter/StatusFilter.tsx` — 다중 선택
   - `components/filter/PlatformFilter.tsx` — 다중 선택
   - `components/filter/ResetButton.tsx`
7. `pages/Dashboard.tsx` 상단에 `<FilterBar />` 배치

### Day 3 판단 포인트

- `startDate`가 null인 캠페인 → 필터 매칭 불가로 제외
- 정규화 맵에 없는 platform/status → 정규화 단계에서 해당 캠페인 drop
- 비표준값 매핑 근거는 README "데이터 처리 방침"에 기록

### 완료 기준

- Campaign Raw가 Domain 타입으로 정규화된다.
- 날짜/상태/매체 필터 조작 시 차트가 즉시 갱신된다.
- 초기화 버튼 클릭 시 당월 1일~말일 + 전체 상태/매체로 복원된다.
- 여러 필터가 AND 조합으로 동작한다.

---

## Day 4. 캠페인 테이블 (읽기)

테이블에 캠페인 데이터가 지표와 함께 표시되고, 정렬/검색/페이지네이션이 동작하는 날.
Campaign 정규화는 Day 3에서 완료되었으므로 **지표 계산과 테이블 UI에 집중**한다.

### 작업 목록

1. 유틸 함수
   - `lib/math.ts` — `safeDivide()` (분모 0이면 0 반환)
   - `lib/format.ts` — 원화/퍼센트 포맷
2. 지표 계산
   - `domain/campaign/metrics.ts` — `calcMetrics()` (CTR / CPC / ROAS)
   - `conversionsValue` null 레코드 처리: ROAS 집계 시 분자·분모에서 함께 제외
3. 집계 함수
   - `domain/daily-stats/aggregate.ts`에 `aggregateByCampaign()` 추가
4. 테이블 파생 훅 (`hooks/derived/useTableData.ts`)
   - 필터링된 캠페인 + 집계 + 지표 계산
   - 검색어 / 정렬 / 페이지 번호는 훅 내부 로컬 상태 (store 금지)
5. 테이블 UI
   - `components/campaign-table/CampaignTable.tsx`
   - `components/campaign-table/TableHeader.tsx` — 검색 + 건수
   - `components/campaign-table/TableSearch.tsx` — `useDebounce` 활용
   - `components/campaign-table/SortableColumn.tsx`
   - `components/campaign-table/StatusBadge.tsx`
   - `components/campaign-table/Pagination.tsx` — 1페이지 10건
6. 필터와 테이블 연동 확인

### Day 4 판단 포인트

- 검색은 **테이블에만** 적용 (차트/기타 위젯 영향 없음)
- 신규 캠페인(daily_stats 없음): 지표는 `0` 또는 `-`으로 표시 — `calcMetrics` fallback 처리
- `conversionsValue`가 null인 레코드: ROAS 계산에서 제외해야 왜곡 없음

### 완료 기준

- 테이블에 캠페인 목록이 지표(CTR/CPC/ROAS)와 함께 표시된다.
- 정렬 / 검색 / 페이지네이션이 동작한다.
- 글로벌 필터 변경 시 테이블이 갱신된다.
- 검색어는 테이블에만 적용되고 차트에는 영향 없다.

---

## Day 5. 쓰기 기능 (일괄 변경 + 등록)

테이블에서의 쓰기(PATCH)와 등록 모달(POST)이 동작하는 날.

### 오전: 일괄 상태 변경

1. `mocks/handlers.ts`에 `PATCH /campaigns/:id/status` 핸들러 추가
   - 메모리 복사본만 수정
2. `api/campaigns.ts`에 `updateCampaignStatus()` 추가
3. `hooks/queries/useUpdateCampaignStatus.ts` — `useMutation` + `invalidateQueries`
4. 테이블 UI
   - `components/campaign-table/TableToolbar.tsx` — 선택 시 일괄 변경 UI
   - `components/campaign-table/BulkStatusSelect.tsx` — 상태 드롭다운
5. 체크박스 선택 → 일괄 변경 → 테이블 즉시 반영 확인

### 오후: 캠페인 등록 모달

6. `mocks/handlers.ts`에 `POST /campaigns` 핸들러 추가
   - id 자동 생성, status `active` 고정
7. `schemas/campaign-form.ts` — Zod 스키마 정의
   - 필드별 검증 규칙은 `SPEC.md §6.3` 참조
   - 교차 검증: 집행 금액 ≤ 예산, 종료일 > 시작일 (`.refine()`)
8. `hooks/queries/useCreateCampaign.ts` — `useMutation` + `invalidateQueries`
9. 모달 UI
   - `components/campaign-create/CreateCampaignModal.tsx`
   - `components/campaign-create/CreateCampaignButton.tsx`
   - `components/campaign-create/FormField.tsx` — 에러 메시지 표시 공통 컴포넌트
10. 등록 → `invalidateQueries` → 테이블 즉시 반영 확인

### Day 5 판단 포인트

- 일괄 변경 / 등록 모두 **낙관적 업데이트는 지양**, invalidateQueries로 단순 처리
- 폼 에러는 필드 하단에 표시 (공통 FormField 패턴)
- 등록 성공 시 모달 닫기 + 토스트(선택)

### 완료 기준

- 체크박스 선택 → 상태 일괄 변경 → 테이블 즉시 갱신
- 등록 모달에서 캠페인 생성 → 테이블 즉시 반영
- 새로고침 시 초기 데이터로 복원 (MSW 메모리 복사본 전제)

---

## Day 6. 선택 기능 (도넛 차트 + Top3 랭킹)

> 시간이 부족하면 이 날은 스킵 가능. Day 7에서 일부만 수행해도 무방.

### 오전: 플랫폼별 도넛 차트

1. `domain/daily-stats/aggregate.ts`에 `aggregateByPlatform()` 추가
2. `hooks/derived/usePlatformData.ts` — 도넛 차트용 파생 데이터
3. `components/platform-donut/PlatformDonut.tsx` — Recharts PieChart
4. `components/platform-donut/DonutMetricToggle.tsx`
   - 메트릭: 비용 / 노출수 / 클릭수 / 전환수 (기본값 비용, 단일 선택)
5. 도넛 ↔ 필터 **양방향 연동**
   - 클릭 시 `togglePlatform()` 호출
   - 이미 선택된 플랫폼 재클릭 → 필터 해제

### 오후: 캠페인 랭킹 Top3

6. `hooks/derived/useTop3Data.ts` — Top3 파생 데이터
   - **정렬 방향 주의**: ROAS / CTR은 내림차순, CPC는 **오름차순**
7. `components/top3-ranking/Top3Ranking.tsx` — Bar/카드 UI
8. `components/top3-ranking/RankingMetricToggle.tsx`
   - 메트릭: ROAS / CTR / CPC (기본값 ROAS, 단일 선택)

### Day 6 판단 포인트

- 도넛 양방향 연동은 가산점 포인트 — 구현 시 **UX 일관성** 주의 (선택/해제 상태 시각 피드백)
- Top3의 CPC는 "낮을수록 좋음"을 **UI에서도 명확히** (예: 정렬 기준 표기)

### 완료 기준

- 도넛 차트에 플랫폼별 비율이 표시되고 필터와 양방향 연동된다.
- Top3 랭킹이 메트릭별로 전환되고, CPC는 낮은 순 상위 3개가 노출된다.

---

## Day 7. 리팩토링 + 문서화 + 최종 검증

코드 품질을 올리고 제출 준비를 하는 날.

### 작업 목록

1. **리팩토링**
   - 중복 패턴 통일 (반복되는 컴포넌트/훅 추출)
   - 네이밍 / 폴더 구조가 `ARCHITECTURE.md`와 일치하는지 점검
   - 불필요한 `console.log`, 임시 코드, 사용되지 않는 import 제거
   - 타입 `any` 제거
2. **문서 최종화**
   - `README.md`
     - 프로젝트 소개 / 실행 방법 / 기술 스택
     - **데이터 처리 방침** 섹션 (비표준값 매핑 근거, 중복 제거 정책, null 처리 방침)
     - **알려진 한계** 섹션
   - `AI_USAGE.md` (AI 활용 내역)
