// ModalFooter.tsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, TouchableWithoutFeedback } from 'react-native';
import fonts from '../../config/fonts'; // Make sure this path is correct
import SDims from '../../config/dimensions';
import Buttons from '../../config/buttons';

interface ModalFooterProps {
  onClose: () => void;
  onAddToCart?: () => void;
  modalCountsDetails: any[];
  selectedColors: string[];
  counterValue: number;
  navigation: any;
}

const ModalFooter: React.FC<ModalFooterProps> = (props) => {
  const { onClose, onAddToCart, modalCountsDetails, selectedColors, navigation } = props;
  const [isColorModalVisible, setColorModalVisible] = useState(false);
  const handleAddToCart = () => {
    if (modalCountsDetails.length > 0) {
      const firstDetail = modalCountsDetails[0];
  
      // If 'sub' is greater than 0 and no colors are selected, show the color modal
      if (firstDetail.sub === 2 && selectedColors.length === 0) {
        setColorModalVisible(true);
      } else {
        // If 'sub' is not greater than 0 or colors are selected, add to cart and close the modal
        onAddToCart && onAddToCart();
        onClose(); // Close the modal after adding to cart
        navigation.navigate('CategoryScreen');
      }
    }
  };        
      
    return (
      <Buttons.ContainerB>
        <Buttons.ButtonB title="Cancelar" onPress={onClose} color='B' />
        <Buttons.ButtonB title="Añadir al carrito" onPress={handleAddToCart} color='A' />
        <Modal visible={isColorModalVisible} transparent={true}>
        <TouchableWithoutFeedback onPress={() => setColorModalVisible(false)}>
          <View style={{ marginTop: SDims.Height49p,
            alignSelf: 'center',
            height: SDims.HeightCentralSection * .7,
            width: SDims.Width90p,
            backgroundColor: 'black',
            borderColor: '#AD8457',
            borderWidth: SDims.D2px,
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <Text style={fonts.txtCard}>Debes seleccionar al menos un color</Text>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </Buttons.ContainerB>
  );
};

export default ModalFooter;
