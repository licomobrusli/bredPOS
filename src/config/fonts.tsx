// fonts.tsx
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
    fontFamily: "OilvareBase-Regular",
    letterSpacing: 12,
    fontSize: adaptiveFontSize(220),
    color: 'white',
  },
  txtSubBrandBanner: {
    textAlign: 'center',
    textAlignVertical: 'center',
    fontFamily: 'OilvareBase-Regular',
    letterSpacing: 18,
    fontSize: adaptiveFontSize(60),
    textTransform: 'uppercase',
    color: 'white',
  },
  txtProductCard: {
    textAlign: 'center',
    textAlignVertical: 'center',
    fontFamily: 'OilvareBase-Regular',
    letterSpacing: 10,
    fontSize: adaptiveFontSize(50),
    color: 'white',
  },
  txtModalCounts: {
    textAlign: 'center',
    textAlignVertical: 'center',
    fontFamily: 'OilvareBase-Regular',
    letterSpacing: 10,
    fontSize: adaptiveFontSize(40),
    color: 'white',
  },
  txtNavButton: {
    textAlign: 'center',
    textAlignVertical: 'center',
    fontFamily: 'Poppins',
    fontSize: adaptiveFontSize(50),
    color: 'white',
  },
});

export default fonts;
