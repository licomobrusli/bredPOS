// apiCalls.ts
import api from '../services/api'; // Adjust the import path according to your project structure
import { Theme, ModalCount, Category, Service } from '../config/types'; // Adjust the import path for your types
import { HEDImage, FCEImage, BRDImage, CUTImage, COLImage, DSNImage } from '../main/assets/images'; // Update the import path and method according to your project

// Fetch Categories (used in both ThemeList and CategoryList)
export const fetchCategories = async (categoryCode?: string) => {
  const endpoint = categoryCode ? '/service_categories/' : `/service_categories/?categoryCode=${categoryCode}`;
  try {
    const response = await api.get(endpoint);
    return response.data.map((category: any) => {
      let imagePath;
      switch (category.code) {
        case 'HED':
          imagePath = HEDImage;
          break;
        case 'FCE':
          imagePath = FCEImage;
          break;
        case 'BRD':
          imagePath = BRDImage;
          break;
        default:
          imagePath = 'https://placekitten.com/200/200';
      }
      return { id: category.id.toString(), code: category.code, imageUrl: imagePath, name: category.name };
    });
  } catch (error) {
    throw new Error('Error fetching categories');
  }
};

// Fetch Services (used in ThemeList and ServiceList)
export const fetchServices = async (serviceCode: string) => {
  try {
    const response = await api.get('/services/', { params: { serviceCode } });
    return response.data.map((service: any) => {
      let imagePath;
      switch (service.code) {
        case 'CUT':
          imagePath = CUTImage;
          break;
        case 'COL':
          imagePath = COLImage;
          break;
        case 'DSN':
          imagePath = DSNImage;
          break;
        default:
          imagePath = 'https://placekitten.com/200/200';
      }
      return { id: service.id.toString(), code: service.code, imageUrl: imagePath, name: service.name };
    });
  } catch (error) {
    throw new Error('Error fetching services');
  }
};

// Fetch Modal Counts (specific to ThemeList)
export const fetchModalCounts = async (params: { categoryCode: string, serviceCode: string }) => {
  try {
    const response = await api.get('/modal_counts/', { params });
    return response.data.map((item: any) => ({
      ...item,
      price: Number(item.price)
    }));
  } catch (error) {
    throw new Error('Error fetching modal counts');
  }
};
