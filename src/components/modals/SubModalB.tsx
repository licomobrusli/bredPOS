// SubModalB.tsx
import React from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';
import SDims from '../../config/dimensions';
import fonts from '../../config/fonts';

interface SubModalBProps {
  isVisible: boolean;
  onClose: () => void;
  onCounterChange: (count: number) => void;
  counterValue: number;
}

const SubModalB: React.FC<SubModalBProps> = ({ isVisible, onClose, onCounterChange, counterValue }) => {

  const handleIncrement = () => {
    onCounterChange(counterValue + 1);
  };

  const handleDecrement = () => {
    if (counterValue > 1) {
      onCounterChange(counterValue - 1);
    }
  };

  return (
    <Modal visible={isVisible} onRequestClose={onClose} transparent>
      <View style={{ marginTop: 1190, alignItems: 'center' }}>
        <View style={{
          height: SDims.HeightCentralSection * .7,
          width: SDims.Width90p,
          backgroundColor: 'black',
          borderColor: '#AD8457',
          borderWidth: 2,
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <Text style={fonts.txtCard}>Numero de lineas</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity onPress={handleDecrement}>
              <Text style={fonts.txtBanner}>-</Text>
            </TouchableOpacity>
            <Text style={fonts.txtBanner}> {counterValue} </Text>
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
