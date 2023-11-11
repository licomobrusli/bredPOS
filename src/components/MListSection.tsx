// MlistSection.tsx
import React from 'react';
import { View } from 'react-native';
import { useRoute } from '@react-navigation/native';
import ServiceList from '../content/ServiceList';
import CategoryList from '../content/CategoryList';

const MlistSection: React.FC = () => {
  const route = useRoute();

  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      {route.name === 'CategoryScreen' ? <CategoryList /> : <ServiceList />}
    </View>
  );
};


export default MlistSection;
