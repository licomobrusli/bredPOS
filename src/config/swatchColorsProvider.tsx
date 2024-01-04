import React, { useState, useEffect, ReactNode } from 'react';
import swatchColorsContext from './swatchColorsContext';
import { fetchModalSelects } from './apiCalls'; // Ensure this is the correct function to fetch colors
import { SwatchColorData } from './types';

type SwatchColorsProviderProps = {
  children: ReactNode;
};

const SwatchColorsProvider: React.FC<SwatchColorsProviderProps> = ({ children }) => {
  const [swatchColorsData, setSwatchColorsData] = useState<SwatchColorData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Use the correct function and parameters to fetch colors with codes starting with 'COL%'
        const data: SwatchColorData[] = await fetchModalSelects({ code: 'COL' });
        setSwatchColorsData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <swatchColorsContext.Provider value={swatchColorsData}>
      {children}
    </swatchColorsContext.Provider>
  );
};

export default SwatchColorsProvider;
