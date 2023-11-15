// ThemeList.tsx
import React from 'react';
import { View, FlatList, Text } from 'react-native';
import { gridStyles } from '../config/gridStyle';
import ThemeCard from '../components/ThemeCard';
import styles from '../config/styles'; // Import styles

interface Theme {
  id: string;
  imageUrl: string;
}

// Hardcoded theme data
let themes: Theme[] = [
  { id: '1', imageUrl: 'https://placekitten.com/200/200' },
  { id: '2', imageUrl: 'https://placekitten.com/200/200' },
];

interface ThemeListProps {
  categoryCode: string; // Add prop type
  selectedServiceCode: string;
}

const ThemeList: React.FC<ThemeListProps> = ({ categoryCode, selectedServiceCode }) => {
    const renderItem = ({ item, index }: { item: Theme; index: number }) => {
    const marginLeft = index % 3 === 0 ? gridStyles.margin : gridStyles.gap;

    return (
      <ThemeCard
        style={{
          width: gridStyles.imageWidth,
          height: gridStyles.imageHeight * 1.5,
          marginLeft,
          marginBottom: gridStyles.gap,
        }}
        imageUrl={item.imageUrl}
        onPress={() => console.log(`Pressed theme ${item.id}`)}
      />
    );
  };

  const keyExtractor = (item: Theme) => item.id;

  return (
    <View style={{ flex: 1, backgroundColor: 'black', paddingBottom: gridStyles.margin }}>
      <Text style={[styles.txtSubBrandBanner, { backgroundColor: 'red' }]}>
        {selectedServiceCode} de {categoryCode}
      </Text>
      <FlatList
        data={themes}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        numColumns={3}
        columnWrapperStyle={{ justifyContent: 'center' }}
        style={{ marginTop: gridStyles.margin, marginLeft: gridStyles.margin, marginRight: gridStyles.margin * 2 }}
      />
    </View>
  );
};

export default ThemeList;
