// MlistSection.tsx
import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { useRoute } from '@react-navigation/native';
import ServiceList from '../content/ServiceList';
import CategoryList from '../content/CategoryList';

const MlistSection: React.FC<{ navigation: any; style?: ViewStyle }> = ({ navigation, style }) => {
  const route = useRoute();

  return (
    <View style={[styles.container, style]}>
      {route.name === 'CategoryScreen' ? <CategoryList /> : <ServiceList navigation={navigation} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black' }
});

export default MlistSection;
