import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { apiRequest } from '../lib/api';

export default function PublicLeadForm() {
  const { token } = useParams();
  const [invite, setInvite] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [inviteError, setInviteError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    country: '',
    dateOfBirth: '',
    studyField: '',
    studyLevel: '',
    alternanceAwareness: '',
    financialSituation: '',
    message: '',
  });

  useEffect(() => {
    apiRequest(`/api/invites/${token}/public`)
      .then((data) => {
        setInvite(data.invite);
        setInviteError('');
      })
      .catch((loadError) => {
        setInvite(null);
        setInviteError(loadError.message || 'This public form is unavailable.');
      });
  }, [token]);

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      await apiRequest(`/api/invites/${token}/public`, {
        method: 'POST',
        body: form,
      });
      setSubmitted(true);
    } catch (submitError) {
      setError(submitError.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-app p-6">
      <div className="w-full max-w-xl rounded-[2rem] border border-white/10 bg-slate-950/90 p-8 shadow-2xl">
        <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">EduGrowth intake form</p>
        <h1 className="mt-4 text-4xl font-semibold text-white">{invite?.campaign || 'Lead registration'}</h1>
        <p className="mt-3 text-slate-300">Share this form with prospects so they can submit their details directly into the CRM.</p>

        {inviteError && !submitted && (
          <div className="mt-6 rounded-3xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-100">
            {inviteError}
          </div>
        )}

        {submitted ? (
          <div className="mt-8 rounded-3xl border border-cyan-500/20 bg-cyan-500/10 p-6 text-cyan-100">
            Your information has been submitted successfully.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            {[
              ['name', 'Nom complet'],
              ['email', 'Adresse e-mail'],
              ['phone', 'Numéro de téléphone (WhatsApp)'],
              ['country', 'Pays de résidence actuel'],
            ].map(([field, label]) => (
              <input
                key={field}
                name={field}
                data-testid={`public-${field}`}
                value={form[field]}
                onChange={(event) => setForm((current) => ({ ...current, [field]: event.target.value }))}
                placeholder={label}
                required
                type={field === 'email' ? 'email' : 'text'}
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white"
              />
            ))}

            <input
              name="dateOfBirth"
              data-testid="public-dateOfBirth"
              value={form.dateOfBirth}
              onChange={(event) => setForm((current) => ({ ...current, dateOfBirth: event.target.value }))}
              required
              type="date"
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white"
            />

            <select
              value={form.studyField}
              onChange={(event) => setForm((current) => ({ ...current, studyField: event.target.value }))}
              required
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white"
            >
              <option value="">Domaine d’etudes / Specialite</option>
              <option value="Commerce">Commerce</option>
              <option value="Marketing">Marketing</option>
              <option value="Gestion d'entreprise">Gestion d'entreprise</option>
              <option value="Informatique">Informatique</option>
              <option value="Comptabilite / Finance">Comptabilite / Finance</option>
              <option value="Ressources Humaines">Ressources Humaines</option>
              <option value="Autre">Autre</option>
            </select>

            <select
              value={form.studyLevel}
              onChange={(event) => setForm((current) => ({ ...current, studyLevel: event.target.value }))}
              required
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white"
            >
              <option value="">Niveau d'etude actuel</option>
              <option value="Baccalaureat">Baccalaureat</option>
              <option value="Licence">Licence</option>
              <option value="Mastere">Mastere</option>
              <option value="Doctorat">Doctorat</option>
            </select>

            <select
              value={form.alternanceAwareness}
              onChange={(event) => setForm((current) => ({ ...current, alternanceAwareness: event.target.value }))}
              required
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white"
            >
              <option value="">Connaissance de l'alternance</option>
              <option value="Oui, je suis informe(e)">Oui, je suis informe(e)</option>
              <option value="Non, je ne le savais pas">Non, je ne le savais pas</option>
              <option value="J'ai besoin de plus d'informations">J'ai besoin de plus d'informations</option>
            </select>

            <select
              value={form.financialSituation}
              onChange={(event) => setForm((current) => ({ ...current, financialSituation: event.target.value }))}
              required
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white"
            >
              <option value="">Situation financiere</option>
              <option value="Compte bloque">Compte bloque</option>
              <option value="Garant financier en France">Garant financier en France</option>
              <option value="Je n'ai pas de moyens financiers actuellement">Je n'ai pas de moyens financiers actuellement</option>
            </select>

            <textarea
              value={form.message}
              onChange={(event) => setForm((current) => ({ ...current, message: event.target.value }))}
              placeholder="Message / Demande"
              rows={4}
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white"
            />

            {error && <p className="rounded-2xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-200">{error}</p>}

            <button type="submit" data-testid="public-submit" className="btn-primary w-full justify-center" disabled={submitting || !invite}>
              {submitting ? 'Sending...' : 'Submit'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
