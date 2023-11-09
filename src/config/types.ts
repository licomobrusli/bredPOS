// types.ts

export interface Category {
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
