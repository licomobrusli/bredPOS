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
      let attempts = 0;
      const maxAttempts = 2;  // Set the number of attempts including the first try.

      while (attempts < maxAttempts) {
        try {
          const data: ModalCount[] = await fetchModalCounts();
          setModalCountsData(data);
          break;  // Break out of the loop if the fetch is successful.
        } catch (error) {
          console.error(`Attempt ${attempts + 1} failed with error:`, error);
          attempts++;
          if (attempts === maxAttempts) {
            console.error('Max MODALCOUNTS retry attempts reached. Failing gracefully.');
          }
        }
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
