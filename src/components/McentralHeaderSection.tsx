// McentralHeaderSection.tsx
import React, { useState } from 'react';
import { View, Image, TouchableOpacity, LayoutChangeEvent } from 'react-native';

const McentralHeaderSection: React.FC = () => {
  const [padding, setPadding] = useState<number>(0);

  const onLayout = (event: LayoutChangeEvent) => {
    const { height } = event.nativeEvent.layout;
    setPadding(height / 12);
  };

  return (
    <View
      onLayout={onLayout}
      style={{
        height: 60,
        backgroundColor: 'lightsalmon',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: padding,
        alignItems: 'center'
      }}>
      <Image
        source={{ uri: 'https://placekitten.com/320/50' }}
        style={{ width: 320, height: 50 }} // Adjust the size as needed
      />
      <TouchableOpacity style={{ alignSelf: 'flex-end' }}>
        <Image
          source={{ uri: 'https://placekitten.com/40/20' }}
          style={{ width: 40, height: 20 }} // Adjust the size as needed
        />
      </TouchableOpacity>
    </View>
  );
};

export default McentralHeaderSection;