import React from 'react';
import { View } from 'react-native';
import MtopSection from './MtopSection';
import MleftSection from './MleftSection';
import McentralSection from './McentralSection';
import MbottomSection from './MbottomSection';

interface MainScreenProps {
  MainContent: JSX.Element;
  // ... other props as necessary
}

const MainScreen: React.FC<MainScreenProps> = ({ MainContent }) => {
  return (
    <View style={{ flex: 1 }}>
      <MtopSection />
      <View style={{ flexDirection: 'row', flex: 1 }}>
        <MleftSection />
        <McentralSection>
          {MainContent}
        </McentralSection>
      </View>
      <MbottomSection />
    </View>
  );
};

export default MainScreen;
