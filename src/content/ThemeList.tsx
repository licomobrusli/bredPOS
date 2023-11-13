// ThemeList.tsx
import React from 'react';
import { Image, View } from 'react-native';

const ThemeList = () => {
  return (
    <View>
      <Image source={{ uri: "https://placekitten.com/200/200" }} style={{ width: 200, height: 200 }} />
      <Image source={{ uri: "https://placekitten.com/200/200" }} style={{ width: 200, height: 200 }} />
    </View>
  );
};

export default ThemeList;
