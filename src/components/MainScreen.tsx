// MainScreen.tsx
import React from 'react';
import { View } from 'react-native';
import MtopSection from './MtopSection';
import StackNavigator from '../config/StackNavigator'; // Adjust the import path as necessary
import MbottomSection from './MbottomSection';

const MainScreen: React.FC = () => {
  return (
    <View style={{ flex: 1 }}>
      <MtopSection />
      <StackNavigator />
      <MbottomSection />
    </View>
  );
};

export default MainScreen;
