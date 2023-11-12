// ModalTheme.tsx
import React from 'react';
import { View, Image } from 'react-native';

interface ModalThemeProps {
  categoryImage: string;
  serviceImage: string;
}

const ModalTheme: React.FC<ModalThemeProps> = ({ categoryImage, serviceImage }) => (
  <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
    <Image source={{ uri: "https://placekitten.com/200/200" }} style={{ width: '45%', height: '100%' }} />
    <Image source={{ uri: "https://placekitten.com/200/200" }} style={{ width: '45%', height: '100%' }} />
  </View>
);

export default ModalTheme;
