// McentralSection.tsx
import React from 'react';
import { View } from 'react-native';
import MlistSection from './MlistSection';
import McentralControlsSection from './McentralControlsSection';
import MadvertSection from './MadvertSection';
import SDims from '../config/dimensions';

const McentralSection: React.FC = () => {
  return (
    <View style={{ height: SDims.HeightCentralSection, backgroundColor: 'black', flexDirection: 'column' }}>
      <View style={{ height: SDims.HeightCentralSection * .5 }}>
        <MlistSection />
      </View>
      <View style={{  height: SDims.HeightCentralSection * .25 }}>
        <McentralControlsSection />
      </View>
      <View style={{ height: SDims.HeightCentralSection * .25 }}>
        <MadvertSection />
      </View>
    </View>
  );
};

export default McentralSection;
