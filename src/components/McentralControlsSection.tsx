import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { useRoute } from '@react-navigation/native';
import BackButton from '../content/BackButton';
import HelpButton from '../content/HelpButton';

const McentralControls: React.FC<{ style?: ViewStyle }> = ({ style }) => {
  const route = useRoute();

  return (
    <View style={[styles.container, style]}>
      {route.name === 'CategoryScreen' ? <HelpButton /> : <BackButton />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 200,
    backgroundColor: 'black',
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 5,
    justifyContent: 'center',
  }
});

export default McentralControls;
