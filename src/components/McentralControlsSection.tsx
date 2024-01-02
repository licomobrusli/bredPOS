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
    <View style={[styles.container]}>
      {route.name === 'CategoryScreen' ? <HelpButton /> : <BackButton />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: SDims.Width80p + SDims.Width5p,
    alignSelf: 'center',
    backgroundColor: 'black',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
  }
});

export default McentralControls;
