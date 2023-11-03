import React, { useEffect, useState } from 'react';
import { View, FlatList, Image, TouchableOpacity } from 'react-native';
import { fetchServiceCategories } from '../services/servicecategoryService';
import { ServiceCategory } from '../config/types';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../config/StackNavigator'; // Adjust the import path as necessary
import { StackNavigationProp } from '@react-navigation/stack';

type ServiceCategoryListNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ServiceCategoryList'
>;

const ServiceCategoryList: React.FC = () => {
  const [categories, setCategories] = useState<ServiceCategory[]>([]);
  const [mainSectionWidth, setMainSectionWidth] = useState<number>(0);
  const navigation = useNavigation<ServiceCategoryListNavigationProp>();

  useEffect(() => {
    const loadServiceCategories = async () => {
      try {
        const data = await fetchServiceCategories();
        setCategories(data);
      } catch (error) {
        console.error("Failed to load service categories:", error);
      }
    };

    loadServiceCategories();
  }, []);

  const margin = mainSectionWidth / 12;
  
  const gap = mainSectionWidth ? mainSectionWidth / 24 : 0; // This is the gap value you can adjust
  
  const imageWidth = (mainSectionWidth - 2 * margin - gap) / 2; // This considers two images and a single gap
  const imageHeight = imageWidth;

  const onImagePress = (category: ServiceCategory) => {
    // Navigate to the ServiceList screen with the category code
    navigation.navigate('ServiceList', { categoryCode: category.code });
  };

  return (
    <View 
      style={{ flex: 1, backgroundColor: 'lightgreen', paddingBottom: margin }}
      onLayout={event => {
        const width = event.nativeEvent.layout.width;
        setMainSectionWidth(width);
      }}
    >
      <FlatList 
        data={categories}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => onImagePress(item)}
            style={{ 
              width: imageWidth, 
              height: imageHeight, 
              marginLeft: (index % 2 === 0) ? margin : gap,
              marginBottom: gap, 
              backgroundColor: 'red' 
            }}
          >
            <Image source={{ uri: 'https://placekitten.com/200/200' }} style={{ width: '100%', height: '100%' }} />
          </TouchableOpacity>
        )}
        keyExtractor={item => item.code}  
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        style={{ marginTop: margin, marginLeft: 0, marginRight: margin }}
      />
    </View>
  );
};

export default ServiceCategoryList;
