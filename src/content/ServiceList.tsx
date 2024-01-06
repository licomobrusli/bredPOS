// ServiceList.tsx
import React, { useContext, useEffect, useState } from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import { Category, Service } from '../config/types';
import { useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../config/StackNavigator';
import CutModal from '../components/modals/CutModal';
import ListCard from '../components/ListCard';
import { cardGridStyle } from '../config/cardGridStyle';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import servicesContext from '../config/servicesContext';
import { useCart } from '../config/CartContext';

interface ServiceListProps {
  navigation: NavigationProp<ParamListBase>;
}

const ServiceList: React.FC<ServiceListProps> = (props) => {
  const services = useContext(servicesContext);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const route = useRoute<RouteProp<RootStackParamList, 'ServiceScreen'>>();
  const servicesWithPlaceholder = services && (services.length % 2 !== 0 ? [...services, null] : services);
  const categoryCode = route.params?.categoryCode || 'DefaultCode';
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const { cartItems } = useCart();

  useEffect(() => {
    setSelectedCategory(route.params?.category);
    if (services === null) {
      setLoading(true);
      setError(null);
    } else if (services.length === 0) {
      setLoading(false);
      setError('No services found');
    } else {
      setLoading(false);
      setError(null);
    }
  }, [services, route.params?.category, cartItems]);

  const isServiceInCartForCurrentCategory = (service: Service | null): boolean => {
    if (!service) return false;  // Return false if service is null
    return cartItems.some(item => 
      item.selectedService?.code === service.code && item.selectedCategory?.code === categoryCode
    );
  };

  const onImagePress = (service: Service) => {
    setSelectedService(service);
    setModalVisible(true);
  };

  const renderItem = ({ item, index }: { item: Service | null; index: number }) => {
    const isPlaceholder = item === null;
    const isInCartForCurrentCategory = isServiceInCartForCurrentCategory(item);

    if (isPlaceholder) {
      return <View style={styles.placeholder} />;
    }

    return (
      <ListCard
        imageUrl={item?.imageUrl}
        serviceName={item?.name}
        onPress={() => item && onImagePress(item)}
        isInCartForCurrentCategory={isInCartForCurrentCategory}  // This will always be a boolean now
      />
    );
  };

  const keyExtractor = (item: Service | null, index: number) => item ? item.code.toString() : `placeholder-${index}`;

  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
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

const styles = StyleSheet.create({
  placeholder: {
    backgroundColor: 'black',
    width: cardGridStyle.imageWidth,
    height: cardGridStyle.imageHeight,
    marginBottom: cardGridStyle.gap
  }
});

export default ServiceList;
