// MTopSection.tsx
import React from 'react';
import { View, Image } from 'react-native';
import { BANImage } from '../main/assets/images';
import SDims from '../config/dimensions';

const MtopSection: React.FC = () => {
  return (
    <View style={{
      height: SDims.HeightTopSection,
      backgroundColor: 'black',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row' }}>
      <Image source={BANImage} style={{ width: SDims.Width80p, height: '100%', resizeMode: 'contain' }} />
    </View>
  );
};

export default MtopSection;
