import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { useTheme } from './ThemeContext';

const ToastContext = createContext(null);

function createToastId() {
  return `toast-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function ToastProvider({ children }) {
  const { theme } = useTheme();
  const [toasts, setToasts] = useState([]);

  const dismissToast = useCallback((toastId) => {
    setToasts((current) => current.filter((toast) => toast.id !== toastId));
  }, []);

  const showToast = useCallback((toast) => {
    const id = toast.id || createToastId();
    const duration = toast.duration ?? 3600;
    const nextToast = {
      id,
      type: toast.type || 'info',
      title: toast.title || '',
      message: toast.message || '',
      actionLabel: toast.actionLabel || '',
      onAction: toast.onAction || null,
    };

    setToasts((current) => [...current, nextToast]);

    if (duration > 0) {
      window.setTimeout(() => {
        dismissToast(id);
      }, duration);
    }

    return id;
  }, [dismissToast]);

  const value = useMemo(() => ({
    showToast,
    dismissToast,
  }), [dismissToast, showToast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="pointer-events-none fixed right-5 top-5 z-[90] flex w-full max-w-sm flex-col gap-3">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`pointer-events-auto animate-toast-in overflow-hidden rounded-2xl border shadow-2xl backdrop-blur ${
              toast.type === 'error'
                ? 'border-red-500/25 bg-slate-950/95 text-red-100'
                : toast.type === 'success'
                  ? theme === 'dark'
                    ? 'border-emerald-500/20 bg-slate-950/95 text-emerald-100'
                    : 'border-emerald-200 bg-white/95 text-slate-800'
                  : theme === 'dark'
                    ? 'border-cyan-400/15 bg-slate-950/92 text-slate-100'
                    : 'border-slate-200 bg-white text-slate-900'
            }`}
          >
            <div className={`h-1.5 ${
              toast.type === 'error'
                ? 'bg-gradient-to-r from-red-500 via-rose-400 to-orange-400'
                : toast.type === 'success'
                  ? 'bg-gradient-to-r from-emerald-500 via-cyan-400 to-sky-400'
                  : 'bg-gradient-to-r from-sky-500 via-cyan-400 to-emerald-400'
            }`}
            />
            <div className="p-4">
              {toast.title && <p className="text-sm font-semibold">{toast.title}</p>}
              {toast.message && <p className={`${toast.title ? 'mt-1' : ''} text-sm`}>{toast.message}</p>}
              <div className="mt-3 flex items-center justify-between gap-3">
                {toast.actionLabel && toast.onAction ? (
                  <button
                    type="button"
                    onClick={() => {
                      toast.onAction();
                      dismissToast(toast.id);
                    }}
                    className="rounded-full border border-white/15 px-3 py-1 text-xs transition hover:bg-white/10"
                  >
                    {toast.actionLabel}
                  </button>
                ) : <span />}
                <button
                  type="button"
                  onClick={() => dismissToast(toast.id)}
                  className={theme === 'dark' ? 'text-xs text-slate-400 transition hover:text-white' : 'text-xs text-slate-500 transition hover:text-slate-900'}
                >
                  Dismiss
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return context;
}
