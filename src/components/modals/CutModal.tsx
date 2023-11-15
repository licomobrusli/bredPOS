// CutModal.tsx
import React from 'react';
import { Modal, View } from 'react-native';
import ModalHeader from './ModalHeader';
import ModalTheme from './ModalTheme';
import ModalFooter from './ModalFooter';

interface CutModalProps {
  visible: boolean;
  onClose: () => void;
  selectedCategoryImage: string;
  selectedServiceImage: string;
  categoryCode: string; // Add categoryCode to the props
}

const CutModal: React.FC<CutModalProps> = ({ visible, onClose, selectedCategoryImage, selectedServiceImage, categoryCode }) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={{ flex: 1, justifyContent: 'space-between', marginTop: 535, marginBottom: 380 }}>
        <View style={{ flex: 0.3 }}>
          <ModalHeader />
        </View>
        <View style={{ flex: 5 }}>
          <ModalTheme categoryCode={categoryCode} />
        </View>
        <View style={{ flex: 1 }}>
          <ModalFooter onClose={onClose} />
        </View>
      </View>
    </Modal>
  );
};

export default CutModal;
