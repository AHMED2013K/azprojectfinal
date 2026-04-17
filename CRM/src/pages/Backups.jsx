import { useEffect, useState } from 'react';
import { Download, Database } from 'lucide-react';
import { apiRequest, API_URL } from '../lib/api';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { formatDate } from '../lib/format';

export default function Backups() {
  const { token } = useAuth();
  const { theme } = useTheme();
  const [backups, setBackups] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1, total: 0 });
  const [summary, setSummary] = useState({
    latestBackupAt: null,
    latestBackupSource: '',
    scheduler: null,
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    apiRequest(`/api/backups?page=${pagination.page}&limit=20`, { token })
      .then((data) => {
        setBackups(data.backups);
        setSummary(data.summary || {
          latestBackupAt: null,
          latestBackupSource: '',
          scheduler: null,
        });
        setPagination(data.pagination);
      })
      .catch(() => {});
  }, [pagination.page, token]);

  async function downloadFile(format) {
    const response = await fetch(`${API_URL}/api/backups/export.${format}`, {
      credentials: 'include',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Export failed');
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = format === 'json' ? 'lead-submission-backups.json' : 'lead-submission-backups.csv';
    link.click();
    window.URL.revokeObjectURL(url);
  }

  async function runBackupNow() {
    const data = await apiRequest('/api/backups/run', {
      method: 'POST',
      token,
    });
    setMessage(data.message || 'Backup completed.');

    const refreshed = await apiRequest(`/api/backups?page=${pagination.page}&limit=20`, { token });
    setBackups(refreshed.backups);
    setSummary(refreshed.summary || {
      latestBackupAt: null,
      latestBackupSource: '',
      scheduler: null,
    });
    setPagination(refreshed.pagination);
  }

  return (
    <div className="space-y-6">
      <section className={theme === 'dark' ? 'rounded-3xl border border-white/10 bg-white/6 p-6' : 'rounded-3xl border border-slate-200 bg-white p-6 shadow-sm'}>
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <Database size={20} className="text-cyan-300" />
              <h1 className={theme === 'dark' ? 'text-3xl font-semibold text-white' : 'text-3xl font-semibold text-slate-900'}>Backups</h1>
            </div>
            <p className={theme === 'dark' ? 'mt-2 text-slate-300' : 'mt-2 text-slate-600'}>
              Historique des copies de sauvegarde des soumissions publiques `/apply`.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button type="button" onClick={() => runBackupNow().catch((error) => setMessage(error.message))} className="btn-primary">
              <Database size={16} /> Run backup now
            </button>
            <button type="button" onClick={() => downloadFile('json')} className="btn-secondary">
              <Download size={16} /> Export JSON
            </button>
            <button type="button" onClick={() => downloadFile('csv')} className="btn-secondary">
              <Download size={16} /> Export CSV
            </button>
          </div>
        </div>

        {message && (
          <p className={theme === 'dark' ? 'mt-5 rounded-2xl border border-cyan-500/20 bg-cyan-500/10 px-4 py-3 text-sm text-cyan-100' : 'mt-5 rounded-2xl border border-cyan-200 bg-cyan-50 px-4 py-3 text-sm text-cyan-800'}>
            {message}
          </p>
        )}

        <div className="mt-5 grid gap-4 md:grid-cols-3">
          <div className={theme === 'dark' ? 'rounded-2xl border border-white/10 bg-slate-950/50 p-4' : 'rounded-2xl border border-slate-200 bg-slate-50 p-4'}>
            <p className={theme === 'dark' ? 'text-xs uppercase tracking-[0.24em] text-slate-400' : 'text-xs uppercase tracking-[0.24em] text-slate-500'}>Latest backup</p>
            <p className={theme === 'dark' ? 'mt-3 text-xl font-semibold text-white' : 'mt-3 text-xl font-semibold text-slate-900'}>
              {summary.latestBackupAt ? formatDate(summary.latestBackupAt) : 'No backup yet'}
            </p>
          </div>
          <div className={theme === 'dark' ? 'rounded-2xl border border-white/10 bg-slate-950/50 p-4' : 'rounded-2xl border border-slate-200 bg-slate-50 p-4'}>
            <p className={theme === 'dark' ? 'text-xs uppercase tracking-[0.24em] text-slate-400' : 'text-xs uppercase tracking-[0.24em] text-slate-500'}>Latest source</p>
            <p className={theme === 'dark' ? 'mt-3 text-xl font-semibold text-white' : 'mt-3 text-xl font-semibold text-slate-900'}>
              {summary.latestBackupSource || 'Unknown'}
            </p>
          </div>
          <div className={theme === 'dark' ? 'rounded-2xl border border-white/10 bg-slate-950/50 p-4' : 'rounded-2xl border border-slate-200 bg-slate-50 p-4'}>
            <p className={theme === 'dark' ? 'text-xs uppercase tracking-[0.24em] text-slate-400' : 'text-xs uppercase tracking-[0.24em] text-slate-500'}>Scheduler status</p>
            <p className={theme === 'dark' ? 'mt-3 text-xl font-semibold text-white' : 'mt-3 text-xl font-semibold text-slate-900'}>
              {summary.scheduler?.lastSuccessAt ? 'Healthy' : summary.scheduler?.lastError ? 'Attention needed' : 'Waiting'}
            </p>
            <p className={theme === 'dark' ? 'mt-2 text-sm text-slate-400' : 'mt-2 text-sm text-slate-500'}>
              {summary.scheduler?.lastSuccessAt
                ? `Last success ${formatDate(summary.scheduler.lastSuccessAt)}`
                : summary.scheduler?.lastError || 'No scheduled backup completed yet'}
            </p>
          </div>
        </div>
      </section>

      <section className={theme === 'dark' ? 'overflow-hidden rounded-3xl border border-white/10 bg-white/6' : 'overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm'}>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className={theme === 'dark' ? 'bg-slate-950/70 text-slate-300' : 'bg-slate-100 text-slate-600'}>
              <tr className="text-left text-sm">
                {['Date', 'Lead', 'Source', 'Country', 'Study field', 'Campaign'].map((label) => (
                  <th key={label} className="px-5 py-4">{label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {backups.map((item) => (
                <tr key={item.id} className={theme === 'dark' ? 'border-t border-white/5 text-slate-200' : 'border-t border-slate-200 text-slate-700'}>
                  <td className="px-5 py-4 text-sm">{formatDate(item.backedUpAt)}</td>
                  <td className="px-5 py-4">
                    <p className={theme === 'dark' ? 'font-medium text-white' : 'font-medium text-slate-900'}>{item.name}</p>
                    <p className={theme === 'dark' ? 'text-sm text-slate-400' : 'text-sm text-slate-500'}>{item.email}</p>
                  </td>
                  <td className="px-5 py-4 text-sm">{item.source || '-'}</td>
                  <td className="px-5 py-4 text-sm">{item.country || '-'}</td>
                  <td className="px-5 py-4 text-sm">{item.details?.studyField || '-'}</td>
                  <td className="px-5 py-4 text-sm">{item.campaign || '-'}</td>
                </tr>
              ))}
              {backups.length === 0 && (
                <tr>
                  <td colSpan={6} className={theme === 'dark' ? 'px-5 py-10 text-center text-sm text-slate-400' : 'px-5 py-10 text-center text-sm text-slate-500'}>
                    Aucun backup disponible pour le moment.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      <div className={theme === 'dark' ? 'flex items-center justify-between rounded-3xl border border-white/10 bg-white/6 px-5 py-4 text-sm text-slate-300' : 'flex items-center justify-between rounded-3xl border border-slate-200 bg-white px-5 py-4 text-sm text-slate-600 shadow-sm'}>
        <span>{pagination.total} sauvegardes au total</span>
        <div className="flex gap-2">
          <button
            type="button"
            disabled={pagination.page <= 1}
            onClick={() => setPagination((current) => ({ ...current, page: current.page - 1 }))}
            className="table-action"
          >
            Previous
          </button>
          <button
            type="button"
            disabled={pagination.page >= pagination.totalPages}
            onClick={() => setPagination((current) => ({ ...current, page: current.page + 1 }))}
            className="table-action"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
