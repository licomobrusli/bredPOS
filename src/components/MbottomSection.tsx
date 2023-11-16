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
      <Image source={SHP} style={{ width: 250, height: 250 }} />
    </View>
  );
};

export default MbottomSection;
