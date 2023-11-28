// ThemeList.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, Dimensions, TouchableOpacity } from 'react-native';
import { fetchModalCounts } from '../config/apiCalls';
import { ModalCount } from '../config/types';
import SubModal from '../components/modals/SubModal';
import SubModalB from '../components/modals/SubModalB'; // Import SubModalB
import styles from '../config/fonts';

interface ThemeListProps {
  categoryCode: string;
  selectedServiceCode: string;
  onSelectColor: (colors: string[]) => void;
  selectedColors: string[];
  setSelectedColors: React.Dispatch<React.SetStateAction<string[]>>;
  onModalCountsChange: (modalCounts: { name: string; price: string; }[]) => void;
  selectedModalCounts: string[];
}

// Define a type for calculatedPrices
interface CalculatedPrices {
  [key: string]: number;
}

const ThemeList: React.FC<ThemeListProps> = ({
  categoryCode, selectedServiceCode, selectedColors, setSelectedColors, onModalCountsChange
}) => {
  const [modalCounts, setModalCounts] = useState<ModalCount[]>([]);
  const [selectedModalCounts, setSelectedModalCounts] = useState<string[]>([]);
  const [isSubModalVisible, setIsSubModalVisible] = useState<boolean>(false);
  const [subtotal, setSubtotal] = useState<number>(0);
  const [calculatedPrices, setCalculatedPrices] = useState<CalculatedPrices>({} as CalculatedPrices);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const loadData = async () => {
      try {
        const modalCountsData = await fetchModalCounts({ categoryCode, serviceCode: selectedServiceCode });
        setModalCounts(modalCountsData);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    loadData();
  }, [categoryCode, selectedServiceCode]);

  useEffect(() => {
    // Modify the calculation of prices to include the counter
    const newCalculatedPrices: CalculatedPrices = {};
    let newSubtotal = 0;

    modalCounts.forEach(modalCount => {
      if (selectedModalCounts.includes(modalCount.id)) {
        let price = modalCount.price;
        if (modalCount.sub === 1) {
          price *= counter; // Multiply the price by the counter if modalCount.sub is 1
        }
        newCalculatedPrices[modalCount.id] = price;
        newSubtotal += price;
      }
    });

    setCalculatedPrices(newCalculatedPrices);
    setSubtotal(newSubtotal);
  }, [modalCounts, selectedModalCounts, counter]);

  useEffect(() => {
    // Explicitly type newCalculatedPrices as CalculatedPrices
    const newCalculatedPrices: CalculatedPrices = {};
    let newSubtotal = 0;

    modalCounts.forEach(modalCount => {
      if (selectedModalCounts.includes(modalCount.id) || (modalCount.logic === 'OR' && selectedColors.length > 1)) {
        const price = modalCount.logic === 'OR'
          ? Math.floor(modalCount.price * (selectedColors.length - 1))
          : modalCount.price;
        newCalculatedPrices[modalCount.id] = price;
        newSubtotal += price;
      }
    });

    setCalculatedPrices(newCalculatedPrices);
    setSubtotal(newSubtotal);
  }, [modalCounts, selectedModalCounts, selectedColors]);

  useEffect(() => {
    // Ensure at least one 'NOT' item is selected if present
    const notItems = modalCounts.filter((modalCount) => modalCount.logic === 'NOT');
    if (notItems.length > 0 && !selectedModalCounts.some((item) => notItems.map((notItem) => notItem.id).includes(item))) {
      // Select the first 'NOT' item by default
      setSelectedModalCounts((prevSelected) => [...prevSelected, notItems[0].id]);
    }
  }, [modalCounts, selectedModalCounts, selectedColors]);

  const handleModalCountPress = (id: string, logic: string, sub: number) => {
    if (logic === 'OR' && sub > 0) {
      // Open SubModal when logic is 'OR' and sub > 0
      setIsSubModalVisible(true);
    } else if (logic === 'NOT') {
      // Open SubModalB when logic is 'NOT' and sub > 0
      if (sub > 0) {
        setIsSubModalVisible(true);
      }

      // Ensuring exclusivity for 'NOT' logic
      if (selectedModalCounts.length === 1 && selectedModalCounts[0] === id) {
        // Do nothing if the only selected item is 'NOT'
        return;
      }

      setSelectedModalCounts((prevSelected) =>
        prevSelected.includes(id)
          ? prevSelected.filter((item) => item !== id)
          : [id]
      );
    } else {
      // Toggling selection for other logics
      setSelectedModalCounts((prevSelected) =>
        prevSelected.includes(id)
          ? prevSelected.filter((item) => item !== id)
          : [...prevSelected, id]
      );
    }
  };

  const logSelectedModalCounts = () => {
    const selectedCounts = modalCounts.filter((modalCount: ModalCount) =>
      selectedModalCounts.includes(modalCount.id) || (modalCount.logic === 'OR' && selectedColors.length > 1)
    ).map(modalCount => ({
      name: modalCount.name,
      price: `${calculatedPrices[modalCount.id]}€`
    }));

    const subtotalItem = {
      name: "Sub total",
      price: `${subtotal}€`
    };

    selectedCounts.push(subtotalItem);

    // Use the callback to pass data to the parent
    onModalCountsChange(selectedCounts);
  };

  // Update useEffect to call this function
  useEffect(() => {
    logSelectedModalCounts();
  }, [selectedColors, modalCounts, selectedModalCounts, subtotal]);

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
              {calculatedPrices[modalCount.id] !== undefined
                ? `${calculatedPrices[modalCount.id]}€`
                : ''}
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

      {isSubModalVisible && (
        modalCounts.find(modalCount => modalCount.id === selectedModalCounts[0])?.sub === 2 ? (
          <SubModal
            isVisible={isSubModalVisible}
            onClose={closeSubModal}
            selectedColors={selectedColors}
            setSelectedColors={setSelectedColors}
          />
        ) : (
          <SubModalB
            isVisible={isSubModalVisible}
            onClose={closeSubModal}
            onCounterChange={setCounter} // Pass setCounter as the onCounterChange prop
          />
        )
      )}
    </View>
  );
};

export default ThemeList;