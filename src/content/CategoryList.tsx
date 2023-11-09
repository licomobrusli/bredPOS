// CategoryList.tsx
import React, { useState, useEffect } from 'react';
import { View, FlatList, Image, TouchableOpacity, Text } from 'react-native';
import api from '../services/api'; // Adjust the import path according to your project structure
import { Category } from '../config/types'; // Adjust the import path according to your project structure
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../config/StackNavigator'; // Update the import path
import { StackNavigationProp } from '@react-navigation/stack';
import ListCard from '../components/ListCard';

const CategoryList = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [mainSectionWidth, setMainSectionWidth] = useState<number>(0);
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

  const margin = mainSectionWidth / 12;
  const gap = mainSectionWidth ? mainSectionWidth / 24 : 0;
  const imageWidth = (mainSectionWidth - 2 * margin - gap) / 2;
  const imageHeight = imageWidth;

  const renderItem = ({ item, index }: { item: Category | null; index: number }) => {
    const isPlaceholder = item === null;
    const marginLeft = index % 2 === 0 ? margin : gap;
    
    if (isPlaceholder) {
      return <View style={{ width: imageWidth, height: imageHeight, marginLeft, marginBottom: gap }} />;
    }
  
    return (
      <ListCard
        style={{
          width: imageWidth,
          height: imageHeight,
          marginLeft: marginLeft,
          marginBottom: gap,
        }}
        imageUrl={item.imageUrl || 'https://placekitten.com/200/200'}
        onPress={() => onCategoryPress(item)}
      />
    );
  };

  const keyExtractor = (item: Category | null, index: number) => {
    return item ? item.id.toString() : `placeholder-${index}`;
  };  

  return (
    <View
      style={{ flex: 1, paddingBottom: margin }}
      onLayout={event => {
        const width = event.nativeEvent.layout.width;
        setMainSectionWidth(width);
      }}
    >
      {loading ? (
        <Text>Loading...</Text>
      ) : error ? (
        <Text>{error}</Text>
      ) : (
        <FlatList
          data={categoriesWithPlaceholder}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          style={{ marginTop: margin, marginLeft: 0, marginRight: margin }}
        />

      )}
    </View>
  );
};

export default CategoryList;
