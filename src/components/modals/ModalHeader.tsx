// ModalControls.tsx
import React from 'react';
import { View, Text } from 'react-native';
import styles from '../../config/styles'; // Make sure this path is correct

const ModalControls = () => (
  <View style={{ flex: 1, backgroundColor: 'black', justifyContent: 'center', alignItems: 'center' }}>
    <Text style={styles.txtNavButton}>AÑADIR AL CARRITO</Text>
  </View>
);

export default ModalControls;
