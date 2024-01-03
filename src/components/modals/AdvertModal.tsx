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
    width: SDims.Width80p + SDims.Width5p, 
    marginBottom: SDims.Height20p + SDims.Width5p,
    resizeMode: 'contain',
    borderColor: '#AD8457',
    borderWidth: SDims.D2px,
    padding: SDims.D200px + SDims.D60px,
  }
});

export default AdvertModal;
