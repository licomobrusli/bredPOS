import React from 'react';
import { View } from 'react-native';
import ServiceList from '../content/ServiceList';
import CategoryList from '../content/CategoryList';

const MlistSection: React.FC = () => {
  return (
    <View style={{ flex: 1, backgroundColor: 'lightgreen' }}>
      <CategoryList />
    </View>
  );
};

export default MlistSection;