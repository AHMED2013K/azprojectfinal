import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { user, login } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      await login(form.email, form.password);
    } catch (submitError) {
      setError(submitError.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-app p-6">
      <div className="grid w-full max-w-6xl overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/90 shadow-2xl lg:grid-cols-[1.2fr_0.8fr]">
        <div className="hidden bg-gradient-to-br from-slate-950 via-sky-950 to-cyan-900 p-10 lg:block">
          <p className="text-sm uppercase tracking-[0.35em] text-cyan-200/70">EduGrowth SaaS CRM</p>
          <h1 className="mt-10 max-w-lg text-5xl font-semibold leading-tight text-white">
            Sales operations, collaboration, and employee tracking in one premium workspace.
          </h1>
          <div className="mt-10 grid gap-4">
            {['JWT authentication and protected routes', 'Live internal chat with online presence', 'Lead import, notes, invite links, and exports'].map((item) => (
              <div key={item} className="rounded-3xl border border-white/10 bg-white/5 p-5 text-slate-100">
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="p-8 md:p-12">
          <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">Secure access</p>
          <h2 className="mt-4 text-4xl font-semibold text-white">Sign in</h2>
          <p className="mt-3 text-slate-300">Enter your credentials to access the private CRM workspace.</p>

          <form onSubmit={handleSubmit} className="mt-10 space-y-5">
            <label className="block text-sm text-slate-300">
              <span className="mb-2 block">Email</span>
              <input
                name="email"
                data-testid="login-email"
                autoComplete="username"
                placeholder=""
                value={form.email}
                onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-cyan-400"
              />
            </label>

            <label className="block text-sm text-slate-300">
              <span className="mb-2 block">Password</span>
              <input
                type="password"
                name="password"
                data-testid="login-password"
                autoComplete="current-password"
                placeholder=""
                value={form.password}
                onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))}
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-cyan-400"
              />
            </label>

            {error && <p className="rounded-2xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-200">{error}</p>}

            <button
              type="submit"
              data-testid="login-submit"
              disabled={submitting}
              className="w-full rounded-2xl bg-gradient-to-r from-sky-700 to-cyan-600 px-5 py-3 font-semibold text-white disabled:opacity-50"
            >
              {submitting ? 'Signing in...' : 'Enter CRM'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
