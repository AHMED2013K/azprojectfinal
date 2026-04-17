import { useCallback, useEffect, useState } from 'react';
import { apiRequest } from '../lib/api';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { formatDate } from '../lib/format';

export default function Settings() {
  const { token, user } = useAuth();
  const { theme } = useTheme();
  const [passwordForm, setPasswordForm] = useState({ currentPassword: '', newPassword: '' });
  const [announcementForm, setAnnouncementForm] = useState({ title: '', body: '' });
  const [announcements, setAnnouncements] = useState([]);
  const [diagnostics, setDiagnostics] = useState(null);
  const [message, setMessage] = useState('');

  const loadAnnouncements = useCallback(async () => {
    const data = await apiRequest('/api/announcements', { token });
    setAnnouncements(data.announcements);
  }, [token]);

  const loadDiagnostics = useCallback(async () => {
    if (user?.role !== 'admin') {
      return;
    }
    const data = await apiRequest('/api/admin/diagnostics', { token });
    setDiagnostics(data);
  }, [token, user?.role]);

  useEffect(() => {
    loadAnnouncements().catch(() => {});
  }, [loadAnnouncements]);

  useEffect(() => {
    loadDiagnostics().catch(() => {});
  }, [loadDiagnostics]);

  async function changePassword(event) {
    event.preventDefault();
    await apiRequest('/api/auth/change-password', {
      method: 'POST',
      token,
      body: passwordForm,
    });
    setPasswordForm({ currentPassword: '', newPassword: '' });
    setMessage('Password updated successfully.');
  }

  async function createAnnouncement(event) {
    event.preventDefault();
    await apiRequest('/api/announcements', {
      method: 'POST',
      token,
      body: announcementForm,
    });
    setAnnouncementForm({ title: '', body: '' });
    setMessage('Announcement published.');
    await loadAnnouncements();
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
      <section className={theme === 'dark' ? 'rounded-3xl border border-white/10 bg-white/6 p-6' : 'rounded-3xl border border-slate-200 bg-white p-6 shadow-sm'}>
        <h1 className={theme === 'dark' ? 'text-3xl font-semibold text-white' : 'text-3xl font-semibold text-slate-900'}>Settings</h1>
        <p className={theme === 'dark' ? 'mt-2 text-slate-300' : 'mt-2 text-slate-600'}>Manage your account security and workspace communication.</p>

        {message && <p className={theme === 'dark' ? 'mt-5 rounded-2xl border border-cyan-500/20 bg-cyan-500/10 px-4 py-3 text-sm text-cyan-100' : 'mt-5 rounded-2xl border border-cyan-200 bg-cyan-50 px-4 py-3 text-sm text-cyan-800'}>{message}</p>}

        <form onSubmit={changePassword} className="mt-6 space-y-4">
          <input
            type="password"
            value={passwordForm.currentPassword}
            onChange={(event) => setPasswordForm((current) => ({ ...current, currentPassword: event.target.value }))}
            placeholder="Current password"
            className={theme === 'dark' ? 'w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white' : 'w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900'}
          />
          <input
            type="password"
            value={passwordForm.newPassword}
            onChange={(event) => setPasswordForm((current) => ({ ...current, newPassword: event.target.value }))}
            placeholder="New password"
            className={theme === 'dark' ? 'w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white' : 'w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900'}
          />
          <button type="submit" className="btn-primary">Change password</button>
        </form>
      </section>

      <section className="space-y-6">
        {user?.role === 'admin' && (
          <>
            <div className={theme === 'dark' ? 'rounded-3xl border border-white/10 bg-white/6 p-6' : 'rounded-3xl border border-slate-200 bg-white p-6 shadow-sm'}>
              <div className="flex items-center justify-between">
                <h2 className={theme === 'dark' ? 'text-xl font-semibold text-white' : 'text-xl font-semibold text-slate-900'}>Diagnostics</h2>
                <button type="button" onClick={() => loadDiagnostics().catch(() => {})} className="btn-secondary">
                  Refresh diagnostics
                </button>
              </div>

              {diagnostics && (
                <>
                  <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                    {[
                      { label: 'API uptime', value: `${diagnostics.system.uptimeSeconds}s`, helper: diagnostics.system.database.state },
                      { label: 'Memory RSS', value: `${diagnostics.system.memoryRssMb} MB`, helper: `Heap ${diagnostics.system.memoryHeapUsedMb} MB` },
                      { label: 'Users online', value: diagnostics.stats.onlineUsers, helper: `${diagnostics.stats.totalUsers} total users` },
                      { label: 'Backups', value: diagnostics.stats.backupCount, helper: diagnostics.backups.latestBackupAt ? `Latest ${formatDate(diagnostics.backups.latestBackupAt)}` : 'No backups yet' },
                    ].map((item) => (
                      <div key={item.label} className={theme === 'dark' ? 'rounded-2xl border border-white/10 bg-slate-950/50 p-4' : 'rounded-2xl border border-slate-200 bg-slate-50 p-4'}>
                        <p className={theme === 'dark' ? 'text-xs uppercase tracking-[0.24em] text-slate-400' : 'text-xs uppercase tracking-[0.24em] text-slate-500'}>{item.label}</p>
                        <p className={theme === 'dark' ? 'mt-3 text-2xl font-semibold text-white' : 'mt-3 text-2xl font-semibold text-slate-900'}>{item.value}</p>
                        <p className={theme === 'dark' ? 'mt-2 text-sm text-slate-400' : 'mt-2 text-sm text-slate-500'}>{item.helper}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 grid gap-6 xl:grid-cols-2">
                    <div className={theme === 'dark' ? 'rounded-2xl border border-white/10 bg-slate-950/50 p-4' : 'rounded-2xl border border-slate-200 bg-slate-50 p-4'}>
                      <h3 className={theme === 'dark' ? 'text-sm font-semibold uppercase tracking-[0.24em] text-slate-400' : 'text-sm font-semibold uppercase tracking-[0.24em] text-slate-500'}>Recent auth failures</h3>
                      <div className="mt-4 space-y-3">
                        {diagnostics.authFailures.length === 0 && <p className={theme === 'dark' ? 'text-sm text-slate-400' : 'text-sm text-slate-500'}>No recent auth failures.</p>}
                        {diagnostics.authFailures.map((item) => (
                          <div key={item.id} className={theme === 'dark' ? 'rounded-2xl border border-white/10 bg-white/5 p-4' : 'rounded-2xl border border-slate-200 bg-white p-4'}>
                            <p className={theme === 'dark' ? 'font-medium text-white' : 'font-medium text-slate-900'}>{item.details.email || 'Unknown email'}</p>
                            <p className={theme === 'dark' ? 'mt-1 text-sm text-slate-400' : 'mt-1 text-sm text-slate-500'}>{item.details.reason} · {item.details.ip || 'No IP'} · {formatDate(item.createdAt)}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className={theme === 'dark' ? 'rounded-2xl border border-white/10 bg-slate-950/50 p-4' : 'rounded-2xl border border-slate-200 bg-slate-50 p-4'}>
                      <h3 className={theme === 'dark' ? 'text-sm font-semibold uppercase tracking-[0.24em] text-slate-400' : 'text-sm font-semibold uppercase tracking-[0.24em] text-slate-500'}>Locked accounts</h3>
                      <div className="mt-4 space-y-3">
                        {diagnostics.lockedUsers.length === 0 && <p className={theme === 'dark' ? 'text-sm text-slate-400' : 'text-sm text-slate-500'}>No locked users right now.</p>}
                        {diagnostics.lockedUsers.map((member) => (
                          <div key={member.id} className={theme === 'dark' ? 'rounded-2xl border border-white/10 bg-white/5 p-4' : 'rounded-2xl border border-slate-200 bg-white p-4'}>
                            <p className={theme === 'dark' ? 'font-medium text-white' : 'font-medium text-slate-900'}>{member.name}</p>
                            <p className={theme === 'dark' ? 'mt-1 text-sm text-slate-400' : 'mt-1 text-sm text-slate-500'}>{member.email} · Locked until {formatDate(member.lockUntil)}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className={theme === 'dark' ? 'mt-6 rounded-2xl border border-white/10 bg-slate-950/50 p-4' : 'mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4'}>
                    <h3 className={theme === 'dark' ? 'text-sm font-semibold uppercase tracking-[0.24em] text-slate-400' : 'text-sm font-semibold uppercase tracking-[0.24em] text-slate-500'}>Recent audit log</h3>
                    <div className="mt-4 space-y-3">
                      {diagnostics.auditLogs.map((item) => (
                        <div key={item.id} className={theme === 'dark' ? 'rounded-2xl border border-white/10 bg-white/5 p-4' : 'rounded-2xl border border-slate-200 bg-white p-4'}>
                          <div className="flex items-center justify-between gap-4">
                            <p className={theme === 'dark' ? 'font-medium text-white' : 'font-medium text-slate-900'}>{item.action}</p>
                            <p className={theme === 'dark' ? 'text-xs text-slate-400' : 'text-xs text-slate-500'}>{formatDate(item.createdAt)}</p>
                          </div>
                          <p className={theme === 'dark' ? 'mt-1 text-sm text-slate-400' : 'mt-1 text-sm text-slate-500'}>{item.actor?.name || 'System'} · {item.targetType}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className={theme === 'dark' ? 'rounded-3xl border border-white/10 bg-white/6 p-6' : 'rounded-3xl border border-slate-200 bg-white p-6 shadow-sm'}>
              <h2 className={theme === 'dark' ? 'text-xl font-semibold text-white' : 'text-xl font-semibold text-slate-900'}>Announcements</h2>
              <form onSubmit={createAnnouncement} className="mt-5 space-y-4">
                <input
                  value={announcementForm.title}
                  onChange={(event) => setAnnouncementForm((current) => ({ ...current, title: event.target.value }))}
                  placeholder="Announcement title"
                  className={theme === 'dark' ? 'w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white' : 'w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900'}
                />
                <textarea
                  value={announcementForm.body}
                  onChange={(event) => setAnnouncementForm((current) => ({ ...current, body: event.target.value }))}
                  placeholder="Announcement body"
                  className={theme === 'dark' ? 'min-h-32 w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white' : 'min-h-32 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900'}
                />
                <button type="submit" className="btn-primary">Publish announcement</button>
              </form>
            </div>
          </>
        )}

        <div className={theme === 'dark' ? 'rounded-3xl border border-white/10 bg-white/6 p-6' : 'rounded-3xl border border-slate-200 bg-white p-6 shadow-sm'}>
          <h2 className={theme === 'dark' ? 'text-xl font-semibold text-white' : 'text-xl font-semibold text-slate-900'}>Latest announcements</h2>
          <div className="mt-5 space-y-4">
            {announcements.map((announcement) => (
              <div key={announcement.id} className={theme === 'dark' ? 'rounded-2xl border border-white/10 bg-slate-950/60 p-4' : 'rounded-2xl border border-slate-200 bg-slate-50 p-4'}>
                <p className={theme === 'dark' ? 'font-medium text-white' : 'font-medium text-slate-900'}>{announcement.title}</p>
                <p className={theme === 'dark' ? 'mt-2 text-sm text-slate-300' : 'mt-2 text-sm text-slate-600'}>{announcement.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
