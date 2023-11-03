// serviceService.ts

import api from './api';
import { Service } from '../config/types';

export const fetchServices = async (categoryCode: string): Promise<Service[]> => {
  try {
    const response = await api.get<Service[]>(`/services/?categoryCode=${categoryCode}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching services:", error);
    throw error;
  }
};
