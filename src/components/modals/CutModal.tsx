import React from 'react';
import { Modal, View } from 'react-native';
import ModalHeader from './ModalHeader';
import SideSelect from './SideSelector';
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
      animationType="slide"
      transparent={false}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={{ marginTop: 22 }}>
        <ModalHeader />
        <SideSelect />
        <CutSelect />
        <ToolSelect />
        <ModalFooter onClose={onClose} />
      </View>
    </Modal>
  );
};

export default CutModal;
