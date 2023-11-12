// ModalHeader.tsx
import React from 'react';
import { View, Text } from 'react-native';
import styles from '../../config/styles'; // Make sure this path is correct

const ModalHeader = () => (
  <View style={{ flex: 1, backgroundColor: 'lightblue', justifyContent: 'center', alignItems: 'center' }}>
    <Text style={styles.txtSubBrandBanner}>Agregar servicio al carrito</Text>
  </View>
);

export default ModalHeader;
