// gridStyle.ts
import { Dimensions } from 'react-native';

const mainSectionWidth = Dimensions.get('window').width;

const margin = mainSectionWidth / 12;
const gap = mainSectionWidth / 24;
const imageWidth = (mainSectionWidth - 2 * margin - gap) / 2;
const imageHeight = imageWidth;

export const gridStyles = {
  margin,
  gap,
  imageWidth,
  imageHeight,
};
