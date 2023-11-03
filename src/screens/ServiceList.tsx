// ServiceList.tsx
import React, { useEffect, useState } from 'react';
import { View, FlatList, Image, Text } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../services/Navigation'; // Adjust the import path as necessary
import { fetchServices } from '../services/serviceService'; // You need to implement this function
import { Service } from '../services/types'; // You need to define this type

const ServiceListScreen: React.FC = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'ServiceList'>>();
  const { categoryId } = route.params;
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    const loadServices = async () => {
      try {
        const data = await fetchServices(categoryId);
        setServices(data);
      } catch (error) {
        console.error("Failed to load services:", error);
      }
    };

    loadServices();
  }, [categoryId]);

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <FlatList
        data={services}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 16 }}>
            <Image source={{ uri: item.image_path }} style={{ width: '100%', height: 200 }} />
            <Text>{item.name}</Text>
          </View>
        )}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

export default ServiceListScreen;
