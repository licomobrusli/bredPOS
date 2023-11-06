import React, { useEffect, useState } from 'react';
import { View, FlatList, Image, TouchableOpacity } from 'react-native';
import { fetchServices } from '../services/serviceService';
import { Service } from '../config/types';

const ServiceList: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [mainSectionWidth, setMainSectionWidth] = useState<number>(0);

  const categoryCode = 'CRT'; // Replace with your actual category code

  useEffect(() => {
    const loadServices = async () => {
      try {
        // Pass the categoryCode to the fetchServices function
        const data = await fetchServices(categoryCode);
        setServices(data);
      } catch (error) {
        console.error("Failed to load services:", error);
      }
    };

    loadServices();
  }, [categoryCode]); // Depend on categoryCode to re-run the effect if it changes

  const onImagePress = (service: Service) => {
    console.log('Service pressed!', service);
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
              source={{ uri: 'https://placekitten.com/200/200' }} 
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
