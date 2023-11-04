// McentralHeaderSection.tsx
import React from 'react';
import { View, Text, Image } from 'react-native';

const McentralHeaderSection: React.FC = () => {
  return (
    <View style={{ height: 60, backgroundColor: 'lightsalmon', flexDirection: 'row' }}>
      <Image
        source={{ uri: 'https://placekitten.com/20/10' }}
        style={{ width: 20, height: 10 }}
      />
      <Text>Header Section</Text>
    </View>
  );
};

export default McentralHeaderSection;
