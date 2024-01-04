// ModalDetail.tsx
import React, { useState } from 'react';
import { View, Text } from 'react-native';
import SwatchGridStyle from '../../config/swatchGridStyle';
import Fonts from '../../config/fonts';
import SubModal from '../modals/SubModal';
import SDims from '../../config/dimensions';

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
        <Text style={Fonts.txtCard}>
          Colores seleccionados
        </Text>
      )}
      <SwatchGridStyle
        colors={selectedColors}
        onSelectColor={handleSwatchPress}
        selectedColors={selectedColors}
        selectedSwatchStyle={{
          borderColor: '#AD8457',
          borderWidth: SDims.D5px,
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
