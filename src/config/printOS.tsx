// printOS.tsx
import * as React from "react";
import { StyleSheet, Modal, Text, TouchableOpacity, View, Button } from "react-native";
import { USBPrinter } from "react-native-thermal-receipt-printer";
import { LogBox } from 'react-native';

LogBox.ignoreLogs([
  'new NativeEventEmitter()', // Suppresses the specific warnings
]);

interface PrintOSProps {
  visible: boolean;
  onClose: () => void;
  cartItems: any[];
}

// Include the props in your function component
export default function PrintOS({ visible, onClose, cartItems }: PrintOSProps) {
  const [loading, setLoading] = React.useState<boolean>(false);
  const defaultPrinter = {
    device_id: 2003, 
    device_name: "/dev/bus/usb/002/003",
    product_id: 30016,
    vendor_id: 1155
  };

  React.useEffect(() => {
    const connectToDefaultPrinter = async () => {
      try {
        setLoading(true);
        await USBPrinter.init();
        await USBPrinter.connectPrinter(defaultPrinter.vendor_id as unknown as string, defaultPrinter.product_id as unknown as string);
      } catch (err) {
        console.warn(err);
      } finally {
        setLoading(false);
      }
    };
    connectToDefaultPrinter();
  }, []);

  const handlePrint = async () => {
    try {
      // Iterate through each cartItem and construct the print text
      let printText = '';
      cartItems.forEach(item => {
        // Ensure the required properties exist
        if(item.selectedCategory && item.firstModalCount && item.details && item.subtotalModalCount) {
          printText += `<C>${item.selectedCategory.name}, ${item.firstModalCount.name}, ${item.details}, ${item.subtotalModalCount.price}</C>\n`;
        }
      });

      // Print the constructed text
      if(printText) {
        await USBPrinter.printText(printText);
      } else {
        console.log("No items to print");
      }
    } catch (err) {
      console.warn(err);
    }
  };

  return (
    <Modal
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <Button
          disabled={loading}
          title="Print sample"
          onPress={handlePrint}
        />
        {/* Add a button or touchable opacity to close the modal */}
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Text>Close</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
    backgroundColor: 'rgba(0,0,0,0.5)', // Semi-transparent background
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#ddd',
    alignSelf: 'center',
  },
});
