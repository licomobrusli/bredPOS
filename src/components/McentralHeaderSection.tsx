import React from 'react';
import { View } from 'react-native';
import BackButton from '../screens/BackButton';
import HeaderImage from '../screens/HeaderImage';

const McentralHeader: React.FC = () => {
  return (
    <View
      style={{
        height: 60,
        backgroundColor: 'lightsalmon',
        flexDirection: 'row',
        alignItems: 'flex-end',
        padding: 5,
        justifyContent: 'space-between', // Assuming you want them on opposite ends
      }}>
      <HeaderImage />
      <BackButton />
    </View>
  );
};

export default McentralHeader;
