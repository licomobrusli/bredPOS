// MbottomSection.tsx
import React, { useState } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import SHP from './../main/assets/images/SHP.jpg';
import CartModal from '../components/modals/CartModal';
import SDims from '../config/dimensions';

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
      justifyContent: 'center'
    }}>
      <TouchableOpacity onPress={toggleModal}>
        <Image source={SHP} style={{ width: 200, height: 200 }} />
      </TouchableOpacity>
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
