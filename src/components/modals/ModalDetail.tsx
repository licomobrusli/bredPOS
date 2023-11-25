// ModalDetail.tsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import SDims from '../../config/dimensions';
import SwatchGridStyle from '../../config/swatchGridStyle';
import Fonts from '../../config/fonts';
import SubModal from '../modals/SubModal';

interface ModalDetailProps {
  selectedColors: string[];
  setSelectedColors: React.Dispatch<React.SetStateAction<string[]>>; // Add this line
  onSwatchPress: () => void;
}

const ModalDetail: React.FC<ModalDetailProps> = ({
  selectedColors, setSelectedColors, onSwatchPress // Update this line
}) => {
  const [isSubModalVisible, setIsSubModalVisible] = useState<boolean>(false);

  const toggleSubModal = () => {
    setIsSubModalVisible(!isSubModalVisible);
  };

  return (
    <View style={{ padding: SDims.Height5p / 2 }}>
      {selectedColors.length > 0 && (
        <Text style={Fonts.txtProductCard}>
          Selected Colors: {selectedColors.length}
        </Text>
      )}
      <SwatchGridStyle
        colors={selectedColors}
        onSelectColor={() => {}}
        selectedColors={selectedColors}
      />
      <TouchableOpacity onPress={toggleSubModal}>
        <View>
          <Text style={Fonts.txtModalCounts}>Open/Close SubModal</Text>
        </View>
      </TouchableOpacity>
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
