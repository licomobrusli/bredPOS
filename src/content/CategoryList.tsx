// CategoryList.tsx
import React, { useState, useEffect } from 'react';
import { View, FlatList, Image, TouchableOpacity, Text } from 'react-native';
import api from '../services/api'; // Adjust the import path according to your project structure
import { Category } from '../config/types'; // Adjust the import path according to your project structure

const CategoryList = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [mainSectionWidth, setMainSectionWidth] = useState<number>(0);

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
    console.log('Category pressed!', category);
  };

  const margin = mainSectionWidth / 12;
  const gap = mainSectionWidth ? mainSectionWidth / 24 : 0;
  const imageWidth = (mainSectionWidth - 2 * margin - gap) / 2;
  const imageHeight = imageWidth;

  const renderItem = ({ item, index }: { item: Category; index: number }) => {
    return (
      <TouchableOpacity
        onPress={() => onCategoryPress(item)}
        style={{
          width: imageWidth,
          height: imageHeight,
          marginLeft: (index % 2 === 0) ? margin : gap,
          marginBottom: gap,
        }}
      >
        <Image
          source={{ uri: 'https://placekitten.com/200/200' }}
          style={{ width: '100%', height: '100%' }}
        />
      </TouchableOpacity>
    );
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
          data={categories}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          style={{ marginTop: margin, marginLeft: 0, marginRight: margin }}
        />
      )}
    </View>
  );
};

export default CategoryList;
