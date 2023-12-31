// CutModal.tsx
import React, { useState, useEffect } from 'react';
import { Modal, View } from 'react-native';
import ModalTheme from './ModalTheme';
import ModalDetail from './ModalDetail';
import ModalFooter from './ModalFooter';
import SDims from '../../config/dimensions';
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
  navigation: any;
}

const CutModal: React.FC<CutModalProps> = ({
  visible,
  onClose,
  categoryCode,
  selectedService,
  selectedCategory,
  selectedModalCounts,
  navigation,
}) => {
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [counterValue, setCounterValue] = useState<number>(1); // New state for SubModalB
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
        setCounterValue(existingCartItem.counterValue); // Set the counter value for SubModalB
        setModalCountsDetails(existingCartItem.modalCountsDetails);
        setIsEditing(true); // Set editing mode to true
      } else {
        // Reset for new item
        setSelectedColors([]);
        setCounterValue(1); // Reset counter value for SubModalB
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
      counterValue,
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
      <View style={{
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: SDims.Height20p }}>
        <View style={{
          height: SDims.Height70p + SDims.Height5p + SDims.Width5p,
          width: SDims.Width90p,  
          flexDirection: 'column',
          backgroundColor: 'black',
          borderColor: '#AD8457',
          borderWidth: SDims.D2px,
        }}>
          <View style={{ flex: .6 }}>
            <ModalTheme
              categoryCode={categoryCode}
              selectedServiceCode={selectedService ? selectedService.code : ''}
              onSelectColor={setSelectedColors}
              selectedColors={selectedColors}
              setSelectedColors={setSelectedColors}
              counterValue={counterValue} // Passing counterValue to ModalTheme
              setCounterValue={setCounterValue} // Passing setCounterValue to ModalTheme
              onServiceNameChange={onServiceNameChange}
              onCategoryNameChange={onCategoryNameChange}
              selectedService={selectedService}
              selectedCategory={selectedCategory}
              selectedModalCounts={selectedModalCounts}
              onModalCountsChange={handleModalCountsChange}
              modalCountsDetails={modalCountsDetails}
            />
          </View>
          <View style={{ flex: .2 }}>
            <ModalDetail 
              selectedColors={selectedColors}
              setSelectedColors={setSelectedColors}
            />
          </View>
          <View style={{ flex: .2 }}>
            <ModalFooter 
              onClose={onClose} 
              onAddToCart={handleAddToCart} 
              modalCountsDetails={modalCountsDetails}
              selectedColors={selectedColors}
              counterValue={counterValue}
              navigation={navigation}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default CutModal;
