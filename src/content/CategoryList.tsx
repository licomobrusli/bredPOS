// CategoryList.tsx
import React, { useState, useEffect } from 'react';
import { View, FlatList, Text } from 'react-native';
import { fetchCategories } from '../config/apiCalls'; // Import your API calls
import { Category } from '../config/types';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../config/StackNavigator';
import { StackNavigationProp } from '@react-navigation/stack';
import ListCard from '../components/ListCard';
import { cardGridStyle } from '../config/cardGridStyle';


const CategoryList = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'CategoryScreen'>>();

  useEffect(() => {
    const loadCategories = async () => {
      setLoading(true);
      try {
        const loadedCategories = await fetchCategories(); // Fetch all categories
        setCategories(loadedCategories); // Directly use the fetched categories
        setError(null);
      } catch (err) {
        setError('Failed to fetch categories');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
  
    loadCategories();
  }, []);
  
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
      {loading ? <Text>Loading...</Text> : error ? <Text>{error}</Text> : (
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
