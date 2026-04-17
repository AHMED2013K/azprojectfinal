import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { trackMetaEvent, trackMetaStandardEvent } from '../lib/marketing';

export default function Login() {
  const { user, login, requestPasswordReset, confirmPasswordReset } = useAuth();
  const [form, setForm] = useState({ email: '', password: '', otpCode: '', recoveryCode: '' });
  const [resetRequestEmail, setResetRequestEmail] = useState('');
  const [resetConfirmForm, setResetConfirmForm] = useState({ token: '', newPassword: '' });
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitting(true);
    setError('');
    setMessage('');

    try {
      await login(form.email, form.password, form.otpCode, form.recoveryCode);
      trackMetaEvent('crm_login_success', { area: 'crm_login' });
      trackMetaStandardEvent('Login', { content_name: 'EduGrowth CRM Login' });
    } catch (submitError) {
      setError(submitError.message);
      trackMetaEvent('crm_login_error', { area: 'crm_login' });
    } finally {
      setSubmitting(false);
    }
  }

  async function handleResetRequest(event) {
    event.preventDefault();
    setError('');
    setMessage('');
    try {
      const data = await requestPasswordReset(resetRequestEmail);
      setMessage(data.resetToken ? `Reset token: ${data.resetToken}` : data.message);
    } catch (requestError) {
      setError(requestError.message);
    }
  }

  async function handleResetConfirm(event) {
    event.preventDefault();
    setError('');
    setMessage('');
    try {
      const data = await confirmPasswordReset(resetConfirmForm.token, resetConfirmForm.newPassword);
      setMessage(data.message);
      setResetConfirmForm({ token: '', newPassword: '' });
    } catch (confirmError) {
      setError(confirmError.message);
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

            <label className="block text-sm text-slate-300">
              <span className="mb-2 block">Two-factor code</span>
              <input
                name="otpCode"
                inputMode="numeric"
                autoComplete="one-time-code"
                placeholder="Only if 2FA is enabled"
                value={form.otpCode}
                onChange={(event) => setForm((current) => ({ ...current, otpCode: event.target.value.replace(/[^\d]/g, '').slice(0, 6) }))}
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-cyan-400"
              />
            </label>

            <label className="block text-sm text-slate-300">
              <span className="mb-2 block">Recovery code</span>
              <input
                name="recoveryCode"
                autoComplete="one-time-code"
                placeholder="Use only if you lost your authenticator"
                value={form.recoveryCode}
                onChange={(event) => setForm((current) => ({ ...current, recoveryCode: event.target.value.toUpperCase() }))}
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-cyan-400"
              />
            </label>

            {error && <p className="rounded-2xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-200">{error}</p>}
            {message && <p className="rounded-2xl border border-cyan-500/40 bg-cyan-500/10 px-4 py-3 text-sm text-cyan-200">{message}</p>}

            <button
              type="submit"
              data-testid="login-submit"
              disabled={submitting}
              className="w-full rounded-2xl bg-gradient-to-r from-sky-700 to-cyan-600 px-5 py-3 font-semibold text-white disabled:opacity-50"
            >
              {submitting ? 'Signing in...' : 'Enter CRM'}
            </button>
          </form>

          <div className="mt-8 space-y-6 rounded-3xl border border-white/10 bg-white/5 p-5">
            <div>
              <h3 className="text-lg font-semibold text-white">Forgot password</h3>
              <form onSubmit={handleResetRequest} className="mt-4 space-y-3">
                <input
                  value={resetRequestEmail}
                  onChange={(event) => setResetRequestEmail(event.target.value)}
                  placeholder="Your account email"
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-cyan-400"
                />
                <button type="submit" className="btn-secondary w-full justify-center">Generate reset token</button>
              </form>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white">Reset with token</h3>
              <form onSubmit={handleResetConfirm} className="mt-4 space-y-3">
                <input
                  value={resetConfirmForm.token}
                  onChange={(event) => setResetConfirmForm((current) => ({ ...current, token: event.target.value }))}
                  placeholder="Reset token"
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-cyan-400"
                />
                <input
                  type="password"
                  value={resetConfirmForm.newPassword}
                  onChange={(event) => setResetConfirmForm((current) => ({ ...current, newPassword: event.target.value }))}
                  placeholder="New password"
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-cyan-400"
                />
                <button type="submit" className="btn-secondary w-full justify-center">Reset password</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
