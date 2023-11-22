// dimensions.ts
import { Dimensions } from 'react-native';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

// height
// percentages
export const Height10p = screenHeight * 0.1;
export const Height20p = screenHeight * 0.2;
export const Height30p = screenHeight * 0.3;
export const Height40p = screenHeight * 0.4;
export const Height50p = screenHeight * 0.5;
export const Height60p = screenHeight * 0.6;
export const Height70p = screenHeight * 0.7;
export const Height80p = screenHeight * 0.8;
export const Height90p = screenHeight * 0.9;
export const Height100p = screenHeight * 1;

// height
// fractions
export const Height1_3f = screenHeight / 3;
export const Height2_3f = (screenHeight / 3) * 2;
export const Height1_4f = screenHeight / 4;
export const Height3_4f = (screenHeight / 4) * 3;

// width
// percentages
export const Width5p = screenWidth * 0.05;
export const Width10p = screenWidth * 0.1;
export const Width20p = screenWidth * 0.2;
export const Width30p = screenWidth * 0.3;
export const Width40p = screenWidth * 0.4;
export const Width50p = screenWidth * 0.5;
export const Width60p = screenWidth * 0.6;
export const Width70p = screenWidth * 0.7;
export const Width80p = screenWidth * 0.8;
export const Width90p = screenWidth * 0.9;
export const Width100p = screenWidth * 1;

// width
// fractions
export const Width1_3f = screenWidth / 3;
export const Width2_3f = (screenWidth / 3) * 2;
export const Width1_4f = screenWidth / 4;
export const Width3_4f = (screenWidth / 4) * 3;
