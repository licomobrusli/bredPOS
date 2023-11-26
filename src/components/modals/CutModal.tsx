// CutModal.tsx
import React, { useState, useEffect } from 'react';
import { Modal, View } from 'react-native';
import ModalTheme from './ModalTheme';
import ModalDetail from './ModalDetail';
import ModalFooter from './ModalFooter';
import SDims from '../../config/dimensions';
import SubModal from './SubModal';
import { Service } from '../../config/types'; // Ensure this path is correct

interface CutModalProps {
  visible: boolean;
  onClose: () => void;
  selectedCategoryImage: string;
  selectedServiceImage: string;
  categoryCode: string;
  selectedService: Service | null;
}

const CutModal: React.FC<CutModalProps> = ({
  visible, onClose, selectedCategoryImage, selectedServiceImage, categoryCode, selectedService
}) => {
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [isSubModalVisible, setIsSubModalVisible] = useState<boolean>(false);

  // Placeholder callback functions
  const onServiceNameChange = (name: string) => {
    // Implement your logic here if needed
  };

  const onCategoryNameChange = (name: string) => {
    // Implement your logic here if needed
  };

  const onModalCountsChange = (counts: any[]) => { // Replace 'any' with the appropriate type
    // Implement your logic here if needed
  };

  // UseEffect to log selectedService details
  useEffect(() => {
    if (selectedService) {
      console.log('BOBOB:', selectedService);
    }
  }, [selectedService]);

  // AddToCart
  const handleAddToCart = () => {
    console.log('BIBIB:', {
      selectedService,
      selectedColors
    });
  };

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
          <View style={{ height: SDims.HeightCentralSection * .5 }}>
            <ModalTheme
              categoryCode={categoryCode}
              selectedServiceCode={selectedService ? selectedService.code : ''}
              onSelectColor={setSelectedColors}
              setSelectedColors={setSelectedColors}
              selectedColors={selectedColors}
              onServiceNameChange={onServiceNameChange}
              onCategoryNameChange={onCategoryNameChange}
              onModalCountsChange={onModalCountsChange}
            />
          </View>
          <View style={{ height: SDims.HeightCentralSection * .25 }}>
            <ModalDetail 
              selectedColors={selectedColors}
              setSelectedColors={setSelectedColors}
            />
          </View>
          <View style={{ height: SDims.HeightCentralSection * .25 }}>
            <ModalFooter onClose={onClose} onAddToCart={handleAddToCart} />
          </View>
        </View>
      </View>
      {isSubModalVisible && (
        <SubModal
          isVisible={isSubModalVisible}
          onClose={() => setIsSubModalVisible(false)}
          selectedColors={selectedColors}
          setSelectedColors={setSelectedColors}
        />
      )}
    </Modal>
  );
};

export default CutModal;
