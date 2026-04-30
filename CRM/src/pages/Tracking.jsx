import { useEffect, useState } from 'react';
import { apiRequest } from '../lib/api';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useSocket } from '../context/SocketContext';
import { formatDate, formatMinutes } from '../lib/format';

export default function Tracking() {
  const { token, user } = useAuth();
  const { theme } = useTheme();
  const { socket } = useSocket();
  const [session, setSession] = useState(null);
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    apiRequest('/api/tracking/me', { token }).then((data) => setSession(data.session)).catch(() => {});
    if (user?.role === 'admin') {
      apiRequest('/api/tracking/users', { token }).then((data) => setSessions(data.sessions)).catch(() => {});
    }
  }, [token, user?.role]);

  useEffect(() => {
    if (!socket) {
      return undefined;
    }

    const handleUpdate = ({ session: updatedSession }) => {
      if (updatedSession.user === user.id) {
        setSession(updatedSession);
      }

      if (user.role === 'admin') {
        apiRequest('/api/tracking/users', { token }).then((data) => setSessions(data.sessions)).catch(() => {});
      }
    };

    socket.on('tracking:updated', handleUpdate);
    return () => socket.off('tracking:updated', handleUpdate);
  }, [socket, token, user.id]);

  async function trigger(action) {
    const data = await apiRequest('/api/tracking/action', {
      method: 'POST',
      token,
      body: { action },
    });
    setSession(data.session);
    if (user?.role === 'admin') {
      const usersData = await apiRequest('/api/tracking/users', { token });
      setSessions(usersData.sessions);
    }
  }

  return (
    <div className="space-y-6">
      <div className={theme === 'dark' ? 'rounded-3xl border border-white/10 bg-white/6 p-6' : 'rounded-3xl border border-slate-200 bg-white p-6 shadow-sm'}>
        <h1 className={theme === 'dark' ? 'text-3xl font-semibold text-white' : 'text-3xl font-semibold text-slate-900'}>Employee tracking</h1>
        <p className={theme === 'dark' ? 'mt-2 text-slate-300' : 'mt-2 text-slate-600'}>Track start, pause, resume, and end-of-day activity with real-time updates.</p>
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
        <section className={theme === 'dark' ? 'rounded-3xl border border-white/10 bg-white/6 p-6' : 'rounded-3xl border border-slate-200 bg-white p-6 shadow-sm'}>
          <h2 className={theme === 'dark' ? 'text-xl font-semibold text-white' : 'text-xl font-semibold text-slate-900'}>My workday</h2>
          <p className={theme === 'dark' ? 'mt-2 text-slate-300' : 'mt-2 text-slate-600'}>Total tracked time: {formatMinutes(session?.totalWorkedMinutes || 0)}</p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {[
              ['start', 'Start work'],
              ['pause', 'Pause'],
              ['resume', 'Resume'],
              ['end', 'End day'],
            ].map(([action, label]) => (
              <button key={action} type="button" onClick={() => trigger(action)} className="btn-primary justify-center">
                {label}
              </button>
            ))}
          </div>

          <div className="mt-6 space-y-3">
            {(session?.events || []).map((event) => (
              <div key={`${event.type}-${event.timestamp}`} className={theme === 'dark' ? 'rounded-2xl border border-white/10 bg-slate-950/50 p-4' : 'rounded-2xl border border-slate-200 bg-slate-50 p-4'}>
                <p className={theme === 'dark' ? 'font-medium capitalize text-white' : 'font-medium capitalize text-slate-900'}>{event.type}</p>
                <p className={theme === 'dark' ? 'mt-1 text-sm text-slate-400' : 'mt-1 text-sm text-slate-500'}>{formatDate(event.timestamp)}</p>
              </div>
            ))}
          </div>
        </section>

        {user?.role === 'admin' && <section className={theme === 'dark' ? 'rounded-3xl border border-white/10 bg-white/6 p-6' : 'rounded-3xl border border-slate-200 bg-white p-6 shadow-sm'}>
          <h2 className={theme === 'dark' ? 'text-xl font-semibold text-white' : 'text-xl font-semibold text-slate-900'}>Team logs</h2>
          <div className="mt-5 overflow-x-auto">
            <table className={theme === 'dark' ? 'min-w-full text-left text-sm text-slate-300' : 'min-w-full text-left text-sm text-slate-600'}>
              <thead className={theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}>
                <tr>
                  {['User', 'Date', 'Start', 'End', 'Worked', 'State'].map((column) => (
                    <th key={column} className="px-3 py-3">{column}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {sessions.map((item) => (
                  <tr key={item.id} className={theme === 'dark' ? 'border-t border-white/5' : 'border-t border-slate-200'}>
                    <td className={theme === 'dark' ? 'px-3 py-4 text-white' : 'px-3 py-4 text-slate-900'}>{item.user.name}</td>
                    <td className="px-3 py-4">{item.dateKey}</td>
                    <td className="px-3 py-4">{item.startedAt ? formatDate(item.startedAt) : '-'}</td>
                    <td className="px-3 py-4">{item.endedAt ? formatDate(item.endedAt) : '-'}</td>
                    <td className="px-3 py-4">{formatMinutes(item.totalWorkedMinutes)}</td>
                    <td className="px-3 py-4">{item.active ? (item.paused ? 'Paused' : 'Working') : 'Offline'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>}
      </div>
    </div>
  );
}
