// MbottomSection.tsx
import React, { useState } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import SHP from './../main/assets/images/SHP.jpg';
import CartModal from '../components/modals/CartModal';
import SDims from '../config/dimensions';
import CartCounter from '../content/CartCounter';  // Import the new component

const MbottomSection: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <View style={{
      height: SDims.Height10p,
      backgroundColor: 'black',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',  // Needed for absolute positioning of CartCounter
    }}>
      <TouchableOpacity onPress={toggleModal}>
        <Image source={SHP} style={{ width: SDims.D200px + SDims.D20px, height: SDims.D200px }} />
      </TouchableOpacity>
      <CartCounter size={95} />
      {modalVisible && (
        <CartModal 
          visible={modalVisible} 
          onClose={toggleModal} 
        />
      )}
    </View>
  );
};

export default MbottomSection;
