import React from 'react';
import { TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const BackButton: React.FC = () => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.goBack();
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <Image
        source={{ uri: 'https://placekitten.com/40/20' }}
        style={{ width: 40, height: 20 }} // Adjust the size as needed
      />
    </TouchableOpacity>
  );
};

export default BackButton;
