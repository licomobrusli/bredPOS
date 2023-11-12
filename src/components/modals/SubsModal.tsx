// SubsModal.tsx
import React from 'react';
import { Modal, Image, TouchableOpacity, StyleSheet } from 'react-native';

// Import the image directly
import PRCImage from '../../main/assets/images/STR.jpg';

interface SubsModalProps {
  isVisible: boolean;
  onClose: () => void;
}

const SubsModal: React.FC<SubsModalProps> = ({ isVisible, onClose }) => {
  return (
    <Modal
      visible={isVisible}
      transparent={true}
      onRequestClose={onClose}
    >
      <TouchableOpacity 
        style={styles.container} 
        onPress={onClose}
      >
        <Image
          source={PRCImage}
          style={styles.image}
        />
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'flex-end' 
  },
  image: { 
    marginTop: 120,
    width: 1375, // Fixed width for testing
    height: 1420, // Fixed height for testing
    resizeMode: 'contain' 
  }
});

export default SubsModal;
