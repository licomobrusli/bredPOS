// ThemeList.tsx
import React, { useEffect, useState } from 'react';
import { View, Dimensions, Text, TouchableOpacity } from 'react-native';
import Buttons from '../config/buttons';
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
  onModalCountsChange: (modalCounts: { name: string; price: string; unitPrice: number; sub: number }[]) => void;
  selectedModalCounts: string[];
}

interface PriceDetails {
  unitPrice: number;
  quantity: number;
  totalPrice: number;
}

interface CalculatedPrices {
  [key: string]: PriceDetails;
}

const ThemeList: React.FC<ThemeListProps> = ({
  categoryCode, selectedServiceCode, selectedColors, setSelectedColors, onModalCountsChange
}) => {
  const [modalCounts, setModalCounts] = useState<ModalCount[]>([]);
  const [selectedModalCounts, setSelectedModalCounts] = useState<string[]>([]);
  const [isSubModalVisible, setIsSubModalVisible] = useState<boolean>(false);
  const [subtotal, setSubtotal] = useState<number>(0);
  const [calculatedPrices, setCalculatedPrices] = useState<CalculatedPrices>({} as CalculatedPrices);
  const [counter, setCounter] = useState(1);

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
    const newCalculatedPrices: CalculatedPrices = {};
    let newSubtotal = 0;
  
    modalCounts.forEach(modalCount => {
      if (selectedModalCounts.includes(modalCount.id) || (modalCount.logic === 'OR' && selectedColors.length > 1)) {
        const unitPrice = modalCount.price;
        let quantity = modalCount.logic === 'OR' ? selectedColors.length - 1 : 1;

        // Special handling for 'Basic design'
        if (modalCount.name === 'Basic design') {
          quantity = counter;  // Use counter value for 'Basic design'
        }

        const totalPrice = unitPrice * quantity;
        newCalculatedPrices[modalCount.id] = { unitPrice, quantity, totalPrice };
        newSubtotal += totalPrice;
      }
    });
  
    setCalculatedPrices(newCalculatedPrices);
    setSubtotal(newSubtotal);
  }, [modalCounts, selectedModalCounts, selectedColors, counter]);

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
    ).map(modalCount => {
      const priceDetail = calculatedPrices[modalCount.id];
      return {
        name: modalCount.name,
        price: priceDetail ? `${priceDetail.totalPrice}€` : '',
        unitPrice: priceDetail ? priceDetail.unitPrice : 0,
        sub: modalCount.sub,
        logic: modalCount.logic
      };
    });

    const subtotalItem = {
      name: "Sub total",
      price: `${subtotal}€`,
      unitPrice: 0,
      sub: 0,
      logic: ''
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
    <View style={{ backgroundColor: 'black', justifyContent: 'center' }}>
      {modalCounts.map(modalCount => (
        <TouchableOpacity
          key={modalCount.id}
          onPress={() => handleModalCountPress(modalCount.id, modalCount.logic, modalCount.sub)}
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: isModalCountSelected(modalCount) ? 'red' : 'black',
            alignSelf: 'center',
            width: screenWidth * 0.55,
            marginVertical: 10,
            borderColor: 'red',
            borderWidth: 1
          }}
        >
          <Text style={[styles.txtList, { flex: 4.2, textAlign: 'left', paddingLeft: 10 }]}>
            {modalCount.name.toUpperCase()}
          </Text>
          <Text style={[styles.txtList, { flex: 1, textAlign: 'right', paddingRight: 10 }]}>
            {calculatedPrices[modalCount.id] ? `${calculatedPrices[modalCount.id].totalPrice}€` : ''}
          </Text>
        </TouchableOpacity>
      ))}

      {/* Use ListButton for displaying subtotal */}
      <Buttons.ListButton
        name="SUBTOTAL"
        price={`${subtotal}€`}
        onPress={() => {/* Implement onPress action if needed */}}
      />

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
            onCounterChange={setCounter}
            selectedValue={counter}
          />
        )
      )}
    </View>
  );
};

export default ThemeList;
