// swatchGridStyle.tsx
import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import SDims from './dimensions';

interface SwatchGridStyleProps {
    colors: string[];
    onSelectColor: (color: string) => void;
    selectedColors: string[];
    selectedSwatchStyle?: {
        backgroundColor?: string;
        borderColor: string;
        borderWidth: number;
    };
}

const SwatchGridStyle: React.FC<SwatchGridStyleProps> = ({ colors, onSelectColor, selectedColors, selectedSwatchStyle }) => {

    return (
        <View style={{ 
            alignSelf: 'center',
            flexWrap: 'wrap',
            flexDirection: 'row',
            justifyContent: 'center',
            width: SDims.Width50p + SDims.Width5p }}>
            {colors.map(color => {
                const isSelected = selectedColors.includes(color);

                let style = { borderColor: '#AD8457'
                    , backgroundColor: color
                };

                if (isSelected && selectedSwatchStyle) {
                    style = { ...style, ...selectedSwatchStyle};
                }

                return (
                    <TouchableOpacity
                        key={color}
                        onPress={() => {
                            onSelectColor(color)
                        }}
                        style={{
                            height: SDims.Height5p,
                            width: SDims.Height5p,
                            margin: SDims.Height5p / 7.55,
                            ...style,
                        }}
                    />
                );
            })}
        </View>
    );
};

export default SwatchGridStyle;