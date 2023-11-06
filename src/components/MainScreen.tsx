//MainScreen
import React from 'react';
import { View } from 'react-native';
import MtopSection from './MtopSection';
import McentralSection from './McentralSection';
import MbottomSection from './MbottomSection';

const MainScreen: React.FC = () => {
  return (
    <View style={{ flex: 1 }}>
      <MtopSection />
      <McentralSection />
      <MbottomSection />
    </View>
  );
};

export default MainScreen;
