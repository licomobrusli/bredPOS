// ModalTheme.tsx
import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import ThemeList from '../../content/ThemeList'; ;

const ModalTheme: React.FC<{ style?: ViewStyle, categoryCode: string, selectedServiceCode: string }> = ({ style, categoryCode, selectedServiceCode }) => {
  return (
    <View style={[styles.container, style]}>
      <ThemeList categoryCode={categoryCode} selectedServiceCode={selectedServiceCode} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'black' }
});

export default ModalTheme;
