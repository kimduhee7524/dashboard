import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FormDialog, useModal } from '@/components/common/modal';
import { CampaignFormFields } from './CampaignFormFields';
import {
  campaignFormSchema,
  type CampaignFormInput,
  type CampaignFormOutput,
} from '@/schemas/campaign-form';
import { useCreateCampaign } from '@/hooks/queries/useCreateCampaign';

export function CreateCampaignModal() {
  const { open, openModal, onOpenChange } = useModal();
  const { mutate: createCampaign, isPending } = useCreateCampaign();

  const form = useForm<CampaignFormInput, unknown, CampaignFormOutput>({
    resolver: zodResolver(campaignFormSchema),
    defaultValues: {
      name: '',
      platform: undefined,
      budget: undefined,
      cost: undefined,
      startDate: '',
      endDate: '',
    },
  });

  const handleSubmit = (data: CampaignFormOutput) => {
    createCampaign(data, {
      onSuccess: () => {
        onOpenChange(false);
      },
    });
  };

  return (
    <>
      <Button
        onClick={openModal}
        variant="outline"
        size="sm"
        className="h-9 px-4 bg-blue-50 text-blue-600 border-none hover:bg-blue-100 font-medium absolute right-6 top-5"
      >
        <Plus className="w-4 h-4 mr-1" />
        캠페인 등록
      </Button>

      <FormDialog
        open={open}
        onOpenChange={onOpenChange}
        form={form}
        onSubmit={handleSubmit}
        size="md"
      >
        <FormDialog.Header title="캠페인 등록" />
        <FormDialog.Body>
          <CampaignFormFields />
        </FormDialog.Body>
        <FormDialog.Footer>
          <FormDialog.Cancel
            onClick={() => onOpenChange(false)}
            isPending={isPending}
          >
            취소
          </FormDialog.Cancel>
          <FormDialog.Submit isPending={isPending} pendingLabel="등록 중...">
            등록
          </FormDialog.Submit>
        </FormDialog.Footer>
      </FormDialog>
    </>
  );
}
