// ModalDetail.tsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import SDims from '../../config/dimensions';
import SwatchGridStyle from '../../config/swatchGridStyle';
import Fonts from '../../config/fonts';
import SubModal from '../modals/SubModal'; // Adjust the import path as needed

interface ModalDetailProps {
  selectedColors: string[];
  onSwatchPress: () => void;
}

const ModalDetail: React.FC<ModalDetailProps> = ({ selectedColors, onSwatchPress }) => {
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
      />
    </View>
  );
};

export default ModalDetail;
