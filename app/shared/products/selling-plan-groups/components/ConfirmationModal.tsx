// components/ConfirmationModal.tsx
import { FC } from 'react';
import { Modal } from 'rizzui/modal';
import { Button } from 'rizzui/button';

interface ConfirmationModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  ref?: any;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmationModal: FC<ConfirmationModalProps> = ({
  isOpen,
  title,
  ref,
  message,
  onConfirm,
  onCancel
}) => {
  const handleConfirm = () => {
    onConfirm(); // Perform action first
    onCancel(); // Close modal
  };
  return (
    <Modal isOpen={isOpen} onClose={onCancel}>
      <div className="p-6">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm text-gray-600 mt-2">{message}</p>
        <div className="flex gap-4 mt-4">
          <Button
            variant={"outline" as any}
            color="secondary"
            onClick={onCancel}
            onPointerDown={(e) => e.stopPropagation()}
          >
            Cancel
          </Button>
          <Button
            variant={"solid" as any}
            color="danger"
            onClick={handleConfirm}
            onPointerDown={(e) => e.stopPropagation()}
          >
            Confirm
          </Button>
        </div>
      </div>
    </Modal>
  )
};