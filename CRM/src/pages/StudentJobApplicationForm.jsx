import { useState } from 'react';
import { BriefcaseBusiness, CheckCircle2, Clock3, GraduationCap, MapPinned } from 'lucide-react';
import { apiRequest } from '../lib/api';

const initialForm = {
  name: '',
  email: '',
  phone: '',
  experienceYears: '0',
  experienceMonths: '0',
  studyField: '',
  frenchLevel: 'intermediate',
  englishLevel: 'intermediate',
  otherLanguage: '',
  otherLanguageLevel: '',
  summerInternshipAvailable: 'yes',
  summerInternshipMonths: '2',
  hoursPerDayAvailable: '4',
  workMode: 'montplaisir-flex',
};

const languageLevels = [
  { value: 'basic', label: 'Debutant' },
  { value: 'intermediate', label: 'Intermediaire' },
  { value: 'advanced', label: 'Avance' },
  { value: 'fluent', label: 'Courant' },
];

function Input({ value, onChange, placeholder, type = 'text', required = false, min, max }) {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      min={min}
      max={max}
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

export default function StudentJobApplicationForm() {
  const [form, setForm] = useState(initialForm);
  const [cvFile, setCvFile] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitting(true);
    setError('');

    if (!cvFile) {
      setSubmitting(false);
      setError('Veuillez joindre votre CV au format PDF.');
      return;
    }

    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        formData.append(key, value);
      });
      formData.append('cv', cvFile);

      await apiRequest('/api/candidates/public/student-job', {
        method: 'POST',
        body: formData,
        retryOnAuthError: false,
      });

      setSubmitted(true);
      setForm(initialForm);
      setCvFile(null);
    } catch (submitError) {
      setError(submitError.message || 'Impossible d envoyer votre candidature pour le moment.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(14,165,233,0.18),transparent_28%),linear-gradient(180deg,#020617_0%,#082f49_42%,#020617_100%)] px-4 py-8 text-white md:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr]">
          <section className="overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/80 p-8 shadow-2xl backdrop-blur">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-cyan-200">
              EduGrowth Careers
            </div>
            <h1 className="mt-6 text-4xl font-semibold leading-tight text-white md:text-5xl">
              Candidatez pour un
              <span className="block bg-gradient-to-r from-cyan-300 via-sky-300 to-emerald-300 bg-clip-text text-transparent">
                part-time job etudiant
              </span>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-slate-300">
              Remplissez ce formulaire pour rejoindre notre vivier de candidats. Votre candidature sera envoyee directement dans l espace recrutement du CRM avec votre CV PDF.
            </p>

            <div className="mt-8 grid gap-4">
              {[
                { icon: BriefcaseBusiness, text: 'Postes etudiants et opportunites part-time a suivre par notre equipe recrutement.' },
                { icon: Clock3, text: "Disponibilites, experience et langues visibles d un coup pour accelerer la preselection." },
                { icon: MapPinned, text: 'Possibilite de preciser votre preference entre teletravail et passages occasionnels a Montplaisir.' },
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
                <h2 className="mt-5 text-3xl font-semibold text-white">Candidature envoyee</h2>
                <p className="mt-3 max-w-md text-slate-200">
                  Merci. Votre dossier a bien ete recu et sera visible dans notre espace Candidatures avec votre CV PDF.
                </p>
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
                    <Input required type="email" value={form.email} onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))} placeholder="Adresse e-mail" />
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <p className="mb-2 text-sm font-medium text-cyan-100">Numero de telephone *</p>
                    <Input required value={form.phone} onChange={(event) => setForm((current) => ({ ...current, phone: event.target.value }))} placeholder="Numero de telephone" />
                  </div>
                  <div>
                    <p className="mb-2 text-sm font-medium text-cyan-100">Domaine d etude *</p>
                    <Input required value={form.studyField} onChange={(event) => setForm((current) => ({ ...current, studyField: event.target.value }))} placeholder="Domaine d etude" />
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <p className="mb-2 text-sm font-medium text-cyan-100">Annees d experience *</p>
                    <Input required type="number" min="0" max="50" value={form.experienceYears} onChange={(event) => setForm((current) => ({ ...current, experienceYears: event.target.value }))} placeholder="0" />
                  </div>
                  <div>
                    <p className="mb-2 text-sm font-medium text-cyan-100">Mois d experience *</p>
                    <Input required type="number" min="0" max="11" value={form.experienceMonths} onChange={(event) => setForm((current) => ({ ...current, experienceMonths: event.target.value }))} placeholder="0" />
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <p className="mb-2 text-sm font-medium text-cyan-100">Niveau en francais *</p>
                    <Select required value={form.frenchLevel} onChange={(event) => setForm((current) => ({ ...current, frenchLevel: event.target.value }))}>
                      {languageLevels.map((item) => (
                        <option key={`fr-${item.value}`} value={item.value}>{item.label}</option>
                      ))}
                    </Select>
                  </div>
                  <div>
                    <p className="mb-2 text-sm font-medium text-cyan-100">Niveau en anglais *</p>
                    <Select required value={form.englishLevel} onChange={(event) => setForm((current) => ({ ...current, englishLevel: event.target.value }))}>
                      {languageLevels.map((item) => (
                        <option key={`en-${item.value}`} value={item.value}>{item.label}</option>
                      ))}
                    </Select>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-[1.2fr_0.8fr]">
                  <div>
                    <p className="mb-2 text-sm font-medium text-cyan-100">Autre langue</p>
                    <Input value={form.otherLanguage} onChange={(event) => setForm((current) => ({ ...current, otherLanguage: event.target.value }))} placeholder="Exemple: Allemand" />
                  </div>
                  <div>
                    <p className="mb-2 text-sm font-medium text-cyan-100">Niveau autre langue</p>
                    <Select value={form.otherLanguageLevel} onChange={(event) => setForm((current) => ({ ...current, otherLanguageLevel: event.target.value }))}>
                      <option value="">Choisissez un niveau</option>
                      {languageLevels.map((item) => (
                        <option key={`other-${item.value}`} value={item.value}>{item.label}</option>
                      ))}
                    </Select>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-[1fr_0.7fr]">
                  <div>
                    <p className="mb-2 text-sm font-medium text-cyan-100">Disponible pour un stage cet ete ? *</p>
                    <Select
                      required
                      value={form.summerInternshipAvailable}
                      onChange={(event) => setForm((current) => ({
                        ...current,
                        summerInternshipAvailable: event.target.value,
                        summerInternshipMonths: event.target.value === 'yes' ? (current.summerInternshipMonths || '2') : '',
                      }))}
                    >
                      <option value="yes">Oui</option>
                      <option value="no">Non</option>
                    </Select>
                  </div>
                  <div>
                    <p className="mb-2 text-sm font-medium text-cyan-100">Si oui, combien de mois ?</p>
                    <Input
                      type="number"
                      min="1"
                      max="6"
                      value={form.summerInternshipMonths}
                      onChange={(event) => setForm((current) => ({ ...current, summerInternshipMonths: event.target.value }))}
                      placeholder="2"
                      required={form.summerInternshipAvailable === 'yes'}
                    />
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-[0.8fr_1.2fr]">
                  <div>
                    <p className="mb-2 text-sm font-medium text-cyan-100">Heures disponibles par jour *</p>
                    <Input required type="number" min="1" max="24" value={form.hoursPerDayAvailable} onChange={(event) => setForm((current) => ({ ...current, hoursPerDayAvailable: event.target.value }))} placeholder="4" />
                  </div>
                  <div>
                    <p className="mb-2 text-sm font-medium text-cyan-100">Disponibilite geographique *</p>
                    <Select required value={form.workMode} onChange={(event) => setForm((current) => ({ ...current, workMode: event.target.value }))}>
                      <option value="montplaisir-flex">Deplacement occasionnel a Montplaisir possible</option>
                      <option value="remote-only">Je souhaite 100% teletravail</option>
                    </Select>
                  </div>
                </div>

                <div>
                  <p className="mb-2 text-sm font-medium text-cyan-100">CV PDF *</p>
                  <label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-cyan-400/25 bg-slate-950/55 px-4 py-6 text-center text-sm text-slate-300 transition hover:border-cyan-300/50 hover:bg-slate-900/70">
                    <GraduationCap size={22} className="mb-3 text-cyan-300" />
                    <span>{cvFile ? cvFile.name : 'Cliquez pour televerser votre CV PDF'}</span>
                    <span className="mt-1 text-xs text-slate-500">Format PDF obligatoire, taille maximale 5 Mo.</span>
                    <input
                      type="file"
                      accept="application/pdf"
                      required
                      className="hidden"
                      onChange={(event) => setCvFile(event.target.files?.[0] || null)}
                    />
                  </label>
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
                  {submitting ? 'Envoi en cours...' : 'Envoyer ma candidature'}
                </button>
              </form>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
