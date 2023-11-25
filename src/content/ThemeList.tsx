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
  selectedColors: string[]; // Add this line
  setSelectedColors: React.Dispatch<React.SetStateAction<string[]>>; // Add this line
}

const ThemeList: React.FC<ThemeListProps> = ({
  categoryCode, selectedServiceCode, selectedColors, setSelectedColors // Update this line
}) => {
  const [services, setServices] = useState<ModalCount[]>([]);
  const [modalCounts, setModalCounts] = useState<ModalCount[]>([]);
  const [selectedModalCounts, setSelectedModalCounts] = useState<string[]>([]);
  const [isSubModalVisible, setIsSubModalVisible] = useState<boolean>(false);

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

  const isModalCountSelected = (modalCount: ModalCount) => {
    // Check for OR logic and selected colors
    if (modalCount.logic === 'OR' && selectedColors.length > 1) {
      return true;
    }
    // Existing logic for other cases
    return selectedModalCounts.includes(modalCount.id);
  };

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
            backgroundColor: isModalCountSelected(modalCount) ? 'red' : 'black', 
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
              {modalCount.logic === 'OR' 
                ? (selectedColors.length > 1 
                  ? `${Math.floor(modalCount.price * (selectedColors.length - 1))}€` 
                  : '')
                : `${modalCount.price}€`}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
      <SubModal
        isVisible={isSubModalVisible}
        onClose={closeSubModal}
        selectedColors={selectedColors} // Pass selectedColors to SubModal
        setSelectedColors={setSelectedColors} // Pass setSelectedColors to SubModal
      />
    </View>
  );
};

export default ThemeList;
