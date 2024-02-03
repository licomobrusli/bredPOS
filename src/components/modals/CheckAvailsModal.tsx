// CheckAvailsModal.tsx
import React from 'react';
import { Modal, View, Text, StyleSheet, ScrollView } from 'react-native';
import Buttons from '../../config/buttons'; // Ensure the path is correct
import fonts from '../../config/fonts';
import { useCart } from '../../config/CartContext'; // Ensure the path is correct

interface CheckAvailsModalProps {
  visible: boolean;
  onClose: () => void;
}

const CheckAvailsModal: React.FC<CheckAvailsModalProps> = ({ visible, onClose }) => {
    const { cartItems } = useCart();
  
    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={visible}
        onRequestClose={onClose}
      >
        <View style={styles.container}>
          <Text style={[fonts.txtBanner]}>Available Resources</Text>
          <ScrollView>
            {cartItems.map((item, index) => (
              <View key={index} style={styles.itemContainer}>
                {/* Display category and service names, and counter value */}
                <Text style={styles.itemText}>Category: {item.selectedCategory?.name || 'None'}</Text>
                <Text style={styles.itemText}>Service: {item.selectedService?.name || 'None'}</Text>
                <Text style={styles.itemText}>Counter Value: {item.counterValue}</Text>
                {/* Add more details as needed */}
              </View>
            ))}
          </ScrollView>
          <Buttons.ButtonB title="Close" onPress={onClose} color='B' />
        </View>
      </Modal>
    );
  };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white', // Or any other background color you prefer
  },
  itemContainer: {
    marginBottom: 10,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'grey', // Or any other border color you prefer
  },
  itemText: {
    fontSize: 62,
    marginBottom: 5,
  },
  // ...other styles
});

export default CheckAvailsModal;
