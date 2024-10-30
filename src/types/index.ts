export interface SalaryData {
  role: string;
  salary: number;
  location: string;
  experience: number;
  remote: boolean;
}

export interface User {
  name: string;
  email: string;
  role: string;
  experience: number;
  skills: string[];
  location: string;
  tokens: number;
}

export interface InsightCard {
  title: string;
  value: string | number;
  change: number;
  icon: React.ComponentType;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  useToken: () => Promise<boolean>;
}