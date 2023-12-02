// CartModal.tsx
import React, { useState } from 'react';
import { Modal, View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useCart } from '../../config/CartContext';
import fonts from '../../config/fonts';
import SwatchGridStyle from '../../config/swatchGridStyle';
import SubModal from './SubModal';
import SubModalB from './SubModalB';

interface CartModalProps {
  visible: boolean;
  onClose: () => void;
}

const CartModal: React.FC<CartModalProps> = ({ visible, onClose }) => {
  const { cartItems, setCartItems } = useCart();

  const [modalType, setModalType] = useState<'subModal' | 'subModalB' | null>(null);
  const [selectedItemDetails, setSelectedItemDetails] = useState({ colors: [], value: 0 });

  const openModal = (sub: number, itemDetails: any) => {
    console.log('Opening modal with sub:', sub, 'and itemDetails:', itemDetails);
    setSelectedItemDetails(itemDetails); // Set selected item details
    if (sub === 2) {
      setModalType('subModal');
    } else if (sub === 1) {
      setModalType('subModalB');
    } else {
      setModalType(null);
    }
  };

  // function to handle no edit button if sub = 0
  const handleSubZero = (sub: number, itemDetails: any) => {
    console.log('handleSubZero called with sub:', sub, 'and itemDetails:', itemDetails);
    if (sub === 0) {
      return null;
    } else {
      return (
        <TouchableOpacity onPress={() => openModal(sub, itemDetails)} style={styles.cartButton}>
          <Text style={fonts.txtNavButton}>Edit</Text>
        </TouchableOpacity>
      );
    }
  };

  // Function to handle item deletion
  const handleDelete = (index: number) => {
    const newCartItems = [...cartItems];
    newCartItems.splice(index, 1); // Remove the item at the specified index
    setCartItems(newCartItems); // Update the cart items
  };

  const [isSubModalVisible, setIsSubModalVisible] = useState(false);

  return (
    <Modal animationType="fade" transparent={true} visible={visible} onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        {/* Display cart items */}
        {cartItems.map((item, index) => (
          <View key={index} style={styles.itemContainer}>
            <Text style={[fonts.txtSubBrandBanner]}>
              {item.selectedService?.name} de {item.selectedCategory?.name}
            </Text>
            <SwatchGridStyle
              colors={item.selectedColors} 
              onSelectColor={() => {}} 
              selectedColors={item.selectedColors} 
              selectedSwatchStyle={styles.selectedSwatchStyle}
            />
            {item.modalCountsDetails.map((detail, detailIndex) => (
              <Text key={detailIndex} style={fonts.txtNavButton}>
                {detail.name}: {detail.price}
              </Text>
            ))}
  
            {/* Edit Button - Only show for first detail item */}
            {item.modalCountsDetails.length > 0 && (
              handleSubZero(item.modalCountsDetails[0].sub, {
                colors: item.selectedColors, // Ensure these values are correctly derived
                value: item.value // Adjust according to your data structure
              })
            )}
  
            {/* Delete Button */}
            <TouchableOpacity onPress={() => handleDelete(index)} style={styles.cartButton}>
              <Text style={fonts.txtNavButton}>X</Text>
            </TouchableOpacity>
          </View>
        ))}
        {/* Submit Button */}
        <TouchableOpacity style={styles.cartButton}>
          <Text style={fonts.txtNavButton}>Submit</Text>
        </TouchableOpacity>
        {/* Close Button */}
        <TouchableOpacity onPress={onClose} style={styles.cartButton}>
          <Text style={fonts.txtNavButton}>Close</Text>
        </TouchableOpacity>
        {/* SubModal or SubModalB */}
        {modalType === 'subModal' && (
          <SubModal
            isVisible={true}
            onClose={() => setModalType(null)}
            selectedColors={selectedItemDetails.colors}
            setSelectedColors={() => {}}
          />
        )}
        {modalType === 'subModalB' && (
          <SubModalB
            isVisible={true}
            onClose={() => setModalType(null)}
            onCounterChange={() => {}}
            selectedValue={selectedItemDetails.value}
          />
        )}
      </View>
    </Modal>
  );
};  

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  selectedSwatchStyle: {
    borderColor: 'white',
    borderWidth: 5,
  },
  cartButton: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: 'black',
    borderRadius: 5,
    borderColor: 'white',
    borderWidth: 1,
  },
  itemContainer: {
    borderColor: 'yellow',
    borderWidth: 1,
    padding: 10,
  },
});

export default CartModal;
