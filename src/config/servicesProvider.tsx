// ServicesProvider.tsx
import React, { useState, useEffect, ReactNode } from 'react';
import servicesContext from './servicesContext';
import { fetchServices } from './apiCalls';
import { Service } from './types';

type ServicesProviderProps = {
  children: ReactNode;
};

const ServicesProvider: React.FC<ServicesProviderProps> = ({ children }) => {
  const [ServicesData, setServicesData] = useState<Service[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      let attempts = 0;
      const maxAttempts = 2;  // Set the number of attempts including the first try.

      while (attempts < maxAttempts) {
        try {
          const data: Service[] = await fetchServices();
          setServicesData(data);
          break;  // Break out of the loop if the fetch is successful.
        } catch (error) {
          console.error(`Attempt ${attempts + 1} failed with error:`, error);
          attempts++;
          if (attempts === maxAttempts) {
            console.error('Max retry attempts reached. Failing gracefully.');
          }
        }
      }
    };

    fetchData();
  }, []);

  return (
    <servicesContext.Provider value={ServicesData}>
      {children}
    </servicesContext.Provider>
  );
};

export default ServicesProvider;
