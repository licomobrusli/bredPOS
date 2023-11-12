// ModalFooter.tsx
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../../config/styles'; // Make sure this path is correct

interface ModalFooterProps {
  onClose: () => void;
}

const ModalFooter: React.FC<ModalFooterProps> = ({ onClose }) => (
  <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', backgroundColor: 'black' }}>
    <TouchableOpacity onPress={onClose} style={{ padding: 10, borderWidth: 1, borderColor: 'black', borderRadius: 5 }}>
      <Text style={styles.txtSubBrandBanner}>Cancelar</Text>
    </TouchableOpacity>
    <TouchableOpacity style={{ padding: 10, borderWidth: 1, borderColor: 'black', borderRadius: 5 }}>
      <Text style={styles.txtSubBrandBanner}>Agregar</Text>
    </TouchableOpacity>
  </View>
);

export default ModalFooter;
