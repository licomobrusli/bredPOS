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
}

const CutModal: React.FC<CutModalProps> = ({ visible, onClose, selectedCategoryImage, selectedServiceImage }) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={{ flex: 1, justifyContent: 'space-between', marginTop: 600 }}>
        <ModalHeader />
        <ModalTheme categoryImage={selectedCategoryImage} serviceImage={selectedServiceImage} />
        <ModalFooter onClose={onClose} />
      </View>
    </Modal>
  );
};

export default CutModal;
