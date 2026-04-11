import { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/api.js';

const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('foodbridge_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email, role) => {
    try {
      const userData = await authService.login(email, role);
      
      if (userData.role === 'VOLUNTEER' && userData.status !== 'APPROVED') {
        throw new Error('Your volunteer account is pending admin approval.');
      }
      
      setUser(userData);
      localStorage.setItem('foodbridge_user', JSON.stringify(userData));
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Login failed';
      throw new Error(message);
    }
  };

  const register = async (name, email, role) => {
    try {
      const userData = await authService.register(name, email, role);
      
      if (role !== 'VOLUNTEER') {
        setUser(userData);
        localStorage.setItem('foodbridge_user', JSON.stringify(userData));
      }
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Registration failed';
      throw new Error(message);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('foodbridge_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
