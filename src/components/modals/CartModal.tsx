// CartModal.tsx
import React, { useState } from 'react';
import { Modal, View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useCart } from '../../config/CartContext';
import fonts from '../../config/fonts';
import SwatchGridStyle from '../../config/swatchGridStyle';
import SubModal from './SubModal';
import SubModalB from './SubModalB';
import SDims from '../../config/dimensions';
import Buttons from '../../config/buttons';

interface CartModalProps {
  visible: boolean;
  onClose: () => void;
}

const CartModal: React.FC<CartModalProps> = ({ visible, onClose }) => {
  const { cartItems, setCartItems } = useCart();
  const [modalType, setModalType] = useState<'subModal' | 'subModalB' | null>(null);
  const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(null);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [calculatedPrices, setCalculatedPrices] = useState<{ [key: string]: { unitPrice: number; quantity: number; totalPrice: number; } }>({});

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

      item.modalCountsDetails.forEach((detail: ModalCountDetail, detailIndex: number) => {

        if (detail.logic === 'OR') {
          const quantity = Math.max(selectedColors.length - 1, 0);
          const totalPrice = detail.unitPrice * quantity;
          itemSubtotal += totalPrice;
          item.modalCountsDetails[detailIndex] = { ...detail, price: `${totalPrice.toFixed(0)}€` };
        } else if (detail.name !== "Sub total") {
          const nonOrPrice = parseFloat(detail.price.split('€')[0]);
          itemSubtotal += isNaN(nonOrPrice) ? 0 : nonOrPrice;
        }
      });

      // Update subtotal
      const subtotalIndex = item.modalCountsDetails.findIndex((detail: ModalCountDetail) => detail.name === "Sub total");
      if (subtotalIndex !== -1) {
        item.modalCountsDetails[subtotalIndex] = { ...item.modalCountsDetails[subtotalIndex], price: `${itemSubtotal.toFixed(0)}€` };
      }
    }
  });

  setCartItems(newCartItems);
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
            <Text style={[fonts.txtTitle]}>
              {item.selectedService?.name} de {item.selectedCategory?.name}
            </Text>
            {item.modalCountsDetails.map((detail, detailIndex) => (
              <Text key={detailIndex} style={fonts.txtButtonA}>
                {detail.name}: {calculatedPrices[detail.name] ? `${calculatedPrices[detail.name].totalPrice}€` : detail.price}
              </Text>
            ))}
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              {item.modalCountsDetails.length > 0 && item.modalCountsDetails[0].sub !== 0 && (
                <Buttons.ButtonA title="Edit" onPress={() => openModal(item.modalCountsDetails[0].sub, { colors: item.selectedColors }, index)} />
              )}
              <SwatchGridStyle
                colors={item.selectedColors} 
                onSelectColor={() => {}} 
                selectedColors={item.selectedColors} 
                selectedSwatchStyle={styles.selectedSwatchStyle}
              />
              <Buttons.ButtonA title="X" onPress={() => handleDelete(index)} />
            </View>
          </View>
        ))}
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Buttons.ButtonA title="Submit" onPress={onClose} />
          <Buttons.ButtonA title="Close" onPress={onClose} />
        </View>
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
    borderColor: '#AD8457',
    borderWidth: 5,
    margin: 10,
    height: SDims.Height5p * .5,
    width: SDims.Height5p * .5,
  },
  
  cartButton: {
    paddingVertical: 40,
    paddingHorizontal: 40,
    backgroundColor: '#AD8457',
    borderRadius: 10,
    ...fonts.txtButtonA, // Spread the font style here
  },
  
  itemContainer: {
    borderColor: 'red',
    borderWidth: 1,
    padding: 1,
  },
});

export default CartModal;
