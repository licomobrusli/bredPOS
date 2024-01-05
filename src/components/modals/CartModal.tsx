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
import SubmitButton from '../../content/SubmitButton';
import { createOrder, createOrderItem } from '../../config/apiCalls'; // Update with the correct path

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

  const handleSubmitOrder = async () => {
    try {
      // Calculate total item count and price
      const orderPrice = calculateTotalPrice();
  
      // Create order data
      const orderData = {
        item_count: cartItems.length,
        order_price: orderPrice,
      };
  
      // Call the API to create a new order and retrieve the new order ID
      const orderResponse = await createOrder(orderData);
      const newOrderID = orderResponse.id; // Now you have the new order ID to use
  
      cartItems.forEach(async (item) => {
        item.modalCountsDetails.forEach(async (detail) => {
          if (detail.name !== "Sub total") {
            // Remove the currency symbol and parse the price and unit price as floats.
            const price = parseFloat(detail.price.replace('€', ''));
            const unitPrice = parseFloat(detail.unitPrice.toString().replace('€', ''));
  
            // Calculate the item_count. If the unit price is zero or not a number, handle it gracefully.
            let itemCount = unitPrice ? price / unitPrice : 0;
  
            // Create order item data
            const orderItemData = {
              order: newOrderID,
              item_name: detail.name,
              unit_price: unitPrice,
              item_count: itemCount,
              item_price: price,
            };
  
            await createOrderItem(orderItemData); // Create an order item
          }
        });
      });
  
      clearCart(); // Clear the cart after order is created
      onClose(); // Close the modal
    } catch (error) {
      console.error('Error creating new order', error);
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
    setPrintOSVisible(true);
  };

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    cartItems.forEach(item => {
      item.modalCountsDetails.forEach((detail) => {
        if (detail.name === "Sub total") {
          const price = parseFloat(detail.price.split('€')[0]);
          totalPrice += isNaN(price) ? 0 : price;
        }
      });
    });
    return Math.round(totalPrice); // Return the total price formatted rounded to whole numbers
  };


  useEffect(() => {
    if (visible) { 
      // console log of modalCount.code, Unit Price, counter value or count of number of colors from detail field, and subtotal price
      cartItems.forEach((item) => {
        item.modalCountsDetails.forEach((detail) => {
          if (detail.name !== "Sub total") {
            // Remove the currency symbol and parse the price and unit price as floats.
            const price = parseFloat(detail.price.replace('€', ''));
            const unitPrice = parseFloat(detail.unitPrice.toString().replace('€', ''));
            
            // Calculate the item_count. If the unit price is zero or not a number, handle it gracefully.
            let itemCount = unitPrice ? price / unitPrice : 0;
      
            console.log(`item_name: ${detail.name}, unit_price: ${unitPrice}€, item_count: ${itemCount}, item_price: ${price}€`);
          }
        });

        // Destructuring for easier access to properties
        const { selectedCategory, modalCountsDetails, counterValue, selectedColors } = item;
        const firstModalCount = modalCountsDetails[0];
        const subtotalModalCount = modalCountsDetails[modalCountsDetails.length - 1];
        
        // Determine what to put in the details column based on the logic field
        let details;
        switch (firstModalCount.sub) {
          case 0:
            details = null; // sub = 0, details is null
            break;
          case 1:
            details = counterValue; // sub = 1, details is the counter value
            break;
          case 2:
            details = selectedColors.length > 0 ? selectedColors.join(", ") : "No Colors"; // sub = 2, details are the selected colors
            break;
          default:
            details = "Undefined"; // Fallback for unexpected sub values
        }
      });
    }
  }, [visible, cartItems]);

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={{ 
          marginTop: SDims.Height5p,
          flexDirection: 'row',
       }}>
          <View style={{ 
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: SDims.Width40p,
           }}>
            <Text style={fonts.txtCard}>TOTAL </Text>
            <Text style={fonts.txtCard}>--- </Text>
          </View>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            width: SDims.Width10p + SDims.Width5p,
          }}>
            <Text style={fonts.txtCard}>{calculateTotalPrice()}€</Text>
          </View>
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
                      <View key={detailIndex} style={{ justifyContent: 'flex-end' }}>
                    <Text key={detailIndex} style={fonts.txtButtonA}>
                        {calculatedPrices[detail.name] ? `${calculatedPrices[detail.name].totalPrice}€` : detail.price}
                    </Text>
                    </View>
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
            <SubmitButton onClose={onClose} onPress={handleSubmitOrder} clearCart={clearCart} color='A' />
            <Buttons.ButtonB title="Manual Print" onPress={handleManualPrint} color='B' />
          </Buttons.ContainerB>
        </View>

        {/* PrintOS Modal */}
        <PrintOS
          visible={printOSVisible}
          onClose={() => setPrintOSVisible(false)}
          cartItems={cartItems}
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
    width: SDims.Width50p + SDims.Width5p,
    padding: SDims.D20px,
    flexDirection: 'row',
    backgroundColor: 'black',
    top: SDims.Height5p,
  },

  scrollView: {
    width: SDims.Width60p,
    alignSelf: 'center',
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  itemContainer: {
    padding: SDims.D20px,
    justifyContent: 'space-between',
    flexDirection: 'row',
    backgroundColor: 'black',
  },

rowContainer: {
    width: SDims.Width30p + SDims.Width5p,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  buttonAContainer: {
    width: SDims.Width20p,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },

  buttonContainer: {
    width: '100%', // Ensure it spans the full width
    alignContent: 'center',
    alignSelf: 'center',
    bottom: SDims.Height5p,
  },
});

export default CartModal;
