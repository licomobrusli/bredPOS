// SubModalB.tsx
import React, { useEffect, useState } from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';
import SDims from '../../config/dimensions';
import fonts from '../../config/fonts';

interface SubModalBProps {
  isVisible: boolean;
  onClose: () => void;
  onCounterChange: (count: number) => void;
  selectedValue: number;
}

const SubModalB: React.FC<SubModalBProps> = ({ isVisible, onClose, onCounterChange, selectedValue }) => {
  const [counter, setCounter] = useState(selectedValue);

  // Update the counter when selectedValue changes
  useEffect(() => {
    setCounter(selectedValue);
  }, [selectedValue]);

  const handleIncrement = () => {
    setCounter(prevCounter => {
      const newCounter = prevCounter + 1;
      onCounterChange(newCounter);
      return newCounter;
    });
  };

  const handleDecrement = () => {
    if (counter > 1) {
      setCounter(prevCounter => {
        const newCounter = prevCounter - 1;
        onCounterChange(newCounter);
        return newCounter;
      });
    }
  };

  return (
    <Modal visible={isVisible} onRequestClose={onClose} transparent>
      <View style={{ marginTop: SDims.Height49p, alignItems: 'center' }}>
        <View style={{
          height: SDims.HeightCentralSection * .7,
          width: SDims.Width90p,
          backgroundColor: 'black',
          borderColor: '#AD8457',
          borderWidth: SDims.D2px,
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <Text style={fonts.txtCard}>Numero de lineas</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity onPress={handleDecrement}>
              <Text style={fonts.txtBanner}>-</Text>
            </TouchableOpacity>
            <Text style={fonts.txtBanner}> {counter} </Text>
            <TouchableOpacity onPress={handleIncrement}>
              <Text style={fonts.txtBanner}>+</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={onClose}>
            <View>
              <Text style={fonts.txtCard}>Cerrar</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

export default SubModalB;
