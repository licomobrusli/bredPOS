// serviceService.ts
import axios from 'axios';
import { Service } from './types'; // Adjust the import path as necessary

export const fetchServices = async (categoryId: string): Promise<Service[]> => {
  try {
    const response = await axios.get<Service[]>(`https://your-api-url.com/services?category=${categoryId}`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch services:', error);
    throw error;
  }
};
