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
  const { cartItems } = useCart();

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
          </View>
        ))}
        <View style={styles.modalContainer}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
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
  closeButton: {
    padding: 1,
    backgroundColor: 'black',
    borderRadius: 5,
    borderColor: 'white',
    borderWidth: 1,
  },
  itemContainer: {
    borderColor: 'yellow',
    borderWidth: 1,
  },
});

export default CartModal;
