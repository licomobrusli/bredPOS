    // swatchGridStyle.tsx
    import React from 'react';
    import { View, TouchableOpacity } from 'react-native';
    import SDims from './dimensions';

    interface SwatchGridStyleProps {
        colors: string[];
        onSelectColor: (color: string) => void;
        selectedColors: string[];
        selectedSwatchStyle?: {
            backgroundColor: string;
            borderColor: string;
            borderWidth: number;
        };
    }

    const SwatchGridStyle: React.FC<SwatchGridStyleProps> = ({ colors, onSelectColor, selectedColors, selectedSwatchStyle }) => {
        // Determine the total space for a row
        const totalRowSpace = SDims.Height5p * 5 + (SDims.Height5p / 5 * 2) * 5;

        return (
            <View style={{ alignSelf: 'center', flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'center', width: totalRowSpace }}>
                {colors.map(color => {
                    const isSelected = selectedColors.includes(color);

                    console.log(`Color: ${color}, Is Selected: ${isSelected}`);

                    let style = { borderColor: 'white'
                        , borderWidth: 0
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
                                margin: SDims.Height5p / 5,
                                ...style,
                            }}
                        />
                    );
                })}
            </View>
        );
    };

    export default SwatchGridStyle;