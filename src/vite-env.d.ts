/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

import '@tanstack/react-table';

declare module '@tanstack/react-table' {
  interface ColumnMeta<
    TData extends import('@tanstack/react-table').RowData,
    TValue,
  > {
    align?: 'left' | 'center' | 'right';
    width?: string;
    className?: string;
  }
}
