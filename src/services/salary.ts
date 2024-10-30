import api from './api';
import type { SalaryData } from '../types';

export const getSalaryInsights = async (params: {
  role?: string;
  location?: string;
  minExperience?: number;
  maxExperience?: number;
}) => {
  const { data } = await api.get<SalaryData[]>('/salary', { params });
  return data;
};

export const submitSalaryData = async (salaryData: Omit<SalaryData, 'id'>) => {
  const { data } = await api.post<SalaryData>('/salary', salaryData);
  return data;
};