// SubmitButton.tsx
import React from 'react';
import Buttons from '../config/buttons';

interface SubmitButtonProps {
  onClose: () => void;
  clearCart: () => void;
  color: string;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ onClose, clearCart, color }) => {
  return (
    <Buttons.ButtonB
      title="Submit"
      onPress={() => {
        onClose();
        clearCart();
      }}
      color={'A'}
    />
  );
};

export default SubmitButton;
