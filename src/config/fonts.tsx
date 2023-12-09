// fonts.tsx
// WorkSans available weights:
  // Black, ExtraBold, Bold, SemiBold, Medium, Regular (name: WorkSans), Light, ExtraLight, Thin, Hairline

import { StyleSheet, Dimensions } from 'react-native';

// Get screen width
const screenWidth = Dimensions.get('window').width;

// Base screen width for scaling
const baseScreenWidth = 1440;

// Function to calculate adaptive font size
const adaptiveFontSize = (baseSize: number) => {
  return (screenWidth / baseScreenWidth) * baseSize;
};

const fonts = StyleSheet.create({
  txtBrandBanner: {
    textAlign: 'center',
    textAlignVertical: 'center',
    fontFamily: 'WorkSansBlack',
    letterSpacing: 12,
    fontSize: adaptiveFontSize(220),
    color: 'white',
  },
  txtSubBrandBanner: {
    textAlign: 'center',
    textAlignVertical: 'center',
    fontFamily: 'WorkSansBold',
    letterSpacing: 18,
    fontSize: adaptiveFontSize(60),
    textTransform: 'uppercase',
    color: 'white',
  },
  txtProductCard: {
    textAlign: 'center',
    textAlignVertical: 'center',
    fontFamily: 'WorkSansBold',
    letterSpacing: 10,
    fontSize: adaptiveFontSize(50),
    color: 'white',
    textTransform: 'uppercase',
  },
  txtModalCounts: {
    textAlign: 'center',
    textAlignVertical: 'center',
    fontFamily: 'WorkSansSemiBold',
    letterSpacing: 10,
    fontSize: adaptiveFontSize(40),
    color: 'white',
  },
  txtItems: {
    textAlign: 'center',
    textAlignVertical: 'center',
    fontFamily: 'WorkSansRegular',
    fontSize: adaptiveFontSize(50),
    color: 'white',
  },
  txtTitle: {
    textAlign: 'center',
    textAlignVertical: 'center',
    fontFamily: 'WorkSansExtraBold',
    fontSize: adaptiveFontSize(60),
    color: 'white',
    textTransform: 'uppercase',
  },
});

export default fonts;
