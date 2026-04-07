export const API_URL = (import.meta.env.VITE_API_URL || 'https://backedugrowth.onrender.com').replace(/\/$/, '');

export async function apiRequest(path, { method = 'GET', body, token, headers = {}, retryOnAuthError = true } = {}) {
  const csrfToken = sessionStorage.getItem('crm_csrf_token') || '';
  const requestUrl = path.startsWith('http') ? path : `${API_URL}${path}`;
  const response = await fetch(requestUrl, {
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

  if (response.status === 401 && retryOnAuthError && !path.includes('/api/auth/refresh')) {
    const refreshResponse = await fetch(`${API_URL}/api/auth/refresh`, {
      method: 'POST',
      credentials: 'include',
    });

    if (refreshResponse.ok) {
      const refreshData = await refreshResponse.json();
      sessionStorage.setItem('crm_token', refreshData.token);
      sessionStorage.setItem('crm_csrf_token', refreshData.csrfToken);
      return apiRequest(path, {
        method,
        body,
        token: refreshData.token,
        headers,
        retryOnAuthError: false,
      });
    }
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
