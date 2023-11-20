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

interface ModalCount {
  id: string;
  name: string;
  price: number;
}

interface ThemeListProps {
  categoryCode: string;
  selectedServiceCode: string;
}

const ThemeList: React.FC<ThemeListProps> = ({ categoryCode, selectedServiceCode }) => {
  const [themes, setThemes] = useState<Theme[]>([]);
  const [services, setServices] = useState<Theme[]>([]);
  const [modalCounts, setModalCounts] = useState<ModalCount[]>([]); // Updated to array

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
          return { id: category.id.toString(), code: category.code, imageUrl: imagePath, name: category.name };
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

    const fetchModalCount = async () => {
      try {
        const response = await api.get('/modal_counts/', { 
          params: { categoryCode, serviceCode: selectedServiceCode }
        });
        if (response.data.length > 0) {
          const modalCountData = response.data.map((item: any) => ({
            ...item,
            price: Number(item.price) // Convert each price to number
          }));
          setModalCounts(modalCountData);
        } else {
          setModalCounts([]);
        }
      } catch (error) {
        console.error('Error fetching modal counts:', error);
        setModalCounts([]); // Handle error by setting modalCounts to an empty array
      }
    };

    fetchCategories();
    fetchServices();
    fetchModalCount();
  }, [categoryCode, selectedServiceCode]);

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
        data={[...services, ...themes]}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        numColumns={3}
        columnWrapperStyle={{ justifyContent: 'center' }}
        style={{ marginTop: gridStyles.margin, marginLeft: gridStyles.margin, marginRight: gridStyles.margin * 2 }}
      />
      {modalCounts.map(modalCount => (
        <Text
          key={modalCount.id}
          style={[styles.txtProductCard, {
            width: screenWidth * 0.55,
            textAlign: 'center',
            backgroundColor: 'red',
            alignSelf: 'center',
            borderColor: 'red',
            borderWidth: 1
          }]}>
          {`${modalCount.name.toUpperCase()} ${Math.floor(modalCount.price)}€`}
        </Text>
      ))}
    </View>
  );
};

export default ThemeList;