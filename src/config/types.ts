// types.ts

export interface Category {
  imageUrl: string;
  id: number;
  code: string;
  name: string;
  description: string;
  image_path: string;
  date_created: string;
}

export interface Service {
  imageUrl: string;
  id: number;
  code: string;
  name: string;
  description: string;
  price: number;
  total_duration: number;
  image_path: string;
  service_category: string; // This should match the type of the service_category field in your database, assuming it's a foreign key to Category
  date_created: string;
}

export interface Theme {
  id: string;
  imageUrl: string;
  code: string;
  name: string;
}

export interface ModalCount {
  id: string;
  name: string;
  price: number;
  max_quantity: number;
  logic: string;
  sub: number
}

export interface ModalCountDetail {
  name: string;
  sub: number;
  price: number;
}

export interface SelectedCategory {
  name: string;
}

export interface CartItem {
  selectedCategory: SelectedCategory;
  modalCountsDetails: ModalCountDetail[];
  counterValue?: number; // Adjust based on actual usage
  selectedColors?: string[];
}

export type SwatchColorData = {
  id: number;
  code: string;
  name: string;
  image_path: string;
};