// ModalHeader.tsx
import React from 'react';
import { View, Text } from 'react-native';
import styles from '../../config/styles'; // Make sure this path is correct

const ModalHeader = () => (
  <View style={{ flex: 1, backgroundColor: 'black', justifyContent: 'center', alignItems: 'center' }}>
    <Text style={styles.txtNavButton}>AÑADIR AL CARRITO</Text>
  </View>
);

export default ModalHeader;
