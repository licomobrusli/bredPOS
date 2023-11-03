// serviceService.ts

import api from './api';
import { Service } from './types'; // Make sure to define this type

export const fetchServices = async (): Promise<Service[]> => {
  try {
    const response = await api.get<Service[]>('services/');
    return response.data;
  } catch (error) {
    console.error("Error fetching services:", error);
    throw error;
  }
};
