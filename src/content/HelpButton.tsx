// HelpButton.tsx
import React, { useState } from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { useNavigationState } from '@react-navigation/native';
import customStyles from '../config/styles';
import HelpModal from '../components/modals/HelpModal';

const HelpButton: React.FC = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const state = useNavigationState(state => state);

  const handlePress = () => {
    setModalVisible(true);
  };

  const isHelpButtonVisible = state.routes.length === 1;

  return (
    <>
      {isHelpButtonVisible && (
        <TouchableOpacity onPress={handlePress} style={styles.helpButton}>
          <View style={styles.transparentCard}>
            <Text style={customStyles.txtNavButton}>Ayuda</Text>
          </View>
        </TouchableOpacity>
      )}
      <HelpModal isVisible={isModalVisible} onClose={() => setModalVisible(false)} />
    </>
  );
};

const styles = StyleSheet.create({
  helpButton: {
    width: 300, // Adjust the size as needed
    height: 100, // Adjust the size as needed
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 5,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  transparentCard: {
    backgroundColor: 'transparent',
    borderRadius: 5,
  },
});

export default HelpButton;
