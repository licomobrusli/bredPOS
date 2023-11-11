// CategoryList.tsx
import React, { useState, useEffect } from 'react';
import { View, FlatList, Text } from 'react-native';
import api from '../services/api';
import { Category } from '../config/types';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../config/StackNavigator';
import { StackNavigationProp } from '@react-navigation/stack';
import ListCard from '../components/ListCard';
import { gridStyles } from '../config/gridStyle';

// Importing images
import HEDImage from '../main/assets/images/HED.jpg';
import FCEImage from '../main/assets/images/FCE.jpg';
import BRDImage from '../main/assets/images/BRD.jpg';

const CategoryList = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'CategoryScreen'>>();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get('/service_categories/');
        const loadedCategories = response.data.map((category: Category) => {
          let imagePath;
          switch (category.code) {
            case 'HED':
              imagePath = HEDImage;
              break;
            case 'FCE':
              imagePath = FCEImage;
              break;
            case 'BRD':
              imagePath = BRDImage;
              break;
            default:
              // Provide a default image path or handle the absence of an image
              imagePath = 'https://placekitten.com/820/500'; // Replace with actual default image path
          }

          return { ...category, imageUrl: imagePath };
        });

        console.log('Loaded categories with images:', loadedCategories);

        setCategories(loadedCategories);
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
          height: gridStyles.imageHeight * 1.5,
          marginLeft,
          marginBottom: gridStyles.gap,
        }}
        imageUrl={item.imageUrl}
        categoryName={item.name} // Pass the category name here
        onPress={() => onCategoryPress(item)}
      />
    );
  };
  
  const keyExtractor = (item: Category | null, index: number) => item ? item.id.toString() : `placeholder-${index}`;

  return (
    <View style={{ flex: 1, paddingBottom: gridStyles.margin }}>
      {loading ? <Text>Loading...</Text> : error ? <Text>{error}</Text> : (
        <FlatList
          data={categories}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          numColumns={3}
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          style={{ marginTop: gridStyles.margin, marginLeft: gridStyles.margin, marginRight: gridStyles.margin *2 }}
        />
      )}
    </View>
  );
};

export default CategoryList;
