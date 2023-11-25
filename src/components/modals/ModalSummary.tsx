// ModalSummary.tsx
import React from 'react';
import { View, Text } from 'react-native';
import fonts from '../../config/fonts';

interface ModalSummaryProps {
  andItemPrice: number;
  orItemPrice: number;
  selectedColors: string[];
}

const ModalSummary: React.FC<ModalSummaryProps> = ({ andItemPrice, orItemPrice, selectedColors }) => {
  const totalOrPrice = selectedColors.length > 1 
    ? (selectedColors.length - 1) * orItemPrice 
    : 0;
  const totalPrice = andItemPrice + totalOrPrice;

  return (
    <View style={{ flex: 1, backgroundColor: 'black', justifyContent: 'center', alignItems: 'center' }}>
      <Text style={fonts.txtNavButton}>Total Price: {totalPrice}€</Text>
    </View>
  );
};

export default ModalSummary;
