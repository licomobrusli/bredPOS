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
  txtButtonA: {
    textAlign: 'center',
    textAlignVertical: 'center',
    fontFamily: 'WorkSansSemiBold',
    fontSize: adaptiveFontSize(40),
    letterSpacing: adaptiveFontSize(4),
    color: 'white',
  },

  txtList: {
    textAlign: 'center',
    textAlignVertical: 'center',
    fontFamily: 'WorkSansSemiBold',
    fontSize: adaptiveFontSize(40),
    letterSpacing: adaptiveFontSize(4),
    color: 'white',
  },
  
  txtCard: {
    textAlign: 'center',
    textAlignVertical: 'center',
    fontFamily: 'WorkSansBold',
    fontSize: adaptiveFontSize(60),
    letterSpacing: adaptiveFontSize(4),
    color: 'white',
  },
  
  
  // old stuff that needs to be replaced
  
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
});

export default fonts;
