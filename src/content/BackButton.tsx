import React from 'react';
import { TouchableOpacity, Image } from 'react-native';

const BackButton: React.FC = () => {
  const handlePress = () => {
    console.log('Back button pressed!');
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
