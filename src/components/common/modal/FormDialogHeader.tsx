import {
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

interface FormDialogHeaderProps {
  title: string;
  description?: string;
}

export function FormDialogHeader({
  title,
  description,
}: FormDialogHeaderProps) {
  return (
    <DialogHeader className="px-6 pt-6 pb-4 border-b border-gray-100 shrink-0">
      <DialogTitle className="text-xl font-bold text-gray-900">
        {title}
      </DialogTitle>
      {description ? (
        <DialogDescription className="text-sm text-gray-500 mt-1">
          {description}
        </DialogDescription>
      ) : (
        <DialogDescription className="sr-only">{title}</DialogDescription>
      )}
    </DialogHeader>
  );
}
