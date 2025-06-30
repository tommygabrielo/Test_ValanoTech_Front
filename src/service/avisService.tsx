import axios from 'axios';
import { Avis } from '../context/AvisContext';

const API_URL = 'http://localhost:3000/api';

export const addAvis = async (note: number, commentaire: string, id_user: number, id_produit: number) => {
  return axios.post(`${API_URL}/avis`, {
    note,
    commentaire,
    id_user,
    id_produit,
  });
};


export const fetchAvisByProduit = async (produitId: number, sort: string = 'date', search: string = ''): Promise<Avis[]> => {
  try {
    const res = await axios.get(`${API_URL}/produits/${produitId}/avis`, {
      params: { sort, search },
    });
    return res.data;
  } catch (error) {
    console.error('Erreur fetch avis', error);
    return [];
  }
};

export const fetchMoyenneAvisByProduit = async (produitId: number): Promise<number | null> => {
  try {
    const res = await axios.get(`${API_URL}/produits/${produitId}/moyenne`);
    return res.data.moyenne !== null ? parseFloat(res.data.moyenne) : null;
  } catch (error) {
    console.error('Erreur lors de la récupération de la moyenne des avis', error);
    return null;
  }
};


export const fetchAvisDistribution = async () => {
  try {
    const res = await axios.get(`${API_URL}/avis/distribution`);
    return res.data;
  } catch (error) {
    console.error('Erreur lors de la récupération de la distribution des avis', error);
    return [];
  }
};