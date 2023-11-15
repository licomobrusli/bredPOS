// ModalTheme.tsx
import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import ThemeList from '../../content/ThemeList'; ;

const ModalTheme: React.FC<{ style?: ViewStyle, categoryCode: string }> = ({ style, categoryCode }) => {
  return (
    <View style={[styles.container, style]}>
      <ThemeList categoryCode={categoryCode} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'black' }
});

export default ModalTheme;
