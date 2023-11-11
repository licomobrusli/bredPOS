import React from 'react';
import { View, Text } from 'react-native';

const MbottomSection: React.FC = () => {
  return (
    <View style={{
      height: 400,
      backgroundColor: 'black',
      borderTopWidth: 1, // Width of the top border
      borderTopColor: 'grey', // Color of the top border
    }}>
      <Text>Bottom Section</Text>
    </View>
  );
};

export default MbottomSection;
