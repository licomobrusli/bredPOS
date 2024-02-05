// apiCalls.ts
import api from '../services/api';
import { HEDImage, FCEImage, BRDImage, CUTImage, COLImage, DSNImage } from '../main/assets/images'; // Update the import path and method according to your project

// Fetch Categories (used in both ThemeList and CategoryList)
export const fetchCategories = async (categoryCode?: string) => {
    try {
      const endpoint = categoryCode ? `/service_categories/?categoryCode=${categoryCode}` : '/service_categories/';
      const response = await api.get(endpoint);    return response.data.map((category: any) => {
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
      return { id: Number(category.id), code: category.code, imageUrl: imagePath, name: category.name };
    });
  } catch (error) {
    throw new Error('Error fetching categories');
  }
};

// Fetch Services (used in ThemeList and ServiceList)
export const fetchServices = async (serviceCode?: string) => {
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
      return { id: Number(service.id), code: service.code, imageUrl: imagePath, name: service.name };
    });
  } catch (error) {
    throw new Error('Error fetching services');
  }
};

// Fetch Modal Counts (specific to ThemeList)
export const fetchModalCounts = async (params?: { categoryCode?: string, serviceCode?: string }) => {
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


// Fetch Modal Selects with optional category code, service code, and code start (new)
export const fetchModalSelects = async (params: { categoryCode?: string, serviceCode?: string, code?: string }) => {
  try {
    const response = await api.get('/modal_selects/', { params });
    return response.data;
  } catch (error) {
    throw new Error('Error fetching modal selects');
  }
};

// Function to create a new order
export const createOrder = async (orderData: {
  item_count: number, 
  order_price: number, 
  est_start?: string,
  est_duration?: number,
}) => {
  try {
    const response = await api.post('/create_order/', orderData);
    return response.data;
  } catch (error) {
    throw new Error('Error creating new order C');
  }
};

// Function to create a new order item
export const createOrderItem = async (orderItemData: {
  order: number,
  item_name: string,
  unit_price: number,
  item_count: number,
  item_price: number,
  est_start?: string,
  est_duration?: number,
}) => {
  try {
    const response = await api.post('/create_order_item/', orderItemData);
    return response.data;
  } catch (error) {
    throw new Error('Error creating new order item');
  }
};


// new function for submitting order with items
export const createOrderWithItems = async (orderData: any) => {
  try {
    const response = await api.post('/submit_order/', orderData);
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      // If it's an instance of Error, access its `message` property
      console.error('API Error:', error.message);
      throw new Error(`Error creating new order with items: ${error.message}`);
    } else {
      // If it's not an instance of Error, it could be a different type like a string or an object
      console.error('API Error:', error);
      throw new Error('Error creating new order with items');
    }
  }
};