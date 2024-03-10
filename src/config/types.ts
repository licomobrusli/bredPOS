// types.ts

export interface Category {
  imageUrl: string;
  code: string;
  name: string;
  description: string;
  image_path: string;
  date_created: string;
}

export interface Service {
  imageUrl: string;
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
  id: number;
  imageUrl: string;
  code: string;
  name: string;
}

export interface ModalCount {
  code: string;
  name: string;
  price: number;
  max_quantity: number;
  category_code: string;
  service_code: string;
  iamge_path: string;
  logic: string;
  sub: number
}

export interface ModalCountDetail {
  code: string;
  name: string;
  sub: number;
  price: number;
}

export interface SelectedCategory {
  name: string;
}

export interface CartItem {
  selectedCategory: SelectedCategory | null;
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