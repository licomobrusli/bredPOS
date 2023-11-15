// ThemeList.tsx
import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, Dimensions } from 'react-native';
import api from '../services/api'; // Import your API utility
import { gridStyles } from '../config/gridStyle';
import ThemeCard from '../components/ThemeCard';
import styles from '../config/styles';

// Import local images
import HEDImage from '../main/assets/images/HED.jpg';
import FCEImage from '../main/assets/images/FCE.jpg';
import BRDImage from '../main/assets/images/BRD.jpg';
import CUTImage from '../main/assets/images/CUT.jpg';
import COLImage from '../main/assets/images/COL.jpg';
import DSNImage from '../main/assets/images/DSN.jpg';

interface Theme {
  id: string;
  imageUrl: string;
  code: string;
  name: string; // Name field added
}

interface ThemeListProps {
  categoryCode: string;
  selectedServiceCode: string;
}

const ThemeList: React.FC<ThemeListProps> = ({ categoryCode, selectedServiceCode }) => {
  const [themes, setThemes] = useState<Theme[]>([]);
  const [services, setServices] = useState<Theme[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get('/service_categories/', { params: { categoryCode } });
        const loadedCategories = response.data.map((category: any) => {
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
              imagePath = 'https://placekitten.com/200/200'; // Default image
          }
          const categoryObject = { id: category.id.toString(), code: category.code, imageUrl: imagePath, name: category.name };
        console.log("Category Object:", categoryObject);  // Log each constructed object
        return categoryObject;
        });
        setThemes(loadedCategories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    const fetchServices = async () => {
      try {
        const response = await api.get('/services/', { params: { serviceCode: selectedServiceCode } });
        const loadedServices = response.data.map((service: any) => {
          let imagePath;
          switch (service.code) {
            case 'CUT':
              imagePath = CUTImage;
              break;
            case 'COL':
              imagePath = COLImage;
              break;
            case 'DSN':
              imagePath = DSNImage;
              break;
            default:
              imagePath = 'https://placekitten.com/200/200'; // Default image
          }
          return { id: service.id.toString(), code: service.code, imageUrl: imagePath, name: service.name };
        });
        setServices(loadedServices);
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };

    fetchCategories();
    fetchServices();
    console.log("Fetched Categories:", themes);
    console.log("Fetched Services:", services);
  }, [categoryCode, selectedServiceCode]);

  const combinedData = [...services, ...themes];

  const renderItem = ({ item, index }: { item: Theme; index: number }) => {
    const marginLeft = index % 3 === 0 ? gridStyles.margin : gridStyles.gap;

    return (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <ThemeCard
          style={{
            width: gridStyles.imageWidth,
            height: gridStyles.imageHeight * 1.2,
            marginLeft,
            marginBottom: gridStyles.gap,
          }}
          imageUrl={item.imageUrl}
          onPress={() => console.log(`Pressed theme ${item.id}`)}
        />
      </View>
    );
  };

  const keyExtractor = (item: Theme) => item.id;
  const screenWidth = Dimensions.get('window').width;

  return (
    <View style={{ flex: 1, backgroundColor: 'black', paddingBottom: gridStyles.margin }}>
      <FlatList
        data={combinedData}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        numColumns={3}
        columnWrapperStyle={{ justifyContent: 'center' }}
        style={{ marginTop: gridStyles.margin, marginLeft: gridStyles.margin, marginRight: gridStyles.margin * 2 }}
      />
      <Text style={[styles.txtProductCard,
        { width: screenWidth * 0.55,
          textAlign: 'center',
          backgroundColor: 'red',
          alignSelf: 'center',
          borderColor: 'red',
          borderWidth: 1 }]}>
          {services.find(service => service.code === selectedServiceCode)?.name.toUpperCase()}  de  {themes.find(theme => theme.code === categoryCode)?.name.toUpperCase()}
      </Text>
    </View>
  );
};

export default ThemeList;
