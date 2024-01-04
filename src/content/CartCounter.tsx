// CartCounter.tsx
import React from 'react';
import { View, Text } from 'react-native';
import { useCart } from '../config/CartContext';  // Adjust the import path as necessary
import SDims from '../config/dimensions'
import fonts from '../config/fonts';

interface CartCounterProps {
  size: number;  // The size of the counter circle
}

const CartCounter: React.FC<CartCounterProps> = ({ size }) => {
  const { cartItems } = useCart();
  const itemCount = cartItems.length;

  // Don't render the counter if there are no items
  if (itemCount === 0) {
    return null;
  }

  return (
    <View style={{
      position: 'absolute',  // Position over the cart image
      right: SDims.Width40p + (SDims.Width5p * .8),  // Adjust as necessary
      top: 10,    // Adjust as necessary
      width: size,
      height: size,
      borderRadius: size / 2,  // Makes it a circle
      backgroundColor: '#AD8457',
      borderWidth: 10,
      borderColor: 'black',
      alignItems: 'center',
      flexDirection: 'column',
    }}>
      <Text style={[ fonts.txtCard ]}>{itemCount}</Text>
    </View>
  );
};

export default CartCounter;
