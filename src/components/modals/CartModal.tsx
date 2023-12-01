// CartModal.tsx
import React from 'react';
import { Modal, View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useCart } from '../../config/CartContext';
import fonts from '../../config/fonts'; // Import the fonts object
import SwatchGridStyle from '../../config/swatchGridStyle';

interface CartModalProps {
  visible: boolean;
  onClose: () => void;
}

const CartModal: React.FC<CartModalProps> = ({ visible, onClose }) => {
  const { cartItems, setCartItems } = useCart();

  // Function to handle item deletion
  const handleDelete = (index: number) => {
    const newCartItems = [...cartItems];
    newCartItems.splice(index, 1); // Remove the item at the specified index
    setCartItems(newCartItems); // Update the cart items
  };

  return (
    <Modal animationType="fade" transparent={true} visible={visible} onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        {/* Display cart items */}
        {cartItems.map((item, index) => (
          <View key={index} style={styles.itemContainer}>
            <Text style={[fonts.txtSubBrandBanner]}>{item.selectedService?.name} de {item.selectedCategory?.name} </Text>
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
            {/* Edit Button */}
            <TouchableOpacity style={styles.cartButton}>
              <Text style={fonts.txtNavButton}>Edit</Text>
            </TouchableOpacity>
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
        <View style={styles.modalContainer}>
          <TouchableOpacity onPress={onClose} style={styles.cartButton}>
            <Text style={fonts.txtNavButton}>Close</Text>
          </TouchableOpacity>
        </View>
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
