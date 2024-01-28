// printOS.ts
import RNQRGenerator from 'rn-qr-generator';
import { ColumnAlignment, USBPrinter } from "react-native-thermal-receipt-printer-image-qr";
import { CartItem } from './types';

type TextItem = [string, string, string];

const CUT_PAPER = '\x1D\x56\x01';
const ADVANCE_PAPER = '\x1B\x4A\x10';

export const printReceipt = async (cartItems: CartItem[], calculateTotalPrice: () => number, newOrderNumber: string) => {
  const defaultPrinter = {
    device_id: 2003,
    device_name: "/dev/bus/usb/002/003",
    product_id: 30016,
    vendor_id: 1155
  };

  const generateQRCode = async (text: string): Promise<string> => {
    try {
      const response = await RNQRGenerator.generate({
        value: text,
        height: 200,
        width: 200,
        base64: true,
        correctionLevel: 'L'
      });
      return response.base64 || '';
    } catch (error) {
      console.error('Error generating QR code:', error);
      return '';
    }
  };

  try {
    await USBPrinter.init();
    await USBPrinter.connectPrinter(defaultPrinter.vendor_id as unknown as string, defaultPrinter.product_id as unknown as string);

    const opts = {
      encoding: 'ISO-8859-15',
      codepage: 0,
      widthtimes: 3,
      heigthtimes: 3,
      fonttype: 1,
    };

    const texts: TextItem[] = [];
    const columnWidth = [16, 23, 6];
    const columnAlignment = [
      ColumnAlignment.LEFT,
      ColumnAlignment.LEFT,
      ColumnAlignment.RIGHT,
    ];

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
      await USBPrinter.printImage('https://i.ibb.co/mbkBScb/Mogans-Logo-Cut-Go.png');
      await USBPrinter.printColumnsText(['Pedido:', newOrderNumber, ''], columnWidth, columnAlignment, [], opts);
      await USBPrinter.printText(ADVANCE_PAPER);
      await USBPrinter.printColumnsText(['ARTICULO', 'DETAIL', 'PRECIO'], columnWidth, columnAlignment, [], opts);
      for (let textSet of texts) {
        await USBPrinter.printColumnsText(textSet, columnWidth, columnAlignment, [], opts);
      }
      const total = calculateTotalPrice();
      await USBPrinter.printColumnsText(['TOTAL', '', `${total} E`], columnWidth, columnAlignment, [], opts);

      const qrCodeText = (newOrderNumber); // Replace with your text
      const qrCodeBase64 = await generateQRCode(qrCodeText);
      if (qrCodeBase64) {
        await USBPrinter.printImageBase64(qrCodeBase64, {
          imageWidth: 150,
          imageHeight: 150,
        });
      }

      await USBPrinter.printText(ADVANCE_PAPER);
      await USBPrinter.printText(CUT_PAPER);
    }
  } catch (error) {
    console.error('Error printing:', error);
  }
};
