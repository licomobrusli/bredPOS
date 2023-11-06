// McentralSection.tsx
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
        <MListSection />
      </View>
    </View>
  );
};

export default McentralSection;
