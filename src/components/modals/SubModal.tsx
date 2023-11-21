// SubModal.tsx:
import React from 'react';
import { View, Text } from 'react-native';

interface SubModalProps {
    isVisible: boolean;
    onClose: () => void;
}

const SubModal: React.FC<SubModalProps> = ({ isVisible, onClose }) => {
    if (!isVisible) return null;

    return (
        <View style={{ backgroundColor: 'red' }}>
            <Text style={{ color: 'white' }}>Sub Modal</Text>
        </View>
    );
};

export default SubModal;
