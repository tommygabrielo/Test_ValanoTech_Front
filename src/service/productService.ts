import axios from 'axios';
import { Product } from '../context/ProductContext';

const API_URL = 'https://test-valanotech-back-2.onrender.com/api';

export const fetchAllProducts = async (): Promise<Product[]> => {
  const response = await axios.get<Product[]>(API_URL);
  return response.data;
};

export const deleteProduct = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};

export const createProduct = async (product: Partial<Product>): Promise<void> => {
  await axios.post(API_URL, product);
};

export const updateProduct = async (id: number, product: Partial<Product>): Promise<void> => {
  await axios.put(`${API_URL}/${id}`, product);
};
