import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://api.drivercash.app',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('drivercash_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const login = async (data: { email: string; password: string }) => {
  const response = await api.post('/access/login', data);
  return response.data;
};

export const register = async (data: { name: string; email: string; password: string }) => {
  const response = await api.post('/access/register', data);
  return response.data;
};

export const createAnnualCheckout = async () => {
  const response = await api.post('/access/billing/checkout');
  return response.data;
};

export const saveSession = (session: { token: string; user: unknown; access: unknown }) => {
  localStorage.setItem('drivercash_token', session.token);
  localStorage.setItem('drivercash_user', JSON.stringify(session.user));
  localStorage.setItem('drivercash_access', JSON.stringify(session.access));
};

export const getDashboardData = async () => {
  const response = await api.get('/dashboard');
  return response.data;
};

export const getDynamicGoals = async () => {
  const response = await api.get('/goals/dynamic');
  return response.data;
};

export const saveOnboarding = async (data: { estimatedDailyEarnings: number; workDays: number[] }) => {
  const response = await api.post('/goals/onboarding', data);
  return response.data;
};

export const saveNonWorkingDays = async (dates: string[]) => {
  const response = await api.post('/planning/non-working-days', { dates });
  return response.data;
};

export const getRecurringExpenses = async () => {
  const response = await api.get('/planning/expenses/planning');
  return response.data;
};

export const createTransaction = async (data: Record<string, unknown>) => {
  const response = await api.post('/transactions', data);
  return response.data;
};

export const createKmDaily = async (data: { date: string; kmStart: number; kmEnd: number }) => {
  const response = await api.post('/km', data);
  return response.data;
};

export const createRecurringExpense = async (data: {
  name: string;
  value: number;
  recurrenceType?: 'MONTHLY' | 'WEEKLY' | 'SPECIFIC_DATE';
  dueDay?: number;
  dueDayOfWeek?: number;
  dueDate?: string;
}) => {
  const response = await api.post('/planning/expenses', data);
  return response.data;
};

export const getNonWorkingDays = async () => {
  const response = await api.get('/planning/expenses/planning');
  return response.data;
};

export default api;
