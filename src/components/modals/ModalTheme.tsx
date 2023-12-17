// ModalTheme.tsx
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ViewStyle, ActivityIndicator } from 'react-native';
import ThemeType from '../modals/ThemeType';
import ThemeList from '../../content/ThemeList';
import { Category, Service, Theme } from '../../config/types';
import SDims from '../../config/dimensions';

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'black' },
});

interface ModalThemeProps {
  style?: ViewStyle;
  categoryCode: string;
  selectedServiceCode: string;
  onSelectColor: (colors: string[]) => void;
  selectedColors: string[];
  setSelectedColors: React.Dispatch<React.SetStateAction<string[]>>;
  counterValue: number; // Add this prop
  setCounterValue: React.Dispatch<React.SetStateAction<number>>; // Add this prop
  onServiceNameChange: (name: string) => void;
  onCategoryNameChange: (name: string) => void;
  onModalCountsChange: (details: any[]) => void;
  // Add these props to show in console logs
  selectedService: Service | null;
  selectedCategory: Category | null;
  selectedModalCounts: string[];
  modalCountsDetails: any[];
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
  selectedService,
  selectedCategory,
  selectedModalCounts,
  onModalCountsChange,
  modalCountsDetails
}) => {
  const [Categories, setCategories] = useState<Theme[]>([]);
  const [services, setServices] = useState<Theme[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching data from APIs (remove API calls)
    // Instead, set Categories and Services directly from selectedService and selectedCategory
    if (selectedCategory) {
      // Convert 'id' to string
      const categoryTheme: Theme = {
        ...selectedCategory,
        id: selectedCategory.id.toString(),
      };
      setCategories([categoryTheme]);
    }
    if (selectedService) {
      // Convert 'id' to string
      const serviceTheme: Theme = {
        ...selectedService,
        id: selectedService.id.toString(),
      };
      setServices([serviceTheme]);
    }

    setIsLoading(false);
  }, [selectedCategory, selectedService]);

  return (
    <View style={[styles.container, style ]}>
      <View style={{ height: SDims.Width50p }}>
        <ThemeType 
          themes={[...services, ...Categories]}
          onServiceNameChange={onServiceNameChange}
          onCategoryNameChange={onCategoryNameChange}
        />
      </View>
      <View style={{ height: SDims.Height1_8f }}>
        <ThemeList 
          categoryCode={categoryCode}
          selectedServiceCode={selectedServiceCode}
          onSelectColor={onSelectColor}
          selectedColors={selectedColors}
          setSelectedColors={setSelectedColors}
          selectedModalCounts={selectedModalCounts}
          onModalCountsChange={onModalCountsChange}
          modalCountsDetails={modalCountsDetails} // This is where it should be passed
        />
      </View>
    </View>
  );
};

export default ModalTheme;
