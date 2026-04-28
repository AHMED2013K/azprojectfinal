import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { BriefcaseBusiness, Clock3, Download, FileText, Languages, MapPinned, Search } from 'lucide-react';
import { API_URL, apiRequest } from '../lib/api';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { formatDate } from '../lib/format';

const workModeLabels = {
  'montplaisir-flex': 'Deplacement occasionnel a Montplaisir',
  'remote-only': '100% teletravail',
};

const languageLevelLabels = {
  basic: 'Debutant',
  intermediate: 'Intermediaire',
  advanced: 'Avance',
  fluent: 'Courant',
};

function formatExperience(years = 0, months = 0) {
  return `${years} an${years > 1 ? 's' : ''} ${months} mois`;
}

export default function Candidatures() {
  const { token } = useAuth();
  const { theme } = useTheme();
  const [applications, setApplications] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1, total: 0 });
  const [search, setSearch] = useState('');
  const [internship, setInternship] = useState('');
  const [workMode, setWorkMode] = useState('');
  const [selectedId, setSelectedId] = useState('');
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [cvUrl, setCvUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [detailLoading, setDetailLoading] = useState(false);
  const [cvLoading, setCvLoading] = useState(false);
  const [error, setError] = useState('');
  const cvUrlRef = useRef('');

  const revokeCvUrl = useCallback(() => {
    if (cvUrlRef.current) {
      window.URL.revokeObjectURL(cvUrlRef.current);
      cvUrlRef.current = '';
    }
    setCvUrl('');
  }, []);

  const loadApplications = useCallback(async (page = 1) => {
    setLoading(true);
    setError('');
    try {
      const params = new URLSearchParams({
        page: String(page),
        limit: '20',
        ...(search ? { search } : {}),
        ...(internship ? { internship } : {}),
        ...(workMode ? { workMode } : {}),
      });
      const data = await apiRequest(`/api/candidates?${params.toString()}`, { token });
      setApplications(data.applications);
      setPagination(data.pagination);
    } catch (loadError) {
      setError(loadError.message || 'Impossible de charger les candidatures.');
    } finally {
      setLoading(false);
    }
  }, [internship, search, token, workMode]);

  const loadSelectedApplication = useCallback(async (applicationId) => {
    if (!applicationId) {
      return;
    }

    setDetailLoading(true);
    setCvLoading(true);
    setError('');
    revokeCvUrl();

    try {
      const [applicationData, cvResponse] = await Promise.all([
        apiRequest(`/api/candidates/${applicationId}`, { token }),
        fetch(`${API_URL}/api/candidates/${applicationId}/cv`, {
          credentials: 'include',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
      ]);

      if (!cvResponse.ok) {
        throw new Error('Impossible de charger le CV PDF.');
      }

      const cvBlob = await cvResponse.blob();
      const nextUrl = window.URL.createObjectURL(cvBlob);
      cvUrlRef.current = nextUrl;
      setCvUrl(nextUrl);
      setSelectedApplication(applicationData.application);
    } catch (loadError) {
      setError(loadError.message || 'Impossible de charger cette candidature.');
      setSelectedApplication(null);
    } finally {
      setDetailLoading(false);
      setCvLoading(false);
    }
  }, [revokeCvUrl, token]);

  useEffect(() => {
    loadApplications(pagination.page).catch(() => {});
  }, [loadApplications, pagination.page]);

  useEffect(() => {
    if (!applications.length) {
      setSelectedId('');
      setSelectedApplication(null);
      revokeCvUrl();
      return;
    }

    if (!selectedId || !applications.some((item) => item.id === selectedId)) {
      setSelectedId(applications[0].id);
    }
  }, [applications, revokeCvUrl, selectedId]);

  useEffect(() => {
    if (!selectedId) {
      return undefined;
    }

    loadSelectedApplication(selectedId).catch(() => {});
    return undefined;
  }, [loadSelectedApplication, selectedId]);

  useEffect(() => () => revokeCvUrl(), [revokeCvUrl]);

  const selectedLanguages = useMemo(() => {
    if (!selectedApplication) {
      return [];
    }

    const items = [
      `Francais: ${languageLevelLabels[selectedApplication.languages.frenchLevel] || '-'}`,
      `Anglais: ${languageLevelLabels[selectedApplication.languages.englishLevel] || '-'}`,
    ];

    if (selectedApplication.languages.otherLanguage) {
      items.push(`${selectedApplication.languages.otherLanguage}: ${languageLevelLabels[selectedApplication.languages.otherLanguageLevel] || '-'}`);
    }

    return items;
  }, [selectedApplication]);

  return (
    <div className="grid gap-6 xl:grid-cols-[0.82fr_1.18fr]">
      <section className="space-y-6">
        <div className={theme === 'dark' ? 'rounded-3xl border border-white/10 bg-white/6 p-6' : 'rounded-3xl border border-slate-200 bg-white p-6 shadow-sm'}>
          <h1 className={theme === 'dark' ? 'text-3xl font-semibold text-white' : 'text-3xl font-semibold text-slate-900'}>Candidatures</h1>
          <p className={theme === 'dark' ? 'mt-2 text-slate-300' : 'mt-2 text-slate-600'}>
            Espace recrutement pour trier les candidatures jobs etudiants, analyser les profils et ouvrir les CV PDF sans quitter le CRM.
          </p>
          <p className={theme === 'dark' ? 'mt-4 text-sm text-slate-400' : 'mt-4 text-sm text-slate-500'}>
            Total actuel: <span className={theme === 'dark' ? 'text-white' : 'text-slate-900'}>{pagination.total}</span>
          </p>
          {error && <p className="mt-4 rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">{error}</p>}
        </div>

        <div className={theme === 'dark' ? 'grid gap-4 rounded-3xl border border-white/10 bg-white/6 p-6' : 'grid gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm'}>
          <label className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                setPagination((current) => ({ ...current, page: 1 }));
              }}
              placeholder="Rechercher par nom, email, telephone, domaine"
              className={theme === 'dark' ? 'w-full rounded-2xl border border-white/10 bg-slate-950/70 py-3 pl-11 pr-4 text-white' : 'w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-slate-900'}
            />
          </label>

          <div className="grid gap-4 md:grid-cols-2">
            <select
              value={internship}
              onChange={(event) => {
                setInternship(event.target.value);
                setPagination((current) => ({ ...current, page: 1 }));
              }}
              className={theme === 'dark' ? 'rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white' : 'rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900'}
            >
              <option value="">Disponibilite stage: toutes</option>
              <option value="yes">Disponible cet ete</option>
              <option value="no">Pas disponible cet ete</option>
            </select>

            <select
              value={workMode}
              onChange={(event) => {
                setWorkMode(event.target.value);
                setPagination((current) => ({ ...current, page: 1 }));
              }}
              className={theme === 'dark' ? 'rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white' : 'rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900'}
            >
              <option value="">Mode de travail: tous</option>
              <option value="montplaisir-flex">Deplacement occasionnel a Montplaisir</option>
              <option value="remote-only">100% teletravail</option>
            </select>
          </div>
        </div>

        <div className={theme === 'dark' ? 'rounded-3xl border border-white/10 bg-white/6 p-4' : 'rounded-3xl border border-slate-200 bg-white p-4 shadow-sm'}>
          {loading ? (
            <div className={theme === 'dark' ? 'rounded-2xl border border-white/10 bg-slate-950/50 px-4 py-6 text-slate-300' : 'rounded-2xl border border-slate-200 bg-slate-50 px-4 py-6 text-slate-600'}>
              Chargement des candidatures...
            </div>
          ) : applications.length === 0 ? (
            <div className={theme === 'dark' ? 'rounded-2xl border border-white/10 bg-slate-950/50 px-4 py-6 text-slate-300' : 'rounded-2xl border border-slate-200 bg-slate-50 px-4 py-6 text-slate-600'}>
              Aucune candidature pour ces filtres.
            </div>
          ) : (
            <div className="space-y-3">
              {applications.map((application) => (
                <button
                  key={application.id}
                  type="button"
                  onClick={() => setSelectedId(application.id)}
                  className={`w-full rounded-2xl border p-4 text-left transition ${
                    selectedId === application.id
                      ? 'border-cyan-400/40 bg-cyan-500/10'
                      : theme === 'dark'
                        ? 'border-white/8 bg-slate-950/55 hover:border-white/15 hover:bg-slate-950/80'
                        : 'border-slate-200 bg-slate-50 hover:border-slate-300 hover:bg-white'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className={theme === 'dark' ? 'font-medium text-white' : 'font-medium text-slate-900'}>{application.name}</p>
                      <p className={theme === 'dark' ? 'mt-1 text-sm text-slate-400' : 'mt-1 text-sm text-slate-500'}>{application.studyField}</p>
                    </div>
                    <span className={theme === 'dark' ? 'rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300' : 'rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-600'}>
                      {formatExperience(application.experienceYears, application.experienceMonths)}
                    </span>
                  </div>
                  <div className={theme === 'dark' ? 'mt-4 flex flex-wrap gap-2 text-xs text-slate-400' : 'mt-4 flex flex-wrap gap-2 text-xs text-slate-500'}>
                    <span className={theme === 'dark' ? 'rounded-full border border-white/10 bg-white/5 px-3 py-1' : 'rounded-full border border-slate-200 bg-white px-3 py-1'}>
                      {application.summerInternshipAvailable
                        ? `Stage ete: ${application.summerInternshipMonths || '-'} mois`
                        : 'Pas de stage ete'}
                    </span>
                    <span className={theme === 'dark' ? 'rounded-full border border-white/10 bg-white/5 px-3 py-1' : 'rounded-full border border-slate-200 bg-white px-3 py-1'}>
                      {workModeLabels[application.workMode] || application.workMode}
                    </span>
                    <span className={theme === 'dark' ? 'rounded-full border border-white/10 bg-white/5 px-3 py-1' : 'rounded-full border border-slate-200 bg-white px-3 py-1'}>
                      {application.hoursPerDayAvailable} h/jour
                    </span>
                  </div>
                  <p className={theme === 'dark' ? 'mt-4 text-xs text-slate-500' : 'mt-4 text-xs text-slate-500'}>
                    Recue le {formatDate(application.createdAt)}
                  </p>
                </button>
              ))}
            </div>
          )}

          {pagination.totalPages > 1 && (
            <div className="mt-4 flex items-center justify-between">
              <button
                type="button"
                disabled={pagination.page <= 1}
                onClick={() => setPagination((current) => ({ ...current, page: Math.max(1, current.page - 1) }))}
                className="btn-secondary disabled:opacity-50"
              >
                Page precedente
              </button>
              <p className={theme === 'dark' ? 'text-sm text-slate-400' : 'text-sm text-slate-500'}>
                Page {pagination.page} / {pagination.totalPages}
              </p>
              <button
                type="button"
                disabled={pagination.page >= pagination.totalPages}
                onClick={() => setPagination((current) => ({ ...current, page: Math.min(current.totalPages, current.page + 1) }))}
                className="btn-secondary disabled:opacity-50"
              >
                Page suivante
              </button>
            </div>
          )}
        </div>
      </section>

      <section className={theme === 'dark' ? 'rounded-3xl border border-white/10 bg-white/6 p-6' : 'rounded-3xl border border-slate-200 bg-white p-6 shadow-sm'}>
        {!selectedId ? (
          <div className={theme === 'dark' ? 'flex min-h-[720px] items-center justify-center rounded-3xl border border-white/10 bg-slate-950/50 text-slate-400' : 'flex min-h-[720px] items-center justify-center rounded-3xl border border-slate-200 bg-slate-50 text-slate-500'}>
            Selectionnez une candidature pour afficher le detail et le CV.
          </div>
        ) : detailLoading ? (
          <div className={theme === 'dark' ? 'flex min-h-[720px] items-center justify-center rounded-3xl border border-white/10 bg-slate-950/50 text-slate-300' : 'flex min-h-[720px] items-center justify-center rounded-3xl border border-slate-200 bg-slate-50 text-slate-600'}>
            Chargement de la candidature...
          </div>
        ) : selectedApplication ? (
          <div className="space-y-6">
            <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
              <div>
                <h2 className={theme === 'dark' ? 'text-2xl font-semibold text-white' : 'text-2xl font-semibold text-slate-900'}>{selectedApplication.name}</h2>
                <p className={theme === 'dark' ? 'mt-2 text-slate-300' : 'mt-2 text-slate-600'}>
                  {selectedApplication.email} · {selectedApplication.phone}
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                {cvUrl && (
                  <>
                    <a
                      href={cvUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-secondary"
                    >
                      <FileText size={16} /> Ouvrir le CV
                    </a>
                    <a
                      href={cvUrl}
                      download={selectedApplication.cv.fileName}
                      className="btn-secondary"
                    >
                      <Download size={16} /> Telecharger
                    </a>
                  </>
                )}
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className={theme === 'dark' ? 'rounded-2xl border border-white/10 bg-slate-950/45 p-4' : 'rounded-2xl border border-slate-200 bg-slate-50 p-4'}>
                <div className="flex items-center gap-2">
                  <BriefcaseBusiness size={16} className="text-cyan-300" />
                  <p className={theme === 'dark' ? 'font-medium text-white' : 'font-medium text-slate-900'}>Experience</p>
                </div>
                <p className={theme === 'dark' ? 'mt-3 text-slate-300' : 'mt-3 text-slate-700'}>{formatExperience(selectedApplication.experienceYears, selectedApplication.experienceMonths)}</p>
              </div>
              <div className={theme === 'dark' ? 'rounded-2xl border border-white/10 bg-slate-950/45 p-4' : 'rounded-2xl border border-slate-200 bg-slate-50 p-4'}>
                <div className="flex items-center gap-2">
                  <Clock3 size={16} className="text-cyan-300" />
                  <p className={theme === 'dark' ? 'font-medium text-white' : 'font-medium text-slate-900'}>Disponibilite</p>
                </div>
                <p className={theme === 'dark' ? 'mt-3 text-slate-300' : 'mt-3 text-slate-700'}>{selectedApplication.hoursPerDayAvailable} heures par jour</p>
              </div>
              <div className={theme === 'dark' ? 'rounded-2xl border border-white/10 bg-slate-950/45 p-4' : 'rounded-2xl border border-slate-200 bg-slate-50 p-4'}>
                <div className="flex items-center gap-2">
                  <Languages size={16} className="text-cyan-300" />
                  <p className={theme === 'dark' ? 'font-medium text-white' : 'font-medium text-slate-900'}>Langues</p>
                </div>
                <div className={theme === 'dark' ? 'mt-3 space-y-2 text-slate-300' : 'mt-3 space-y-2 text-slate-700'}>
                  {selectedLanguages.map((item) => (
                    <p key={item}>{item}</p>
                  ))}
                </div>
              </div>
              <div className={theme === 'dark' ? 'rounded-2xl border border-white/10 bg-slate-950/45 p-4' : 'rounded-2xl border border-slate-200 bg-slate-50 p-4'}>
                <div className="flex items-center gap-2">
                  <MapPinned size={16} className="text-cyan-300" />
                  <p className={theme === 'dark' ? 'font-medium text-white' : 'font-medium text-slate-900'}>Mode de travail</p>
                </div>
                <p className={theme === 'dark' ? 'mt-3 text-slate-300' : 'mt-3 text-slate-700'}>{workModeLabels[selectedApplication.workMode] || selectedApplication.workMode}</p>
              </div>
            </div>

            <div className={theme === 'dark' ? 'rounded-2xl border border-white/10 bg-slate-950/45 p-4' : 'rounded-2xl border border-slate-200 bg-slate-50 p-4'}>
              <p className={theme === 'dark' ? 'font-medium text-white' : 'font-medium text-slate-900'}>Resume rapide</p>
              <div className={theme === 'dark' ? 'mt-4 grid gap-3 text-sm text-slate-300 md:grid-cols-2' : 'mt-4 grid gap-3 text-sm text-slate-700 md:grid-cols-2'}>
                <p>Domaine: {selectedApplication.studyField}</p>
                <p>Stage ete: {selectedApplication.summerInternshipAvailable ? `Oui, ${selectedApplication.summerInternshipMonths || '-'} mois` : 'Non'}</p>
                <p>Source: {selectedApplication.source}</p>
                <p>Recu le: {formatDate(selectedApplication.createdAt)}</p>
                <p>CV: {selectedApplication.cv.fileName}</p>
                <p>Taille du CV: {Math.max(1, Math.round(selectedApplication.cv.sizeBytes / 1024))} Ko</p>
              </div>
            </div>

            <div className={theme === 'dark' ? 'overflow-hidden rounded-2xl border border-white/10 bg-slate-950/45' : 'overflow-hidden rounded-2xl border border-slate-200 bg-slate-50'}>
              <div className={theme === 'dark' ? 'border-b border-white/10 px-4 py-3 text-sm font-medium text-white' : 'border-b border-slate-200 px-4 py-3 text-sm font-medium text-slate-900'}>
                Apercu du CV PDF
              </div>
              {cvLoading ? (
                <div className={theme === 'dark' ? 'flex min-h-[760px] items-center justify-center text-slate-300' : 'flex min-h-[760px] items-center justify-center text-slate-600'}>
                  Chargement du CV...
                </div>
              ) : cvUrl ? (
                <iframe title={`CV ${selectedApplication.name}`} src={cvUrl} className="min-h-[760px] w-full bg-white" />
              ) : (
                <div className={theme === 'dark' ? 'flex min-h-[760px] items-center justify-center text-slate-400' : 'flex min-h-[760px] items-center justify-center text-slate-500'}>
                  Apercu indisponible pour le moment.
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className={theme === 'dark' ? 'flex min-h-[720px] items-center justify-center rounded-3xl border border-white/10 bg-slate-950/50 text-slate-400' : 'flex min-h-[720px] items-center justify-center rounded-3xl border border-slate-200 bg-slate-50 text-slate-500'}>
            Aucune candidature selectionnee.
          </div>
        )}
      </section>
    </div>
  );
}
