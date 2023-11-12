// BackButton.tsx
import React from 'react';
import { TouchableOpacity, Image } from 'react-native';
import { useNavigation, useNavigationState } from '@react-navigation/native';

const BackButton: React.FC = () => {
  const navigation = useNavigation();
  const state = useNavigationState(state => state);

  const handlePress = () => {
    navigation.goBack();
  };

  // Check if the current stack length is greater than 1
  const isBackButtonVisible = state.routes.length > 1;

  return (
    isBackButtonVisible && (
      <TouchableOpacity onPress={handlePress}>
        <Image
          source={{ uri: 'https://placekitten.com/40/20' }}
          style={{ width: 400, height: 100 }} // Adjust the size as needed
        />
      </TouchableOpacity>
    )
  );
};

export default BackButton;
