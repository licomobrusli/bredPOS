// printOS.tsx
import * as React from "react";
import { StyleSheet, Modal, Text, TouchableOpacity, View, Button } from "react-native";
import { ColumnAlignment, USBPrinter } from "react-native-thermal-receipt-printer-image-qr";
import { LogBox } from 'react-native';
import { CartItem } from './types'; 

LogBox.ignoreLogs([
  'new NativeEventEmitter()', // Suppresses specific warnings
]);

type TextItem = [string, string, string];

interface PrintOSProps {
  visible: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  calculateTotalPrice: () => number; // Add this line to accept calculateTotalPrice as a prop
}

export default function PrintOS({ visible, onClose, cartItems, calculateTotalPrice }: PrintOSProps) {
  const [loading, setLoading] = React.useState<boolean>(false);
  const defaultPrinter = {
    device_id: 2003, 
    device_name: "/dev/bus/usb/002/003",
    product_id: 30016,
    vendor_id: 1155
  };

  const CUT_PAPER = '\x1D\x56\x01';  // Define the cut paper command
  const ADVANCE_PAPER = '\x1B\x4A\xFF'; // Define the advance paper command

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
    const opts = {
      encoding: 'ISO-8859-15',
      codepage: 0,
      widthtimes: 3,
      heigthtimes: 3,
      fonttype: 1,
    };

    try {  
      // Prepare the data for printing
      const texts: TextItem[] = []; // Array of texts for each column
      const columnWidth = [16, 23, 6]; // Adjust the width as needed
      const columnAlignment = [
        ColumnAlignment.LEFT,
        ColumnAlignment.LEFT,
        ColumnAlignment.RIGHT,
      ];

      // Iterate over cart items and populate the columns
      cartItems.forEach((item: CartItem) => {
        const firstModalCount = item.modalCountsDetails[0];
        const subtotalModalCount = item.modalCountsDetails[item.modalCountsDetails.length - 1];
        let details;

        if (item.selectedColors) {
          switch (firstModalCount.sub) {
            case 0:
              details = '1';
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
          const leftPart = `${firstModalCount.name}`;
          const middlePart = `${details}`;
          const rightPart = `${subtotalModalCount.price}`;

          texts.push([leftPart, middlePart, rightPart]);
        }
      });

      // Print the constructed data
      if (texts.length > 0) {
        await USBPrinter.printImage('https://i.ibb.co/m5YYKnL/Mogans-Logo-Receipt.png');
        await USBPrinter.printColumnsText(['ARTICULO', 'DETAIL', 'PRECIO'], columnWidth, columnAlignment, [], opts);
        for (let textSet of texts) {
          await USBPrinter.printColumnsText(textSet, columnWidth, columnAlignment, [], opts);
        }
        const total = calculateTotalPrice();
        await USBPrinter.printColumnsText(['TOTAL', '', `${total} E`], columnWidth, columnAlignment, [], opts);
      } else {
        console.log("No items to print");
      }
    } catch (err) {
      console.warn(err);
    }
    await USBPrinter.printText(ADVANCE_PAPER);
    await USBPrinter.printText(CUT_PAPER);
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
