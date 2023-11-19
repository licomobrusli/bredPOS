// MbottomSection.tsx
import React, { useState } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import SHP from './../main/assets/images/SHP.jpg';
import CartModal from '../components/modals/CartModal';

const MbottomSection: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <View style={{
      height: 380,
      backgroundColor: 'black',
      alignItems: 'center',
      justifyContent: 'flex-start',
    }}>
      <TouchableOpacity onPress={toggleModal}>
        <Image source={SHP} style={{ width: 250, height: 250 }} />
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
