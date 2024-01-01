// CartModal.tsx
import React, { useState, useEffect } from 'react';
import { Modal, View, Text, StyleSheet, ScrollView } from 'react-native';
import { useCart } from '../../config/CartContext';
import fonts from '../../config/fonts';
import SubModal from './SubModal';
import SubModalB from './SubModalB';
import SDims from '../../config/dimensions';
import Buttons from '../../config/buttons';
import { EDTImage } from '../../main/assets/images';
import PrintOS from '../../config/printOS';

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
  const [printOSVisible, setPrintOSVisible] = useState(false); // State to control PrintOS modal visibility

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

  const handleManualPrint = () => {
    // When the Manual Print button is pressed, show the PrintOS modal
    setPrintOSVisible(true);
  };

  useEffect(() => {
    if (visible) { // Only log when the modal is opened
      console.log("Cart Items:", JSON.stringify(cartItems, null, 2));
      console.log("Selected Item Index:", selectedItemIndex);
      console.log("Selected Colors:", JSON.stringify(selectedColors, null, 2));
      console.log("Counter Value:", counterValue);
      console.log("Calculated Prices:", JSON.stringify(calculatedPrices, null, 2));
      console.log("PrintOS Modal Visible:", printOSVisible);
    }
  }, [visible, cartItems, selectedItemIndex, selectedColors, counterValue, calculatedPrices, printOSVisible]); // Only re-run the effect if these values change

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.totalRow}>
          <Text style={fonts.txtCard}>Total</Text>
        </View>
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent}>
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
                  <Buttons.ButtonA title="X" onPress={() => handleDelete(index)} color='B' />
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
        <View style={styles.buttonContainer}>
          <Buttons.ContainerB>
            <Buttons.ButtonB title="Close" onPress={onClose} color='B' />
            <Buttons.ButtonB title="Submit" onPress={() => { onClose(); clearCart(); }} color='A' />
            <Buttons.ButtonB title="Manual Print" onPress={handleManualPrint} color='B' />
          </Buttons.ContainerB>
        </View>

        {/* PrintOS Modal */}
        <PrintOS
          visible={printOSVisible}
          onClose={() => setPrintOSVisible(false)}
        />

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
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'black',
    borderColor: '#AD8457',
    borderWidth: SDims.D2px,
    position: 'relative',
  },

  totalRow: {
    width: '100%',
    padding: SDims.D20px,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
  },

  scrollView: {
    flex: 1,
    width: '100%',
  },

  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  itemContainer: {
    width: SDims.Width50p + SDims.Width5p,
    padding: SDims.D20px,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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

  buttonContainer: {
    width: '100%', // Ensure it spans the full width
    alignContent: 'center',
    alignSelf: 'center',
    padding: SDims.D20px,
  },
});

export default CartModal;
