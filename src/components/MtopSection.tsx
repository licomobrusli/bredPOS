import React from 'react';
import { View, Text } from 'react-native';
import styles from '../config/styles';
import SDims from '../config/dimensions';

const MtopSection: React.FC = () => {
  return (
    <View style={{ height: SDims.Height20p, backgroundColor: 'black', justifyContent: 'center', alignItems: 'center' }}>
      <Text style={styles.txtBrandBanner}>MOGANS</Text>
      <Text style={styles.txtSubBrandBanner}>BARBER SHOP</Text>
    </View>
  );
};

export default MtopSection;
