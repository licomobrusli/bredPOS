// ServiceList.tsx
import React, { useEffect, useState } from 'react';
import { View, FlatList, Image, TouchableOpacity } from 'react-native';
import { fetchServices } from '../services/serviceService';
import { Service } from '../config/types';
import { useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../config/StackNavigator';
import CutModal from './CutModal'; // Import CutModal

const ServiceList: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [mainSectionWidth, setMainSectionWidth] = useState<number>(0);
  const [modalVisible, setModalVisible] = useState<boolean>(false); // State for modal visibility
  const route = useRoute<RouteProp<RootStackParamList, 'ServiceScreen'>>();

  // Hardcoded default value
  const hardcodedDefault = ''; // Set your default value here

  // Use hardcodedDefault if it's set, otherwise use route parameter
  const categoryCode = hardcodedDefault || route.params?.categoryCode || 'DefaultCode';

  useEffect(() => {
    const loadServices = async () => {
      try {
        const data = await fetchServices(categoryCode);
        setServices(data);
      } catch (error) {
        console.error("Failed to load services:", error);
      }
    };

    loadServices();
  }, [categoryCode]);

  const onImagePress = (service: Service) => {
    console.log('Service pressed!', service);
    setModalVisible(true); // Toggle modal visibility
  };

  const margin = mainSectionWidth / 12;
  const gap = mainSectionWidth ? mainSectionWidth / 24 : 0;
  const imageWidth = (mainSectionWidth - 2 * margin - gap) / 2;
  const imageHeight = imageWidth;

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

      <FlatList 
        data={services}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => onImagePress(item)}
            style={{ 
              width: imageWidth, 
              height: imageHeight, 
              marginLeft: (index % 2 === 0) ? margin : gap,
              marginBottom: gap, 
              backgroundColor: 'red' // You might want to change this
            }}
          >
            <Image 
              source={{ uri: item.imageUrl || 'https://placekitten.com/200/200' }} // Assuming each service has an imageUrl
              style={{ width: '100%', height: '100%' }} 
            />
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

export default ServiceList;
