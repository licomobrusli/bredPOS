// swatchGridStyle.tsx
import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import SDims from './dimensions'; // Adjust the path as needed

interface SwatchGridStyleProps {
    colors: string[];
    onSelectColor: (color: string) => void;
}

const SwatchGridStyle: React.FC<SwatchGridStyleProps> = ({ colors, onSelectColor }) => {
    return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
            {colors.map(color => (
                <TouchableOpacity 
                    key={color} 
                    onPress={() => onSelectColor(color)} 
                    style={{ 
                        height: SDims.Height5p, 
                        width: SDims.Height5p, 
                        borderColor: 'white', 
                        borderWidth: 1, 
                        backgroundColor: color, 
                        margin: SDims.Height5p / 5 
                    }} 
                />
            ))}
        </View>
    );
};

export default SwatchGridStyle;
