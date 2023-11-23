// ModalFooter.tsx
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import fonts from '../../config/fonts'; // Make sure this path is correct

interface ModalFooterProps {
  onClose: () => void;
}

const ModalFooter: React.FC<ModalFooterProps> = ({ onClose }) => (
  <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', backgroundColor: 'black' }}>
    <TouchableOpacity onPress={onClose} style={{ padding: 10, borderWidth: 1, borderColor: 'white', borderRadius: 5 }}>
      <Text style={fonts.txtNavButton}>Cancelar</Text>
    </TouchableOpacity>
    <TouchableOpacity style={{ padding: 10, borderWidth: 1, borderColor: 'white', borderRadius: 5 }}>
      <Text style={fonts.txtNavButton}>Agregar</Text>
    </TouchableOpacity>
  </View>
);

export default ModalFooter;
