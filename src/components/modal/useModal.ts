import { useState, useCallback } from 'react';

export function useModal(initialOpen = false) {
  const [open, setOpen] = useState(initialOpen);

  const onOpenChange = useCallback((newOpen: boolean) => {
    setOpen(newOpen);
  }, []);

  const openModal = useCallback(() => onOpenChange(true), [onOpenChange]);

  return { open, openModal, onOpenChange };
}
