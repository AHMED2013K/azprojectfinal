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

  // 🔁 Restore session au chargement
  useEffect(() => {
    async function restoreSession() {
      try {
        const storedToken = sessionStorage.getItem(TOKEN_KEY);

        if (!storedToken) {
          const refreshData = await apiRequest('/api/auth/refresh', {
            method: 'POST',
            retryOnAuthError: false,
          });

          sessionStorage.setItem(TOKEN_KEY, refreshData.token);
          sessionStorage.setItem(CSRF_KEY, refreshData.csrfToken);

          setToken(refreshData.token);
          setCsrfToken(refreshData.csrfToken);
          setUser(refreshData.user);
          return;
        }

        try {
          const data = await apiRequest('/api/auth/me', {
            token: storedToken,
          });

          setUser(data.user);
          setToken(storedToken);
          setCsrfToken(sessionStorage.getItem(CSRF_KEY) || '');
        } catch (_meError) {
          const refreshData = await apiRequest('/api/auth/refresh', {
            method: 'POST',
            retryOnAuthError: false,
          });

          sessionStorage.setItem(TOKEN_KEY, refreshData.token);
          sessionStorage.setItem(CSRF_KEY, refreshData.csrfToken);

          setToken(refreshData.token);
          setCsrfToken(refreshData.csrfToken);
          setUser(refreshData.user);
        }
      } catch (err) {
        console.warn('Session restore failed:', err.message);

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
  }, []);

  // 🔐 LOGIN
  async function login(email, password) {
    try {
      const data = await apiRequest('/api/auth/login', {
        method: 'POST',
        body: { email, password },
      });

      sessionStorage.setItem(TOKEN_KEY, data.token);
      sessionStorage.setItem(CSRF_KEY, data.csrfToken);

      setToken(data.token);
      setCsrfToken(data.csrfToken);
      setUser(data.user);
    } catch (err) {
      console.error('Login error:', err);
      throw new Error('Email ou mot de passe incorrect');
    }
  }

  // 🚪 LOGOUT
  async function logout() {
    try {
      if (token) {
        await apiRequest('/api/auth/logout', {
          method: 'POST',
          token,
        });
      }
    } catch (err) {
      console.warn('Logout error:', err.message);
    } finally {
      sessionStorage.removeItem(TOKEN_KEY);
      sessionStorage.removeItem(CSRF_KEY);

      setToken('');
      setCsrfToken('');
      setUser(null);
    }
  }

  // 🔄 REFRESH USER
  async function refreshUser() {
    if (!token) return;

    try {
      const data = await apiRequest('/api/auth/me', { token });
      setUser(data.user);
    } catch (err) {
      console.warn('Refresh user failed:', err.message);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        token,
        csrfToken,
        user,
        loading,
        login,
        logout,
        refreshUser,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Hook
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
