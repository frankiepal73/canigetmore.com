import api from './api';
import type { User } from '../types';

interface AuthResponse {
  user: User;
  token: string;
}

export const login = async (email: string, password: string): Promise<AuthResponse> => {
  const { data } = await api.post<AuthResponse>('/auth/login', { email, password });
  localStorage.setItem('token', data.token);
  return data;
};

export const register = async (userData: {
  email: string;
  password: string;
  name: string;
  role: string;
  experience: number;
  skills: string[];
  location: string;
}): Promise<AuthResponse> => {
  const { data } = await api.post<AuthResponse>('/auth/register', userData);
  localStorage.setItem('token', data.token);
  return data;
};

export const logout = () => {
  localStorage.removeItem('token');
};

export const useToken = async (userId: string): Promise<User> => {
  const { data } = await api.post<User>(`/auth/use-token/${userId}`);
  return data;
};