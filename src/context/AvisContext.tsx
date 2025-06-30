import React, { createContext, ReactNode, useState } from 'react';
import { fetchAvisByProduit, addAvis } from '../service/avisService';

export interface Avis {
  id: number;
  note: number;
  commentaire: string;
  date_avis: string;
  id_produit: number;
  id_user: number;
}

interface AvisState {
  [produitId: number]: Avis[];
}

interface AvisContextType {
  getAvis: (produitId: number, sort?: string, search?: string) => Promise<Avis[]>;
  refreshAvisByProduit: (produitId: number, sort?: string, search?: string) => Promise<void>;
  addAvis: (data: Partial<Avis>) => Promise<void>;
}

export const AvisContext = createContext<AvisContextType>({
  getAvis: async () => [],
  refreshAvisByProduit: async () => {},
  addAvis: async () => {},
});

export const AvisProvider = ({ children }: { children: ReactNode }) => {
  const [avisByProduit, setAvisByProduit] = useState<AvisState>({});

  const getAvis = async (produitId: number, sort: string = 'date', search: string = '') => {
    return await fetchAvisByProduit(produitId, sort, search);
  };

  const refreshAvisByProduit = async (produitId: number, sort: string = 'date', search: string = '') => {
    const data = await fetchAvisByProduit(produitId, sort, search);
    setAvisByProduit((prev) => ({
      ...prev,
      [produitId]: data,
    }));
  };

  const addAvis = async (data: Partial<Avis>) => {
    await addAvis(data);
  };

  return (
    <AvisContext.Provider value={{ getAvis, refreshAvisByProduit, addAvis }}>
      {children}
    </AvisContext.Provider>
  );
};
