// McentralSection.tsx
import React from 'react';
import { View } from 'react-native';
import MlistSection from './MlistSection';
import McentralControlsSection from './McentralControlsSection';

const McentralSection: React.FC = () => {
  return (
    <View style={{ height: 950, backgroundColor: 'black', flexDirection: 'column' }}>
      <MlistSection />
      <McentralControlsSection />
    </View>
  );
};

export default McentralSection;
