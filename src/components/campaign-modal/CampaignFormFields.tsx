import { useFormContext } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FormField } from '../common/form/FormField';
import { NumberInputField } from '../common/form/NumberInputField';
import type { CampaignFormInput } from '@/schemas/campaign-form';

const PLATFORMS = ['Google', 'Meta', 'Naver'] as const;

export function CampaignFormFields() {
  const { control } = useFormContext<CampaignFormInput>();

  return (
    <>
      <FormField control={control} name="name" label="캠페인명">
        {(field) => (
          <div className="w-full">
            <Input placeholder="캠페인명을 입력하세요" {...field} />
          </div>
        )}
      </FormField>

      <FormField control={control} name="platform" label="광고 매체">
        {(field) => (
          <div className="flex w-full gap-4">
            {PLATFORMS.map((platform) => (
              <Button
                key={platform}
                type="button"
                variant="outline"
                className={`flex-1 h-10 font-normal hover:bg-gray-50 border border-gray-200 shadow-sm ${
                  field.value === platform
                    ? 'border-blue-500 text-blue-600 bg-blue-50/50 hover:bg-blue-50/50'
                    : 'text-gray-700'
                }`}
                onClick={() => field.onChange(platform)}
              >
                {platform}
              </Button>
            ))}
          </div>
        )}
      </FormField>

      <div className="flex gap-4">
        <div className="flex-1">
          <FormField control={control} name="budget" label="예산">
            {(field) => <NumberInputField field={field} />}
          </FormField>
        </div>

        <div className="flex-1">
          <FormField control={control} name="cost" label="집행금액">
            {(field) => <NumberInputField field={field} />}
          </FormField>
        </div>
      </div>

      <div className="flex gap-4">
        <div className="flex-1">
          <FormField control={control} name="startDate" label="집행 시작일">
            {(field) => (
              <div className="relative">
                <Input
                  type="date"
                  className="w-full text-gray-600 px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  {...field}
                />
              </div>
            )}
          </FormField>
        </div>

        <div className="flex-1">
          <FormField control={control} name="endDate" label="집행 종료일">
            {(field) => (
              <div className="relative">
                <Input
                  type="date"
                  className="w-full text-gray-600 px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  {...field}
                />
              </div>
            )}
          </FormField>
        </div>
      </div>
    </>
  );
}
