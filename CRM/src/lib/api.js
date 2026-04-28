export const API_URL = (import.meta.env.VITE_API_URL || 'https://backedugrowth.onrender.com').replace(/\/$/, '');

const AUTH_UPDATED_EVENT = 'crm:auth-updated';
const AUTH_CLEARED_EVENT = 'crm:auth-cleared';
let refreshPromise = null;
const responseCache = new Map();
const inflightRequests = new Map();

function createRequestError(message, { status = 0, isTransient = false, isAuthFailure = false } = {}) {
  const error = new Error(message);
  error.status = status;
  error.isTransient = isTransient;
  error.isAuthFailure = isAuthFailure;
  return error;
}

function isTransientStatus(status) {
  return [408, 425, 429, 500, 502, 503, 504].includes(status);
}

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

function buildCacheKey(path, method, token) {
  return `${method}:${token || 'guest'}:${path}`;
}

function readCachedResponse(cacheKey) {
  const cached = responseCache.get(cacheKey);
  if (!cached || cached.expiresAt < Date.now()) {
    responseCache.delete(cacheKey);
    return null;
  }
  return cached.data;
}

function writeCachedResponse(cacheKey, data, ttlMs) {
  responseCache.set(cacheKey, {
    data,
    expiresAt: Date.now() + ttlMs,
  });
}

function invalidateTokenCache(token) {
  const needle = `:${token || 'guest'}:`;
  for (const key of responseCache.keys()) {
    if (key.includes(needle)) {
      responseCache.delete(key);
    }
  }
}

async function fetchWithTimeout(url, options = {}, timeoutMs = 60000) {
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
    }, 60000)
      .then(async (refreshResponse) => {
        if (!refreshResponse.ok) {
          const data = await refreshResponse.json().catch(() => ({}));
          throw createRequestError(data.message || 'Session refresh failed', {
            status: refreshResponse.status,
            isTransient: isTransientStatus(refreshResponse.status),
            isAuthFailure: refreshResponse.status === 401 || refreshResponse.status === 403,
          });
        }
        const refreshData = await refreshResponse.json();
        storeAuthSession(refreshData);
        return refreshData;
      })
      .catch((error) => {
        if (error?.isAuthFailure) {
          clearStoredAuthSession();
          throw error;
        }
        if (error?.status || error?.isTransient) {
          throw error;
        }
        throw createRequestError(
          error.name === 'AbortError' ? 'Request timeout' : 'Network request failed',
          { isTransient: true },
        );
      })
      .finally(() => {
        refreshPromise = null;
      });
  }

  return refreshPromise;
}

export async function apiRequest(path, { method = 'GET', body, token, headers = {}, retryOnAuthError = true, retryOnCsrfError = true, cacheTtlMs = 0, timeoutMs = 60000 } = {}) {
  const csrfToken = sessionStorage.getItem('crm_csrf_token') || '';
  const requestUrl = path.startsWith('http') ? path : `${API_URL}${path}`;
  const upperMethod = method.toUpperCase();
  const cacheKey = buildCacheKey(path, upperMethod, token);
  if (upperMethod === 'GET') {
    const cachedData = readCachedResponse(cacheKey);
    if (cachedData) {
      return cachedData;
    }
  }
  let response;

  try {
    response = await fetchWithTimeout(requestUrl, {
      method: upperMethod,
      credentials: 'include',
      headers: {
        ...(body instanceof FormData ? {} : { 'Content-Type': 'application/json' }),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...(!['GET', 'HEAD', 'OPTIONS'].includes(upperMethod) && csrfToken ? { 'X-CSRF-Token': csrfToken } : {}),
        ...headers,
      },
      body: body ? (body instanceof FormData ? body : JSON.stringify(body)) : undefined,
    }, timeoutMs);
  } catch (error) {
    if (error?.status || error?.isTransient || error?.isAuthFailure) {
      throw error;
    }
    throw createRequestError(
      error.name === 'AbortError' ? 'Request timeout' : 'Network request failed',
      { isTransient: true },
    );
  }

  if (response.status === 401 && retryOnAuthError && !path.includes('/api/auth/refresh')) {
    const refreshData = await refreshAuthSession();
    return apiRequest(path, {
      method: upperMethod,
      body,
      token: refreshData.token,
      headers,
      retryOnAuthError: false,
      retryOnCsrfError,
      cacheTtlMs,
      timeoutMs,
    });
  }

  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    if (response.status === 403 && data.message === 'CSRF token mismatch' && retryOnCsrfError && !path.includes('/api/auth/refresh')) {
      const refreshData = await refreshAuthSession();
      return apiRequest(path, {
        method: upperMethod,
        body,
        token: refreshData.token,
        headers,
        retryOnAuthError,
        retryOnCsrfError: false,
        cacheTtlMs,
        timeoutMs,
      });
    }
    throw createRequestError(data.message || 'Request failed', {
      status: response.status,
      isTransient: isTransientStatus(response.status),
      isAuthFailure: response.status === 401 || response.status === 403,
    });
  }

  const contentType = response.headers.get('content-type') || '';
  if (contentType.includes('application/json')) {
    const data = await response.json();
    if (upperMethod === 'GET' && cacheTtlMs > 0) {
      writeCachedResponse(cacheKey, data, cacheTtlMs);
    } else if (upperMethod !== 'GET') {
      invalidateTokenCache(token);
    }
    return data;
  }

  if (upperMethod !== 'GET') {
    invalidateTokenCache(token);
  }
  return response.text();
}

export function prefetchApiRequest(path, { token, ttlMs = 10000, headers = {} } = {}) {
  const cacheKey = buildCacheKey(path, 'GET', token);
  const cachedData = readCachedResponse(cacheKey);
  if (cachedData) {
    return Promise.resolve(cachedData);
  }

  if (inflightRequests.has(cacheKey)) {
    return inflightRequests.get(cacheKey);
  }

  const promise = apiRequest(path, {
    token,
    headers,
    cacheTtlMs: ttlMs,
  }).finally(() => {
    inflightRequests.delete(cacheKey);
  });

  inflightRequests.set(cacheKey, promise);
  return promise;
}
