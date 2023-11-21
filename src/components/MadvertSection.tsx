// MadvertSection.tsx
import React, { useState } from 'react';
import { View, StyleSheet, ViewStyle, Image, TouchableOpacity } from 'react-native';
import SubsModal from './modals/AdvertModal'; // Adjust the import path as necessary

const Madvert: React.FC<{ style?: ViewStyle }> = ({ style }) => {
  const [isModalVisible, setModalVisible] = useState(false);

  const handlePress = () => {
    setModalVisible(true);
  };

  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity onPress={handlePress}>
        <Image
          source={require('../main/assets/images/SUBS.jpg')}
          style={styles.image}
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
    height: 500,
    backgroundColor: 'black',
    alignSelf: 'center'
  },
  image: {
    height: '80%',
    resizeMode: 'contain',
    borderColor: 'white',
    borderWidth: 1,
  },
});

export default Madvert;
