import { NavLink } from 'react-router-dom';
import { BarChart3, Users, KanbanSquare, MessageSquare, Clock3, Settings, Shield, Database, Inbox, BriefcaseBusiness } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { prefetchRouteModule } from '../lib/prefetch';

export default function Sidebar() {
  const { user } = useAuth();
  const { theme } = useTheme();

  const navItems = [
    { to: '/dashboard', icon: BarChart3, label: 'Dashboard' },
    { to: '/leads', icon: Users, label: 'Leads' },
    { to: '/treated', icon: Inbox, label: 'Traites' },
    { to: '/chat', icon: MessageSquare, label: 'Chat' },
    { to: '/tracking', icon: Clock3, label: 'Tracking' },
  ];

  if (user?.role === 'admin') {
    navItems.splice(3, 0, { to: '/candidatures', icon: BriefcaseBusiness, label: 'Candidatures' });
    navItems.splice(4, 0, { to: '/pipeline', icon: KanbanSquare, label: 'Pipeline' });
    navItems.splice(7, 0, { to: '/team', icon: Shield, label: 'Team' });
    navItems.splice(8, 0, { to: '/backups', icon: Database, label: 'Backups' });
    navItems.push({ to: '/settings', icon: Settings, label: 'Settings' });
  } else if (user?.role === 'manager') {
    navItems.splice(3, 0, { to: '/pipeline', icon: KanbanSquare, label: 'Pipeline' });
    navItems.push({ to: '/settings', icon: Settings, label: 'Settings' });
  } else if (user?.role === 'viewer') {
    navItems.push({ to: '/settings', icon: Settings, label: 'Settings' });
  }

  return (
    <aside className={theme === 'dark' ? 'hidden w-72 shrink-0 border-r border-white/10 bg-slate-950/85 p-6 lg:block' : 'hidden w-72 shrink-0 border-r border-slate-200 bg-white p-6 lg:block'}>
      <div className={theme === 'dark' ? 'rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl' : 'rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-xl'}>
        <div className="mb-8">
          <img src="/DCB_LOGO.jpeg" alt="DCB" className="h-14 w-auto rounded-xl object-contain" />
          <h1 className={theme === 'dark' ? 'mt-4 text-2xl font-semibold text-white' : 'mt-4 text-2xl font-semibold text-slate-900'}>Outsourcing CRM</h1>
          <p className={theme === 'dark' ? 'mt-2 text-sm text-slate-300' : 'mt-2 text-sm text-slate-600'}>Operations, leads, chat, and tracking in one workspace.</p>
        </div>

        <nav className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                onMouseEnter={() => prefetchRouteModule(item.to)}
                onFocus={() => prefetchRouteModule(item.to)}
                className={({ isActive }) => [
                  'flex items-center gap-3 rounded-2xl px-4 py-3 text-sm transition',
                  isActive
                    ? 'bg-gradient-to-r from-[#5C0075] to-[#440056] text-white shadow-lg shadow-[#1D0024]/30'
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
