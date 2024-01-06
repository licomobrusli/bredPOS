// categoriesProvider.tsx
import React, { useState, useEffect, ReactNode } from 'react';
import categoriesContext from './categoriesContext';
import { fetchCategories } from './apiCalls';
import { Category } from './types';

type CategoriesProviderProps = {
  children: ReactNode;
};

const CategoriesProvider: React.FC<CategoriesProviderProps> = ({ children }) => {
  const [CategoriesData, setCategoriesData] = useState<Category[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      let attempts = 0;
      const maxAttempts = 2;  // Set the number of attempts including the first try.
      
      while (attempts < maxAttempts) {
        try {
          const data: Category[] = await fetchCategories();
          setCategoriesData(data);
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
    <categoriesContext.Provider value={CategoriesData}>
      {children}
    </categoriesContext.Provider>
  );
};

export default CategoriesProvider;
