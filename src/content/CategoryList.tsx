// CategoryList.tsx
import React, { useContext } from 'react';
import { View, FlatList, Text } from 'react-native';
import { Category } from '../config/types';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../config/StackNavigator';
import { StackNavigationProp } from '@react-navigation/stack';
import ListCard from '../components/ListCard';
import { cardGridStyle } from '../config/cardGridStyle';
import categoriesContext from '../config/categoriesContext'; // Make sure the path is correct

const CategoryList = () => {
  const categories = useContext(categoriesContext); // Consuming the context
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'CategoryScreen'>>();

  const onCategoryPress = (category: Category) => {
    navigation.navigate('ServiceScreen', { categoryCode: category.code, category: category });
  };  

  const renderItem = ({ item, index }: { item: Category | null; index: number }) => {
    const isPlaceholder = item === null;
  
    if (isPlaceholder) {
      return <View style={{
        flexDirection: 'row', alignItems: 'center',
        backgroundColor: 'black',
        width: cardGridStyle.imageWidth,
        height: cardGridStyle.imageHeight,
        marginBottom: cardGridStyle.gap
      }} />;
    }
  
    function onImagePress(item: Category): void {
      throw new Error('Function not implemented.');
    }

    return (
      <ListCard
        imageUrl={item.imageUrl}
        categoryName={item.name}
        onPress={() => onCategoryPress(item)}
      />
    );
  };
  
  const keyExtractor = (item: Category | null, index: number) => item ? item.id.toString() : `placeholder-${index}`;

  return (
    <View style={{ flex: 1, backgroundColor: 'black', paddingBottom: cardGridStyle.margin}}>
      {!categories ? <Text>Loading...</Text> : (
        <FlatList
          data={categories}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          numColumns={3}
          columnWrapperStyle={{ justifyContent: 'center' }}
          style={{
            marginTop: cardGridStyle.margin,
          }}
        />
      )}
    </View>
  );
};

export default CategoryList;