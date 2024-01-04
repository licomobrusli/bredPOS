import React, { useContext } from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';
import SDims from '../../config/dimensions';
import fonts from '../../config/fonts';
import SwatchGridStyle from '../../config/swatchGridStyle';
import swatchColorsContext from '../../config/swatchColorsContext';
import { SwatchColorData } from '../../config/types'; // Correct the path as needed

interface SubModalProps {
  isVisible: boolean;
  onClose: () => void;
  selectedColors: string[];
  setSelectedColors: React.Dispatch<React.SetStateAction<string[]>>;
}

const SubModal: React.FC<SubModalProps> = ({ isVisible, onClose, selectedColors, setSelectedColors }) => {
  // Access and type the swatch colors data from context
  const swatchColorsData = useContext(swatchColorsContext) as SwatchColorData[] || [];

  // Sort the swatch colors by their codes and map them to their hex values
  const sortedColors = swatchColorsData.sort((a, b) => a.code.localeCompare(b.code)).map(color => color.image_path);

  // Assuming there are exactly 10 colors, split them into two rows
  const colorsRowOne = sortedColors.slice(0, 5);
  const colorsRowTwo = sortedColors.slice(5, 10);

  const selectedSwatchStyle = { 
      backgroundColor: 'black',
      borderColor: '#AD8457',
      borderWidth: SDims.D5px,
  };

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
        <View style={{ marginTop: SDims.Height48p, alignItems: 'center' }}>
            <View style={{
                height: SDims.HeightCentralSection * .72,
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
