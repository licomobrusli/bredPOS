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
  const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(null);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);

  const openModal = (sub: number, itemDetails: any, index: number) => {
    setSelectedColors(itemDetails.colors);
    setSelectedItemIndex(index);

    if (sub === 2) {
      setModalType('subModal');
    } else if (sub === 1) {
      setModalType('subModalB');
    } else {
      setModalType(null);
    }
  };

  const updateCartItems = () => {
    if (selectedItemIndex !== null) {
      const newCartItems = [...cartItems];
      newCartItems[selectedItemIndex] = {
        ...newCartItems[selectedItemIndex],
        selectedColors: selectedColors,
      };

      calculatePrices(newCartItems);
      setCartItems(newCartItems);
      setModalType(null);
    }
  };  

  // Assuming you have a type definition for the structure of a modal count detail
interface ModalCountDetail {
  logic: string;
  unitPrice: number;
  price: string;
  sub: number;
  name: string;
}

const calculatePrices = (newCartItems: any[]) => {
  newCartItems.forEach((item, index) => {
    if (index === selectedItemIndex) {
      let itemSubtotal = 0;

      const originalItem = cartItems.find((_, idx) => idx === selectedItemIndex); // Get the original item

      const updatedModalCountsDetails = item.modalCountsDetails.map((detail: ModalCountDetail, detailIndex: number) => {
        if (detail.logic === 'OR') {
          const originalUnitPrice = originalItem ? originalItem.modalCountsDetails[detailIndex].price.split('€')[0] : 0; // Get unitPrice from original item
          const unitPrice = Number(originalUnitPrice); // Ensure it's a number
          const colorCount = selectedColors.length - 1;
          const totalPrice = unitPrice * colorCount;
          itemSubtotal += totalPrice;
          return { ...detail, price: `${unitPrice}€ x ${colorCount}` };
        } else {
          itemSubtotal += Number(detail.price.split('€')[0]) || 0;
          return detail;
        }
      });

      item.modalCountsDetails = updatedModalCountsDetails;
      item.subtotal = itemSubtotal;
    }
  });
};
  
           
        
  // function to handle no edit button if sub = 0
  const handleSubZero = (sub: number, itemDetails: any, index: number) => {
    if (sub === 0) {
      return null;
    } else {
      return (
        <TouchableOpacity onPress={() => openModal(sub, itemDetails, index)} style={styles.cartButton}>
          <Text style={fonts.txtNavButton}>Edit</Text>
        </TouchableOpacity>
      );
    }
  };

  // Function to handle item deletion
  const handleDelete = (index: number) => {
    const newCartItems = [...cartItems];
    newCartItems.splice(index, 1);
    setCartItems(newCartItems);
  };

  return (
    <Modal animationType="fade" transparent={true} visible={visible} onRequestClose={onClose}>
      <View style={styles.modalContainer}>
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

            {item.modalCountsDetails.length > 0 && (
              handleSubZero(item.modalCountsDetails[0].sub, {
                colors: item.selectedColors,
              }, index)
            )}

            <TouchableOpacity onPress={() => handleDelete(index)} style={styles.cartButton}>
              <Text style={fonts.txtNavButton}>X</Text>
            </TouchableOpacity>
          </View>
        ))}

        <TouchableOpacity style={styles.cartButton}>
          <Text style={fonts.txtNavButton}>Submit</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onClose} style={styles.cartButton}>
          <Text style={fonts.txtNavButton}>Close</Text>
        </TouchableOpacity>

        {modalType === 'subModal' && selectedItemIndex !== null && (
          <SubModal
            isVisible={true}
            onClose={updateCartItems}
            selectedColors={selectedColors}
            setSelectedColors={setSelectedColors}
          />
        )}
        {modalType === 'subModalB' && (
          <SubModalB
            isVisible={true}
            onClose={() => setModalType(null)}
            onCounterChange={() => {}}
            selectedValue={0}
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
