// McentralControlsSection.tsx
import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import BackButton from '../content/BackButton';
import HeaderImage from '../content/HeaderImage';

const McentralControls: React.FC<{ style?: ViewStyle }> = ({ style }) => {
  return (
    <View
      style={[styles.container, style]}>
      <BackButton />
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
