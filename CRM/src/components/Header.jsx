import { Bell, LogOut, Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { formatDate } from '../lib/format';

export default function Header({ notifications = [], onOpenNotifications }) {
  const { theme, setTheme } = useTheme();
  const { user, logout } = useAuth();
  const unread = notifications.filter((item) => !item.readAt).length;

  return (
    <header className={theme === 'dark' ? 'flex flex-col gap-4 border-b border-white/10 bg-slate-950/60 px-6 py-5 backdrop-blur xl:flex-row xl:items-center xl:justify-between' : 'flex flex-col gap-4 border-b border-slate-200 bg-white/90 px-6 py-5 backdrop-blur xl:flex-row xl:items-center xl:justify-between'}>
      <div>
        <p className={theme === 'dark' ? 'text-sm text-slate-400' : 'text-sm text-slate-500'}>Premium CRM workspace</p>
        <h2 className={theme === 'dark' ? 'text-2xl font-semibold text-white' : 'text-2xl font-semibold text-slate-900'}>Welcome back, {user?.name}</h2>
      </div>

      <div className="flex items-center gap-3">
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
