// McentralSection.tsx
import React from 'react';
import { View } from 'react-native';
import MlistSection from './MlistSection';
import McentralControlsSection from './McentralControlsSection';
import MadvertSection from './MadvertSection';
import SDims from '../config/dimensions';

const McentralSection: React.FC = () => {
  return (
    <View style={{ height: SDims.Height70p, backgroundColor: 'black', flexDirection: 'column' }}>
      <MlistSection />
      <McentralControlsSection />
      <MadvertSection />
    </View>
  );
};

export default McentralSection;
