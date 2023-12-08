// ModalFooter.tsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, TouchableWithoutFeedback } from 'react-native';
import fonts from '../../config/fonts'; // Make sure this path is correct
import SDims from '../../config/dimensions';

interface ModalFooterProps {
  onClose: () => void;
  onAddToCart?: () => void;
  sub: number;
  color: string[];
}

const ModalFooter: React.FC<ModalFooterProps> = ({ onClose, onAddToCart, sub, color }) => {
  const [isColorModalVisible, setColorModalVisible] = useState(false);

  const handleAddToCart = () => {
    if (sub === 2 && color.length < 1) {
      setColorModalVisible(true);
    } else {
      if (onAddToCart) {
        onAddToCart();
      }
    }
  };

  return (
    <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: 'black' }}>
      <TouchableOpacity onPress={handleAddToCart} style={{  }}>
        <View style={{flexDirection: 'column', borderColor: 'red', borderWidth: 1 }}>
          <Text style={fonts.txtProductCard}>AÑADIR</Text>
          <Text style={fonts.txtProductCard}>AL</Text>
          <Text style={fonts.txtProductCard}>CARRITO</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={onClose} style={{ padding: SDims.Width5p }}>
        <Text style={fonts.txtModalCounts}>CANCELAR</Text>
      </TouchableOpacity>

      <Modal visible={isColorModalVisible} transparent={true}>
        <TouchableWithoutFeedback onPress={() => setColorModalVisible(false)}>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <Text style={fonts.txtProductCard}>Debes seleccionar al menos un color</Text>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

export default ModalFooter;
