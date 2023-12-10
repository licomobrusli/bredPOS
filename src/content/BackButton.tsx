// BackButton.tsx
import React from 'react';
import { useNavigation, useNavigationState } from '@react-navigation/native';
import Buttons from '../config/buttons';

const BackButton: React.FC = () => {
  const navigation = useNavigation();
  const state = useNavigationState(state => state);
  const isBackButtonVisible = state.routes.length > 1;

  const handlePress = () => {
    navigation.goBack();
  };

  return (
    isBackButtonVisible && (
      <Buttons.ButtonB title="Ir atras" onPress={handlePress} color="B" />
    )
  );
};

export default BackButton;
