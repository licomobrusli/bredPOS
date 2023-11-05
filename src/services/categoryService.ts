// CategoryService.ts

import api from './api';
import { Category } from '../config/types';

export const fetchCategories = async (): Promise<Category[]> => {
  try {
    const response = await api.get<Category[]>('service_categories/');
    return response.data;
  } catch (error) {
    console.error("Error fetching service categories:", error);
    throw error;
  }
};
