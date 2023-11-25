// ModalTheme.tsx
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import ThemeList from '../../content/ThemeList';
import ThemeType from '../modals/ThemeType'; // Assuming ThemeType accepts 'themes' prop
import { fetchCategories, fetchServices } from '../../config/apiCalls';
import { Theme } from '../../config/types';

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'black' }
});

interface ModalThemeProps {
  style?: ViewStyle;
  categoryCode: string;
  selectedServiceCode: string;
  onSelectColor: (colors: string[]) => void;
  selectedColors: string[]; // Ensure this prop is included
  setSelectedColors: React.Dispatch<React.SetStateAction<string[]>>;
}

const ModalTheme: React.FC<ModalThemeProps> = ({
  style,
  categoryCode,
  selectedServiceCode,
  onSelectColor,
  selectedColors, // Include this prop
  setSelectedColors // Include this prop
}) => {
  const [themes, setThemes] = useState<Theme[]>([]);
  const [services, setServices] = useState<Theme[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const fetchedThemes = await fetchCategories(categoryCode);
        setThemes(fetchedThemes);
        const fetchedServices = await fetchServices(selectedServiceCode);
        setServices(fetchedServices);
      } catch (error) {
        console.error('Error fetching theme type data:', error);
      }
    };

    loadData();
  }, [categoryCode, selectedServiceCode]);

  return (
    <View style={[styles.container, style, { justifyContent: 'space-between' }]}>
      <View style={{ flex: 1 }}>
        <ThemeType themes={[...services, ...themes]} />
      </View>
      {/* Optional Spacer View */}
      <View style={{ height: 20 }}></View>
      <View style={{ flex: 1 }}>
        <ThemeList 
          categoryCode={categoryCode}
          selectedServiceCode={selectedServiceCode}
          onSelectColor={onSelectColor}
          selectedColors={selectedColors}
          setSelectedColors={setSelectedColors}
        />
      </View>
    </View>
  );
};

export default ModalTheme;
