// McentralHeaderSection.tsx
import React from 'react';
import { View } from 'react-native';
import BackButton from '../content/BackButton';
import HeaderImage from '../content/HeaderImage';

const McentralHeader: React.FC = () => {
  return (
    <View
      style={{
        height: 60,
        backgroundColor: 'lightsalmon',
        flexDirection: 'row',
        alignItems: 'flex-end',
        padding: 5,
        justifyContent: 'space-between',
      }}>
      <HeaderImage />
      <BackButton />
    </View>
  );
};

export default McentralHeader;
