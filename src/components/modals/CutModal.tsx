// CutModal.tsx
import React from 'react';
import { Modal, View } from 'react-native';
import ModalHeader from './ModalHeader';
import ModalTheme from './ModalTheme';
import CutSelect from './CutSelector';
import ToolSelect from './ToolSelector';
import ModalFooter from './ModalFooter';

interface CutModalProps {
  visible: boolean;
  onClose: () => void;
}

const CutModal: React.FC<CutModalProps> = ({ visible, onClose }) => {
  return (
    <Modal
      animationType="fade"
      transparent={false}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={{ marginTop: 22 }}>
        <ModalHeader />
        <ModalTheme />
        <CutSelect />
        <ToolSelect />
        <ModalFooter onClose={onClose} />
      </View>
    </Modal>
  );
};

export default CutModal;
