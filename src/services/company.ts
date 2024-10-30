import api from './api';

interface Company {
  id: string;
  name: string;
  avgSalary: number;
  employees: number;
  growth: number;
  location: string;
}

export const getTopCompanies = async () => {
  const { data } = await api.get<Company[]>('/company');
  return data;
};