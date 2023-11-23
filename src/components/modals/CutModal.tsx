// CutModal.tsx
import React from 'react';
import { Modal, View } from 'react-native';
import ModalControls from './ModalControls';
import ModalTheme from './ModalTheme';
import ModalFooter from './ModalFooter';
import SDims from '../../config/dimensions';

console.log('SDims Height80p:', SDims.Height80p);
console.log('SDims Width100p:', SDims.Width100p);

interface CutModalProps {
  visible: boolean;
  onClose: () => void;
  selectedCategoryImage: string;
  selectedServiceImage: string;
  categoryCode: string;
  selectedServiceCode: string;
}

const CutModal: React.FC<CutModalProps> = ({
  visible, onClose, selectedCategoryImage, selectedServiceImage, categoryCode, selectedServiceCode
}) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View style={{
          height: SDims.Height80p,
          width: SDims.Width100p,
          justifyContent: 'space-between',
          backgroundColor: 'black',
        }}>
          <View style={{ flex: 0.33 }}>
            <ModalTheme categoryCode={categoryCode} selectedServiceCode={selectedServiceCode} />
          </View>
          <View style={{ flex: 0.33 }}>
            <ModalControls />
          </View>
          <View style={{ flex: 0.33 }}>
            <ModalFooter onClose={onClose} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default CutModal;
