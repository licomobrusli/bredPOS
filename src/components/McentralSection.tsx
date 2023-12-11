// McentralSection.tsx
import React from 'react';
import { View } from 'react-native';
import MlistSection from './MlistSection';
import McentralControlsSection from './McentralControlsSection';
import MadvertSection from './MadvertSection';
import SDims from '../config/dimensions';

const McentralSection: React.FC<{ navigation: any }> = ({ navigation }) => {
  return (
    <View style={{ 
      height: SDims.HeightCentralSection,
      alignSelf: 'center',
      alignContent: 'center',
      backgroundColor: 'black',
      flexDirection: 'column' }}>
      <View style={{ height: SDims.HeightCentralSection * .5 }}>
        <MlistSection navigation={navigation} />
      </View>
      <View style={{ height: SDims.HeightCentralSection * .25, backgroundColor: 'black' }}>
        <MadvertSection />
      </View>
      <View style={{  height: SDims.HeightCentralSection * .25, backgroundColor: 'black' }}>
        <McentralControlsSection />
      </View>
    </View>
  );
};

export default McentralSection;
