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
  selectedColors: string[];
  setSelectedColors: React.Dispatch<React.SetStateAction<string[]>>; 
  onModalCountsChange: (modalCounts: ModalCount[]) => void; // Added this line
}

const ThemeList: React.FC<ThemeListProps> = ({
  categoryCode, selectedServiceCode, selectedColors, setSelectedColors, onModalCountsChange
}) => {
  const [services, setServices] = useState<ModalCount[]>([]);
  const [modalCounts, setModalCounts] = useState<ModalCount[]>([]);
  const [selectedModalCounts, setSelectedModalCounts] = useState<string[]>([]);
  const [isSubModalVisible, setIsSubModalVisible] = useState<boolean>(false);
  const subtotal = modalCounts.reduce((acc, modalCount) => {
    if (selectedModalCounts.includes(modalCount.id) || (modalCount.logic === 'OR' && selectedColors.length > 1)) {
      // Apply different price calculation for 'OR' logic modal counts
      return acc + modalCount.price * (modalCount.logic === 'OR' ? selectedColors.length - 1 : 1);
    }
    return acc;
  }, 0);  

  useEffect(() => {
    const loadData = async () => {
      try {
        const servicesData = await fetchServices(selectedServiceCode);
        setServices(servicesData);

        const modalCountsData = await fetchModalCounts({ categoryCode, serviceCode: selectedServiceCode });
        setModalCounts(modalCountsData);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    loadData();
  }, [categoryCode, selectedServiceCode]);

  useEffect(() => {
    // Call the callback with the modal counts details
    onModalCountsChange(modalCounts);
  }, [modalCounts, onModalCountsChange]);
  
  const handleModalCountPress = (id: string, logic: string, sub: number) => {
    if (logic === 'OR') {
      if (sub > 0) {
        setIsSubModalVisible(true);
      }
    } else if (logic === 'NOT') {
      // Open the SubModal when logic is 'NOT'
      if (sub > 0) {
        setIsSubModalVisible(true);
      }
  
      // Ensuring exclusivity for 'NOT' logic
      setSelectedModalCounts(prevSelected => 
        prevSelected.includes(id) 
          ? prevSelected.filter(item => item !== id)
          : [id]
      );
    } else {
      // Toggling selection for other logics
      setSelectedModalCounts(prevSelected => 
        prevSelected.includes(id) 
          ? prevSelected.filter(item => item !== id)
          : [...prevSelected, id]
      );
    }
  };
  

  const isModalCountSelected = (modalCount: ModalCount) => {
    if (modalCount.logic === 'OR') {
      return selectedColors.length > 1; 
    }
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
      <View style={{ 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        alignSelf: 'center', 
        width: screenWidth * 0.55, 
        marginVertical: 5, 
        borderColor: 'red', 
        borderWidth: 1 
      }}>
        <Text style={[styles.txtModalCounts, { flex: 4.2, textAlign: 'left', paddingLeft: 10 }]}>
          SUBTOTAL
        </Text>
        <Text style={[styles.txtModalCounts, { flex: 1, textAlign: 'right', paddingRight: 10 }]}>
          {subtotal}€
        </Text>
      </View>

      <SubModal
        isVisible={isSubModalVisible}
        onClose={closeSubModal}
        selectedColors={selectedColors} 
        setSelectedColors={setSelectedColors} 
      />
    </View>
  );
};

export default ThemeList;
