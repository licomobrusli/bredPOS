// ServiceList.tsx
import React, { useEffect, useState } from 'react';
import { View, FlatList, Image, TouchableOpacity, Text } from 'react-native';
import { fetchServices } from '../services/serviceService'; // Adjust the import path according to your project structure
import { Service } from '../config/types'; // Adjust the import path according to your project structure
import { useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../config/StackNavigator'; // Update the import path
import CutModal from './CutModal';
import ListCard from '../components/ListCard';

const ServiceList: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [mainSectionWidth, setMainSectionWidth] = useState<number>(0);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const route = useRoute<RouteProp<RootStackParamList, 'ServiceScreen'>>();
  const servicesWithPlaceholder = services.length % 2 !== 0 ? [...services, null] : services;
  const hardcodedDefault = '';
  const categoryCode = hardcodedDefault !== null ? hardcodedDefault : (route.params?.categoryCode || 'DefaultCode');

  useEffect(() => {
    const loadServices = async () => {
      try {
        const data = await fetchServices(categoryCode);
        setServices(data);
      } catch (error) {
        setError('Failed to load services');
        console.error("Failed to load services:", error);
      } finally {
        setLoading(false);
      }
    };

    loadServices();
  }, [categoryCode]);

  const onImagePress = (service: Service) => {
    console.log('Service pressed!', service);
    setModalVisible(true);
  };

  const margin = mainSectionWidth / 12;
  const gap = mainSectionWidth ? mainSectionWidth / 24 : 0;
  const imageWidth = (mainSectionWidth - 2 * margin - gap) / 2;
  const imageHeight = imageWidth;

  const renderItem = ({ item, index }: { item: Service | null; index: number }) => {
    const isPlaceholder = item === null;
    const isFirstColumn = index % 2 === 0;
    const marginLeft = isFirstColumn ? margin : gap;
  
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
        onPress={() => onImagePress(item)}
      />
    );
  };
  
  const keyExtractor = (item: Service | null, index: number) => {
    // If item is null (i.e., the placeholder), return a unique key
    return item ? item.code.toString() : `placeholder-${index}`;
  };

  return (
    <View
      style={{ flex: 1, backgroundColor: 'lightgreen', paddingBottom: margin }}
      onLayout={event => {
        const width = event.nativeEvent.layout.width;
        setMainSectionWidth(width);
      }}
    >
      <CutModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />

      {loading ? (
        <Text>Loading...</Text>
      ) : error ? (
        <Text>{error}</Text>
      ) : (
        <FlatList
          data={servicesWithPlaceholder}
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

export default ServiceList;
