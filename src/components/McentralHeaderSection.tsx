// McentralHeaderSection.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BackButton from './BBack';

const McentralHeaderSection: React.FC<{ showBackButton?: boolean }> = ({ showBackButton }) => {
  return (
    <View style={styles.header}>
      {showBackButton && <BackButton />}
      <Text style={styles.headerText}>Header Section</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 50, // Adjust the height as needed for your header space
    justifyContent: 'center', // Changed to 'center' to align text properly
    alignItems: 'center',
    flexDirection: 'row',
    paddingRight: 10, // Padding to keep the button inside the screen bounds
    backgroundColor: '#FFA07A', // Salmon color for visibility
  },
  headerText: {
    flex: 1, // Take up all available space
    textAlign: 'center', // Center the text
    color: 'black', // White color for the text for contrast
  },
});

export default McentralHeaderSection;
