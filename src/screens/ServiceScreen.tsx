//ServiceScreen.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import McentralSection from '../components/McentralSection';
import { NavigationProp, ParamListBase } from '@react-navigation/native';

interface ServiceScreenProps {
  navigation: NavigationProp<ParamListBase>;
}

const ServiceScreen: React.FC<ServiceScreenProps> = (props) => {
  return (
    <View style={styles.container}>
      <McentralSection navigation={props.navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // Ensures that the container takes up the whole screen
    backgroundColor: 'black', // Sets the background color to black
  },
});

export default ServiceScreen;
