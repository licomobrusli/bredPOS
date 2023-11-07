// CutModal.tsx
import React from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';

interface CutModalProps {
  visible: boolean;
  onClose: () => void;
}

const CutModal: React.FC<CutModalProps> = ({ visible, onClose }) => {
  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={{ marginTop: 22 }}>
        <Text>CutModal</Text>
        <TouchableOpacity
          onPress={onClose}
          style={{ backgroundColor: 'blue', padding: 10 }}
        >
          <Text style={{ color: 'white' }}>Hide Modal</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default CutModal;
