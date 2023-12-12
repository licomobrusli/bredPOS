// AdvertModal.tsx
import React from 'react';
import { Modal, Image, TouchableOpacity, StyleSheet } from 'react-native';
import SDims from '../../config/dimensions';

// Import the image directly
import PRCImage from '../../main/assets/images/STR.jpg';

interface AdvertModalProps {
  isVisible: boolean;
  onClose: () => void;
}

const AdvertModal: React.FC<AdvertModalProps> = ({ isVisible, onClose }) => {
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
    marginTop: SDims.D100px + SDims.D20px,
    width: SDims.Width90p, 
    height: SDims.Width100p,
    resizeMode: 'contain' 
  }
});

export default AdvertModal;
