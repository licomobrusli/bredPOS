// ThemeType.tsx
import React from 'react';
import { View, FlatList } from 'react-native';
import ListCard from '../../components/ListCard';
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
    const handlePress = () => onServiceNameChange(item.name);

    return (
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: cardGridStyle.margin }}>
        <ListCard
          imageUrl={item.imageUrl}
          onPress={handlePress}
          serviceName={item.name}
        />
      </View>
    );
  };

  const keyExtractor = (item: Theme) => item.code;

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
