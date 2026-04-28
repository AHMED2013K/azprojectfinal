import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  BriefcaseBusiness,
  Check,
  Clock3,
  Download,
  FileText,
  GripVertical,
  Languages,
  MapPinned,
  Search,
  Trash2,
  X,
} from 'lucide-react';
import { API_URL, apiRequest } from '../lib/api';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useSocket } from '../context/SocketContext';
import { useToast } from '../context/ToastContext';
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

const reviewStatusMeta = {
  pending: {
    label: 'En attente',
    chipDark: 'border-amber-400/30 bg-amber-500/10 text-amber-100',
    chipLight: 'border-amber-200 bg-amber-50 text-amber-700',
  },
  approved: {
    label: 'OK',
    chipDark: 'border-emerald-400/30 bg-emerald-500/10 text-emerald-100',
    chipLight: 'border-emerald-200 bg-emerald-50 text-emerald-700',
  },
  rejected: {
    label: 'KO',
    chipDark: 'border-rose-400/30 bg-rose-500/10 text-rose-100',
    chipLight: 'border-rose-200 bg-rose-50 text-rose-700',
  },
};

function formatExperience(years = 0, months = 0) {
  return `${years} an${years > 1 ? 's' : ''} ${months} mois`;
}

function getStatusMeta(status = 'pending') {
  return reviewStatusMeta[status] || reviewStatusMeta.pending;
}

function bucketLabel(bucket) {
  return bucket === 'treated' ? 'Candidatures traitees' : 'Candidatures';
}

function CandidateLane({
  title,
  description,
  applications,
  selectedId,
  draggedId,
  onSelect,
  onDragStart,
  onDropToBucket,
  theme,
}) {
  return (
    <div
      onDragOver={(event) => event.preventDefault()}
      onDrop={(event) => {
        event.preventDefault();
        const applicationId = event.dataTransfer.getData('text/plain') || draggedId;
        if (applicationId) {
          onDropToBucket(applicationId);
        }
      }}
      className={theme === 'dark'
        ? 'rounded-3xl border border-white/10 bg-white/6 p-4'
        : 'rounded-3xl border border-slate-200 bg-white p-4 shadow-sm'}
    >
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <h2 className={theme === 'dark' ? 'text-lg font-semibold text-white' : 'text-lg font-semibold text-slate-900'}>{title}</h2>
          <p className={theme === 'dark' ? 'mt-1 text-sm text-slate-400' : 'mt-1 text-sm text-slate-500'}>{description}</p>
        </div>
        <span className={theme === 'dark' ? 'rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300' : 'rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs text-slate-600'}>
          {applications.length}
        </span>
      </div>

      {applications.length === 0 ? (
        <div className={theme === 'dark' ? 'rounded-2xl border border-dashed border-white/10 bg-slate-950/45 px-4 py-8 text-sm text-slate-400' : 'rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-4 py-8 text-sm text-slate-500'}>
          Aucune candidature dans cette colonne.
        </div>
      ) : (
        <div className="space-y-3">
          {applications.map((application) => {
            const statusMeta = getStatusMeta(application.reviewStatus);
            return (
              <button
                key={application.id}
                type="button"
                draggable
                onDragStart={(event) => {
                  event.dataTransfer.setData('text/plain', application.id);
                  onDragStart(application.id);
                }}
                onClick={() => onSelect(application.id)}
                className={`w-full rounded-2xl border p-4 text-left transition ${
                  selectedId === application.id
                    ? 'border-cyan-400/40 bg-cyan-500/10'
                    : theme === 'dark'
                      ? 'border-white/8 bg-slate-950/55 hover:border-white/15 hover:bg-slate-950/80'
                      : 'border-slate-200 bg-slate-50 hover:border-slate-300 hover:bg-white'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <GripVertical size={15} className="shrink-0 text-slate-400" />
                      <p className={theme === 'dark' ? 'truncate font-medium text-white' : 'truncate font-medium text-slate-900'}>{application.name}</p>
                    </div>
                    <p className={theme === 'dark' ? 'mt-1 truncate text-sm text-slate-400' : 'mt-1 truncate text-sm text-slate-500'}>{application.studyField}</p>
                  </div>
                  <span className={`shrink-0 rounded-full border px-2.5 py-1 text-[11px] font-semibold ${theme === 'dark' ? statusMeta.chipDark : statusMeta.chipLight}`}>
                    {statusMeta.label}
                  </span>
                </div>

                <div className={theme === 'dark' ? 'mt-4 flex flex-wrap gap-2 text-xs text-slate-400' : 'mt-4 flex flex-wrap gap-2 text-xs text-slate-500'}>
                  <span className={theme === 'dark' ? 'rounded-full border border-white/10 bg-white/5 px-3 py-1' : 'rounded-full border border-slate-200 bg-white px-3 py-1'}>
                    {formatExperience(application.experienceYears, application.experienceMonths)}
                  </span>
                  <span className={theme === 'dark' ? 'rounded-full border border-white/10 bg-white/5 px-3 py-1' : 'rounded-full border border-slate-200 bg-white px-3 py-1'}>
                    {workModeLabels[application.workMode] || application.workMode}
                  </span>
                </div>

                <p className={theme === 'dark' ? 'mt-4 text-xs text-slate-500' : 'mt-4 text-xs text-slate-500'}>
                  Recue le {formatDate(application.createdAt)}
                </p>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function Candidatures() {
  const { token } = useAuth();
  const { theme } = useTheme();
  const { socket } = useSocket();
  const { showToast } = useToast();
  const [activeApplications, setActiveApplications] = useState([]);
  const [treatedApplications, setTreatedApplications] = useState([]);
  const [totals, setTotals] = useState({ active: 0, treated: 0 });
  const [search, setSearch] = useState('');
  const [internship, setInternship] = useState('');
  const [workMode, setWorkMode] = useState('');
  const [reviewFilter, setReviewFilter] = useState('');
  const [selectedId, setSelectedId] = useState('');
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [cvUrl, setCvUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [detailLoading, setDetailLoading] = useState(false);
  const [cvLoading, setCvLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState('');
  const [draggedId, setDraggedId] = useState('');
  const cvUrlRef = useRef('');

  const revokeCvUrl = useCallback(() => {
    if (cvUrlRef.current) {
      window.URL.revokeObjectURL(cvUrlRef.current);
      cvUrlRef.current = '';
    }
    setCvUrl('');
  }, []);

  const loadBucket = useCallback(async (bucket) => {
    const params = new URLSearchParams({
      page: '1',
      limit: '50',
      bucket,
      ...(search ? { search } : {}),
      ...(internship ? { internship } : {}),
      ...(workMode ? { workMode } : {}),
      ...(reviewFilter ? { reviewStatus: reviewFilter } : {}),
    });
    return apiRequest(`/api/candidates?${params.toString()}`, { token });
  }, [internship, reviewFilter, search, token, workMode]);

  const loadApplications = useCallback(async () => {
    setLoading(true);
    setError('');

    try {
      const [activeData, treatedData] = await Promise.all([
        loadBucket('active'),
        loadBucket('treated'),
      ]);

      setActiveApplications(activeData.applications);
      setTreatedApplications(treatedData.applications);
      setTotals({
        active: activeData.pagination.total,
        treated: treatedData.pagination.total,
      });
    } catch (loadError) {
      setError(loadError.message || 'Impossible de charger les candidatures.');
    } finally {
      setLoading(false);
    }
  }, [loadBucket]);

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
    loadApplications().catch(() => {});
  }, [loadApplications]);

  useEffect(() => {
    const allApplications = [...activeApplications, ...treatedApplications];
    if (!allApplications.length) {
      setSelectedId('');
      setSelectedApplication(null);
      revokeCvUrl();
      return;
    }

    if (!selectedId || !allApplications.some((item) => item.id === selectedId)) {
      setSelectedId(allApplications[0].id);
    }
  }, [activeApplications, revokeCvUrl, selectedId, treatedApplications]);

  useEffect(() => {
    if (!selectedId) {
      return undefined;
    }

    loadSelectedApplication(selectedId).catch(() => {});
    return undefined;
  }, [loadSelectedApplication, selectedId]);

  useEffect(() => () => revokeCvUrl(), [revokeCvUrl]);

  useEffect(() => {
    if (!socket) {
      return undefined;
    }

    const refreshBoard = () => {
      loadApplications().catch(() => {});
    };

    const handleCandidateCreated = ({ application }) => {
      showToast({
        type: 'success',
        title: 'Nouvelle candidature',
        message: application?.name ? `${application.name} est arrive dans la file de recrutement.` : 'Une nouvelle candidature est arrivee.',
      });
      refreshBoard();
    };

    const handleCandidateUpdated = ({ application }) => {
      if (application?.id === selectedId) {
        setSelectedApplication(application);
      }
      refreshBoard();
    };

    const handleCandidateDeleted = ({ id }) => {
      if (id === selectedId) {
        setSelectedId('');
        setSelectedApplication(null);
        revokeCvUrl();
      }
      refreshBoard();
    };

    socket.on('candidate:created', handleCandidateCreated);
    socket.on('candidate:updated', handleCandidateUpdated);
    socket.on('candidate:deleted', handleCandidateDeleted);
    return () => {
      socket.off('candidate:created', handleCandidateCreated);
      socket.off('candidate:updated', handleCandidateUpdated);
      socket.off('candidate:deleted', handleCandidateDeleted);
    };
  }, [loadApplications, revokeCvUrl, selectedId, showToast, socket]);

  const allVisibleApplications = useMemo(
    () => [...activeApplications, ...treatedApplications],
    [activeApplications, treatedApplications],
  );

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

  const selectedStatusMeta = getStatusMeta(selectedApplication?.reviewStatus);

  const applyLocalUpdate = useCallback((nextApplication) => {
    setActiveApplications((current) => {
      const filtered = current.filter((item) => item.id !== nextApplication.id);
      return nextApplication.bucket === 'active' ? [nextApplication, ...filtered] : filtered;
    });
    setTreatedApplications((current) => {
      const filtered = current.filter((item) => item.id !== nextApplication.id);
      return nextApplication.bucket === 'treated' ? [nextApplication, ...filtered] : filtered;
    });
    setSelectedApplication(nextApplication);
  }, []);

  async function updateApplication(applicationId, payload, successMessage) {
    setActionLoading(true);
    try {
      const data = await apiRequest(`/api/candidates/${applicationId}`, {
        method: 'PATCH',
        token,
        body: payload,
      });
      applyLocalUpdate(data.application);
      showToast({
        type: 'success',
        message: successMessage,
      });
      loadApplications().catch(() => {});
    } catch (updateError) {
      showToast({
        type: 'error',
        message: updateError.message || 'Impossible de mettre a jour la candidature.',
      });
    } finally {
      setActionLoading(false);
    }
  }

  async function moveApplicationToBucket(applicationId, nextBucket) {
    const target = allVisibleApplications.find((item) => item.id === applicationId);
    if (!target || target.bucket === nextBucket) {
      return;
    }

    await updateApplication(
      applicationId,
      { bucket: nextBucket },
      nextBucket === 'treated'
        ? 'Candidature deplacee vers candidatures traitees.'
        : 'Candidature remise dans la file active.',
    );
    setDraggedId('');
  }

  async function deleteApplication(applicationId) {
    const target = allVisibleApplications.find((item) => item.id === applicationId) || selectedApplication;
    const label = target?.name ? `Supprimer la candidature de ${target.name} ?` : 'Supprimer cette candidature ?';
    if (!window.confirm(label)) {
      return;
    }

    setActionLoading(true);
    try {
      await apiRequest(`/api/candidates/${applicationId}`, {
        method: 'DELETE',
        token,
      });
      setActiveApplications((current) => current.filter((item) => item.id !== applicationId));
      setTreatedApplications((current) => current.filter((item) => item.id !== applicationId));
      if (selectedId === applicationId) {
        setSelectedId('');
        setSelectedApplication(null);
        revokeCvUrl();
      }
      showToast({
        type: 'success',
        message: 'Candidature supprimee.',
      });
      loadApplications().catch(() => {});
    } catch (deleteError) {
      showToast({
        type: 'error',
        message: deleteError.message || 'Impossible de supprimer la candidature.',
      });
    } finally {
      setActionLoading(false);
    }
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[0.85fr_1.15fr]">
      <section className="space-y-6">
        <div className={theme === 'dark' ? 'rounded-3xl border border-white/10 bg-white/6 p-6' : 'rounded-3xl border border-slate-200 bg-white p-6 shadow-sm'}>
          <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
            <div>
              <h1 className={theme === 'dark' ? 'text-3xl font-semibold text-white' : 'text-3xl font-semibold text-slate-900'}>Candidatures</h1>
              <p className={theme === 'dark' ? 'mt-2 text-slate-300' : 'mt-2 text-slate-600'}>
                Poste de travail du charge de recrutement pour qualifier vite, trier les CV et archiver les dossiers traites.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className={theme === 'dark' ? 'rounded-2xl border border-white/10 bg-slate-950/45 px-4 py-3' : 'rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3'}>
                <p className={theme === 'dark' ? 'text-xs uppercase tracking-[0.22em] text-slate-400' : 'text-xs uppercase tracking-[0.22em] text-slate-500'}>Actives</p>
                <p className={theme === 'dark' ? 'mt-2 text-2xl font-semibold text-white' : 'mt-2 text-2xl font-semibold text-slate-900'}>{totals.active}</p>
              </div>
              <div className={theme === 'dark' ? 'rounded-2xl border border-white/10 bg-slate-950/45 px-4 py-3' : 'rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3'}>
                <p className={theme === 'dark' ? 'text-xs uppercase tracking-[0.22em] text-slate-400' : 'text-xs uppercase tracking-[0.22em] text-slate-500'}>Traitees</p>
                <p className={theme === 'dark' ? 'mt-2 text-2xl font-semibold text-white' : 'mt-2 text-2xl font-semibold text-slate-900'}>{totals.treated}</p>
              </div>
            </div>
          </div>
          {error && <p className="mt-4 rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">{error}</p>}
        </div>

        <div className={theme === 'dark' ? 'grid gap-4 rounded-3xl border border-white/10 bg-white/6 p-6' : 'grid gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm'}>
          <label className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Rechercher par nom, email, telephone, domaine"
              className={theme === 'dark' ? 'w-full rounded-2xl border border-white/10 bg-slate-950/70 py-3 pl-11 pr-4 text-white' : 'w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-slate-900'}
            />
          </label>

          <div className="grid gap-4 md:grid-cols-3">
            <select
              value={internship}
              onChange={(event) => setInternship(event.target.value)}
              className={theme === 'dark' ? 'rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white' : 'rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900'}
            >
              <option value="">Disponibilite stage: toutes</option>
              <option value="yes">Disponible cet ete</option>
              <option value="no">Pas disponible cet ete</option>
            </select>

            <select
              value={workMode}
              onChange={(event) => setWorkMode(event.target.value)}
              className={theme === 'dark' ? 'rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white' : 'rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900'}
            >
              <option value="">Mode de travail: tous</option>
              <option value="montplaisir-flex">Deplacement occasionnel a Montplaisir</option>
              <option value="remote-only">100% teletravail</option>
            </select>

            <select
              value={reviewFilter}
              onChange={(event) => setReviewFilter(event.target.value)}
              className={theme === 'dark' ? 'rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white' : 'rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900'}
            >
              <option value="">Qualification: toutes</option>
              <option value="pending">En attente</option>
              <option value="approved">OK</option>
              <option value="rejected">KO</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className={theme === 'dark' ? 'rounded-3xl border border-white/10 bg-white/6 px-4 py-10 text-slate-300' : 'rounded-3xl border border-slate-200 bg-white px-4 py-10 text-slate-600 shadow-sm'}>
            Chargement des candidatures...
          </div>
        ) : (
          <div className="space-y-6">
            <CandidateLane
              title="Candidatures"
              description="File active a examiner. Glissez vers la colonne traitee quand le dossier a ete passe en revue."
              applications={activeApplications}
              selectedId={selectedId}
              draggedId={draggedId}
              onSelect={setSelectedId}
              onDragStart={setDraggedId}
              onDropToBucket={(applicationId) => moveApplicationToBucket(applicationId, 'active').catch(() => {})}
              theme={theme}
            />

            <CandidateLane
              title="Candidatures traitees"
              description="Dossiers qualifies, refuses ou archives apres revue interne."
              applications={treatedApplications}
              selectedId={selectedId}
              draggedId={draggedId}
              onSelect={setSelectedId}
              onDragStart={setDraggedId}
              onDropToBucket={(applicationId) => moveApplicationToBucket(applicationId, 'treated').catch(() => {})}
              theme={theme}
            />
          </div>
        )}
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
                <div className="flex flex-wrap items-center gap-3">
                  <h2 className={theme === 'dark' ? 'text-2xl font-semibold text-white' : 'text-2xl font-semibold text-slate-900'}>{selectedApplication.name}</h2>
                  <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${theme === 'dark' ? selectedStatusMeta.chipDark : selectedStatusMeta.chipLight}`}>
                    {selectedStatusMeta.label}
                  </span>
                  <span className={theme === 'dark' ? 'rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300' : 'rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs text-slate-600'}>
                    {bucketLabel(selectedApplication.bucket)}
                  </span>
                </div>
                <p className={theme === 'dark' ? 'mt-2 text-slate-300' : 'mt-2 text-slate-600'}>
                  {selectedApplication.email} · {selectedApplication.phone}
                </p>
                {selectedApplication.reviewedAt && (
                  <p className={theme === 'dark' ? 'mt-2 text-sm text-slate-400' : 'mt-2 text-sm text-slate-500'}>
                    Derniere qualification le {formatDate(selectedApplication.reviewedAt)}{selectedApplication.reviewedBy?.name ? ` par ${selectedApplication.reviewedBy.name}` : ''}
                  </p>
                )}
              </div>
              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => updateApplication(selectedApplication.id, { reviewStatus: 'approved' }, 'Candidature marquee OK.')}
                  disabled={actionLoading}
                  className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-500 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <Check size={16} /> OK
                </button>
                <button
                  type="button"
                  onClick={() => updateApplication(selectedApplication.id, { reviewStatus: 'rejected' }, 'Candidature marquee KO.')}
                  disabled={actionLoading}
                  className="inline-flex items-center gap-2 rounded-full bg-rose-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-rose-500 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <X size={16} /> KO
                </button>
                <button
                  type="button"
                  onClick={() => updateApplication(
                    selectedApplication.id,
                    { bucket: selectedApplication.bucket === 'active' ? 'treated' : 'active' },
                    selectedApplication.bucket === 'active'
                      ? 'Candidature deplacee vers la colonne traitee.'
                      : 'Candidature remise dans la colonne active.',
                  )}
                  disabled={actionLoading}
                  className="btn-secondary"
                >
                  {selectedApplication.bucket === 'active' ? 'Marquer traitee' : 'Remettre active'}
                </button>
                <button
                  type="button"
                  onClick={() => deleteApplication(selectedApplication.id).catch(() => {})}
                  disabled={actionLoading}
                  className="inline-flex items-center gap-2 rounded-full border border-rose-300 bg-rose-50 px-4 py-2 text-sm font-semibold text-rose-700 transition hover:bg-rose-100 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <Trash2 size={16} /> Supprimer
                </button>
                {cvUrl && (
                  <>
                    <a href={cvUrl} target="_blank" rel="noreferrer" className="btn-secondary">
                      <FileText size={16} /> Ouvrir le CV
                    </a>
                    <a href={cvUrl} download={selectedApplication.cv.fileName} className="btn-secondary">
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
