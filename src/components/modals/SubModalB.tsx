import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';
import SDims from '../../config/dimensions';
import fonts from '../../config/fonts';

interface SubModalBProps {
  isVisible: boolean;
  onClose: () => void;
}

const SubModalB: React.FC<SubModalBProps> = ({ isVisible, onClose }) => {
  const [counter, setCounter] = useState(0);

  const handleIncrement = () => {
    setCounter(counter + 1);
  };

  const handleDecrement = () => {
    if (counter > 0) {
      setCounter(counter - 1);
    }
  };

  return (
    <Modal visible={isVisible} onRequestClose={onClose} transparent>
      <View style={{ flex: 1, justifyContent: 'flex-start', marginTop: SDims.HeightTopSection, alignItems: 'center' }}>
        <View style={{
          height: SDims.HeightCentralSection * .75,
          width: SDims.Width90p,
          backgroundColor: 'black',
          borderColor: 'red',
          borderWidth: 1,
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <Text style={fonts.txtSubBrandBanner}>COUNTER CONTROL</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity onPress={handleDecrement}>
              <Text style={fonts.txtNavButton}>-</Text>
            </TouchableOpacity>
            <Text style={fonts.txtSubBrandBanner}>{counter}</Text>
            <TouchableOpacity onPress={handleIncrement}>
              <Text style={fonts.txtNavButton}>+</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={onClose}>
            <View>
              <Text style={fonts.txtNavButton}>Cerrar</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

export default SubModalB;