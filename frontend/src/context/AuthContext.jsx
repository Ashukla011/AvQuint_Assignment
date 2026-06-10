import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { loginUser, registerUser } from '../api/authService';
import { getApiError } from '../api/helpers';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('focusflow_user');
    const token = localStorage.getItem('focusflow_token');
    if (stored && token) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        localStorage.removeItem('focusflow_user');
        localStorage.removeItem('focusflow_token');
      }
    }
    setLoading(false);
  }, []);

  const login = useCallback(async (email, password) => {
    try {
      const { user: loggedInUser, token } = await loginUser(email, password);
      localStorage.setItem('focusflow_user', JSON.stringify(loggedInUser));
      localStorage.setItem('focusflow_token', token);
      setUser(loggedInUser);
      return loggedInUser;
    } catch (error) {
      throw new Error(getApiError(error));
    }
  }, []);

  const register = useCallback(async (name, email, password) => {
    try {
      const { user: newUser, token } = await registerUser(name, email, password);
      localStorage.setItem('focusflow_user', JSON.stringify(newUser));
      localStorage.setItem('focusflow_token', token);
      setUser(newUser);
      return newUser;
    } catch (error) {
      throw new Error(getApiError(error));
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('focusflow_user');
    localStorage.removeItem('focusflow_token');
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
