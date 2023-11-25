// SubModal.tsx
import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';
import SDims from '../../config/dimensions';
import fonts from '../../config/fonts';
import SwatchGridStyle from '../../config/swatchGridStyle';
import ModalDetail from './ModalDetail';

interface SubModalProps {
  isVisible: boolean;
  onClose: () => void;
}

const SubModal: React.FC<SubModalProps> = ({ isVisible, onClose }) => {
  const [selectedColors, setSelectedColors] = useState<string[]>([]);  // Manage selected colors independently
      
    const selectedSwatchStyle = { 
        backgroundColor: 'black',
        borderColor: 'white',
        borderWidth: 5,
    };
    const colorsRowOne = ['#1e57a4', '#00afaa', '#3aa935', '#e62d39', '#d40658'];
    const colorsRowTwo = ['#e594bf', '#f7eb63', '#ec6b1c', '#e8473e', '#452462'];
    const handleSelectColor = (color: string) => {
        let updatedSelectedColors = [...selectedColors];
        const colorIndex = updatedSelectedColors.indexOf(color);
    
        if (colorIndex >= 0) {
            updatedSelectedColors.splice(colorIndex, 1); // Remove the color
        } else {
            updatedSelectedColors.push(color); // Add the color
        }

        setSelectedColors(updatedSelectedColors); // Update with the new array
    };
    
    return (
    <Modal visible={isVisible} onRequestClose={onClose} transparent>
        <View style={{ flex: 1, justifyContent: 'flex-start', marginTop: SDims.HeightTopSection, alignItems: 'center' }}>
            <View style={{
                height: SDims.HeightCentralSection * .75,
                width: SDims.Width90p,
                backgroundColor: 'black',
                borderColor: 'red',
                borderWidth: 1,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Text style={fonts.txtSubBrandBanner}>SELECCIONAR COLORES</Text>
                <SwatchGridStyle
                    colors={colorsRowOne}
                    onSelectColor={handleSelectColor}
                    selectedColors={selectedColors}
                    selectedSwatchStyle={selectedSwatchStyle}
                />
                <SwatchGridStyle
                    colors={colorsRowTwo}
                    onSelectColor={handleSelectColor}
                    selectedColors={selectedColors}
                    selectedSwatchStyle={selectedSwatchStyle}
                />
                <TouchableOpacity onPress={onClose}>
                    <View>
                        <Text style={fonts.txtNavButton}>Cerrar</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    </Modal>
    );
}
export default SubModal;
