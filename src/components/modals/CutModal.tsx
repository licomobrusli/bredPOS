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
  const [modalCountsDetails, setModalCountsDetails] = useState<any[]>([]);
  const [isSubModalVisible, setIsSubModalVisible] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const { cartItems, addToCart, updateCartItem } = useCart();

  useEffect(() => {
    // Function to find and load existing cart item details
    const loadExistingCartItemDetails = () => {
      const existingCartItem = cartItems.find(item =>
        item.selectedService?.id === selectedService?.id &&
        item.selectedCategory?.id === selectedCategory?.id
      );

      if (existingCartItem) {
        setSelectedColors(existingCartItem.selectedColors);
        setModalCountsDetails(existingCartItem.modalCountsDetails);
        setIsEditing(true); // Set editing mode to true
      } else {
        // Reset for new item
        setSelectedColors([]);
        setModalCountsDetails([]);
        setIsEditing(false); // Set editing mode to false
      }
    };

    if (visible) {
      loadExistingCartItemDetails();
    }
  }, [visible, cartItems, selectedService, selectedCategory]);

  // Placeholder callback functions
  const onServiceNameChange = (name: string) => {
  };

  const onCategoryNameChange = (name: string) => {
  };

  const onModalCountsChange = (counts: any[]) => { 
  };

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

  // AddToCart
  const handleAddToCart = () => {
    const cartItem = {
      selectedCategory,
      selectedService,
      selectedColors,
      modalCountsDetails
    };
    if (isEditing) {
      // Update existing item
      updateCartItem(cartItem); // Implement updateCartItem in CartContext
    } else {
      // Add new item
      addToCart(cartItem);
    }
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
      <View style={{ flexDirection: 'column', alignItems: 'center', marginTop: SDims.Height20p }}>
        <View style={{
          height: SDims.Height70p,
          width: SDims.Width90p,
          
          flexDirection: 'column',
          backgroundColor: 'black',
        }}>
          <View style={{ flex: .55 }}>
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
          <View style={{ flex: .15 }}>
            <ModalDetail 
              selectedColors={selectedColors}
              setSelectedColors={setSelectedColors}
            />
          </View>
          <View style={{ flex: .25 }}>
            <ModalFooter 
              onClose={onClose} 
              onAddToCart={handleAddToCart} 
              modalCountsDetails={modalCountsDetails}
              selectedColors={selectedColors}
            />
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
