// CutModal.tsx
import React, { useState } from 'react';
import { Modal, View } from 'react-native';
import ModalTheme from './ModalTheme';
import ModalDetail from './ModalDetail';
import ModalFooter from './ModalFooter';
import SDims from '../../config/dimensions';
import SubModal from './SubModal';

interface CutModalProps {
  visible: boolean;
  onClose: () => void;
  selectedCategoryImage: string;
  selectedServiceImage: string;
  categoryCode: string;
  selectedServiceCode: string;
}

const CutModal: React.FC<CutModalProps> = ({
  visible, onClose, selectedCategoryImage, selectedServiceImage, categoryCode, selectedServiceCode
}) => {
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [isSubModalVisible, setIsSubModalVisible] = useState<boolean>(false);
  // AddToCart
  const handleAddToCart = () => {
    // Example values - replace with actual data retrieval logic
    const serviceName = "Service Name"; // Replace with actual service name retrieval logic
    const categoryName = "Category Name"; // Replace with actual category name retrieval logic
    // const modalCountsDetails = []; // Replace with actual modal_counts details retrieval logic
    const subtotal = { name: "Subtotal", price: 0 }; // Replace with actual subtotal retrieval logic
    console.log('Add to Cart Details:', {
      serviceName,
      serviceCode: selectedServiceCode,
      categoryName,
      categoryCode,
      // modalCountsDetails,
      selectedColors,
      subtotal
    });
  };

  // Function to toggle SubModal visibility
  const toggleSubModal = () => {
    setIsSubModalVisible(!isSubModalVisible);
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={{ flex: 1, justifyContent: 'flex-end', marginBottom: SDims.Height10p, alignItems: 'center' }}>
        <View style={{
          height: SDims.HeightCentralSection ,
          width: SDims.Width100p,
          justifyContent: 'space-between',
          backgroundColor: 'black',
        }}>
          <View style={{ height: SDims.HeightCentralSection * .5 }}>
          <ModalTheme
            categoryCode={categoryCode}
            selectedServiceCode={selectedServiceCode}
            onSelectColor={setSelectedColors}
            setSelectedColors={setSelectedColors}
            selectedColors={selectedColors}
          />
          </View>
          <View style={{ height: SDims.HeightCentralSection * .25 }}>
          <ModalDetail 
            selectedColors={selectedColors}
            setSelectedColors={setSelectedColors}
          />
          </View>
          <View style={{ height: SDims.HeightCentralSection * .25 }}>
            <ModalFooter onClose={onClose} onAddToCart={handleAddToCart} />
          </View>
        </View>
      </View>
      {isSubModalVisible && (
        <SubModal
          isVisible={isSubModalVisible}
          onClose={() => setIsSubModalVisible(false)}
          selectedColors={selectedColors} // Passing selectedColors to SubModal
          setSelectedColors={setSelectedColors} // Passing setSelectedColors to SubModal
        />
      )}
    </Modal>
  );
};

export default CutModal;
