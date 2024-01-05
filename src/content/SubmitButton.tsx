// SubmitButton.tsx
import React from 'react';
import Buttons from '../config/buttons';

interface SubmitButtonProps {
  onClose: () => void;
  clearCart: () => void;
  onPress: () => Promise<void>;
  color: string;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ onPress, clearCart, onClose, color }) => {
  return (
    <Buttons.ButtonB
      title="Submit"
      onPress={async () => {
        await onPress();
        clearCart();
        onClose();
      }}
      color={'A'}
    />
  );
};

export default SubmitButton;
