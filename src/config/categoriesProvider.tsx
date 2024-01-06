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
      try {
        // Use the correct function and parameters to fetch colors with codes starting with 'COL%'
        const data: Category[] = await fetchCategories();
        setCategoriesData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
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
