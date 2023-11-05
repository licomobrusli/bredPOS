import React from 'react';
import { View } from 'react-native';
import McentralHeaderSection from './McentralHeaderSection';
import MleftSection from './MleftSection';
import MListSection from './MListSection';

const McentralSection: React.FC = () => {
  return (
    <View style={{ flex: 1 }}>
      <McentralHeaderSection />
      <View style={{ flexDirection: 'row', flex: 1 }}>
        <MleftSection />
        {/* MListSection can be used here directly if it does not require dynamic content */}
        <MListSection />
      </View>
    </View>
  );
};

export default McentralSection;
