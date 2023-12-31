// CartModal.tsx
import React, { useState } from 'react';
import { Modal, View, Image, Text, StyleSheet } from 'react-native';
import { useCart } from '../../config/CartContext';
import fonts from '../../config/fonts';
import SubModal from './SubModal';
import SubModalB from './SubModalB';
import SDims from '../../config/dimensions';
import Buttons from '../../config/buttons';
import { EDTImage } from '../../main/assets/images';


interface CartModalProps {
  visible: boolean;
  onClose: () => void;
}

const CartModal: React.FC<CartModalProps> = ({ visible, onClose }) => {
  const { cartItems, setCartItems } = useCart();
  const [modalType, setModalType] = useState<'subModal' | 'subModalB' | null>(null);
  const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(null);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [counterValue, onCounterChange] = useState<number>(7);
  const [calculatedPrices, setCalculatedPrices] = useState<{ [key: string]: { unitPrice: number; quantity: number; totalPrice: number; } }>({});
  const clearCart = () => setCartItems([]);

  const openModal = (sub: number, itemDetails: any, index: number) => {
    setSelectedColors(itemDetails.colors);
    setSelectedItemIndex(index);

    // Set counterValue based on the selected item
    if (itemDetails.counterValue !== undefined) {
      onCounterChange(itemDetails.counterValue);
    }

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
    const selectedItem = newCartItems[selectedItemIndex];

    // Update the selected item with the latest selectedColors and counterValue
    selectedItem.selectedColors = selectedColors;
    selectedItem.counterValue = counterValue;  // Update the counterValue for the selected item

    // Recalculate the prices with the updated item details
    calculatePrices(newCartItems);

    // Update the cart items in the state
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

        let quantity = 1; // Default quantity
        let totalPrice = 0;
        console.log("detail:", detail); // Check the detail content
        if (detail.logic === 'OR') {
          quantity = Math.max(selectedColors.length - 1, 0);
          totalPrice = detail.unitPrice * quantity;
          itemSubtotal += totalPrice;
        } else if (detail.logic === 'NOT' && detail.name === 'Basic design') {
          quantity = counterValue; // Set quantity to counterValue for the special case
          totalPrice = detail.unitPrice * quantity;
          itemSubtotal += totalPrice;
        } else if (detail.logic === 'NOT' && detail.name != 'Basic design') {
          quantity = 1;
          totalPrice = detail.unitPrice * quantity;
          itemSubtotal += totalPrice;
        } else if (detail.name !== "Sub total") {
          const nonOrPrice = parseFloat(detail.price.split('€')[0]);
          itemSubtotal += isNaN(nonOrPrice) ? 0 : nonOrPrice;
        }

        if (detail.name !== "Sub total") {
          item.modalCountsDetails[detailIndex] = { ...detail, price: `${totalPrice.toFixed(0)}€` };
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
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
      {cartItems.map((item, index) => (
        <View key={index} style={styles.itemContainer}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={styles.rowContainer}>
                <Text style={[fonts.txtButtonA]}>
                  {item.selectedService?.name} de {item.selectedCategory?.name}
                </Text>
                  {item.modalCountsDetails.map((detail, detailIndex) => (
                  detail.name === "Sub total" && (
                  <Text key={detailIndex} style={fonts.txtButtonA}>{` - `}
                    {calculatedPrices[detail.name] ? `${calculatedPrices[detail.name].totalPrice}€` : detail.price}
                  </Text>
                    )
                  ))}
                </View>
                <View style={styles.buttonAContainer}>
                  <Buttons.ButtonA title="X" onPress={() => handleDelete(index)} color='B' />
                  {item.modalCountsDetails.length > 0 && item.modalCountsDetails[0].sub !== 0 && (
                  <Buttons.ButtonA 
                    onPress={() => openModal(
                      item.modalCountsDetails[0].sub,
                      {
                        colors: item.selectedColors,
                        counterValue: item.counterValue 
                      }, index)} 
                    color='B' 
                    image={EDTImage}
                  />
                  )}
                </View>
            </View>
        </View>
      ))}
      <View
        style={{
          flexDirection: 'row',
          marginTop: SDims.Height20p,
          alignItems: 'center',
          justifyContent: 'flex-end',
        }}
      >
      <Buttons.ContainerB>
          <Buttons.ButtonB title="Close" onPress={onClose} color='B' />
          {/* Update onPress for the Submit button */}
          <Buttons.ButtonB title="Submit" onPress={() => { onClose(); clearCart(); }} color='A' />
        </Buttons.ContainerB>
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
            onClose={updateCartItems}
            onCounterChange={onCounterChange}
            counterValue={counterValue}
          />
        )}
      </View>
    </Modal>
  );
};  

const styles = StyleSheet.create({
  modalContainer: {
    marginTop: SDims.Height20p,
    height: SDims.Height70p + SDims.Height5p + SDims.Width5p,
    width: SDims.Width90p,
    alignSelf: 'center',
    animationType: 'fade',
    transparent: true,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    borderColor: '#AD8457',
    borderWidth: SDims.D2px,
  },
  
  itemContainer: {
    width: SDims.Width50p + SDims.Width5p,
    padding: SDims.D20px,
    flexDirection: 'row', // Change to row for horizontal layout
    justifyContent: 'space-between', // Space between child elements
    alignItems: 'center', // Align items vertically in the center
    backgroundColor: 'black',
  },

  rowContainer: {
    paddingVertical: SDims.D20px,
    flex: 1, // Take up available space
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start', // Align content to the start
  },

  buttonAContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end', // Align buttons to the end (right)
  },

  controlContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CartModal;
