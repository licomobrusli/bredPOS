// MainScreen.tsx
import React from 'react';
import { View } from 'react-native';
import MtopSection from './MtopSection';
import McentralSection from './McentralSection';
import MbottomSection from './MbottomSection';

interface MainScreenProps {
  MainContent: JSX.Element;
}

const MainScreen: React.FC<MainScreenProps> = ({ MainContent }) => {
  return (
    <View style={{ flex: 1 }}>
      <MtopSection />
      <McentralSection>{MainContent}</McentralSection>
      <MbottomSection />
    </View>
  );
};

export default MainScreen;
