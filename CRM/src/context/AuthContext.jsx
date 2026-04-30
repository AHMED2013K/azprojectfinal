import { createContext, useContext, useEffect, useState } from 'react';
import { apiRequest, clearStoredAuthSession, storeAuthSession } from '../lib/api';

const AuthContext = createContext(null);

const TOKEN_KEY = 'crm_token';
const CSRF_KEY = 'crm_csrf_token';

function isRecoverableSessionError(error) {
  return Boolean(error?.isTransient || error?.status === 408 || error?.status === 429 || error?.status >= 500);
}

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => sessionStorage.getItem(TOKEN_KEY) || '');
  const [csrfToken, setCsrfToken] = useState(() => sessionStorage.getItem(CSRF_KEY) || '');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authStatusMessage, setAuthStatusMessage] = useState('');

  // 🔁 Restore session au chargement
  useEffect(() => {
    async function restoreSession() {
      try {
        const storedToken = sessionStorage.getItem(TOKEN_KEY);

        if (!storedToken) {
          setAuthStatusMessage('Reconnexion au CRM en cours...');
          const refreshData = await apiRequest('/api/auth/refresh', {
            method: 'POST',
            retryOnAuthError: false,
          });

          storeAuthSession(refreshData);
          setAuthStatusMessage('');
          return;
        }

        try {
          setAuthStatusMessage('Connexion au CRM en cours...');
          const data = await apiRequest('/api/auth/me', {
            token: storedToken,
          });

          setUser(data.user);
          setToken(storedToken);
          setCsrfToken(sessionStorage.getItem(CSRF_KEY) || '');
          setAuthStatusMessage('');
        } catch {
          setAuthStatusMessage('Session detectee. Reconnexion au backend en cours...');
          const refreshData = await apiRequest('/api/auth/refresh', {
            method: 'POST',
            retryOnAuthError: false,
          });

          storeAuthSession(refreshData);
          setAuthStatusMessage('');
        }
      } catch (err) {
        console.warn('Session restore failed:', err.message);
        if (sessionStorage.getItem(TOKEN_KEY) && isRecoverableSessionError(err)) {
          setToken(sessionStorage.getItem(TOKEN_KEY) || '');
          setCsrfToken(sessionStorage.getItem(CSRF_KEY) || '');
          setAuthStatusMessage('Le backend met plus de temps a repondre. On garde la session et on reessaie.');
        } else {
          setAuthStatusMessage('');
          clearStoredAuthSession();
        }
      } finally {
        setLoading(false);
      }
    }

    restoreSession();
  }, []);

  useEffect(() => {
    const handleAuthUpdated = (event) => {
      const data = event.detail || {};
      setToken(data.token || '');
      setCsrfToken(data.csrfToken || '');
      setUser(data.user || null);
      setAuthStatusMessage('');
    };

    const handleAuthCleared = () => {
      setToken('');
      setCsrfToken('');
      setUser(null);
      setAuthStatusMessage('');
    };

    window.addEventListener('crm:auth-updated', handleAuthUpdated);
    window.addEventListener('crm:auth-cleared', handleAuthCleared);
    return () => {
      window.removeEventListener('crm:auth-updated', handleAuthUpdated);
      window.removeEventListener('crm:auth-cleared', handleAuthCleared);
    };
  }, []);

  useEffect(() => {
    if (!token || user || loading) {
      return undefined;
    }

    setAuthStatusMessage((current) => current || 'Reconnexion automatique au CRM...');
    const retryId = window.setTimeout(async () => {
      try {
        const data = await apiRequest('/api/auth/me', { token });
        setUser(data.user);
        setAuthStatusMessage('');
      } catch (error) {
        if (!isRecoverableSessionError(error)) {
          clearStoredAuthSession();
          return;
        }
        setAuthStatusMessage('Le backend est en train de se reveiller. Nouvelle tentative automatique...');
      }
    }, 12000);

    return () => window.clearTimeout(retryId);
  }, [loading, token, user]);

  useEffect(() => {
    const role = user?.role || '';
    document.documentElement.dataset.userRole = role;
    document.body.dataset.userRole = role;

    return () => {
      document.documentElement.dataset.userRole = '';
      document.body.dataset.userRole = '';
    };
  }, [user?.role]);

  // 🔐 LOGIN
  async function login(email, password, otpCode = '', recoveryCode = '') {
    try {
      const data = await apiRequest('/api/auth/login', {
        method: 'POST',
        retryOnAuthError: false,
        body: {
          email,
          password,
          ...(otpCode ? { otpCode } : {}),
          ...(recoveryCode ? { recoveryCode } : {}),
        },
      });

      storeAuthSession(data);
    } catch (err) {
      console.error('Login error:', err);
      throw new Error(err.message || 'Email ou mot de passe incorrect');
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
      clearStoredAuthSession();
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

  async function requestPasswordReset(email) {
    return apiRequest('/api/auth/password-reset/request', {
      method: 'POST',
      retryOnAuthError: false,
      body: { email },
    });
  }

  async function confirmPasswordReset(tokenValue, newPassword) {
    return apiRequest('/api/auth/password-reset/confirm', {
      method: 'POST',
      retryOnAuthError: false,
      body: { token: tokenValue, newPassword },
    });
  }

  return (
    <AuthContext.Provider
      value={{
        token,
        csrfToken,
        user,
        loading,
        authStatusMessage,
        login,
        logout,
        refreshUser,
        requestPasswordReset,
        confirmPasswordReset,
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
