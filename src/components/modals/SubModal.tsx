// SubModal.tsx:
import React from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';
import SDims from '../../config/dimensions';
import fonts from '../../config/fonts';

interface SubModalProps {
    isVisible: boolean;
    onClose: () => void;
    onSelectColor: (color: string) => void;
}

const SubModal: React.FC<SubModalProps> = ({ isVisible, onClose, onSelectColor }) => {

    const colorsRowOne = ['#1e57a4', '#00afaa', '#3aa935', '#e62d39', '#d40658'];
    const colorsRowTwo = ['#e594bf', '#f7eb63', '#ec6b1c', '#e8473e', '#452462'];
    
    const handleSelectColor = (color: string) => {
        onSelectColor(color); // Use the selected color
        onClose(); // Close the modal
    };

    return (
        <Modal
            visible={isVisible}
            onRequestClose={onClose}
            transparent
        >
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
                    <Text style={fonts.txtSubBrandBanner}>SELECIONAR COLOR</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                        {colorsRowOne.map(color => (
                            <TouchableOpacity key={color} onPress={() => handleSelectColor(color)} style={{ 
                                height: SDims.Height5p, 
                                width: SDims.Height5p, 
                                borderColor: 'white', 
                                borderWidth: 1, 
                                backgroundColor: color, 
                                margin: SDims.Height5p / 5
                            }} />
                        ))}
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                        {colorsRowTwo.map(color => (
                            <TouchableOpacity key={color} onPress={() => handleSelectColor(color)} style={{ 
                                height: SDims.Height5p, 
                                width: SDims.Height5p, 
                                borderColor: 'white', 
                                borderWidth: 1, 
                                backgroundColor: color, 
                                margin: SDims.Height5p / 5
                            }} />
                        ))}
                    </View>
                    <TouchableOpacity onPress={onClose}>
                        <View style={{}}>
                            <Text style={fonts.txtNavButton}>Cerrar</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

export default SubModal;