// CutModal.tsx
import React, { useState } from 'react';
import { Modal, View } from 'react-native';
import ModalControls from './ModalControls';
import ModalTheme from './ModalTheme';
import ModalDetail from './ModalDetail';
import ModalFooter from './ModalFooter';
import SDims from '../../config/dimensions';
import SubModal from './SubModal';

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
  const [selectedColors, setSelectedColors] = useState<string[]>([]); // Manage selected colors
  const [isSubModalVisible, setIsSubModalVisible] = useState<boolean>(false);

  // Function to toggle SubModal visibility
  const toggleSubModal = () => {
    setIsSubModalVisible(!isSubModalVisible);
  };

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
            onSelectColor={setSelectedColors} // You're already passing this
            setSelectedColors={setSelectedColors} // Add this line
          />
          </View>
          <View style={{ height: SDims.HeightCentralSection / 4 }}>
            <ModalControls />
          </View>
          <View style={{ height: SDims.HeightCentralSection / 4 }}>
            <ModalDetail 
              selectedColors={selectedColors}
              onSwatchPress={toggleSubModal} // Passing selectedColors to ModalDetail
              setSelectedColors={function (value: React.SetStateAction<string[]>): void {
                throw new Error('Function not implemented.');
              } }            />
          </View>
          <View style={{ height: SDims.HeightCentralSection / 4 }}>
            <ModalFooter onClose={onClose} />
          </View>
        </View>
      </View>
      {isSubModalVisible && (
        <SubModal
          isVisible={isSubModalVisible}
          onClose={() => setIsSubModalVisible(false)}
          selectedColors={selectedColors} // Passing selectedColors to SubModal
          setSelectedColors={setSelectedColors} // Passing setSelectedColors to SubModal
        />
      )}
    </Modal>
  );
};

export default CutModal;
