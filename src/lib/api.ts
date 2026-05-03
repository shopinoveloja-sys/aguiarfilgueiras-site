import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://api.drivercash.app',
});

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

export const createRecurringExpense = async (data: { name: string; value: number; dueDay: number }) => {
  const response = await api.post('/planning/expenses', data);
  return response.data;
};

export const getNonWorkingDays = async () => {
  const response = await api.get('/planning/expenses/planning');
  return response.data;
};

export default api;
