// ModalFooter.tsx
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import fonts from '../../config/fonts'; // Make sure this path is correct
import SDims from '../../config/dimensions';

interface ModalFooterProps {
  onClose: () => void;
  onAddToCart?: () => void;
}

const ModalFooter: React.FC<ModalFooterProps> = ({ onClose, onAddToCart }) => (
  <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: 'black' }}>
    <TouchableOpacity onPress={onAddToCart} style={{ padding: SDims.Width5p }}>
      <View style={{flexDirection: 'column', borderColor: 'red', borderWidth: 1 }}>
        <Text style={fonts.txtProductCard}>AÑADIR</Text>
        <Text style={fonts.txtProductCard}>AL</Text>
        <Text style={fonts.txtProductCard}>CARRITO</Text>
      </View>
    </TouchableOpacity>
    <TouchableOpacity onPress={onClose} style={{ }}>
      <Text style={fonts.txtProductCard}>CANCELAR</Text>
    </TouchableOpacity>
  </View>
);

export default ModalFooter;
