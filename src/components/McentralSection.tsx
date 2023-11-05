// McentralSection.tsx

import React from 'react';
import { View } from 'react-native';
import McentralHeaderSection from './McentralHeaderSection';
import MleftSection from './MleftSection';
import MListSection from './MListSection';
import BackButton from '../screens/BackButton';
import HeaderImage from '../screens/HeaderImage';

interface McentralSectionProps {
  children: JSX.Element;
}

const McentralSection: React.FC<McentralSectionProps> = ({ children }) => {
  return (
    <View style={{ flex: 1 }}>
      <McentralHeaderSection>
      <HeaderImage />
      <BackButton />
      </McentralHeaderSection>
      <View style={{ flexDirection: 'row', flex: 1 }}>
        <MleftSection />
        <MListSection>{children}</MListSection>
      </View>
    </View>
  );
};

export default McentralSection;