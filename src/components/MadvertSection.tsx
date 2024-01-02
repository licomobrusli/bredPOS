// MadvertSection.tsx
import React, { useState } from 'react';
import { View, StyleSheet, ViewStyle, Image, TouchableOpacity } from 'react-native';
import SubsModal from './modals/AdvertModal'; // Adjust the import path as necessary
import SDims from '../config/dimensions';

const Madvert: React.FC<{ style?: ViewStyle }> = ({ style }) => {
  const [isModalVisible, setModalVisible] = useState(false);

  const handlePress = () => {
    setModalVisible(true);
  };

  return (
    <View style={{
      width: SDims.Width80p + SDims.Width5p,
      alignSelf: 'center',
      borderColor: '#AD8457',
      borderWidth: SDims.D2px,
    }}>
      <TouchableOpacity onPress={handlePress}>
        <Image
          source={require('../main/assets/images/SUBS.jpg')}
          style={{
            height: SDims.Height20p,
            alignSelf: 'center',
            resizeMode: 'contain',
          }}
        />
      </TouchableOpacity>

      <SubsModal 
        isVisible={isModalVisible} 
        onClose={() => setModalVisible(false)} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: SDims.D100px * 5,
    backgroundColor: 'black',
    alignSelf: 'center'
  },
  image: {
    height: '80%',
    resizeMode: 'contain',
    borderColor: '#AD8457',
    borderWidth: SDims.D2px,
  },
});

export default Madvert;
