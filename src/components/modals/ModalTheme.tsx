// ModalTheme.tsx
import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import ThemeList from '../../content/ThemeList';

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'black' }
});

const ModalTheme: React.FC<{
  style?: ViewStyle, 
  categoryCode: string, 
  selectedServiceCode: string,
  onSelectColor: (colors: string[]) => void  
}> = ({ style, categoryCode, selectedServiceCode, onSelectColor }) => {
  return (
    <View style={[styles.container, style]}>
      <ThemeList 
        categoryCode={categoryCode} 
        selectedServiceCode={selectedServiceCode} 
        onSelectColor={onSelectColor}
      />
    </View>
  );
};

export default ModalTheme;
