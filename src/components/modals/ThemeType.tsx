// ThemeType.tsx
import React from 'react';
import { View, FlatList } from 'react-native';
import ListCard from '../../components/ListCard'; // Import ListCard
import { cardGridStyle } from '../../config/cardGridStyle';
import { Theme } from '../../config/types';

interface ThemeTypeProps {
  themes: Theme[];
  onServiceNameChange: (name: string) => void;
  onCategoryNameChange: (name: string) => void;
}

const ThemeType: React.FC<ThemeTypeProps> = ({ themes, onServiceNameChange, onCategoryNameChange }) => {
  const renderItem = ({ item, index }: { item: Theme; index: number }) => {
    const marginLeft = index % 3 === 0 ? cardGridStyle.margin : cardGridStyle.gap;

    const handlePress = () => {
      onServiceNameChange(item.name); // Call the callback with the service name
    };

    return (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <ListCard
          style={{
            width: cardGridStyle.imageWidth,
            height: cardGridStyle.imageHeight * 1.5,
            marginLeft,
            marginRight: cardGridStyle.gap,
            marginTop: cardGridStyle.margin * .5,
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
