// gridStyle.ts
import SDims from './dimensions';

const margin = SDims.Width5p;
const gap = SDims.Width5p;
const imageWidth = (SDims.Width100p - 4 * margin - gap) / 3.3;
const imageHeight = imageWidth;

export const gridStyles = {
  margin,
  gap,
  imageWidth,
  imageHeight,
};
