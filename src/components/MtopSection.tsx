import React from 'react';
import { View, Text } from 'react-native';
import styles from '../config/styles';

const MtopSection: React.FC = () => {
  return (
    <View style={{ height: 160, backgroundColor: 'black', justifyContent: 'center', alignItems: 'center' }}>
      <Text style={styles.txtBrandBanner}>MOGANS</Text>
      <Text style={styles.txtSubBrandBanner}>BARBER SHOP</Text>
    </View>
  );
};

export default MtopSection;
