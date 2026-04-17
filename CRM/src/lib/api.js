export const API_URL = (import.meta.env.VITE_API_URL || 'https://backedugrowth.onrender.com').replace(/\/$/, '');

const AUTH_UPDATED_EVENT = 'crm:auth-updated';
const AUTH_CLEARED_EVENT = 'crm:auth-cleared';
let refreshPromise = null;

function emitAuthUpdated(payload) {
  window.dispatchEvent(new CustomEvent(AUTH_UPDATED_EVENT, { detail: payload }));
}

export function clearStoredAuthSession() {
  sessionStorage.removeItem('crm_token');
  sessionStorage.removeItem('crm_csrf_token');
  window.dispatchEvent(new CustomEvent(AUTH_CLEARED_EVENT));
}

export function storeAuthSession(data) {
  sessionStorage.setItem('crm_token', data.token);
  sessionStorage.setItem('crm_csrf_token', data.csrfToken);
  emitAuthUpdated(data);
}

async function fetchWithTimeout(url, options = {}, timeoutMs = 15000) {
  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), timeoutMs);

  try {
    return await fetch(url, {
      ...options,
      signal: controller.signal,
    });
  } finally {
    window.clearTimeout(timeoutId);
  }
}

async function refreshAuthSession() {
  if (!refreshPromise) {
    refreshPromise = fetchWithTimeout(`${API_URL}/api/auth/refresh`, {
      method: 'POST',
      credentials: 'include',
    })
      .then(async (refreshResponse) => {
        if (!refreshResponse.ok) {
          throw new Error('Session refresh failed');
        }
        const refreshData = await refreshResponse.json();
        storeAuthSession(refreshData);
        return refreshData;
      })
      .catch((error) => {
        clearStoredAuthSession();
        throw error;
      })
      .finally(() => {
        refreshPromise = null;
      });
  }

  return refreshPromise;
}

export async function apiRequest(path, { method = 'GET', body, token, headers = {}, retryOnAuthError = true } = {}) {
  const csrfToken = sessionStorage.getItem('crm_csrf_token') || '';
  const requestUrl = path.startsWith('http') ? path : `${API_URL}${path}`;
  let response;

  try {
    response = await fetchWithTimeout(requestUrl, {
      method,
      credentials: 'include',
      headers: {
        ...(body instanceof FormData ? {} : { 'Content-Type': 'application/json' }),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...(!['GET', 'HEAD', 'OPTIONS'].includes(method) && csrfToken ? { 'X-CSRF-Token': csrfToken } : {}),
        ...headers,
      },
      body: body ? (body instanceof FormData ? body : JSON.stringify(body)) : undefined,
    });
  } catch (error) {
    throw new Error(error.name === 'AbortError' ? 'Request timeout' : 'Network request failed');
  }

  if (response.status === 401 && retryOnAuthError && !path.includes('/api/auth/refresh')) {
    const refreshData = await refreshAuthSession();
    return apiRequest(path, {
      method,
      body,
      token: refreshData.token,
      headers,
      retryOnAuthError: false,
    });
  }

  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new Error(data.message || 'Request failed');
  }

  const contentType = response.headers.get('content-type') || '';
  if (contentType.includes('application/json')) {
    return response.json();
  }

  return response.text();
}
