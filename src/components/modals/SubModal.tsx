// SubModal.tsx:
import React from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';
import SDims from '../../config/dimensions';
import fonts from '../../config/fonts';

interface SubModalProps {
    isVisible: boolean;
    onClose: () => void;
}

const SubModal: React.FC<SubModalProps> = ({ isVisible, onClose }) => {

    const colorsRowOne = ['red', 'green', 'blue', 'yellow', 'pink'];
    const colorsRowTwo = ['purple', 'orange', 'brown', 'grey', 'cyan'];

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
                    <Text style={fonts.txtSubBrandBanner}>Seleccionar color</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', padding: 10 }}>
                        {colorsRowOne.map(color => (
                            <View key={color} style={{ height: 50, width: 50, backgroundColor: color }} />
                        ))}
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', padding: 10 }}>
                        {colorsRowTwo.map(color => (
                            <View key={color} style={{ height: 50, width: 50, backgroundColor: color }} />
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
