// ModalFooter.tsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, TouchableWithoutFeedback } from 'react-native';
import fonts from '../../config/fonts'; // Make sure this path is correct
import SDims from '../../config/dimensions';

interface ModalFooterProps {
  onClose: () => void;
  onAddToCart?: () => void;
  modalCountsDetails: any[];
  selectedColors: string[];
}

const ModalFooter: React.FC<ModalFooterProps> = ({ onClose, onAddToCart, modalCountsDetails, selectedColors }) => {
  console.log("ModalFooter rendering", { modalCountsDetails });
  const [isColorModalVisible, setColorModalVisible] = useState(false);
  const handleAddToCart = () => {
    if (modalCountsDetails.length > 0) {
      const firstDetail = modalCountsDetails[0];
  
      // Log the details
      console.log('Detail Sub:', firstDetail.sub);
      console.log('Selected Colors:', selectedColors);
  
      // If 'sub' is greater than 0 and no colors are selected, show the color modal
      if (firstDetail.sub === 2 && selectedColors.length === 0) {
        setColorModalVisible(true);
      } else {
        // If 'sub' is not greater than 0 or colors are selected, add to cart and close the modal
        onAddToCart && onAddToCart();
        onClose(); // Close the modal after adding to cart
      }
    }
  };        
      
  return (
    <View style={{ 
      width: SDims.Width50p + SDims.Width5p,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      alignSelf: 'center',
      backgroundColor: 'black'
    }}>
      <TouchableOpacity onPress={onClose} style={{}}>
        <View style={{ 
          flexDirection: 'column', 
          borderColor: '#AD8457', 
          borderWidth: 1, 
          borderRadius: 10, 
          height: SDims.Height10p,
          width: SDims.Height10p + SDims.Width5p,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <Text style={fonts.txtButtonA}>CANCELAR</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleAddToCart} style={{}}>
        <View style={{ 
          flexDirection: 'column',
          backgroundColor: '#AD8457', 
          borderColor: '#AD8457', 
          borderWidth: 1, 
          borderRadius: 10, 
          height: SDims.Height10p,
          width: SDims.Height10p + SDims.Width5p,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <Text style={fonts.txtButtonA}>AÑADIR</Text>
          <Text style={fonts.txtButtonA}>AL</Text>
          <Text style={fonts.txtButtonA}>CARRITO</Text>
        </View>
      </TouchableOpacity>
      <Modal visible={isColorModalVisible} transparent={true}>
        {/* Modal implementation remains the same */}
      </Modal>
    </View>
  );
};

export default ModalFooter;
