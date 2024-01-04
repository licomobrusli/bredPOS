import React from 'react';
import { SwatchColorData } from './types';

const swatchColorsContext = React.createContext<SwatchColorData[] | null>(null);

export default swatchColorsContext;
