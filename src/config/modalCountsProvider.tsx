// modalCountsProvider.tsx
import React, { useState, useEffect, ReactNode } from 'react';
import modalCountsContext from './modalCountsContext';
import { fetchModalCounts } from './apiCalls';
import { ModalCount } from './types';

type ModalCountsProviderProps = {
  children: ReactNode;
};

const ModalCountsProvider: React.FC<ModalCountsProviderProps> = ({ children }) => {
  const [ModalCountsData, setModalCountsData] = useState<ModalCount[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Use the correct function and parameters to fetch colors with codes starting with 'COL%'
        const data: ModalCount[] = await fetchModalCounts();
        setModalCountsData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <modalCountsContext.Provider value={ModalCountsData}>
      {children}
    </modalCountsContext.Provider>
  );
};

export default ModalCountsProvider;
