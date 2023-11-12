// McentralSection.tsx
import React from 'react';
import { View } from 'react-native';
import MlistSection from './MlistSection';
import McentralControlsSection from './McentralControlsSection';
import MadvertSection from './MadvertSection';

const McentralSection: React.FC = () => {
  return (
    <View style={{ height: 1500, backgroundColor: 'black', flexDirection: 'column' }}>
      <MlistSection />
      <McentralControlsSection />
      <MadvertSection />
    </View>
  );
};

export default McentralSection;
