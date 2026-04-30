import { Pencil, Save, Trash2, X } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { apiRequest } from '../lib/api';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useSocket } from '../context/SocketContext';
import { formatDate } from '../lib/format';

const ROLE_OPTIONS = [
  { value: 'commercial', label: 'Commercial' },
  { value: 'manager', label: 'Manager' },
  { value: 'viewer', label: 'Viewer' },
  { value: 'admin', label: 'Admin' },
];

export default function Team() {
  const { token, user: currentUser } = useAuth();
  const { theme } = useTheme();
  const { socket } = useSocket();
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'commercial' });
  const [editingUserId, setEditingUserId] = useState('');
  const [editForm, setEditForm] = useState({ name: '', email: '', password: '', role: 'commercial' });
  const [submitting, setSubmitting] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [deletingUserId, setDeletingUserId] = useState('');
  const [feedback, setFeedback] = useState({ type: '', message: '' });

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

  useEffect(() => {
    if (!socket) {
      return undefined;
    }

    const handlePresenceUpdate = ({ userId, isOnline, lastSeenAt }) => {
      setUsers((current) => current.map((member) => (
        member.id === userId ? { ...member, isOnline, lastSeenAt } : member
      )));
    };

    const handleUserUpdated = ({ user }) => {
      setUsers((current) => current.map((member) => (member.id === user.id ? user : member)));
    };

    const handleUserDeleted = ({ userId }) => {
      setUsers((current) => current.filter((member) => member.id !== userId));
      if (editingUserId === userId) {
        setEditingUserId('');
      }
    };

    socket.on('presence:update', handlePresenceUpdate);
    socket.on('user:updated', handleUserUpdated);
    socket.on('user:deleted', handleUserDeleted);
    return () => {
      socket.off('presence:update', handlePresenceUpdate);
      socket.off('user:updated', handleUserUpdated);
      socket.off('user:deleted', handleUserDeleted);
    };
  }, [editingUserId, socket]);

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitting(true);
    setFeedback({ type: '', message: '' });

    try {
      await apiRequest('/api/users', {
        method: 'POST',
        token,
        body: form,
      });
      setForm({ name: '', email: '', password: '', role: 'commercial' });
      setFeedback({ type: 'success', message: 'User created successfully.' });
      await loadUsers();
    } catch (error) {
      setFeedback({
        type: 'error',
        message: error.message || 'Unable to create the user.',
      });
    } finally {
      setSubmitting(false);
    }
  }

  function startEditing(member) {
    setFeedback({ type: '', message: '' });
    setEditingUserId(member.id);
    setEditForm({
      name: member.name,
      email: member.email,
      password: '',
      role: member.role,
    });
  }

  async function handleUpdate(event) {
    event.preventDefault();
    setUpdating(true);
    setFeedback({ type: '', message: '' });

    try {
      const data = await apiRequest(`/api/users/${editingUserId}`, {
        method: 'PATCH',
        token,
        body: editForm,
      });
      setUsers((current) => current.map((member) => (member.id === data.user.id ? data.user : member)));
      setEditingUserId('');
      setEditForm({ name: '', email: '', password: '', role: 'commercial' });
      setFeedback({ type: 'success', message: 'Team member updated successfully.' });
    } catch (error) {
      setFeedback({ type: 'error', message: error.message || 'Unable to update this user.' });
    } finally {
      setUpdating(false);
    }
  }

  async function handleDelete(member) {
    if (member.id === currentUser?.id) {
      setFeedback({ type: 'error', message: 'You cannot delete your own account.' });
      return;
    }

    const confirmed = window.confirm(`Delete ${member.name} from the team?`);
    if (!confirmed) {
      return;
    }

    setDeletingUserId(member.id);
    setFeedback({ type: '', message: '' });
    try {
      await apiRequest(`/api/users/${member.id}`, {
        method: 'DELETE',
        token,
      });
      setUsers((current) => current.filter((item) => item.id !== member.id));
      if (editingUserId === member.id) {
        setEditingUserId('');
      }
      setFeedback({ type: 'success', message: 'Team member deleted.' });
    } catch (error) {
      setFeedback({ type: 'error', message: error.message || 'Unable to delete this user.' });
    } finally {
      setDeletingUserId('');
    }
  }

  return (
    <div className="grid min-w-0 gap-6 xl:grid-cols-[1fr_0.9fr]">
      <section className={theme === 'dark' ? 'rounded-3xl border border-white/10 bg-white/6 p-6' : 'rounded-3xl border border-slate-200 bg-white p-6 shadow-sm'}>
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h1 className={theme === 'dark' ? 'text-3xl font-semibold text-white' : 'text-3xl font-semibold text-slate-900'}>Team administration</h1>
            <p className={theme === 'dark' ? 'mt-2 text-slate-300' : 'mt-2 text-slate-600'}>Create user accounts, manage credentials, and follow presence in real time.</p>
          </div>
          <span className={theme === 'dark' ? 'rounded-full border border-emerald-400/20 bg-emerald-500/10 px-3 py-1 text-sm text-emerald-200' : 'rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-sm text-emerald-700'}>
            {users.filter((member) => member.isOnline).length} online
          </span>
        </div>

        <input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search team members"
          className={theme === 'dark' ? 'mt-5 w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white' : 'mt-5 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900'}
        />

        <div className="mt-6 overflow-x-auto">
          <table className={theme === 'dark' ? 'min-w-[780px] text-left text-sm text-slate-300' : 'min-w-[780px] text-left text-sm text-slate-600'}>
            <thead>
              <tr className={theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}>
                {['Name', 'Email', 'Role', 'Presence', 'Created', 'Actions'].map((column) => (
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
                  <td className="px-3 py-4">
                    <span className="inline-flex items-center gap-2">
                      <span className={`h-2.5 w-2.5 rounded-full ${member.isOnline ? 'bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.75)]' : 'bg-slate-500'}`} />
                      {member.isOnline ? 'Online' : 'Offline'}
                    </span>
                  </td>
                  <td className="px-3 py-4">{formatDate(member.createdAt)}</td>
                  <td className="px-3 py-4">
                    <div className="flex items-center gap-2">
                      <button type="button" onClick={() => startEditing(member)} className="table-action" title="Edit member">
                        <Pencil size={14} />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(member)}
                        disabled={deletingUserId === member.id || member.id === currentUser?.id}
                        className="table-action danger"
                        title="Delete member"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <div className="space-y-6">
      {editingUserId && (
        <section className={theme === 'dark' ? 'rounded-3xl border border-white/10 bg-white/6 p-6' : 'rounded-3xl border border-slate-200 bg-white p-6 shadow-sm'}>
          <div className="flex items-center justify-between gap-3">
            <h2 className={theme === 'dark' ? 'text-xl font-semibold text-white' : 'text-xl font-semibold text-slate-900'}>Edit team member</h2>
            <button
              type="button"
              onClick={() => setEditingUserId('')}
              className="table-action"
              title="Cancel"
            >
              <X size={16} />
            </button>
          </div>
          <form onSubmit={handleUpdate} className="mt-6 space-y-4">
            <input
              value={editForm.name}
              onChange={(event) => setEditForm((current) => ({ ...current, name: event.target.value }))}
              placeholder="Name"
              className={theme === 'dark' ? 'w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white' : 'w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900'}
            />
            <input
              type="email"
              value={editForm.email}
              onChange={(event) => setEditForm((current) => ({ ...current, email: event.target.value }))}
              placeholder="Email"
              className={theme === 'dark' ? 'w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white' : 'w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900'}
            />
            <input
              type="password"
              value={editForm.password}
              onChange={(event) => setEditForm((current) => ({ ...current, password: event.target.value }))}
              placeholder="New password (leave empty to keep current)"
              className={theme === 'dark' ? 'w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white' : 'w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900'}
            />
            <select
              value={editForm.role}
              onChange={(event) => setEditForm((current) => ({ ...current, role: event.target.value }))}
              className={theme === 'dark' ? 'w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white' : 'w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900'}
            >
              {ROLE_OPTIONS.map((item) => (
                <option key={item.value} value={item.value}>{item.label}</option>
              ))}
            </select>
            <button type="submit" disabled={updating} className="btn-primary w-full justify-center disabled:cursor-not-allowed disabled:opacity-60">
              <Save size={16} />
              {updating ? 'Saving...' : 'Save changes'}
            </button>
          </form>
        </section>
      )}

      <section className={theme === 'dark' ? 'rounded-3xl border border-white/10 bg-white/6 p-6' : 'rounded-3xl border border-slate-200 bg-white p-6 shadow-sm'}>
        <h2 className={theme === 'dark' ? 'text-xl font-semibold text-white' : 'text-xl font-semibold text-slate-900'}>Create a new user</h2>
        <p className={theme === 'dark' ? 'mt-2 text-sm text-slate-400' : 'mt-2 text-sm text-slate-500'}>
          Password must contain at least 8 characters, one uppercase letter, one lowercase letter, and one number.
        </p>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {['name', 'email', 'password'].map((field) => (
            <input
              key={field}
              type={field === 'password' ? 'password' : field === 'email' ? 'email' : 'text'}
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
            {ROLE_OPTIONS.map((item) => (
              <option key={item.value} value={item.value}>{item.label}</option>
            ))}
          </select>

          {feedback.message && (
            <p className={feedback.type === 'error'
              ? 'rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200'
              : 'rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200'}
            >
              {feedback.message}
            </p>
          )}

          <button type="submit" disabled={submitting} className="btn-primary w-full justify-center disabled:cursor-not-allowed disabled:opacity-60">
            {submitting ? 'Creating user...' : 'Create user'}
          </button>
        </form>
      </section>
      </div>
    </div>
  );
}
