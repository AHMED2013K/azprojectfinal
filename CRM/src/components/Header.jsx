import { Bell, Briefcase, LogOut, Moon, Pause, Play, Square, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { formatDate } from '../lib/format';
import { apiRequest } from '../lib/api';

export default function Header({ notifications = [], onOpenNotifications }) {
  const { theme, setTheme } = useTheme();
  const { token, user, logout } = useAuth();
  const unread = notifications.filter((item) => !item.readAt).length;
  const [workSession, setWorkSession] = useState(null);
  const [trackingBusy, setTrackingBusy] = useState(false);

  useEffect(() => {
    if (!token) {
      return;
    }
    apiRequest('/api/tracking/me', { token }).then((data) => setWorkSession(data.session)).catch(() => {});
  }, [token]);

  async function triggerWorkAction(action) {
    setTrackingBusy(true);
    try {
      const data = await apiRequest('/api/tracking/action', {
        method: 'POST',
        token,
        body: { action },
      });
      setWorkSession(data.session);
    } finally {
      setTrackingBusy(false);
    }
  }

  const nextTrackingAction = !workSession?.startedAt || (!workSession.active && !workSession.endedAt)
    ? ['start', 'Start work', Play]
    : workSession.paused
      ? ['resume', 'Resume', Play]
      : workSession.active
        ? ['pause', 'Pause', Pause]
        : ['start', 'Start work', Briefcase];
  const TrackingIcon = nextTrackingAction[2];
  const canEndDay = Boolean(workSession?.startedAt) && !workSession?.endedAt;

  return (
    <header className={theme === 'dark' ? 'flex flex-col gap-4 border-b border-white/10 bg-slate-950/60 px-6 py-5 backdrop-blur xl:flex-row xl:items-center xl:justify-between' : 'flex flex-col gap-4 border-b border-slate-200 bg-white/90 px-6 py-5 backdrop-blur xl:flex-row xl:items-center xl:justify-between'}>
      <div>
        <p className={theme === 'dark' ? 'text-sm text-slate-400' : 'text-sm text-slate-500'}>Premium CRM workspace</p>
        <h2 className={theme === 'dark' ? 'text-2xl font-semibold text-white' : 'text-2xl font-semibold text-slate-900'}>Welcome back, {user?.name}</h2>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => triggerWorkAction(nextTrackingAction[0])}
          disabled={trackingBusy}
          className="btn-primary px-4 py-3 disabled:cursor-not-allowed disabled:opacity-60"
          title="Tracking"
        >
          <TrackingIcon size={18} />
          <span className="hidden sm:inline">{trackingBusy ? 'Saving...' : nextTrackingAction[1]}</span>
        </button>

        <button
          type="button"
          onClick={() => triggerWorkAction('end')}
          disabled={trackingBusy || !canEndDay}
          className="btn-secondary px-4 py-3 disabled:cursor-not-allowed disabled:opacity-60"
          title="End of the day"
        >
          <Square size={18} />
          <span className="hidden sm:inline">{trackingBusy ? 'Saving...' : 'End of the day'}</span>
        </button>

        <button
          type="button"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className={theme === 'dark' ? 'rounded-2xl border border-white/10 bg-white/5 p-3 text-slate-200 transition hover:bg-white/10' : 'rounded-2xl border border-slate-200 bg-slate-100 p-3 text-slate-700 transition hover:bg-slate-200'}
        >
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        <button
          type="button"
          onClick={onOpenNotifications}
          className={theme === 'dark' ? 'relative rounded-2xl border border-white/10 bg-white/5 p-3 text-slate-200 transition hover:bg-white/10' : 'relative rounded-2xl border border-slate-200 bg-slate-100 p-3 text-slate-700 transition hover:bg-slate-200'}
        >
          <Bell size={18} />
          {unread > 0 && (
            <span className="absolute -right-1 -top-1 rounded-full bg-amber-400 px-1.5 text-[10px] font-bold text-slate-950">
              {unread}
            </span>
          )}
        </button>

        <div className={theme === 'dark' ? 'hidden rounded-2xl border border-white/10 bg-white/5 px-4 py-2 md:block' : 'hidden rounded-2xl border border-slate-200 bg-slate-100 px-4 py-2 md:block'}>
          <p className={theme === 'dark' ? 'text-sm font-medium text-white' : 'text-sm font-medium text-slate-900'}>{user?.email}</p>
          <p className={theme === 'dark' ? 'text-xs text-slate-400' : 'text-xs text-slate-500'}>Last sync {formatDate(new Date())}</p>
        </div>

        <button
          type="button"
          onClick={logout}
          className={theme === 'dark' ? 'rounded-2xl border border-white/10 bg-white/5 p-3 text-slate-200 transition hover:bg-red-500/20 hover:text-red-100' : 'rounded-2xl border border-slate-200 bg-slate-100 p-3 text-slate-700 transition hover:bg-red-100 hover:text-red-700'}
        >
          <LogOut size={18} />
        </button>
      </div>
    </header>
  );
}
