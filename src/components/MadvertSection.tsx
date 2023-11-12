// MadvertSection.tsx
import React from 'react';
import { View, StyleSheet, ViewStyle, Image, TouchableOpacity } from 'react-native';

const Madvert: React.FC<{ style?: ViewStyle }> = ({ style }) => {
  const handlePress = () => {
    console.log('Image Clicked');
  };

  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity onPress={handlePress}>
        <Image
          source={require('../main/assets/images/SUBS.jpg')}
          style={styles.image}
        />
      </TouchableOpacity>
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
    height: '100%',
    resizeMode: 'contain',
    borderColor: 'white',
    borderWidth: 1,
  },
});

export default Madvert;
