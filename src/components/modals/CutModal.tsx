// CutModal.tsx
import React, { useState } from 'react';
import { Modal, View } from 'react-native';
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
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [isSubModalVisible, setIsSubModalVisible] = useState<boolean>(false);

  // New state declarations for service and category names, and modal counts details
  const [serviceName, setServiceName] = useState('');
  const [categoryName, setCategoryName] = useState('');
  const [modalCountsDetails, setModalCountsDetails] = useState<any[]>([]); // Replace 'any' with the correct type

  // Callbacks to update state
  const handleServiceNameChange = (name: string) => {
    setServiceName(name);
  };

  const handleCategoryNameChange = (name: string) => {
    setCategoryName(name);
  };

  const handleModalCountsChange = (details: any[]) => {
    setModalCountsDetails(details);
  };

  // AddToCart
  const handleAddToCart = () => {
    const subtotal = modalCountsDetails.reduce((acc, item) => acc + item.price, 0);
    console.log('Add to Cart Details:', {
      serviceName,
      serviceCode: selectedServiceCode,
      categoryName,
      categoryCode,
      modalCountsDetails,
      selectedColors,
      subtotal
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
          height: SDims.HeightCentralSection ,
          width: SDims.Width100p,
          justifyContent: 'space-between',
          backgroundColor: 'black',
        }}>
          <View style={{ height: SDims.HeightCentralSection * .5 }}>
            <ModalTheme
              categoryCode={categoryCode}
              selectedServiceCode={selectedServiceCode}
              onSelectColor={setSelectedColors}
              setSelectedColors={setSelectedColors}
              selectedColors={selectedColors}
              onServiceNameChange={handleServiceNameChange}
              onCategoryNameChange={handleCategoryNameChange}
              onModalCountsChange={handleModalCountsChange}
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
