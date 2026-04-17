import { useState } from 'react';
import { CheckCircle2, GraduationCap, BriefcaseBusiness, Globe2 } from 'lucide-react';
import { apiRequest } from '../lib/api';
import { trackMetaEvent, trackMetaStandardEvent } from '../lib/marketing';

const initialForm = {
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
  studyFieldOther: '',
  studyLevelOther: '',
  alternanceAwarenessOther: '',
  financialSituationOther: '',
};

function Input({ value, onChange, placeholder, type = 'text', required = false }) {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      className="w-full rounded-2xl border border-cyan-400/10 bg-slate-950/70 px-4 py-3 text-white placeholder:text-slate-500 outline-none transition focus:border-cyan-400/60"
    />
  );
}

function Select({ value, onChange, children, required = false }) {
  return (
    <select
      value={value}
      onChange={onChange}
      required={required}
      className="w-full rounded-2xl border border-cyan-400/10 bg-slate-950/70 px-4 py-3 text-white outline-none transition focus:border-cyan-400/60"
    >
      {children}
    </select>
  );
}

export default function LinkedInApplicationForm() {
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      const payload = {
        ...form,
        studyField: form.studyField === 'Autre' ? `Autre: ${form.studyFieldOther}` : form.studyField,
        studyLevel: form.studyLevel === 'Autre' ? `Autre: ${form.studyLevelOther}` : form.studyLevel,
        alternanceAwareness: form.alternanceAwareness === 'Autre'
          ? `Autre: ${form.alternanceAwarenessOther}`
          : form.alternanceAwareness,
        financialSituation: form.financialSituation === 'Autre'
          ? `Autre: ${form.financialSituationOther}`
          : form.financialSituation,
      };
      await apiRequest('/api/invites/public/linkedin-alternance-2026', {
        method: 'POST',
        body: payload,
      });
      trackMetaEvent('crm_apply_submit', {
        source: 'apply',
        country: payload.country || 'unknown',
        studyLevel: payload.studyLevel || 'unknown',
      });
      trackMetaStandardEvent('Lead', {
        content_name: 'EduGrowth Apply Form',
        content_category: 'student_application',
      });
      trackMetaStandardEvent('CompleteRegistration', {
        content_name: 'EduGrowth Apply Form',
      });
      setSubmitted(true);
      setForm(initialForm);
    } catch (submitError) {
      setError(submitError.message);
      trackMetaEvent('crm_apply_error', { source: 'apply' });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(6,182,212,0.18),transparent_25%),linear-gradient(180deg,#020617_0%,#082f49_42%,#020617_100%)] px-4 py-8 text-white md:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <section className="overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/80 p-8 shadow-2xl backdrop-blur">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-cyan-200">
              EduGrowth CRM
            </div>
            <h1 className="mt-6 text-4xl font-semibold leading-tight text-white md:text-5xl">
              Formulaire d'inscription
              <span className="block bg-gradient-to-r from-cyan-300 via-sky-300 to-emerald-300 bg-clip-text text-transparent">
                Opportunites d'alternance 2026
              </span>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-slate-300">
              Candidatez pour la rentree Septembre 2026. Vos informations seront transmises directement a notre equipe afin de qualifier votre dossier.
            </p>

            <div className="mt-8 grid gap-4">
              {[
                { icon: GraduationCap, text: "Etudiants et jeunes diplomes souhaitant construire un projet d'etudes solide" },
                { icon: BriefcaseBusiness, text: "Orientation alternance avec qualification plus rapide de votre profil" },
                { icon: Globe2, text: 'Suivi centralise dans notre CRM interne pour un traitement structure' },
              ].map((item) => (
                <div key={item.text} className="flex items-start gap-3 rounded-2xl border border-white/8 bg-white/5 p-4 text-slate-200">
                  <div className="mt-0.5 rounded-xl bg-cyan-400/10 p-2 text-cyan-300">
                    <item.icon size={18} />
                  </div>
                  <p className="text-sm leading-6">{item.text}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-[2rem] border border-white/10 bg-slate-950/88 p-6 shadow-2xl backdrop-blur md:p-8">
            {submitted ? (
              <div className="flex min-h-[520px] flex-col items-center justify-center rounded-[1.5rem] border border-emerald-400/20 bg-emerald-400/10 p-8 text-center">
                <CheckCircle2 size={44} className="text-emerald-300" />
                <h2 className="mt-5 text-3xl font-semibold text-white">Demande envoyee</h2>
                <p className="mt-3 max-w-md text-slate-200">
                  Merci. Votre candidature a bien ete enregistree et apparait maintenant dans notre CRM.
                </p>
                <a
                  href="https://www.linkedin.com/company/abroadzonee/"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 inline-flex rounded-2xl border border-white/15 bg-white/10 px-5 py-3 text-sm font-semibold text-cyan-100 transition hover:bg-white/15"
                >
                  Cliquez ici pour nous suivre sur LinkedIn afin de rester informé(e) de nos nouveautés
                </a>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <p className="mb-2 text-sm font-medium text-cyan-100">Nom complet *</p>
                    <Input required value={form.name} onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))} placeholder="Nom complet" />
                  </div>
                  <div>
                    <p className="mb-2 text-sm font-medium text-cyan-100">Adresse e-mail *</p>
                    <Input required value={form.email} onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))} placeholder="Adresse e-mail" type="email" />
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <p className="mb-2 text-sm font-medium text-cyan-100">Numero de telephone (WhatsApp) *</p>
                    <Input required value={form.phone} onChange={(event) => setForm((current) => ({ ...current, phone: event.target.value }))} placeholder="Numero de telephone (WhatsApp)" />
                  </div>
                  <div>
                    <p className="mb-2 text-sm font-medium text-cyan-100">Pays de residence actuel *</p>
                    <Input required value={form.country} onChange={(event) => setForm((current) => ({ ...current, country: event.target.value }))} placeholder="Pays de residence actuel" />
                  </div>
                </div>

                <div>
                  <p className="mb-2 text-sm font-medium text-cyan-100">Date de naissance *</p>
                  <Input required type="date" value={form.dateOfBirth} onChange={(event) => setForm((current) => ({ ...current, dateOfBirth: event.target.value }))} placeholder="jj/mm/aaaa" />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <p className="mb-2 text-sm font-medium text-cyan-100">Domaine d'etudes / Specialite *</p>
                    <Select required value={form.studyField} onChange={(event) => setForm((current) => ({ ...current, studyField: event.target.value }))}>
                      <option value="">Domaine d’études / Spécialité</option>
                      <option value="Commerce">Commerce</option>
                      <option value="Marketing">Marketing</option>
                      <option value="Gestion d'entreprise">Gestion d'entreprise</option>
                      <option value="Informatique">Informatique</option>
                      <option value="Comptabilité / Finance">Comptabilité / Finance</option>
                      <option value="Ressources Humaines">Ressources Humaines</option>
                      <option value="Autre">Autre</option>
                    </Select>
                    {form.studyField === 'Autre' && (
                      <div className="mt-3">
                        <Input required value={form.studyFieldOther} onChange={(event) => setForm((current) => ({ ...current, studyFieldOther: event.target.value }))} placeholder="Precisez votre domaine" />
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="mb-2 text-sm font-medium text-cyan-100">Niveau d'etude actuel *</p>
                    <Select required value={form.studyLevel} onChange={(event) => setForm((current) => ({ ...current, studyLevel: event.target.value }))}>
                      <option value="">Niveau d’étude actuel</option>
                      <option value="Baccalauréat">Baccalauréat</option>
                      <option value="Licence">Licence</option>
                      <option value="Mastère">Mastère</option>
                      <option value="Doctorat">Doctorat</option>
                      <option value="Autre">Autre</option>
                    </Select>
                    {form.studyLevel === 'Autre' && (
                      <div className="mt-3">
                        <Input required value={form.studyLevelOther} onChange={(event) => setForm((current) => ({ ...current, studyLevelOther: event.target.value }))} placeholder="Precisez votre niveau" />
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <p className="mb-2 text-sm font-medium leading-6 text-cyan-100">Êtes-vous informé(e) que l’alternance pour les étudiants internationaux (première arrivée en France) est généralement possible qu'à partir de la 2ᵉ année ? *</p>
                    <Select required value={form.alternanceAwareness} onChange={(event) => setForm((current) => ({ ...current, alternanceAwareness: event.target.value }))}>
                    <option value="">Choisissez une réponse</option>
                    <option value="Oui, je suis informé(e)">Oui, je suis informé(e)</option>
                    <option value="Non, je ne le savais pas">Non, je ne le savais pas</option>
                    <option value="J’ai besoin de plus d’informations">J’ai besoin de plus d’informations</option>
                    <option value="Autre">Autre</option>
                  </Select>
                  {form.alternanceAwareness === 'Autre' && (
                    <div className="mt-3">
                      <Input required value={form.alternanceAwarenessOther} onChange={(event) => setForm((current) => ({ ...current, alternanceAwarenessOther: event.target.value }))} placeholder="Précisez votre réponse" />
                    </div>
                  )}
                </div>

                <div>
                  <p className="mb-2 text-sm font-medium text-cyan-100">Situation financiere du projet *</p>
                  <Select required value={form.financialSituation} onChange={(event) => setForm((current) => ({ ...current, financialSituation: event.target.value }))}>
                    <option value="">Choisissez une reponse</option>
                    <option value="Compte bloque">Compte bloque</option>
                    <option value="Garant financier en France">Garant financier en France</option>
                    <option value="Je n'ai pas de moyens financiers actuellement">Je n'ai pas de moyens financiers actuellement</option>
                    <option value="Autre">Autre</option>
                  </Select>
                  {form.financialSituation === 'Autre' && (
                    <div className="mt-3">
                      <Input required value={form.financialSituationOther} onChange={(event) => setForm((current) => ({ ...current, financialSituationOther: event.target.value }))} placeholder="Precisez votre situation" />
                    </div>
                  )}
                </div>

                <div>
                  <p className="mb-2 text-sm font-medium text-cyan-100">Message / Demande</p>
                  <textarea
                    value={form.message}
                    onChange={(event) => setForm((current) => ({ ...current, message: event.target.value }))}
                    placeholder="Message / Demande"
                    rows={5}
                    className="w-full rounded-2xl border border-cyan-400/10 bg-slate-950/70 px-4 py-3 text-white placeholder:text-slate-500 outline-none transition focus:border-cyan-400/60"
                  />
                </div>

                {error && (
                  <p className="rounded-2xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-sky-700 via-cyan-600 to-emerald-500 px-5 py-4 text-sm font-semibold text-white shadow-lg shadow-cyan-950/40 transition hover:brightness-110 disabled:opacity-60"
                >
                  {submitting ? 'Envoi en cours...' : "Envoyer ma candidature"}
                </button>
              </form>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
