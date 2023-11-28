// CutModal.tsx
import React, { useState, useEffect } from 'react';
import { Modal, View } from 'react-native';
import ModalTheme from './ModalTheme';
import ModalDetail from './ModalDetail';
import ModalFooter from './ModalFooter';
import SDims from '../../config/dimensions';
import SubModal from './SubModal';
import { Category, Service } from '../../config/types';
import { useCart } from '../../config/CartContext'; 

interface CutModalProps {
  visible: boolean;
  onClose: () => void;
  selectedCategoryImage: string;
  selectedServiceImage: string;
  categoryCode: string;
  selectedService: Service | null;
  selectedCategory: Category | null;
  selectedModalCounts: string[];
  modalCountsDetails: any[];
}

const CutModal: React.FC<CutModalProps> = ({
  visible,
  onClose,
  selectedCategoryImage,
  selectedServiceImage,
  categoryCode,
  selectedService,
  selectedCategory,
  selectedModalCounts,
}) => {
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [isSubModalVisible, setIsSubModalVisible] = useState<boolean>(false);

  // Placeholder callback functions
  const onServiceNameChange = (name: string) => {
  };

  const onCategoryNameChange = (name: string) => {
  };

  const onModalCountsChange = (counts: any[]) => { 
  };

  const [modalCountsDetails, setModalCountsDetails] = useState<any[]>([]);

const handleModalCountsChange = (counts: any[]) => {
  setModalCountsDetails(counts);
};

  // UseEffect to log selectedService details
  useEffect(() => {
    if (selectedService) {
    }
    if (selectedCategory) {
    }
  }, [selectedService, selectedCategory]);
  
  const { addToCart } = useCart();

  // AddToCart
  const handleAddToCart = () => {
    console.log('Add to Cart Details:', {
      selectedCategory,
      selectedService,
      selectedColors,
      modalCountsDetails
    });
    const cartItem = {
      selectedCategory,
      selectedService,
      selectedColors,
      modalCountsDetails
    };
    addToCart(cartItem);
    onClose();
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
              selectedService={selectedService}
              selectedCategory={selectedCategory}
              selectedModalCounts={selectedModalCounts}
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
