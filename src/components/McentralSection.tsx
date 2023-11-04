// McentralSection.tsx
import React from 'react';
import { View } from 'react-native';
import McentralHeaderSection from './McentralHeaderSection';
import MleftSection from './MleftSection';
import MListSection from './MListSection';

interface McentralSectionProps {
  //headerChildren?: JSX.Element;
  //leftChildren?: JSX.Element;
  listChildren: JSX.Element;
}

const McentralSection: React.FC<McentralSectionProps> = ({
  //headerChildren,
  //leftChildren,
  listChildren,
}) => {
  return (
    <View style={{ flex: 1 }}>
      <McentralHeaderSection/>
      <View style={{ flexDirection: 'row', flex: 1 }}>
        <MleftSection/>
        <MListSection>{listChildren}</MListSection>
      </View>
    </View>
  );
};

export default McentralSection;
