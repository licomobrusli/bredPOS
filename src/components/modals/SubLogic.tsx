// SubLogic.tsx
import React, { useState } from 'react';
import SubModal from '../modals/SubModal';

interface SubLogicProps {
  onSelectColor: (colors: string[]) => void;
}

const SubLogic: React.FC<SubLogicProps> = ({ onSelectColor }) => {
  const [isSubModalVisible, setIsSubModalVisible] = useState<boolean>(false);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);

  const handleSelectColor = (colors: string[]) => {
    setSelectedColors(colors);
    onSelectColor(colors);
  };

  const openSubModal = () => setIsSubModalVisible(true);
  const closeSubModal = () => setIsSubModalVisible(false);

  return (
    <SubModal
      isVisible={isSubModalVisible}
      onClose={closeSubModal}
      onSelectColor={handleSelectColor}
      selectedColors={selectedColors}
    />
  );
};

export default SubLogic;
