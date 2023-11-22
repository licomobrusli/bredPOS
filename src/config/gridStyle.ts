// gridStyle.ts
import * as Dims from './dimensions';

const margin = Dims.Width5p;
const gap = Dims.Width5p;
const imageWidth = (Dims.Width100p - 4 * margin - gap) / 3.3;
const imageHeight = imageWidth;

export const gridStyles = {
  margin,
  gap,
  imageWidth,
  imageHeight,
};
