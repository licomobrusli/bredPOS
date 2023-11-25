// ThemeList.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, Dimensions, TouchableOpacity } from 'react-native';
import { fetchServices, fetchModalCounts } from '../config/apiCalls';
import { ModalCount } from '../config/types';
import SubModal from '../components/modals/SubModal';
import styles from '../config/fonts';

interface ThemeListProps {
  categoryCode: string;
  selectedServiceCode: string;
  onSelectColor: (colors: string[]) => void;
}

const ThemeList: React.FC<ThemeListProps> = ({ categoryCode, selectedServiceCode }) => {
  const [services, setServices] = useState<ModalCount[]>([]);
  const [modalCounts, setModalCounts] = useState<ModalCount[]>([]);
  const [selectedModalCounts, setSelectedModalCounts] = useState<string[]>([]);
  const [isSubModalVisible, setIsSubModalVisible] = useState<boolean>(false);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const handleSelectColor = (colors: string[]) => {setSelectedColors(colors);};

  useEffect(() => {
    const loadData = async () => {
      try {
        const servicesData = await fetchServices(selectedServiceCode);
        setServices(servicesData);

        // Correctly passing categoryCode here
        const modalCountsData = await fetchModalCounts({ categoryCode, serviceCode: selectedServiceCode });
        setModalCounts(modalCountsData);
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
          newSelected.push(id);
        }
      } else if (logic === 'NOT') {
        newSelected = newSelected.includes(id) ? newSelected : [id];
      }
  
      return newSelected;
    });
  
    if (sub > 0) {
      setIsSubModalVisible(true);
    }
  };

  const isModalCountSelected = (id: string) => selectedModalCounts.includes(id);

  const closeSubModal = () => {
    setIsSubModalVisible(false);
  };

  const screenWidth = Dimensions.get('window').width;

  return (
    <View style={{ flex: 1, backgroundColor: 'black', paddingBottom: 20 }}>
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
                flex: 1,
                textAlign: 'right',
                paddingRight: 10,
              }]}>
              {`${Math.floor(modalCount.price)}€`}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
      <SubModal
        isVisible={isSubModalVisible}
        onClose={closeSubModal} />
    </View>
  );
};

export default ThemeList;
