// McentralHeaderSection.tsx
import React from 'react';
import { View, Text } from 'react-native';
import BBack from './BBack';

const McentralHeaderSection: React.FC<{ showBBack?: boolean }> = ({ showBBack }) => {
  return (
    <View style={{ height: 50, backgroundColor: '#FFA07A', flexDirection: 'row' }}>
      {showBBack && <BBack />}
      <Text>Header Section</Text>
    </View>
  );
};

export default McentralHeaderSection;
