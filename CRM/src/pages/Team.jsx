import { useCallback, useEffect, useState } from 'react';
import { apiRequest } from '../lib/api';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { formatDate } from '../lib/format';

export default function Team() {
  const { token } = useAuth();
  const { theme } = useTheme();
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'commercial' });

  const loadUsers = useCallback(async () => {
    const params = new URLSearchParams({
      ...(search ? { q: search } : {}),
      page: '1',
      limit: '50',
    });
    const data = await apiRequest(`/api/users?${params.toString()}`, { token });
    setUsers(data.users);
  }, [search, token]);

  useEffect(() => {
    loadUsers().catch(() => {});
  }, [loadUsers]);

  async function handleSubmit(event) {
    event.preventDefault();
    await apiRequest('/api/users', {
      method: 'POST',
      token,
      body: form,
    });
    setForm({ name: '', email: '', password: '', role: 'commercial' });
    await loadUsers();
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[1fr_0.9fr]">
      <section className={theme === 'dark' ? 'rounded-3xl border border-white/10 bg-white/6 p-6' : 'rounded-3xl border border-slate-200 bg-white p-6 shadow-sm'}>
        <h1 className={theme === 'dark' ? 'text-3xl font-semibold text-white' : 'text-3xl font-semibold text-slate-900'}>Team administration</h1>
        <p className={theme === 'dark' ? 'mt-2 text-slate-300' : 'mt-2 text-slate-600'}>Create user accounts, assign roles, and review user presence.</p>

        <input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search team members"
          className={theme === 'dark' ? 'mt-5 w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white' : 'mt-5 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900'}
        />

        <div className="mt-6 overflow-x-auto">
          <table className={theme === 'dark' ? 'min-w-full text-left text-sm text-slate-300' : 'min-w-full text-left text-sm text-slate-600'}>
            <thead>
              <tr className={theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}>
                {['Name', 'Email', 'Role', 'Presence', 'Created'].map((column) => (
                  <th key={column} className="px-3 py-3">{column}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {users.map((member) => (
                <tr key={member.id} className={theme === 'dark' ? 'border-t border-white/5' : 'border-t border-slate-200'}>
                  <td className={theme === 'dark' ? 'px-3 py-4 text-white' : 'px-3 py-4 text-slate-900'}>{member.name}</td>
                  <td className="px-3 py-4">{member.email}</td>
                  <td className="px-3 py-4 capitalize">{member.role}</td>
                  <td className="px-3 py-4">{member.isOnline ? 'Online' : 'Offline'}</td>
                  <td className="px-3 py-4">{formatDate(member.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className={theme === 'dark' ? 'rounded-3xl border border-white/10 bg-white/6 p-6' : 'rounded-3xl border border-slate-200 bg-white p-6 shadow-sm'}>
        <h2 className={theme === 'dark' ? 'text-xl font-semibold text-white' : 'text-xl font-semibold text-slate-900'}>Create a new user</h2>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {['name', 'email', 'password'].map((field) => (
            <input
              key={field}
              type={field === 'password' ? 'password' : 'text'}
              value={form[field]}
              onChange={(event) => setForm((current) => ({ ...current, [field]: event.target.value }))}
              placeholder={field[0].toUpperCase() + field.slice(1)}
              className={theme === 'dark' ? 'w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white' : 'w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900'}
            />
          ))}

          <select
            value={form.role}
            onChange={(event) => setForm((current) => ({ ...current, role: event.target.value }))}
            className={theme === 'dark' ? 'w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white' : 'w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900'}
          >
            <option value="commercial">Commercial</option>
            <option value="admin">Admin</option>
          </select>

          <button type="submit" className="btn-primary w-full justify-center">Create user</button>
        </form>
      </section>
    </div>
  );
}
