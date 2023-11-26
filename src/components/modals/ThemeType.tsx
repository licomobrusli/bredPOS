// ThemeType.tsx
import React from 'react';
import { View, FlatList } from 'react-native';
import ThemeCard from '../ThemeCard';
import { cardGridStyle } from '../../config/cardGridStyle';
import { Theme } from '../../config/types';

// Updated interface to include callback functions
interface ThemeTypeProps {
  themes: Theme[];
  onServiceNameChange: (name: string) => void;
  onCategoryNameChange: (name: string) => void;
}

const ThemeType: React.FC<ThemeTypeProps> = ({ themes, onServiceNameChange, onCategoryNameChange }) => {
  const renderItem = ({ item, index }: { item: Theme; index: number }) => {
    const marginLeft = index % 3 === 0 ? cardGridStyle.margin : cardGridStyle.gap;

    // Example of using the callbacks
    const handlePress = () => {
      console.log(`Pressed theme ${item.id}`);
      onServiceNameChange(item.name); // Call the callback with the service name
      // Assuming category name is available here. Replace 'CategoryName' with actual logic to get the category name
      onCategoryNameChange('CategoryName');
    };

    return (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <ThemeCard
          style={{
            width: cardGridStyle.imageWidth,
            height: cardGridStyle.imageHeight * 1.5,
            marginLeft,
            marginBottom: cardGridStyle.gap,
          }}
          imageUrl={item.imageUrl}
          onPress={handlePress}
          serviceName={item.name}
        />
      </View>
    );
  };

  const keyExtractor = (item: Theme) => item.id;

  return (
    <FlatList
      data={themes}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      numColumns={3}
      columnWrapperStyle={{ justifyContent: 'center' }}
    />
  );
};

export default ThemeType;
