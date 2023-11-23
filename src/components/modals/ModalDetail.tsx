// ModalDetail.tsx
import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import SDims from '../../config/dimensions';


interface ModalDetailProps {
    selectedColors: string[];
}

const ModalDetail: React.FC<ModalDetailProps> = ({ selectedColors }) => {
    return (
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', padding: SDims.Height5p / 2 }}>
            {selectedColors.map(color => (
                <View 
                    key={color}
                    style={{
                        height: SDims.Height5p,
                        width: SDims.Height5p,
                        backgroundColor: color,
                        margin: SDims.Height5p / 5
                    }}
                />
            ))}
        </View>
    );
};

export default ModalDetail;
