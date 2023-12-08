// ModalDetail.tsx
import React, { useState } from 'react';
import { View, Text } from 'react-native';
import SDims from '../../config/dimensions';
import SwatchGridStyle from '../../config/swatchGridStyle';
import Fonts from '../../config/fonts';
import SubModal from '../modals/SubModal';

interface ModalDetailProps {
  selectedColors: string[];
  setSelectedColors: React.Dispatch<React.SetStateAction<string[]>>;
}

const ModalDetail: React.FC<ModalDetailProps> = ({
  selectedColors, setSelectedColors
}) => {
  const [isSubModalVisible, setIsSubModalVisible] = useState<boolean>(false);

  const toggleSubModal = () => {
    setIsSubModalVisible(!isSubModalVisible);
  };

  const handleSwatchPress = () => {
    toggleSubModal();
  };

  return (
    <View style={{ height: 90 }}>
      {selectedColors.length > 0 && (
        <Text style={Fonts.txtProductCard}>
          Selected Colors: {selectedColors.length}
        </Text>
      )}
      <SwatchGridStyle
        colors={selectedColors}
        onSelectColor={handleSwatchPress}
        selectedColors={selectedColors}
        selectedSwatchStyle={{
          borderColor: 'white',
          borderWidth: 5,
        }}
      />
      <SubModal
        isVisible={isSubModalVisible}
        onClose={toggleSubModal}
        selectedColors={selectedColors}
        setSelectedColors={setSelectedColors}
      />
    </View>
  );
};

export default ModalDetail;
