//McentralControlsSection.tsx
import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { useRoute } from '@react-navigation/native';
import BackButton from '../content/BackButton';
import HelpButton from '../content/HelpButton';
import SDims from '../config/dimensions';

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
    height: SDims.D200px,
    backgroundColor: 'black',
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: SDims.D5px,
    justifyContent: 'center',
  }
});

export default McentralControls;
