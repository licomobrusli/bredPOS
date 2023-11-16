// MbottomSection.tsx
import React from 'react';
import { View, Text, Image } from 'react-native';
import SHP from './../main/assets/images/SHP.jpg';

const MbottomSection: React.FC = () => {
  return (
    <View style={{
      height: 380,
      backgroundColor: 'black',
      alignItems: 'center',
      justifyContent: 'flex-start',
    }}>
      <Image source={SHP} style={{ width: 300, height: 300 }} />
    </View>
  );
};

export default MbottomSection;
