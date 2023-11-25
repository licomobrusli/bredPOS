// ThemeType.tsx
import React from 'react';
import { View, FlatList } from 'react-native';
import ThemeCard from '../ThemeCard';
import { cardGridStyle } from '../../config/cardGridStyle';
import { Theme } from '../../config/types';

interface ThemeTypeProps {
  themes: Theme[];
}

const ThemeType: React.FC<ThemeTypeProps> = ({ themes }) => {
  const renderItem = ({ item, index }: { item: Theme; index: number }) => {
    const marginLeft = index % 3 === 0 ? cardGridStyle.margin : cardGridStyle.gap;

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
          onPress={() => console.log(`Pressed theme ${item.id}`)}
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
