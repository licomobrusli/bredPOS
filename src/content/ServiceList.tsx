// ServiceList.tsx
import React, { useEffect, useState } from 'react';
import { View, FlatList, Text } from 'react-native';
import { fetchServices } from '../services/serviceService'; // Adjust the import path
import { Service } from '../config/types'; // Adjust the import path
import { useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../config/StackNavigator'; // Update the import path
import CutModal from '../components/modals/CutModal';
import ListCard from '../components/ListCard';
import { gridStyles } from '../config/gridStyle'; // Update the import path

const ServiceList: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
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

  const renderItem = ({ item, index }: { item: Service | null; index: number }) => {
    const isPlaceholder = item === null;
    const isFirstColumn = index % 2 === 0;
    const marginLeft = isFirstColumn ? gridStyles.margin : gridStyles.gap;
  
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
        onPress={() => onImagePress(item)}
      />
    );
  };
  
  const keyExtractor = (item: Service | null, index: number) => item ? item.code.toString() : `placeholder-${index}`;

  return (
    <View style={{ flex: 1, backgroundColor: 'lightgreen', paddingBottom: gridStyles.margin }}>
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
          numColumns={3}
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          style={{ marginTop: gridStyles.margin, marginLeft: 0, marginRight: gridStyles.margin }}
        />
      )}
    </View>
  );
};

export default ServiceList;
