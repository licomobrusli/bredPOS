// SubModal.tsx
import React from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';
import SDims from '../../config/dimensions';
import fonts from '../../config/fonts';
import SwatchGridStyle from '../../config/swatchGridStyle';

interface SubModalProps {
  isVisible: boolean;
  onClose: () => void;
  selectedColors: string[]; // Add this line
  setSelectedColors: React.Dispatch<React.SetStateAction<string[]>>;
}

const SubModal: React.FC<SubModalProps> = ({ isVisible, onClose, selectedColors, setSelectedColors }) => {
    const selectedSwatchStyle = { 
        backgroundColor: 'black',
        borderColor: '#AD8457',
        borderWidth: SDims.D5px,
    };
    const colorsRowOne = ['#1e57a4', '#00afaa', '#3aa935', '#e62d39', '#d40658'];
    const colorsRowTwo = ['#e594bf', '#f7eb63', '#ec6b1c', '#e8473e', '#452462'];

    const handleSelectColor = (color: string) => {
        let updatedSelectedColors = [...selectedColors];
        const colorIndex = updatedSelectedColors.indexOf(color);
        
        if (colorIndex >= 0) {
            updatedSelectedColors.splice(colorIndex, 1);
        } else {
            updatedSelectedColors.push(color);
        }
        
        setSelectedColors(updatedSelectedColors);
        };

    return (
    <Modal visible={isVisible} onRequestClose={onClose} transparent>
        <View style={{ marginTop: SDims.Height49p, alignItems: 'center' }}>
            <View style={{
                height: SDims.HeightCentralSection * .7,
                width: SDims.Width90p,
                backgroundColor: 'black',
                borderColor: '#AD8457',
                borderWidth: SDims.D2px,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Text style={fonts.txtCard}>SELECCIONAR COLORES</Text>
                <SwatchGridStyle
                    colors={colorsRowOne}
                    onSelectColor={handleSelectColor}
                    selectedColors={selectedColors ?? []}
                    selectedSwatchStyle={selectedSwatchStyle}
                />
                <SwatchGridStyle
                    colors={colorsRowTwo}
                    onSelectColor={handleSelectColor}
                    selectedColors={selectedColors ?? []}
                    selectedSwatchStyle={selectedSwatchStyle}
                />
                <TouchableOpacity onPress={onClose}>
                    <View>
                        <Text style={fonts.txtCard}>Cerrar</Text>
                    </View>
                </TouchableOpacity>
                <View style={{ height: 150 }}>
                    <SwatchGridStyle
                        colors={selectedColors ?? []}
                        onSelectColor={handleSelectColor}
                        selectedColors={selectedColors ?? []}
                        selectedSwatchStyle={{
                            borderColor: '#AD8457',
                            borderWidth: SDims.D5px,
                        }}
                    />
                </View>
            </View>
        </View>
    </Modal>
    );
}
export default SubModal;
