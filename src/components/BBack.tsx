// BBack.tsx
import React from 'react';
import { TouchableOpacity, Image, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const BBack: React.FC = () => {
  const navigation = useNavigation();

  return (
    <View onLayout={(event) => {
      const { width } = event.nativeEvent.layout;
      // Assuming you want the button to take a certain percentage of the header's width
      const imageSize = width * 0.15; // for example, 15% of the container's width
      const imageStyle = {
        width: imageSize,
        height: imageSize, // keeping the image aspect ratio 1:1
      };

      return (
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ margin: 10 }}>
          <Image
            source={{ uri: 'https://placekitten.com/200/100' }}
            style={imageStyle}
            resizeMode="contain"
          />
        </TouchableOpacity>
      );
    }} />
  );
};

export default BBack;
