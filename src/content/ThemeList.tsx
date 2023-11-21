// ThemeList.tsx
import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, Dimensions } from 'react-native';
import { fetchCategories, fetchServices, fetchModalCounts } from '../config/apiCalls'; // Import your API calls
import { gridStyles } from '../config/gridStyle';
import ThemeCard from '../components/ThemeCard';
import styles from '../config/styles';

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
  max_quantity: number;
  logic: string;
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
    const loadData = async () => {
      try {
        const categories = await fetchCategories(categoryCode);
        setThemes(categories);
  
        const services = await fetchServices(selectedServiceCode);
        setServices(services);
  
        const modalCountsData = await fetchModalCounts({ categoryCode, serviceCode: selectedServiceCode });
        setModalCounts(modalCountsData);
      } catch (error) {
        console.error('Error:', error);
        // Handle errors as needed, for example, by setting state variables to show an error message
      }
    };
  
    loadData();
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
      <View key={modalCount.id} style={{ 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        backgroundColor: 'red', 
        alignSelf: 'center', 
        width: screenWidth * 0.55, 
        marginVertical: 5, 
        borderColor: 'red', 
        borderWidth: 1 
      }}>
        <Text
          style={[styles.txtModalCounts, {
            flex: 4.2, // Increased flex for name
            textAlign: 'left',
            paddingLeft: 10, // Padding for text alignment
          }]}>
          {modalCount.name.toUpperCase()}
        </Text>
        <Text
          style={[styles.txtModalCounts, {
            flex: 0.8, // Flex for price
            textAlign: 'right',
            paddingRight: 10, // Padding for text alignment
          }]}>
          {`${Math.floor(modalCount.price)}€`}
        </Text>
      </View>
    ))}
  </View>
  );
};

export default ThemeList;