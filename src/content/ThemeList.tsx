// ThemeList.tsx:
import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, Dimensions, TouchableOpacity } from 'react-native';
import { fetchCategories, fetchServices, fetchModalCounts } from '../config/apiCalls';
import { gridStyles } from '../config/gridStyle';
import ThemeCard from '../components/ThemeCard';
import styles from '../config/fonts';
import { Theme, ModalCount } from '../config/types';
import SubModal from '../components/modals/SubModal';

interface ThemeListProps {
  categoryCode: string;
  selectedServiceCode: string;
}

const ThemeList: React.FC<ThemeListProps> = ({ categoryCode, selectedServiceCode }) => {
  const [themes, setThemes] = useState<Theme[]>([]);
  const [services, setServices] = useState<Theme[]>([]);
  const [modalCounts, setModalCounts] = useState<ModalCount[]>([]);
  const [selectedModalCounts, setSelectedModalCounts] = useState<string[]>([]);
  const [isSubModalVisible, setIsSubModalVisible] = useState<boolean>(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const categories = await fetchCategories(categoryCode);
        setThemes(categories);

        const services = await fetchServices(selectedServiceCode);
        setServices(services);

        const modalCountsData = await fetchModalCounts({ categoryCode, serviceCode: selectedServiceCode });
        setModalCounts(modalCountsData);

        // Select the first 'NOT' modal count by default, if applicable
        if (modalCountsData.some((mc: { logic: string; }) => mc.logic === 'NOT')) {
          setSelectedModalCounts([modalCountsData.find((mc: { logic: string; }) => mc.logic === 'NOT')?.id || '']);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    loadData();
  }, [categoryCode, selectedServiceCode]);

  const handleModalCountPress = (id: string, logic: string, sub: number) => {
    setSelectedModalCounts(prevSelected => {
        let newSelected = [...prevSelected];
  
        if (logic === 'OR') {
            if (!newSelected.includes(id)) {
                // Add to selection if not already selected
                newSelected.push(id);
            }
            // If already selected, it remains in the array, thus maintaining its selection
        } else if (logic === 'NOT') {
            // If currently selected, keep it selected. Otherwise, select it and deselect others
            newSelected = newSelected.includes(id) ? newSelected : [id];
        }
  
        return newSelected;
    });
  
    // Open SubModal if sub > 0
    if (sub > 0) {
        setIsSubModalVisible(true);
    }
};
  
  const isModalCountSelected = (id: string) => {
    return selectedModalCounts.includes(id);
  };

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

    const closeSubModal = () => {
    setIsSubModalVisible(false);
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
        <TouchableOpacity
          key={modalCount.id}
          onPress={() => handleModalCountPress(modalCount.id, modalCount.logic, modalCount.sub)}
        >
          <View style={{ 
            flexDirection: 'row', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            backgroundColor: isModalCountSelected(modalCount.id) ? 'red' : 'black', 
            alignSelf: 'center', 
            width: screenWidth * 0.55, 
            marginVertical: 5, 
            borderColor: 'red', 
            borderWidth: 1 
          }}>
            <Text
              style={[styles.txtModalCounts, {
                flex: 4.2,
                textAlign: 'left',
                paddingLeft: 10,
              }]}>
              {modalCount.name.toUpperCase()}
            </Text>
            <Text
              style={[styles.txtModalCounts, {
                flex: 0.8,
                textAlign: 'right',
                paddingRight: 10,
              }]}>
              {`${Math.floor(modalCount.price)}€`}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
      <SubModal isVisible={isSubModalVisible} onClose={closeSubModal} />
    </View>
  );
};

export default ThemeList;
