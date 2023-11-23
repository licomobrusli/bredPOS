// SubModal.tsx:
import React from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';
import SDims from '../../config/dimensions';

interface SubModalProps {
    isVisible: boolean;
    onClose: () => void;
}

const SubModal: React.FC<SubModalProps> = ({ isVisible, onClose }) => {

    return (
        <Modal
            visible={isVisible}
            onRequestClose={onClose}
            transparent
        >
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <View style={{
                    width: SDims.Width80p,
                    height: SDims.Height50p,
                    backgroundColor: 'red',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <TouchableOpacity onPress={onClose}>
                        <Text style={{ color: 'white' }}>Close</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

export default SubModal;
