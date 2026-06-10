import api from './axios';
import { getApiError, normalizeUser, parseAuthResponse } from './helpers';

export async function loginUser(email, password) {
  const { data } = await api.post('/auth/login', { email, password });
  if (data.success === false) throw new Error(data.message || 'Login failed');
  return parseAuthResponse(data, { email });
}

export async function registerUser(name, email, password) {
  const { data } = await api.post('/auth/register', { name, email, password });
  if (data.success === false) throw new Error(data.message || 'Registration failed');

  const token = data.token || data.data?.token;
  const user = normalizeUser(data.user || data.data?.user);

  if (token && user) {
    return parseAuthResponse(data, { email, name });
  }

 
  if (user) {
    return loginUser(email, password);
  }

  throw new Error(data.message || 'Registration failed');
}
