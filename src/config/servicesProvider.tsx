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
      try {
        // Use the correct function and parameters to fetch colors with codes starting with 'COL%'
        const data: Service[] = await fetchServices();
        setServicesData(data);
        console.log(data);
      } catch (error) {
        console.error('Error fetching data:', error);
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
