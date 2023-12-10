// HelpButton.tsx
import React, { useState } from 'react';
import Buttons from '../config/buttons';
import HelpModal from '../components/modals/HelpModal';

const HelpButton: React.FC = () => {
  const [isModalVisible, setModalVisible] = useState(false);

  const handlePress = () => {
    setModalVisible(true);
  };

  // Assuming the logic to show the help button remains the same
  const isHelpButtonVisible = true; // Update this condition as needed

  return (
    <>
      {isHelpButtonVisible && (
        <Buttons.ButtonB title="Ayuda" onPress={handlePress} color="B" />
      )}
      <HelpModal isVisible={isModalVisible} onClose={() => setModalVisible(false)} />
    </>
  );
};

export default HelpButton;
