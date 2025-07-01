import React, { createContext, ReactNode } from 'react';
import { fetchAvisByProduit, addAvis as addAvisService } from '../service/avisService';

export interface Avis {
  id: number;
  note: number;
  commentaire: string;
  date_avis: string;
  id_produit: number;
  id_user: number;
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
  const getAvis = async (produitId: number, sort: string = 'date', search: string = '') => {
    return await fetchAvisByProduit(produitId, sort, search);
  };

  const refreshAvisByProduit = async (produitId: number, sort: string = 'date', search: string = '') => {
    await fetchAvisByProduit(produitId, sort, search);
  };

  const addAvis = async (data: Partial<Avis>) => {
    if (
      typeof data.commentaire === 'string' &&
      typeof data.note === 'number' &&
      typeof data.id_produit === 'number' &&
      typeof data.id_user === 'number'
    ) {
      await addAvisService(data.note, data.commentaire, data.id_produit, data.id_user);
    } else {
      throw new Error('Missing required fields for addAvisService');
    }
  };

  return (
    <AvisContext.Provider value={{ getAvis, refreshAvisByProduit, addAvis }}>
      {children}
    </AvisContext.Provider>
  );
};
