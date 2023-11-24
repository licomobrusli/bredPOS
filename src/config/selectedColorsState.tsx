// selectedColorsState.ts
type Color = string; // Define the type for color if it's more specific in your project

let selectedColors: Color[] = [];

export const setSelectedColors = (colors: Color[]): void => {
  selectedColors = colors;
};

export const getSelectedColors = (): Color[] => {
  return selectedColors;
};
