// CartModal.tsx
import React from 'react';
import { Modal, View, TouchableOpacity, Text } from 'react-native';

interface CartModalProps {
    visible: boolean;
    onClose: () => void;
}

const CartModal: React.FC<CartModalProps> = ({ visible, onClose }) => {
  return (
    <Modal animationType="fade"
        transparent={true}
        visible={visible}
        onRequestClose={onClose}
    >
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'red' // Semi-transparent red
      }}>
        {/* Close Button */}
        <TouchableOpacity onPress={onClose} style={{
          padding: 10,
          backgroundColor: 'white',
          borderRadius: 5,
        }}>
          <Text>Close</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}

export default CartModal;
