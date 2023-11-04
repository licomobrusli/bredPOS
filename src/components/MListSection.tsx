//MListSection.tsx
import React from 'react';
import { View } from 'react-native';

interface McentralSectionProps {
  listChildren: JSX.Element;
}

const McentralSection: React.FC<McentralSectionProps> = ({ listChildren }) => {
  return (
    <View style={{ flex: 1, backgroundColor: 'lightgreen' }}>
      {listChildren}
    </View>
  );
};

export default McentralSection;
