import { NavLink } from 'react-router-dom';
import { BarChart3, Users, KanbanSquare, MessageSquare, Clock3, Settings, Shield } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

export default function Sidebar() {
  const { user } = useAuth();
  const { theme } = useTheme();

  const navItems = [
    { to: '/dashboard', icon: BarChart3, label: 'Dashboard' },
    { to: '/leads', icon: Users, label: 'Leads' },
    { to: '/pipeline', icon: KanbanSquare, label: 'Pipeline' },
    { to: '/chat', icon: MessageSquare, label: 'Chat' },
    { to: '/tracking', icon: Clock3, label: 'Tracking' },
    { to: '/settings', icon: Settings, label: 'Settings' },
  ];

  if (user?.role === 'admin') {
    navItems.splice(5, 0, { to: '/team', icon: Shield, label: 'Team' });
  }

  return (
    <aside className={theme === 'dark' ? 'hidden w-72 shrink-0 border-r border-white/10 bg-slate-950/85 p-6 lg:block' : 'hidden w-72 shrink-0 border-r border-slate-200 bg-white p-6 lg:block'}>
      <div className={theme === 'dark' ? 'rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl' : 'rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-xl'}>
        <div className="mb-8">
          <p className="text-xs uppercase tracking-[0.3em] text-sky-200/70">EduGrowth</p>
          <h1 className={theme === 'dark' ? 'mt-2 text-2xl font-semibold text-white' : 'mt-2 text-2xl font-semibold text-slate-900'}>Outsourcing CRM</h1>
          <p className={theme === 'dark' ? 'mt-2 text-sm text-slate-300' : 'mt-2 text-sm text-slate-600'}>Operations, leads, chat, and tracking in one workspace.</p>
        </div>

        <nav className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) => [
                  'flex items-center gap-3 rounded-2xl px-4 py-3 text-sm transition',
                  isActive
                    ? 'bg-gradient-to-r from-sky-700 to-cyan-600 text-white shadow-lg shadow-cyan-900/30'
                    : theme === 'dark'
                      ? 'text-slate-300 hover:bg-white/6 hover:text-white'
                      : 'text-slate-700 hover:bg-slate-200 hover:text-slate-950',
                ].join(' ')}
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
