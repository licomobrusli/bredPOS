import React from 'react';
import { View } from 'react-native';

interface McentralSectionProps {
  children: JSX.Element;
}

const McentralSection: React.FC<McentralSectionProps> = ({ children }) => {
  return (
    <View style={{ flex: 1, backgroundColor: 'lightgreen' }}>
      {children}
    </View>
  );
};

export default McentralSection;
