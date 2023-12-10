//CategoryScreen.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import McentralSection from '../components/McentralSection'; // Adjust the import path as necessary

const CategoryScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <McentralSection />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // Ensures that the container takes up the whole screen
    backgroundColor: 'black', // Sets the background color to black
  },
});

export default CategoryScreen;
