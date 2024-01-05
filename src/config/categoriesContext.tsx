// categoriesContext.tsx
import React from 'react';
import { Category } from './types';

const categoriesContext = React.createContext<Category[] | null>(null);

export default categoriesContext;
