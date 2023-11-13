// ThemeList.tsx
import React from 'react';
import { View, FlatList, Image } from 'react-native';
import { gridStyles } from '../config/gridStyle'; // Update the import path

// Hardcoded theme data
const themes = [
  { id: '1', imageUrl: 'https://placekitten.com/200/200' },
  { id: '2', imageUrl: 'https://placekitten.com/200/200' },
  { id: '3', imageUrl: 'https://placekitten.com/200/200' },
];

const ThemeList = () => {
  const renderItem = ({ item, index }: { item: { id: string, imageUrl: string }; index: number }) => {
    const marginLeft = index % 3 === 0 ? gridStyles.margin : gridStyles.gap;

    return (
      <View style={{
        width: gridStyles.imageWidth,
        height: gridStyles.imageHeight * 1.5,
        marginLeft,
        marginBottom: gridStyles.gap,
      }}>
        <Image source={{ uri: item.imageUrl }} style={{ width: '100%', height: '100%' }} />
      </View>
    );
  };

  const keyExtractor = (item: { id: string, imageUrl: string }) => item.id;

  return (
    <View style={{ flex: 1, backgroundColor: 'black', paddingBottom: gridStyles.margin }}>
      <FlatList
        data={themes}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        numColumns={3}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        style={{ marginTop: gridStyles.margin, marginLeft: gridStyles.margin, marginRight: gridStyles.margin * 2 }}
      />
    </View>
  );
};

export default ThemeList;
