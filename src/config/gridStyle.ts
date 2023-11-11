// gridStyle.ts
import { Dimensions } from 'react-native';

const mainSectionWidth = Dimensions.get('window').width;

const margin = mainSectionWidth / 24;
const gap = mainSectionWidth / 24;
const imageWidth = (mainSectionWidth - 3 * margin - gap) / 3;
const imageHeight = imageWidth;

export const gridStyles = {
  margin,
  gap,
  imageWidth,
  imageHeight,
};
