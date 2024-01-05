// CartCounter.tsx
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useCart } from '../config/CartContext';
import SDims from '../config/dimensions';
import fonts from '../config/fonts';

interface CartCounterProps {
  size: number;
  onPress: () => void;
}

const CartCounter: React.FC<CartCounterProps> = ({ size, onPress }) => {
  const { cartItems } = useCart();
  const itemCount = cartItems.length;

  if (itemCount === 0) {
    return null;
  }

  return (
    <View style={{
      position: 'absolute',
      top: - SDims.D5px,
      right: SDims.D20px,
      width: size,
      height: size,
      borderRadius: size / 2,
      backgroundColor: '#AD8457',
      borderWidth: 10,
      borderColor: 'black',
      alignItems: 'center',
      flexDirection: 'column',
    }}>
      <TouchableOpacity onPress={onPress} style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
        <Text style={[fonts.txtCard]}>{itemCount}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CartCounter;
