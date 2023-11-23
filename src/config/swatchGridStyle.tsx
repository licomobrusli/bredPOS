// swatchGridStyle.tsx
// swatchGridStyle.tsx
import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import SDims from './dimensions';

interface SwatchGridStyleProps {
    colors: string[];
    onSelectColor: (color: string) => void;
    selectedColors: string[];
}

const SwatchGridStyle: React.FC<SwatchGridStyleProps> = ({ colors, onSelectColor, selectedColors }) => {
    // Determine the total space for a row
    const totalRowSpace = SDims.Height5p * 5 + (SDims.Height5p / 5 * 2) * 5;

    return (
        <View style={{ alignSelf: 'center', flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'center', width: totalRowSpace }}>
            {colors.map(color => {
                const isSelected = selectedColors.includes(color);
                return (
                    <TouchableOpacity
                        key={color}
                        onPress={() => onSelectColor(color)}
                        style={{
                            height: SDims.Height5p,
                            width: SDims.Height5p,
                            borderColor: isSelected ? 'white' : 'white',
                            borderWidth: isSelected ? 5 : 0,
                            backgroundColor: color,
                            margin: SDims.Height5p / 5
                        }}
                    />
                );
            })}
        </View>
    );
};

export default SwatchGridStyle;
