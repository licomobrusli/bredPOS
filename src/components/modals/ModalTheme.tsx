// ModalTheme.tsx
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import ThemeType from '../modals/ThemeType';
import ThemeList from '../../content/ThemeList';
import { fetchCategories, fetchServices } from '../../config/apiCalls';
import { ModalCount, Theme } from '../../config/types';

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'black' }
});

interface ModalThemeProps {
  style?: ViewStyle;
  categoryCode: string;
  selectedServiceCode: string;
  onSelectColor: (colors: string[]) => void;
  selectedColors: string[];
  setSelectedColors: React.Dispatch<React.SetStateAction<string[]>>;
  onServiceNameChange: (name: string) => void;
  onCategoryNameChange: (name: string) => void;
  onModalCountsChange: (details: any[]) => void; // Replace 'any[]' with the correct type if known
}

const ModalTheme: React.FC<ModalThemeProps> = ({
  style,
  categoryCode,
  selectedServiceCode,
  onSelectColor,
  selectedColors,
  setSelectedColors,
  onServiceNameChange,
  onCategoryNameChange,
  onModalCountsChange
}) => {
  const [themes, setThemes] = useState<Theme[]>([]);
  const [services, setServices] = useState<Theme[]>([]);

  // Define the callback functions
  const handleServiceNameChange = (name: string) => {
    // Logic to handle service name change
  };

  const handleCategoryNameChange = (name: string) => {
    // Logic to handle category name change
  };

  const handleModalCountsChange = (modalCounts: ModalCount[]) => {
    // Logic to handle modal counts change
  };

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
    <View style={[styles.container, style]}>
      <View style={{ flex: 1 }}>
        <ThemeType 
          themes={[...services, ...themes]}
          onServiceNameChange={onServiceNameChange}
          onCategoryNameChange={onCategoryNameChange}
        />
      </View>
      <View style={{ height: 20 }}></View>
      <View style={{ flex: 1 }}>
        <ThemeList 
          categoryCode={categoryCode}
          selectedServiceCode={selectedServiceCode}
          onSelectColor={onSelectColor}
          selectedColors={selectedColors}
          setSelectedColors={setSelectedColors}
          onModalCountsChange={onModalCountsChange}
        />
      </View>
    </View>
  );
};

export default ModalTheme;