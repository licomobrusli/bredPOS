// CategoryList.tsx
import React, { useState, useEffect } from 'react';
import { View, FlatList, Text } from 'react-native';
import api from '../services/api'; // Adjust the import path
import { Category } from '../config/types'; // Adjust the import path
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../config/StackNavigator'; // Update the import path
import { StackNavigationProp } from '@react-navigation/stack';
import ListCard from '../components/ListCard';
import { gridStyles } from '../config/gridStyle'; // Update the import path

const CategoryList = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'CategoryScreen'>>();
  const categoriesWithPlaceholder = categories.length % 2 !== 0 ? [...categories, null] : categories;

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get('/service_categories/'); // Adjust endpoint if necessary
        setCategories(response.data);
      } catch (err) {
        setError('Failed to fetch categories');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const onCategoryPress = (category: Category) => {
    navigation.navigate('ServiceScreen', { categoryCode: category.code });
    console.log('Category pressed!', category);
  };

  const renderItem = ({ item, index }: { item: Category | null; index: number }) => {
    const isPlaceholder = item === null;
    const marginLeft = index % 2 === 0 ? gridStyles.margin : gridStyles.gap;
    
    if (isPlaceholder) {
      return <View style={{ width: gridStyles.imageWidth, height: gridStyles.imageHeight, marginLeft, marginBottom: gridStyles.gap }} />;
    }
  
    return (
      <ListCard
        style={{
          width: gridStyles.imageWidth,
          height: gridStyles.imageHeight,
          marginLeft,
          marginBottom: gridStyles.gap,
        }}
        imageUrl={item.imageUrl || 'https://placekitten.com/200/200'}
        onPress={() => onCategoryPress(item)}
      />
    );
  };

  const keyExtractor = (item: Category | null, index: number) => item ? item.id.toString() : `placeholder-${index}`;

  return (
    <View style={{ flex: 1, paddingBottom: gridStyles.margin }}>
      {loading ? <Text>Loading...</Text> : error ? <Text>{error}</Text> : (
        <FlatList
          data={categoriesWithPlaceholder}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          style={{ marginTop: gridStyles.margin, marginLeft: 0, marginRight: gridStyles.margin }}
        />
      )}
    </View>
  );
};

export default CategoryList;
