// CartCounter.tsx
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';  // Import TouchableOpacity
import { useCart } from '../config/CartContext';
import SDims from '../config/dimensions';
import fonts from '../config/fonts';

interface CartCounterProps {
  size: number;
  onPress: () => void;  // Add onPress prop
}

const CartCounter: React.FC<CartCounterProps> = ({ size, onPress }) => {
  const { cartItems } = useCart();
  const itemCount = cartItems.length;

  if (itemCount === 0) {
    return null;
  }

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={{
        position: 'absolute',
        top: -175,
        left: -10,
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: '#AD8457',
        borderWidth: 10,
        borderColor: 'black',
        alignItems: 'center',
        flexDirection: 'column',
      }}>
        <Text style={[fonts.txtCard]}>{itemCount}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default CartCounter;
