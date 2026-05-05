import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://api.drivercash.app',
});

const readStorage = (key: string) => {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
};

api.interceptors.request.use((config) => {
  const token = readStorage('drivercash_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const login = async (data: { email: string; password: string }) => {
  const response = await api.post('/access/login', data);
  return response.data;
};

export const register = async (data: { name: string; email: string; password: string; phone: string; document: string; referralCode?: string }) => {
  const response = await api.post('/access/register', data);
  return response.data;
};

export const googleLogin = async (data: { credential: string; phone?: string; document?: string; referralCode?: string }) => {
  const response = await api.post('/access/google', data);
  return response.data;
};

export const updateProfile = async (data: { name: string; phone: string; document: string }) => {
  const response = await api.post('/access/profile', data);
  return response.data;
};

export const sendPhoneCode = async () => {
  const response = await api.post('/access/phone/send-code');
  return response.data;
};

export const verifyPhoneCode = async (code: string) => {
  const response = await api.post('/access/phone/verify', { code });
  return response.data;
};

export const createAnnualCheckout = async () => {
  const response = await api.post('/access/billing/checkout');
  return response.data;
};

export const getReferralSummary = async () => {
  const response = await api.get('/access/referrals');
  return response.data;
};

export const requestReferralWithdrawal = async (data: { pixKey: string; requestedFor?: string }) => {
  const response = await api.post('/access/referrals/withdrawals', data);
  return response.data;
};

export const redeemReferralCode = async (code: string) => {
  const response = await api.post('/access/referrals/redeem', { code });
  return response.data;
};

export const saveSession = (session: { token: string; user: unknown; access: unknown }) => {
  localStorage.setItem('drivercash_token', session.token);
  localStorage.setItem('drivercash_user', JSON.stringify(session.user));
  localStorage.setItem('drivercash_access', JSON.stringify(session.access));
};

export const getDashboardData = async (period?: 'day' | 'week' | 'month') => {
  const response = await api.get('/dashboard', { params: period ? { period } : undefined });
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

export const getTransactions = async () => {
  const response = await api.get('/transactions');
  return response.data;
};

export const getKmHistory = async () => {
  const response = await api.get('/km');
  return response.data;
};

export const getMaintenanceAlerts = async () => {
  const response = await api.get('/maintenance');
  return response.data;
};

export const createTransaction = async (data: Record<string, unknown>) => {
  const response = await api.post('/transactions', data);
  return response.data;
};

export const updateTransaction = async (id: string, data: Record<string, unknown>) => {
  const response = await api.patch(`/transactions/${id}`, data);
  return response.data;
};

export const deleteTransaction = async (id: string) => {
  const response = await api.delete(`/transactions/${id}`);
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
