import axios from 'axios';

interface LoginResponse {
  role: string;
}
const API_URL = 'http://localhost:3000/api';
export const loginAdmin = async (email: string, motDePasse: string): Promise<LoginResponse> => {
  const response = await axios.post(`${API_URL}/auth/login`, {
    email,
    mot_de_passe: motDePasse,
  });
  return response.data;
};
