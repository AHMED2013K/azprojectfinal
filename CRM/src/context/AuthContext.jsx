import { createContext, useContext, useEffect, useState } from 'react';
import { apiRequest } from '../lib/api';

const AuthContext = createContext(null);
const TOKEN_KEY = 'crm_token';
const CSRF_KEY = 'crm_csrf_token';

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => sessionStorage.getItem(TOKEN_KEY) || '');
  const [csrfToken, setCsrfToken] = useState(() => sessionStorage.getItem(CSRF_KEY) || '');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function restoreSession() {
      const activeToken = sessionStorage.getItem(TOKEN_KEY) || token;

      try {
        if (!activeToken) {
          const refreshData = await apiRequest('/api/auth/refresh', {
            method: 'POST',
            retryOnAuthError: false,
          });

          sessionStorage.setItem(TOKEN_KEY, refreshData.token);
          sessionStorage.setItem(CSRF_KEY, refreshData.csrfToken);
          setToken(refreshData.token);
          setCsrfToken(refreshData.csrfToken);
          setUser(refreshData.user);
          setLoading(false);
          return;
        }

        const data = await apiRequest('/api/auth/me', { token: activeToken });
        setUser(data.user);
        setCsrfToken(sessionStorage.getItem(CSRF_KEY) || '');
        const storedToken = sessionStorage.getItem(TOKEN_KEY);
        if (storedToken !== activeToken) {
          setToken(storedToken || token);
        }
      } catch {
        sessionStorage.removeItem(TOKEN_KEY);
        sessionStorage.removeItem(CSRF_KEY);
        setToken('');
        setCsrfToken('');
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    restoreSession();
  }, [token]);

  async function login(email, password) {
    const data = await apiRequest('/api/auth/login', {
      method: 'POST',
      body: { email, password },
    });
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(CSRF_KEY);
    sessionStorage.setItem(TOKEN_KEY, data.token);
    sessionStorage.setItem(CSRF_KEY, data.csrfToken);
    setToken(data.token);
    setCsrfToken(data.csrfToken);
    setUser(data.user);
  }

  async function logout() {
    try {
      if (token) {
        await apiRequest('/api/auth/logout', { method: 'POST', token });
      }
    } finally {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(CSRF_KEY);
      sessionStorage.removeItem(TOKEN_KEY);
      sessionStorage.removeItem(CSRF_KEY);
      setToken('');
      setCsrfToken('');
      setUser(null);
    }
  }

  async function refreshUser() {
    if (!token) {
      return;
    }

    const data = await apiRequest('/api/auth/me', { token });
    setUser(data.user);
    setToken(sessionStorage.getItem(TOKEN_KEY) || token);
    setCsrfToken(sessionStorage.getItem(CSRF_KEY) || '');
  }

  return (
    <AuthContext.Provider value={{ token, csrfToken, user, loading, login, logout, refreshUser, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
