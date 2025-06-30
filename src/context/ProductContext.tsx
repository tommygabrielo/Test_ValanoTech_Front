import React, { createContext, useEffect, useState, ReactNode } from 'react';
import { fetchAllProducts } from '../service/productService';

export interface Product {
  id: number;
  titre: string;
  description: string;
  prix: number;
  image_url: string;
}

interface ProductContextType {
  products: Product[];
  loading: boolean;
  refreshProducts: () => void;
}

export const ProductContext = createContext<ProductContextType>({
  products: [],
  loading: false,
  refreshProducts: () => {},
});

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const data = await fetchAllProducts();
      setProducts(data);
    } catch (error) {
      console.error('Erreur lors du chargement des produits', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider value={{ products, loading, refreshProducts: fetchProducts }}>
      {children}
    </ProductContext.Provider>
  );
};
