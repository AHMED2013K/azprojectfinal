import { NavLink } from 'react-router-dom';
import { BarChart3, Users, KanbanSquare, MessageSquare, Clock3, Settings, Shield, Database, Inbox, BriefcaseBusiness } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useSocket } from '../context/SocketContext';
import { apiRequest } from '../lib/api';
import { prefetchRouteModule } from '../lib/prefetch';

export default function Sidebar() {
  const { token, user } = useAuth();
  const { theme } = useTheme();
  const { socket } = useSocket();
  const [unreadChatCount, setUnreadChatCount] = useState(0);
  const brandLogo = user?.role === 'commercial' ? '/DCB_LOGO.jpeg' : '/Submark.png';
  const brandAlt = user?.role === 'commercial' ? 'DCB' : 'EduGrowth';
  const activeNavClass = user?.role === 'commercial'
    ? 'bg-gradient-to-r from-[#5C0075] to-[#440056] text-white shadow-lg shadow-[#1D0024]/30'
    : 'bg-gradient-to-r from-sky-700 to-cyan-600 text-white shadow-lg shadow-cyan-900/30';

  const navItems = [
    { to: '/dashboard', icon: BarChart3, label: 'Dashboard' },
    { to: '/leads', icon: Users, label: 'Leads' },
    { to: '/treated', icon: Inbox, label: 'Traités' },
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

  useEffect(() => {
    if (!token) {
      return;
    }

    apiRequest('/api/chat/unread-count', { token })
      .then((data) => setUnreadChatCount(data.total || 0))
      .catch(() => {});
  }, [token]);

  useEffect(() => {
    if (!socket) {
      return undefined;
    }

    const handleUnread = () => {
      setUnreadChatCount((count) => count + 1);
    };
    const handleRead = () => {
      apiRequest('/api/chat/unread-count', { token })
        .then((data) => setUnreadChatCount(data.total || 0))
        .catch(() => {});
    };

    socket.on('chat:unread', handleUnread);
    socket.on('chat:read', handleRead);
    return () => {
      socket.off('chat:unread', handleUnread);
      socket.off('chat:read', handleRead);
    };
  }, [socket, token]);

  return (
    <aside className={theme === 'dark' ? 'hidden w-72 shrink-0 border-r border-white/10 bg-slate-950/85 p-6 lg:block' : 'hidden w-72 shrink-0 border-r border-slate-200 bg-white p-6 lg:block'}>
      <div className={theme === 'dark' ? 'rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl' : 'rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-xl'}>
        <div className="mb-8">
          <img src={brandLogo} alt={brandAlt} className="h-14 w-auto rounded-xl object-contain" />
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
                    ? activeNavClass
                    : theme === 'dark'
                      ? 'text-slate-300 hover:bg-white/6 hover:text-white'
                      : 'text-slate-700 hover:bg-slate-200 hover:text-slate-950',
                ].join(' ')}
              >
                <Icon size={18} />
                <span>{item.label}</span>
                {item.to === '/chat' && unreadChatCount > 0 && (
                  <span className="ml-auto inline-flex min-w-5 items-center justify-center rounded-full bg-rose-500 px-1.5 py-0.5 text-[11px] font-bold text-white">
                    {unreadChatCount > 99 ? '99+' : unreadChatCount}
                  </span>
                )}
              </NavLink>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
