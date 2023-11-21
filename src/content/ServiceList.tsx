// ServiceList.tsx
import React, { useEffect, useState } from 'react';
import { View, FlatList, Text } from 'react-native';
import { Service } from '../config/types'; // Adjust the import path
import { useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../config/StackNavigator'; // Update the import path
import CutModal from '../components/modals/CutModal';
import ListCard from '../components/ListCard';
import { gridStyles } from '../config/gridStyle'; // Update the import path
import { fetchServices } from '../config/apiCalls'; // Import your API calls

// Importing images
import CUTImage from '../main/assets/images/CUT.jpg';
import COLImage from '../main/assets/images/COL.jpg';
import DSNImage from '../main/assets/images/DSN.jpg';

const ServiceList: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const route = useRoute<RouteProp<RootStackParamList, 'ServiceScreen'>>();
  const servicesWithPlaceholder = services.length % 2 !== 0 ? [...services, null] : services;
  const hardcodedDefault = '';
  const categoryCode = route.params?.categoryCode || 'DefaultCode'; // Preserve categoryCode from navigation route
  // apiFilterCode is set to hardcodedDefault if it's not empty, otherwise use categoryCode
  const apiFilterCode = hardcodedDefault !== null ? hardcodedDefault : (route.params?.categoryCode || 'DefaultCode');  
  const [selectedServiceCode, setSelectedServiceCode] = useState<string>('');

  useEffect(() => {
    const loadServices = async () => {
      setLoading(true);
      try {
        const loadedServices = await fetchServices(apiFilterCode); // Fetch services based on the filter code
        setServices(loadedServices); // Use the services as they are returned
        setError(null);
      } catch (error) {
        setError('Failed to load services');
        console.error("Failed to load services:", error);
      } finally {
        setLoading(false);
      }
    };
  
    loadServices();
  }, [apiFilterCode]);
  

  const onImagePress = (service: Service) => {
    console.log('Service pressed!', service);
    setSelectedServiceCode(service.code); // Set the selected service code
    setModalVisible(true);
  };

  const renderItem = ({ item, index }: { item: Service | null; index: number }) => {
    const isPlaceholder = item === null;
    const isFirstColumn = index % 2 === 0;
    const marginLeft = isFirstColumn ? gridStyles.margin : gridStyles.gap;
  
    if (isPlaceholder) {
      return <View style={{ backgroundColor: 'black', width: gridStyles.imageWidth, height: gridStyles.imageHeight, marginLeft, marginBottom: gridStyles.gap }} />;
    }
  
    return (
      <ListCard
        style={{
          width: gridStyles.imageWidth,
          height: gridStyles.imageHeight * 1.5,
          marginLeft,
          marginBottom: gridStyles.gap,
        }}
        imageUrl={item.imageUrl} // Use the imageUrl that includes the mapped image
        serviceName={item.name}
        onPress={() => onImagePress(item)}
      />
    );
  };
    
  const keyExtractor = (item: Service | null, index: number) => item ? item.code.toString() : `placeholder-${index}`;

  return (
    <View style={{ flex: 1, backgroundColor: 'black', paddingBottom: gridStyles.margin }}>
      <CutModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        selectedCategoryImage={''}
        selectedServiceImage={''}
        categoryCode={categoryCode}
        selectedServiceCode={selectedServiceCode} // Pass the selected service code
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
          columnWrapperStyle={{ justifyContent: 'center' }}
          style={{ marginTop: gridStyles.margin, marginLeft: gridStyles.margin, marginRight: gridStyles.margin *2 }}
        />
      )}
    </View>
  );
};

export default ServiceList;
