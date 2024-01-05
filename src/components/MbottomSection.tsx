// MbottomSection.tsx
import React, { useState } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import SHP from './../main/assets/images/SHP.jpg';
import CartModal from '../components/modals/CartModal';
import SDims from '../config/dimensions';
import CartCounter from '../content/CartCounter';

const MbottomSection: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  console.log("toggleModal function:", toggleModal);

  return (
    <View style={{
      height: SDims.Height10p,
      backgroundColor: 'black',
      alignItems: 'center',
      alignSelf: 'center',
      justifyContent: 'center',
      position: 'absolute',
      bottom: SDims.D60px,
    }}>
      <TouchableOpacity onPress={toggleModal}>
        <Image source={SHP} style={{ width: SDims.D200px + SDims.D20px, height: SDims.D200px }} />
      </TouchableOpacity>
      <CartCounter size={80} onPress={toggleModal} />
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
