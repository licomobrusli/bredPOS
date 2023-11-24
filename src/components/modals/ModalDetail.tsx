// ModalDetail.tsx
import React from 'react';
import { View, Text } from 'react-native';
import SDims from '../../config/dimensions';
import SwatchGridStyle from '../../config/swatchGridStyle'; // Adjust the import path as needed
import Fonts from '../../config/fonts'; // Adjust the import path as needed

interface ModalDetailProps {
    selectedColors: string[];
    onSelectColor?: (color: string) => void; // Add this if needed for interaction
}

const ModalDetail: React.FC<ModalDetailProps> = ({ selectedColors, onSelectColor }) => {
    return (
        <View style={{ padding: SDims.Height5p / 2 }}>
            {selectedColors.length > 0 && (
                <Text style={Fonts.txtProductCard}>
                    Selected Colors: {selectedColors.length}
                </Text>
            )}
            <SwatchGridStyle
                colors={selectedColors}
                onSelectColor={onSelectColor || (() => {})} // Provide a default function if onSelectColor is not provided
                selectedColors={selectedColors}
            />
        </View>
    );
};

export default ModalDetail;
