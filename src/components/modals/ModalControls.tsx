// ModalControls.tsx
import React from 'react';
import { View, Text } from 'react-native';
import fonts from '../../config/fonts';

const ModalControls = () => (
  <View style={{ flex: 1, backgroundColor: 'black', justifyContent: 'center', alignItems: 'center' }}>
    <Text style={fonts.txtNavButton}>AÑADIR AL CARRITO</Text>
  </View>
);

export default ModalControls;
