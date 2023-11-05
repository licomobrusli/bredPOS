import React from 'react';
import { View } from 'react-native';

interface MlistSectionProps {
  children: JSX.Element;
}

const MlistSection: React.FC<MlistSectionProps> = ({ children }) => {
  return (
    <View style={{ flex: 1, backgroundColor: 'lightgreen' }}>
      {children}
    </View>
  );
};

export default MlistSection;
