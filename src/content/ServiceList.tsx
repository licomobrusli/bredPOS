// ServiceList.tsx
import React, { useEffect, useState } from 'react';
import { View, FlatList, Text } from 'react-native';
import { Category, Service } from '../config/types'; // Adjust the import path
import { useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../config/StackNavigator'; // Update the import path
import CutModal from '../components/modals/CutModal';
import ListCard from '../components/ListCard';
import { cardGridStyle } from '../config/cardGridStyle'; // Update the import path
import { fetchServices } from '../config/apiCalls'; // Import your API calls
import { NavigationProp, ParamListBase } from '@react-navigation/native';

interface ServiceListProps {
  navigation: NavigationProp<ParamListBase>;
}

const ServiceList: React.FC<ServiceListProps> = (props) => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const route = useRoute<RouteProp<RootStackParamList, 'ServiceScreen'>>();
  const servicesWithPlaceholder = services.length % 2 !== 0 ? [...services, null] : services;
  const hardcodedDefault = '';
  const categoryCode = route.params?.categoryCode || 'DefaultCode'; // Preserve categoryCode from navigation route
  const apiFilterCode = hardcodedDefault !== null ? hardcodedDefault : (route.params?.categoryCode || 'DefaultCode');  
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  useEffect(() => {
    setSelectedCategory(route.params?.category);
    const loadServices = async () => {
      setLoading(true);
      try {
        const loadedServices = await fetchServices(apiFilterCode);
        setServices(loadedServices);
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
    setSelectedService(service);
    setModalVisible(true);
  };

  const renderItem = ({ item, index }: { item: Service | null; index: number }) => {
    const isPlaceholder = item === null;
    const isFirstColumn = index % 2 === 0;
    const marginLeft = isFirstColumn ? cardGridStyle.margin : cardGridStyle.gap;
  
    if (isPlaceholder) {
      return <View style={{
        backgroundColor: 'black',
        width: cardGridStyle.imageWidth,
        height: cardGridStyle.imageHeight,
        marginBottom: cardGridStyle.gap
      }} />;
    }
  
    return (
      <ListCard
        imageUrl={item.imageUrl}
        serviceName={item.name}
        onPress={() => onImagePress(item)}
      />
    );
  };
    
  const keyExtractor = (item: Service | null, index: number) => item ? item.code.toString() : `placeholder-${index}`;

  return (
    <View style={{ 
      flex: 1,
      backgroundColor: 'black',
    }}>
      <CutModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        selectedCategoryImage={''}
        selectedServiceImage={''}
        categoryCode={categoryCode}
        selectedService={selectedService}
        selectedCategory={selectedCategory}
        selectedModalCounts={[]}
        modalCountsDetails={[]}
        navigation={props.navigation}
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
          style={{
            marginTop: cardGridStyle.margin,
             }}
        />
      )}
    </View>
  );
};

export default ServiceList;
