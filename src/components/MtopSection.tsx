import React from 'react';
import { View, Text } from 'react-native';
import fonts from '../config/fonts';
import SDims from '../config/dimensions';

const MtopSection: React.FC = () => {
  return (
    <View style={{ height: SDims.HeightTopSection, backgroundColor: 'black', justifyContent: 'center', alignItems: 'center' }}>
      <Text style={fonts.txtBrandBanner}>MOGANS</Text>
      <Text style={fonts.txtSubBrandBanner}>BARBER SHOP</Text>
    </View>
  );
};

export default MtopSection;
