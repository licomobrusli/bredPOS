import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

interface ModalFooterProps {
  onClose: () => void;
}

const ModalFooter: React.FC<ModalFooterProps> = ({ onClose }) => (
  <View style={{ backgroundColor: 'lightpink', padding: 10, alignItems: 'center' }}>
    <TouchableOpacity
      onPress={onClose}
      style={{
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5,
        padding: 10
      }}
    >
      <Text>Ir atrás</Text>
    </TouchableOpacity>
  </View>
);

export default ModalFooter;
