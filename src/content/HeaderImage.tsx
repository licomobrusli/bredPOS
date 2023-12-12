import React from 'react';
import { View, Image } from 'react-native';
import SDims from '../config/dimensions';

const HeaderImage: React.FC = () => {
  return (
    <View style={{ flex: 1, alignItems: 'flex-start' }}>
      <Image
        source={{ uri: 'https://placekitten.com/320/50' }}
        style={{ width: SDims.Height1_8f, height: SDims.D50px }} // Adjust the size as needed
      />
    </View>
  );
};

export default HeaderImage;
