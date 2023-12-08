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
    };

    return (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <ThemeCard
          style={{
            width: cardGridStyle.imageWidth,
            height: cardGridStyle.imageHeight * 1.5,
            marginLeft,
            marginRight: cardGridStyle.gap,
            marginTop: cardGridStyle.gap,
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
      numColumns={2}
      columnWrapperStyle={{ justifyContent: 'center' }}
    />
  );
};

export default ThemeType;
