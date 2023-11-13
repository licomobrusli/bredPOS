// gridStyle.ts
import { Dimensions } from 'react-native';

const mainSectionWidth = Dimensions.get('window').width;

const margin = mainSectionWidth / 33;
const gap = mainSectionWidth / 33;
const imageWidth = (mainSectionWidth - 4 * margin - gap) / 3.3;
const imageHeight = imageWidth;

export const gridStyles = {
  margin,
  gap,
  imageWidth,
  imageHeight,
};
