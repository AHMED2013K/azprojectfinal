const routePrefetchers = {
  '/dashboard': () => import('../pages/Dashboard'),
  '/leads': () => import('../pages/Leads'),
  '/treated': () => import('../pages/Treated'),
  '/candidatures': () => import('../pages/Candidatures'),
  '/pipeline': () => import('../pages/Pipeline'),
  '/chat': () => import('../pages/Chat'),
  '/tracking': () => import('../pages/Tracking'),
  '/team': () => import('../pages/Team'),
  '/backups': () => import('../pages/Backups'),
  '/settings': () => import('../pages/Settings'),
  '/login': () => import('../pages/Login'),
};

const routePrefetchCache = new Map();

export function prefetchRouteModule(pathname) {
  const loader = routePrefetchers[pathname];
  if (!loader) {
    return Promise.resolve(null);
  }

  if (!routePrefetchCache.has(pathname)) {
    routePrefetchCache.set(pathname, loader().catch(() => null));
  }

  return routePrefetchCache.get(pathname);
}
