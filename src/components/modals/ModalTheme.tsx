// ModalTheme.tsx
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ViewStyle, ActivityIndicator } from 'react-native';
import ThemeType from '../modals/ThemeType';
import ThemeList from '../../content/ThemeList';
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
  selectedColors: string[];
  setSelectedColors: React.Dispatch<React.SetStateAction<string[]>>;
  onServiceNameChange: (name: string) => void;
  onCategoryNameChange: (name: string) => void;
  onModalCountsChange: (details: any[]) => void;
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
  const [Categories, setCategories] = useState<Theme[]>([]);
  const [services, setServices] = useState<Theme[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const fetchedCategories = await fetchCategories(categoryCode);
        const fetchedServices = await fetchServices(selectedServiceCode);
        setCategories(fetchedCategories);
        setServices(fetchedServices);
      } catch (error) {
        console.error('Error fetching theme type data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [categoryCode, selectedServiceCode]);
  console.log('Categories:', Categories);
  console.log('services:', services);

  if (isLoading) {
    // Display a loading indicator while data is being fetched
    return (
      <View style={[styles.container, style, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#00ff00" />
      </View>
    );
  }

  return (
    <View style={[styles.container, style]}>
      <View style={{ flex: 1 }}>
        <ThemeType 
          themes={[...services, ...Categories]}
          onServiceNameChange={onServiceNameChange}
          onCategoryNameChange={onCategoryNameChange}
        />
      </View>
      <View style={{ height: 20 }} />
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
