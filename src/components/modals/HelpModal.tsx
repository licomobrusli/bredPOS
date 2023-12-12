// HelpModal.tsx
import React from 'react';
import { Modal, Image, TouchableOpacity, StyleSheet } from 'react-native';
import SDims from '../../config/dimensions';

// Import the image directly
import PRCImage from '../../main/assets/images/PRC.jpg';

interface HelpModalProps {
  isVisible: boolean;
  onClose: () => void;
}

const HelpModal: React.FC<HelpModalProps> = ({ isVisible, onClose }) => {
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
    justifyContent: 'center' 
  },
  image: { 
    marginTop: SDims.D100px + SDims.D20px,
    width: SDims.Width100p, // Fixed width for testing
    height: SDims.Height100p, // Fixed height for testing
    resizeMode: 'contain' 
  }
});

export default HelpModal;
