// servicecategoryService.ts

import api from './api';
import { ServiceCategory } from './types';

export const fetchServiceCategories = async (): Promise<ServiceCategory[]> => {
  try {
    const response = await api.get<ServiceCategory[]>('service_categories/');
    return response.data;
  } catch (error) {
    console.error("Error fetching service categories:", error);
    throw error;
  }
};
