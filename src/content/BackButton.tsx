// BackButton.tsx
import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { useNavigation, useNavigationState } from '@react-navigation/native';
import customStyles from '../config/fonts'; // Ensure this is the correct path to your styles

const BackButton: React.FC = () => {
  const navigation = useNavigation();
  const state = useNavigationState(state => state);

  const handlePress = () => {
    navigation.goBack();
  };

  const isBackButtonVisible = state.routes.length > 1;

  return (
    isBackButtonVisible && (
      <TouchableOpacity onPress={handlePress}>
        <View>
          <Text style={customStyles.txtProductCard}>IR ATRAS</Text>
        </View>
      </TouchableOpacity>
    )
  );
};

const styles = StyleSheet.create({
  backButton: {
    width: 300, // Adjust the size as needed
    height: 100, // Adjust the size as needed
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 5,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  transparentCard: {
    backgroundColor: 'transparent',
    borderRadius: 5,
  },
});

export default BackButton;
