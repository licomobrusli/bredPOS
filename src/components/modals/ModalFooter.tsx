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
    <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: 'black' }}>
      <TouchableOpacity onPress={handleAddToCart} style={{  }}>
        <View style={{flexDirection: 'column', borderColor: 'red', borderWidth: 1 }}>
          <Text style={fonts.txtProductCard}>AÑADIR</Text>
          <Text style={fonts.txtProductCard}>AL</Text>
          <Text style={fonts.txtProductCard}>CARRITO</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={onClose} style={{ padding: SDims.Width5p }}>
        <Text style={fonts.txtModalCounts}>CANCELAR</Text>
      </TouchableOpacity>

      <Modal visible={isColorModalVisible} transparent={true}>
        <TouchableWithoutFeedback onPress={() => setColorModalVisible(false)}>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'blue' }}>
            <Text style={fonts.txtProductCard}>Debes seleccionar al menos un color</Text>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

export default ModalFooter;
