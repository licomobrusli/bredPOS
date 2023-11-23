// CutModal.tsx
import React, { useState } from 'react';  // Added useState import
import { Modal, View } from 'react-native';
import ModalControls from './ModalControls';
import ModalTheme from './ModalTheme';
import ModalDetail from './ModalDetail';
import ModalFooter from './ModalFooter';
import SDims from '../../config/dimensions';

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
  const [selectedColors, setSelectedColors] = useState<string[]>([]);  // Manage selected colors

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={{ flex: 1, justifyContent: 'flex-end', marginBottom: SDims.Height10p, alignItems: 'center' }}>
        <View style={{
          height: SDims.HeightCentralSection,
          width: SDims.Width100p,
          justifyContent: 'space-between',
          backgroundColor: 'black',
        }}>
          <View style={{ height: SDims.HeightCentralSection / 2 }}>
            <ModalTheme 
              categoryCode={categoryCode} 
              selectedServiceCode={selectedServiceCode} 
              onSelectColor={setSelectedColors}
            />
          </View>
          <View style={{ height: SDims.HeightCentralSection / 4 }}>
            <ModalControls />
          </View>
          <View style={{ height: SDims.HeightCentralSection / 4 }}>
            <ModalDetail selectedColors={selectedColors} />
          </View>
          <View style={{ height: SDims.HeightCentralSection / 4 }}>
            <ModalFooter onClose={onClose} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default CutModal;
