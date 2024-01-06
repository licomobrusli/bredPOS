// printOS.tsx
import * as React from "react";
import { StyleSheet, Modal, Text, TouchableOpacity, View, Button } from "react-native";
import { USBPrinter } from "react-native-thermal-receipt-printer";
import { LogBox } from 'react-native';
import { CartItem } from './types'; 
import { BRDImage } from '../main/assets/images'; 

// ESC/POS command constants
const ESC = '\x1B'; // ESC byte in hex notation
const ALIGN_LEFT = `${ESC}a0`; // ESC a n1 - Set text alignment to the left
// Add other ESC/POS command constants here if needed


LogBox.ignoreLogs([
  'new NativeEventEmitter()', // Suppresses the specific warnings
]);

interface PrintOSProps {
  visible: boolean;
  onClose: () => void;
  cartItems: CartItem[];
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
      // Sort and group items by selectedCategory.name
      const groupedItems = cartItems
        .filter(item => item.selectedCategory !== null) // Add this line to filter out items where selectedCategory is null
        .sort((a, b) => (a.selectedCategory!.name > b.selectedCategory!.name ? 1 : -1)) // Use the non-null assertion operator (!) after ensuring it's not null
        .reduce((acc: Record<string, CartItem[]>, item: CartItem) => {
          if(item.selectedCategory !== null) { // Check that selectedCategory is not null
            const categoryName = item.selectedCategory.name;
            acc[categoryName] = acc[categoryName] || [];
            acc[categoryName].push(item);
          }
          return acc;
        }, {});

      const lineWidth = 45;

      let printText = '';
      printText += `${BRDImage}\n\n`;
      for (const [category, items] of Object.entries(groupedItems)) {
        // Print category name in large text
        printText += `<CB>${category}</CB>\n`;

        // Print item details
        items.forEach((item: CartItem) => {
          const firstModalCount = item.modalCountsDetails[0];
          const subtotalModalCount = item.modalCountsDetails[item.modalCountsDetails.length - 1];
  
          let details;
          if (item.selectedColors) {
          switch (firstModalCount.sub) {
            case 0:
              details = null;
              break;
            case 1:
              details = item.counterValue;
              break;
            case 2:
              details = item.selectedColors.length > 0 ? item.selectedColors.join(", ") : "No Colors";
              break;
            default:
              details = "Undefined";
          }
        }
  
        if (firstModalCount && details !== undefined && subtotalModalCount) {
          const leftPart = `${firstModalCount.name}, `;
          const middlePart = `${details}, `;
          const rightPart = `${subtotalModalCount.price}`;
          
          // Calculate the spaces needed for right alignment
          const maxLeftPartLength = 20;
          const totalLength = maxLeftPartLength + middlePart.length + rightPart.length;
          const spacesNeeded = lineWidth - totalLength;
          const leftSpacesNeeded = maxLeftPartLength - leftPart.length;
          const spacesLeft = ' '.repeat(leftSpacesNeeded > 0 ? leftSpacesNeeded : 0);
          const spaces = ' '.repeat(spacesNeeded > 0 ? spacesNeeded : 0);
          
          // Combine left and right parts with spaces in between
          printText += `${ALIGN_LEFT}${leftPart}${spacesLeft}${middlePart}${spaces}${rightPart}\n\n`;
        }
      });
  
      // Add a carriage return after each category
      printText += `\n\n<QR>1</QR>\n`;
    }
  
      // Print the constructed text
      if (printText) {
        await USBPrinter.printBill(printText);
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
