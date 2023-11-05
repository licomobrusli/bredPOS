import React from 'react';
import { View, Image } from 'react-native';

const HeaderImage: React.FC = () => {
  return (
    <View style={{ flex: 1, alignItems: 'flex-start' }}>
      <Image
        source={{ uri: 'https://placekitten.com/320/50' }}
        style={{ width: 320, height: 50 }} // Adjust the size as needed
      />
    </View>
  );
};

export default HeaderImage;
