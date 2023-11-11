// McentralSection.tsx
import React from 'react';
import { View } from 'react-native';
import McentralHeaderSection from './McentralHeaderSection';
import MleftSection from './MleftSection';
import MlistSection from './MlistSection';

const McentralSection: React.FC = () => {
  return (
    <View style={{
        flex: 1,
        backgroundColor: 'black',
        }}>
      <View style={{ flexDirection: 'row', flex: 1 }}>
        <MlistSection />
      </View>
    </View>
  );
};

export default McentralSection;
