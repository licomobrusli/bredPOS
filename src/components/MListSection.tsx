// MlistSection.tsx
import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { useRoute } from '@react-navigation/native';
import ServiceList from '../content/ServiceList';
import CategoryList from '../content/CategoryList';

const MlistSection: React.FC<{ style?: ViewStyle }> = ({ style }) => {
  const route = useRoute();

  return (
    <View style={[styles.container, style]}>
      {route.name === 'CategoryScreen' ? <CategoryList /> : <ServiceList />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'black' }
});

export default MlistSection;
