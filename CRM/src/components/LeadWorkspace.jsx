import { useCallback, useEffect, useMemo, useState } from 'react';
import { CheckSquare, Download, GripVertical, Link2, Lock, MessageSquareMore, Search, Upload } from 'lucide-react';
import { apiRequest, API_URL } from '../lib/api';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { formatDate, getLeadRowTone, getLeadStatusTone } from '../lib/format';
import ExcelImportModal from './ExcelImportModal';
import { useSocket } from '../context/SocketContext';
import { getBucketMetrics, getLeadStatusLabel, LEAD_STATUS_OPTIONS, QUICK_FILTER_OPTIONS } from '../lib/leads';

const initialForm = {
  name: '',
  email: '',
  phone: '',
  country: '',
  campaign: '',
  status: 'New',
};

const initialTaskForm = {
  title: '',
  dueAt: '',
};

function getScoreTone(scoreLabel = 'Cold') {
  switch (scoreLabel) {
    case 'Hot':
      return 'bg-rose-500/10 text-rose-200 ring-1 ring-rose-400/20';
    case 'Warm':
      return 'bg-amber-500/10 text-amber-200 ring-1 ring-amber-400/20';
    case 'Active':
      return 'bg-cyan-500/10 text-cyan-200 ring-1 ring-cyan-400/20';
    default:
      return 'bg-slate-500/10 text-slate-200 ring-1 ring-slate-400/20';
  }
}

function matchesLeadFilters(lead, currentSearch, currentStatus) {
  const normalizedSearch = currentSearch.trim().toLowerCase();
  const haystack = [lead.name, lead.email, lead.campaign, lead.country].join(' ').toLowerCase();

  if (normalizedSearch && !haystack.includes(normalizedSearch)) {
    return false;
  }

  if (currentStatus && lead.status !== currentStatus) {
    return false;
  }

  return true;
}

export default function LeadWorkspace({ bucket = 'leads', title, description }) {
  const { token, user } = useAuth();
  const { theme } = useTheme();
  const { socket } = useSocket();
  const [leads, setLeads] = useState([]);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1, total: 0 });
  const [summary, setSummary] = useState(null);
  const [form, setForm] = useState(initialForm);
  const [editingLead, setEditingLead] = useState(null);
  const [selectedLead, setSelectedLead] = useState(null);
  const [note, setNote] = useState('');
  const [showImport, setShowImport] = useState(false);
  const [invites, setInvites] = useState([]);
  const [inviteCampaign, setInviteCampaign] = useState('');
  const [metaUsers, setMetaUsers] = useState([]);
  const [editingUnlocked, setEditingUnlocked] = useState(false);
  const [draggedLeadId, setDraggedLeadId] = useState(null);
  const [isMovingLead, setIsMovingLead] = useState(false);
  const [isStatusUpdating, setIsStatusUpdating] = useState(false);
  const [isLoadingLeads, setIsLoadingLeads] = useState(true);
  const [isSubmittingLead, setIsSubmittingLead] = useState(false);
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [feedback, setFeedback] = useState({ type: '', message: '' });
  const [selectedLeadIds, setSelectedLeadIds] = useState([]);
  const [savedFilters, setSavedFilters] = useState([]);
  const [saveFilterName, setSaveFilterName] = useState('');
  const [isBulkProcessing, setIsBulkProcessing] = useState(false);
  const [taskForm, setTaskForm] = useState(initialTaskForm);
  const [quickFilter, setQuickFilter] = useState('');
  const [bulkAssignedTo, setBulkAssignedTo] = useState('');

  const canEdit = user?.role !== 'viewer';
  const canManageAssignments = user?.role === 'admin' || user?.role === 'manager';
  const canImport = user?.role === 'admin' || user?.role === 'manager';
  const canExport = user?.role === 'admin';
  const canCreateInvite = user?.role === 'admin';

  const refreshLeads = useCallback(async (page = pagination.page, currentSearch = search, currentStatus = status, currentQuickFilter = quickFilter) => {
    setIsLoadingLeads(true);
    const params = new URLSearchParams({
      page: String(page),
      limit: '20',
      bucket,
      ...(currentSearch ? { search: currentSearch } : {}),
      ...(currentStatus ? { status: currentStatus } : {}),
      ...(currentQuickFilter ? { quickFilter: currentQuickFilter } : {}),
    });

    try {
      const data = await apiRequest(`/api/leads?${params.toString()}`, { token });
      setLeads(data.leads);
      setSummary(data.summary);
      setPagination(data.pagination);
    } catch (error) {
      setFeedback({ type: 'error', message: error.message || 'Impossible de charger les leads.' });
      throw error;
    } finally {
      setIsLoadingLeads(false);
    }
  }, [bucket, pagination.page, quickFilter, search, status, token]);

  useEffect(() => {
    apiRequest('/api/leads/meta/users', { token }).then((data) => setMetaUsers(data.users)).catch(() => {});
    apiRequest('/api/invites', { token }).then((data) => setInvites(data.invites)).catch(() => {});
    apiRequest('/api/leads/filters', { token }).then((data) => setSavedFilters(data.filters)).catch(() => {});
  }, [token]);

  useEffect(() => {
    refreshLeads(pagination.page, search, status, quickFilter).catch(() => {});
  }, [quickFilter, refreshLeads, pagination.page, search, status]);

  useEffect(() => {
    setSelectedLeadIds((current) => current.filter((id) => leads.some((lead) => lead.id === id)));
  }, [leads]);

  useEffect(() => {
    if (!socket) {
      return undefined;
    }

    const handleLeadUpdated = ({ lead }) => {
      if (!lead) {
        return;
      }

      if (lead.bucket === bucket && matchesLeadFilters(lead, search, status)) {
        setLeads((current) => {
          const exists = current.some((item) => item.id === lead.id);
          if (exists) {
            return current.map((item) => (item.id === lead.id ? lead : item));
          }
          return current;
        });
      } else {
        setLeads((current) => current.filter((item) => item.id !== lead.id));
      }

      if (selectedLead?.id === lead.id) {
        setSelectedLead(lead.bucket === bucket ? lead : null);
      }

      refreshLeads(pagination.page, search, status, quickFilter).catch(() => {});
    };

    const handleNotification = (notification) => {
      if (notification.type === 'lead') {
        refreshLeads(1, search, status, quickFilter).catch(() => {});
      }
    };

    socket.on('lead:updated', handleLeadUpdated);
    socket.on('notification:new', handleNotification);
    return () => {
      socket.off('lead:updated', handleLeadUpdated);
      socket.off('notification:new', handleNotification);
    };
  }, [bucket, pagination.page, quickFilter, refreshLeads, search, selectedLead?.id, socket, status]);

  const leadMap = useMemo(() => new Map(leads.map((lead) => [lead.id, lead])), [leads]);
  const metricCards = useMemo(() => getBucketMetrics(summary), [summary]);

  useEffect(() => {
    if (selectedLead && leadMap.has(selectedLead.id)) {
      setSelectedLead(leadMap.get(selectedLead.id));
    }
  }, [leadMap, selectedLead]);

  async function loadLead(id) {
    const data = await apiRequest(`/api/leads/${id}`, { token });
    setSelectedLead(data.lead);
    setTaskForm(initialTaskForm);
    setEditingUnlocked(false);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setIsSubmittingLead(true);
    setFeedback({ type: '', message: '' });

    try {
      if (editingLead) {
        const data = await apiRequest(`/api/leads/${editingLead.id}`, {
          method: 'PATCH',
          token,
          body: { ...form, bucket: editingLead.bucket || bucket },
        });
        setSelectedLead(data.lead);
        setFeedback({ type: 'success', message: 'Lead updated successfully.' });
      } else {
        await apiRequest('/api/leads', {
          method: 'POST',
          token,
          body: form,
        });
        setFeedback({ type: 'success', message: 'Lead created successfully.' });
      }

      setForm(initialForm);
      setEditingLead(null);
      setPagination((current) => ({ ...current, page: 1 }));
      await refreshLeads(1, search, status, quickFilter);
    } catch (error) {
      setFeedback({ type: 'error', message: error.message || 'Unable to save the lead.' });
    } finally {
      setIsSubmittingLead(false);
    }
  }

  async function handleDelete(id) {
    setFeedback({ type: '', message: '' });
    try {
      await apiRequest(`/api/leads/${id}`, { method: 'DELETE', token });
      if (selectedLead?.id === id) {
        setSelectedLead(null);
      }
      setFeedback({ type: 'success', message: 'Lead deleted successfully.' });
      await refreshLeads(pagination.page, search, status, quickFilter);
    } catch (error) {
      setFeedback({ type: 'error', message: error.message || 'Unable to delete the lead.' });
    }
  }

  async function handleImport(file) {
    const formData = new FormData();
    formData.append('file', file);
    setFeedback({ type: '', message: '' });
    try {
      const data = await apiRequest('/api/leads/import/file', { method: 'POST', token, body: formData });
      setShowImport(false);
      setPagination((current) => ({ ...current, page: 1 }));
      setFeedback({
        type: 'success',
        message: data.duplicatesFlagged
          ? `Import completed successfully. ${data.duplicatesFlagged} lead(s) flagged as duplicate.`
          : 'Import completed successfully.',
      });
      await refreshLeads(1, search, status, quickFilter);
    } catch (error) {
      setFeedback({ type: 'error', message: error.message || 'Unable to import this file.' });
    }
  }

  async function handleAddNote() {
    if (!selectedLead || !note.trim()) {
      return;
    }

    setIsAddingNote(true);
    setFeedback({ type: '', message: '' });

    try {
      const data = await apiRequest(`/api/leads/${selectedLead.id}/notes`, {
        method: 'POST',
        token,
        body: { body: note },
      });

      setSelectedLead(data.lead);
      setNote('');
      setFeedback({ type: 'success', message: 'Note added successfully.' });
    } catch (error) {
      setFeedback({ type: 'error', message: error.message || 'Unable to add the note.' });
    } finally {
      setIsAddingNote(false);
    }
  }

  async function handleAddTask() {
    if (!selectedLead || !taskForm.title.trim() || !taskForm.dueAt) {
      setFeedback({ type: 'error', message: 'Add a task title and due date first.' });
      return;
    }

    try {
      const data = await apiRequest(`/api/leads/${selectedLead.id}/tasks`, {
        method: 'POST',
        token,
        body: taskForm,
      });
      setSelectedLead(data.lead);
      setTaskForm(initialTaskForm);
      setFeedback({ type: 'success', message: 'Follow-up task created.' });
      await refreshLeads(pagination.page, search, status, quickFilter);
    } catch (error) {
      setFeedback({ type: 'error', message: error.message || 'Unable to create the follow-up task.' });
    }
  }

  async function handleToggleTask(task, completed) {
    if (!selectedLead) {
      return;
    }

    try {
      const data = await apiRequest(`/api/leads/${selectedLead.id}/tasks/${task.id}`, {
        method: 'PATCH',
        token,
        body: { completed },
      });
      setSelectedLead(data.lead);
      setFeedback({ type: 'success', message: completed ? 'Task completed.' : 'Task reopened.' });
      await refreshLeads(pagination.page, search, status, quickFilter);
    } catch (error) {
      setFeedback({ type: 'error', message: error.message || 'Unable to update the task.' });
    }
  }

  async function handleGenerateInvite() {
    setFeedback({ type: '', message: '' });
    try {
      const data = await apiRequest('/api/invites', {
        method: 'POST',
        token,
        body: { campaign: inviteCampaign },
      });
      setInvites((current) => [data.invite, ...current]);
      setInviteCampaign('');
      setFeedback({ type: 'success', message: 'Public intake link generated.' });
    } catch (error) {
      setFeedback({ type: 'error', message: error.message || 'Unable to generate the invite link.' });
    }
  }

  async function handleSaveCurrentFilter() {
    if (!saveFilterName.trim()) {
      setFeedback({ type: 'error', message: 'Give this saved filter a name first.' });
      return;
    }

    try {
      const data = await apiRequest('/api/leads/filters', {
        method: 'POST',
        token,
        body: {
          name: saveFilterName,
          search,
          status,
          bucket,
          quickFilter,
        },
      });
      setSavedFilters((current) => [data.filter, ...current]);
      setSaveFilterName('');
      setFeedback({ type: 'success', message: 'Saved filter created.' });
    } catch (error) {
      setFeedback({ type: 'error', message: error.message || 'Unable to save this filter.' });
    }
  }

  async function handleDeleteSavedFilter(filterId) {
    try {
      await apiRequest(`/api/leads/filters/${filterId}`, {
        method: 'DELETE',
        token,
      });
      setSavedFilters((current) => current.filter((item) => item.id !== filterId));
      setFeedback({ type: 'success', message: 'Saved filter deleted.' });
    } catch (error) {
      setFeedback({ type: 'error', message: error.message || 'Unable to delete this filter.' });
    }
  }

  function applySavedFilter(filter) {
    setSearch(filter.search || '');
    setStatus(filter.status || '');
    setQuickFilter(filter.quickFilter || '');
    setPagination((current) => ({ ...current, page: 1 }));
    setFeedback({ type: 'success', message: `Filter "${filter.name}" applied.` });
  }

  function toggleLeadSelection(leadId) {
    setSelectedLeadIds((current) => (
      current.includes(leadId)
        ? current.filter((id) => id !== leadId)
        : [...current, leadId]
    ));
  }

  function toggleSelectAllVisible() {
    const visibleIds = leads.map((lead) => lead.id);
    const allSelected = visibleIds.length > 0 && visibleIds.every((id) => selectedLeadIds.includes(id));
    setSelectedLeadIds((current) => (
      allSelected
        ? current.filter((id) => !visibleIds.includes(id))
        : Array.from(new Set([...current, ...visibleIds]))
    ));
  }

  async function handleBulkAction(action, value = '') {
    if (!selectedLeadIds.length) {
      setFeedback({ type: 'error', message: 'Select at least one lead first.' });
      return;
    }

    setIsBulkProcessing(true);
    try {
      await apiRequest('/api/leads/bulk', {
        method: 'POST',
        token,
        body: {
          action,
          leadIds: selectedLeadIds,
          ...(action === 'status' ? { status: value } : {}),
          ...(action === 'bucket' ? { bucket: value } : {}),
          ...(action === 'assign' ? { assignedTo: value || null } : {}),
        },
      });
      setSelectedLeadIds([]);
      setFeedback({ type: 'success', message: 'Bulk action completed successfully.' });
      if (selectedLead?.id && selectedLeadIds.includes(selectedLead.id)) {
        setSelectedLead(null);
      }
      await refreshLeads(1, search, status, quickFilter);
    } catch (error) {
      setFeedback({ type: 'error', message: error.message || 'Unable to run the bulk action.' });
    } finally {
      setIsBulkProcessing(false);
    }
  }

  function startEdit(lead) {
    setSelectedLead((current) => ({ ...current, ...lead }));
    setEditingLead(lead);
    setEditingUnlocked(false);
    setForm({
      name: lead.name,
      email: lead.email,
      phone: lead.phone,
      country: lead.country,
      campaign: lead.campaign,
      status: lead.status,
      assignedTo: lead.assignedTo?.id || '',
    });
  }

  async function handleExport() {
    setFeedback({ type: '', message: '' });
    try {
      const response = await fetch(`${API_URL}/api/leads/export`, {
        credentials: 'include',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error('Unable to export the leads.');
      }
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'edugrowth-leads.csv';
      link.click();
      window.URL.revokeObjectURL(url);
      setFeedback({ type: 'success', message: 'Lead export downloaded.' });
    } catch (error) {
      setFeedback({ type: 'error', message: error.message || 'Unable to export the leads.' });
    }
  }

  async function quickUpdateStatus(lead, nextStatus) {
    if (!lead || lead.status === nextStatus) {
      return;
    }

    const previousLead = lead;
    const optimisticLead = { ...lead, status: nextStatus };

    setIsStatusUpdating(true);
    setFeedback({ type: '', message: '' });
    setLeads((current) => current.map((item) => (item.id === lead.id ? optimisticLead : item)));
    if (selectedLead?.id === lead.id) {
      setSelectedLead((current) => ({ ...current, status: nextStatus }));
    }

    try {
      const data = await apiRequest(`/api/leads/${lead.id}`, {
        method: 'PATCH',
        token,
        body: { status: nextStatus },
      });
      setLeads((current) => current.map((item) => (item.id === lead.id ? data.lead : item)));
      if (selectedLead?.id === lead.id) {
        setSelectedLead(data.lead);
      }
      setFeedback({ type: 'success', message: `Lead moved to ${getLeadStatusLabel(nextStatus)}.` });
      await refreshLeads(pagination.page, search, status, quickFilter);
    } catch (error) {
      setLeads((current) => current.map((item) => (item.id === lead.id ? previousLead : item)));
      if (selectedLead?.id === lead.id) {
        setSelectedLead(previousLead);
      }
      setFeedback({ type: 'error', message: error.message || 'Unable to update the lead status.' });
      throw error;
    } finally {
      setIsStatusUpdating(false);
    }
  }

  async function moveLeadToBucket(leadId, nextBucket) {
    const lead = leads.find((item) => item.id === leadId);
    if (!lead || lead.bucket === nextBucket) {
      return;
    }

    setIsMovingLead(true);
    setFeedback({ type: '', message: '' });
    setLeads((current) => current.filter((item) => item.id !== leadId));
    if (selectedLead?.id === leadId && nextBucket !== bucket) {
      setSelectedLead(null);
    }

    try {
      await apiRequest(`/api/leads/${leadId}`, {
        method: 'PATCH',
        token,
        body: { bucket: nextBucket },
      });
      setFeedback({ type: 'success', message: nextBucket === 'treated' ? 'Lead moved to treated.' : 'Lead moved back to active leads.' });
      await refreshLeads(pagination.page, search, status, quickFilter);
    } catch (error) {
      setFeedback({ type: 'error', message: error.message || 'Unable to move the lead.' });
      await refreshLeads(pagination.page, search, status, quickFilter);
    } finally {
      setDraggedLeadId(null);
      setIsMovingLead(false);
    }
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
      <section className="space-y-6">
        <div className={theme === 'dark' ? 'flex flex-col gap-4 rounded-3xl border border-white/10 bg-white/6 p-6 xl:flex-row xl:items-center xl:justify-between' : 'flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm xl:flex-row xl:items-center xl:justify-between'}>
          <div>
            <h1 className={theme === 'dark' ? 'text-3xl font-semibold text-white' : 'text-3xl font-semibold text-slate-900'}>{title}</h1>
            <p className={theme === 'dark' ? 'mt-2 text-slate-300' : 'mt-2 text-slate-600'}>{description}</p>
          </div>

          <div className="flex flex-wrap gap-3">
            {canImport && (
              <button type="button" onClick={() => setShowImport(true)} className="btn-secondary">
                <Upload size={16} /> Import
              </button>
            )}
            {canExport && (
              <button type="button" onClick={handleExport} className="btn-secondary">
                <Download size={16} /> Export
              </button>
            )}
          </div>
        </div>

        {bucket === 'leads' && (
          <div
            onDragOver={(event) => event.preventDefault()}
            onDrop={(event) => {
              event.preventDefault();
              const leadId = event.dataTransfer.getData('text/plain') || draggedLeadId;
              if (leadId) {
                moveLeadToBucket(leadId, 'treated').catch(() => {});
              }
            }}
            className={theme === 'dark'
              ? 'rounded-3xl border border-dashed border-cyan-400/30 bg-cyan-500/10 p-5 text-cyan-100'
              : 'rounded-3xl border border-dashed border-cyan-300 bg-cyan-50 p-5 text-sky-900'}
          >
            <p className="text-sm uppercase tracking-[0.24em]">Zone traite</p>
            <p className="mt-2 text-lg font-semibold">Glissez un lead ici pour l’envoyer vers Traites</p>
            <p className={theme === 'dark' ? 'mt-2 text-sm text-cyan-100/75' : 'mt-2 text-sm text-sky-800/75'}>{isMovingLead ? 'Mise a jour en cours...' : 'Le lead disparaitra de cette liste et restera visible dans la nouvelle rubrique Traites.'}</p>
          </div>
        )}

        <div className={theme === 'dark' ? 'grid gap-4 rounded-3xl border border-white/10 bg-white/6 p-6 md:grid-cols-[1fr_auto]' : 'grid gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:grid-cols-[1fr_auto]'}>
          <label className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                setPagination((current) => ({ ...current, page: 1 }));
              }}
              placeholder="Search by name, email, campaign, country"
              className={theme === 'dark' ? 'w-full rounded-2xl border border-white/10 bg-slate-950/70 py-3 pl-11 pr-4 text-white' : 'w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-slate-900'}
            />
          </label>

          <select
            value={status}
            onChange={(event) => {
              setStatus(event.target.value);
              setPagination((current) => ({ ...current, page: 1 }));
            }}
            className={theme === 'dark' ? 'rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white' : 'rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900'}
          >
            <option value="">Tous les statuts</option>
            {LEAD_STATUS_OPTIONS.map((item) => (
              <option key={item} value={item}>{getLeadStatusLabel(item)}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-wrap gap-3">
          {QUICK_FILTER_OPTIONS.map((item) => (
            <button
              key={item.key || 'all'}
              type="button"
              onClick={() => {
                setQuickFilter(item.key);
                setPagination((current) => ({ ...current, page: 1 }));
              }}
              className={`rounded-full px-4 py-2 text-sm transition ${
                quickFilter === item.key
                  ? 'bg-cyan-500 text-slate-950'
                  : theme === 'dark'
                    ? 'border border-white/10 bg-white/6 text-slate-200'
                    : 'border border-slate-200 bg-white text-slate-700'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className={theme === 'dark' ? 'rounded-3xl border border-white/10 bg-white/6 p-6' : 'rounded-3xl border border-slate-200 bg-white p-6 shadow-sm'}>
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <p className={theme === 'dark' ? 'text-xs uppercase tracking-[0.24em] text-slate-400' : 'text-xs uppercase tracking-[0.24em] text-slate-500'}>Saved Filters</p>
              <p className={theme === 'dark' ? 'mt-2 text-sm text-slate-300' : 'mt-2 text-sm text-slate-600'}>Capture your common lead views and reuse them in one click.</p>
            </div>
            <div className="flex flex-1 flex-col gap-3 md:flex-row">
              <input
                value={saveFilterName}
                onChange={(event) => setSaveFilterName(event.target.value)}
                placeholder="Filter name"
                className={theme === 'dark' ? 'flex-1 rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white' : 'flex-1 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900'}
              />
              <button type="button" onClick={() => handleSaveCurrentFilter().catch(() => {})} className="btn-secondary">
                Save current filter
              </button>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-3">
            {savedFilters.length === 0 && <p className={theme === 'dark' ? 'text-sm text-slate-400' : 'text-sm text-slate-500'}>No saved filters yet.</p>}
            {savedFilters.map((filter) => (
              <div key={filter.id} className={theme === 'dark' ? 'rounded-2xl border border-white/10 bg-slate-950/50 p-3' : 'rounded-2xl border border-slate-200 bg-slate-50 p-3'}>
                <button type="button" onClick={() => applySavedFilter(filter)} className={theme === 'dark' ? 'text-sm font-medium text-white' : 'text-sm font-medium text-slate-900'}>
                  {filter.name}
                </button>
                <p className={theme === 'dark' ? 'mt-1 text-xs text-slate-400' : 'mt-1 text-xs text-slate-500'}>
                  {(filter.search || 'No search')} · {filter.status ? getLeadStatusLabel(filter.status) : 'Tous'} · {QUICK_FILTER_OPTIONS.find((item) => item.key === (filter.quickFilter || ''))?.label || 'Tous'}
                </p>
                <button type="button" onClick={() => handleDeleteSavedFilter(filter.id).catch(() => {})} className="mt-2 text-xs text-rose-300">
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className={theme === 'dark' ? 'rounded-3xl border border-white/10 bg-white/6 p-6' : 'rounded-3xl border border-slate-200 bg-white p-6 shadow-sm'}>
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <p className={theme === 'dark' ? 'text-xs uppercase tracking-[0.24em] text-slate-400' : 'text-xs uppercase tracking-[0.24em] text-slate-500'}>Bulk Actions</p>
              <p className={theme === 'dark' ? 'mt-2 text-sm text-slate-300' : 'mt-2 text-sm text-slate-600'}>{selectedLeadIds.length} selected lead(s).</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button type="button" onClick={toggleSelectAllVisible} className="btn-secondary">
                <CheckSquare size={16} /> Select visible
              </button>
              <button type="button" onClick={() => handleBulkAction('status', 'Contacted').catch(() => {})} className="btn-secondary" disabled={isBulkProcessing || !canEdit}>
                Mark Contacted
              </button>
              <button type="button" onClick={() => handleBulkAction('status', 'Interested').catch(() => {})} className="btn-secondary" disabled={isBulkProcessing || !canEdit}>
                Mark Interested
              </button>
              <button type="button" onClick={() => handleBulkAction('bucket', bucket === 'leads' ? 'treated' : 'leads').catch(() => {})} className="btn-secondary" disabled={isBulkProcessing || !canEdit}>
                {bucket === 'leads' ? 'Move To Treated' : 'Move To Leads'}
              </button>
              {canManageAssignments && (
                <>
                  <select
                    value={bulkAssignedTo}
                    onChange={(event) => setBulkAssignedTo(event.target.value)}
                    className={theme === 'dark' ? 'rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-2 text-white' : 'rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2 text-slate-900'}
                  >
                    <option value="">Unassigned</option>
                    {metaUsers.map((agent) => (
                      <option key={agent.id} value={agent.id}>{agent.name}</option>
                    ))}
                  </select>
                  <button type="button" onClick={() => handleBulkAction('assign', bulkAssignedTo).catch(() => {})} className="btn-secondary" disabled={isBulkProcessing}>
                    Bulk Assign
                  </button>
                </>
              )}
              {user?.role === 'admin' && (
                <button type="button" onClick={() => handleBulkAction('delete').catch(() => {})} className="table-action danger" disabled={isBulkProcessing || !canEdit}>
                  Delete Selected
                </button>
              )}
            </div>
          </div>
        </div>

        {feedback.message && (
          <div className={`rounded-3xl border px-5 py-4 text-sm ${
            feedback.type === 'error'
              ? 'border-red-500/30 bg-red-500/10 text-red-100'
              : 'border-emerald-500/30 bg-emerald-500/10 text-emerald-100'
          }`}>
            {feedback.message}
          </div>
        )}

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {metricCards.map((item) => (
            <div key={item.key} className={`rounded-3xl border border-white/10 bg-gradient-to-br ${item.tone} p-5`}>
              <p className="text-sm uppercase tracking-[0.2em] text-slate-300">{item.label}</p>
              <p className="mt-3 text-3xl font-semibold">{item.value}</p>
              <p className="mt-2 text-sm text-slate-300">{item.percent}</p>
            </div>
          ))}
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          {[
            { label: 'Leads affiches', value: leads.length, helper: `${pagination.total || 0} au total dans cette rubrique` },
            { label: 'Recherche active', value: search ? 'Oui' : 'Non', helper: search || 'aucun filtre texte' },
            { label: 'Filtre statut', value: status ? getLeadStatusLabel(status) : 'Tous', helper: 'pipeline courant' },
            { label: 'Selection', value: selectedLead?.name || 'Aucune', helper: selectedLead?.status ? getLeadStatusLabel(selectedLead.status) : 'cliquez une ligne' },
          ].map((item) => (
            <div key={item.label} className={theme === 'dark' ? 'rounded-3xl border border-white/10 bg-slate-950/40 p-5' : 'rounded-3xl border border-slate-200 bg-slate-50 p-5'}>
              <p className={theme === 'dark' ? 'text-xs uppercase tracking-[0.24em] text-slate-400' : 'text-xs uppercase tracking-[0.24em] text-slate-500'}>{item.label}</p>
              <p className={theme === 'dark' ? 'mt-3 truncate text-2xl font-semibold text-white' : 'mt-3 truncate text-2xl font-semibold text-slate-900'}>{item.value}</p>
              <p className={theme === 'dark' ? 'mt-2 truncate text-sm text-slate-400' : 'mt-2 truncate text-sm text-slate-500'}>{item.helper}</p>
            </div>
          ))}
        </div>

        <div className={theme === 'dark' ? 'overflow-hidden rounded-3xl border border-white/10 bg-white/6' : 'overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm'}>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className={theme === 'dark' ? 'sticky top-0 bg-slate-950/85 backdrop-blur' : 'sticky top-0 bg-slate-100/95 backdrop-blur'}>
                <tr className={theme === 'dark' ? 'text-left text-sm text-slate-300' : 'text-left text-sm text-slate-600'}>
                  {['Select', '#', 'Lead', 'Campaign', 'Country', 'Status', 'Date added', 'Actions'].map((column) => (
                    <th key={column} className="px-5 py-4">{column}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {leads.map((lead) => (
                  <tr
                    key={lead.id}
                    draggable={canEdit}
                    onDragStart={(event) => {
                      if (!canEdit) {
                        return;
                      }
                      event.dataTransfer.setData('text/plain', lead.id);
                      setDraggedLeadId(lead.id);
                    }}
                    onClick={() => {
                      loadLead(lead.id).catch(() => {});
                    }}
                    className={`cursor-pointer border-t ${theme === 'dark' ? 'border-white/5 text-slate-200 hover:bg-white/[0.04]' : 'border-slate-200 text-slate-700 hover:bg-slate-50'} text-sm ${getLeadRowTone(lead.status)} ${selectedLead?.id === lead.id ? 'ring-1 ring-cyan-300/30' : ''} transition`}
                  >
                    <td className="px-5 py-4">
                      <input
                        type="checkbox"
                        checked={selectedLeadIds.includes(lead.id)}
                        onClick={(event) => event.stopPropagation()}
                        onChange={() => toggleLeadSelection(lead.id)}
                        className="h-4 w-4 rounded border-slate-300"
                      />
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <GripVertical size={16} className="text-slate-400" />
                        <div>
                          <p className={theme === 'dark' ? 'font-medium text-white' : 'font-medium text-slate-900'}>{lead.sequenceNumber || '-'}</p>
                          <p className={theme === 'dark' ? 'text-xs text-slate-400' : 'text-xs text-slate-500'}>{lead.leadCode || '-'}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-start gap-3">
                        <span className={`mt-1 h-2.5 w-2.5 rounded-full ${lead.status === 'Interested' ? 'bg-emerald-300' : lead.status === 'Contacted' ? 'bg-amber-300' : lead.status === 'Non Qualified' ? 'bg-rose-300' : lead.status === 'Not Interested' ? 'bg-orange-300' : 'bg-fuchsia-300'}`} />
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <p className={theme === 'dark' ? 'font-medium text-white' : 'font-medium text-slate-900'}>{lead.name}</p>
                            {lead.duplicateFlag?.isDuplicate && <span className="rounded-full bg-red-500/10 px-2 py-0.5 text-[11px] font-medium text-red-300 ring-1 ring-red-400/20">Doublon</span>}
                            <span className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${getScoreTone(lead.score?.label)}`}>
                              {lead.score?.value || 0} · {lead.score?.label || 'Cold'}
                            </span>
                          </div>
                          <p className={theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}>{lead.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4">{lead.campaign || '-'}</td>
                    <td className="px-5 py-4">{lead.country || '-'}</td>
                    <td className="px-5 py-4">
                      <select
                        value={lead.status}
                        aria-label={`Update status for ${lead.name}`}
                        onClick={(event) => event.stopPropagation()}
                        onChange={(event) => {
                          event.stopPropagation();
                          quickUpdateStatus(lead, event.target.value).catch(() => {});
                        }}
                        disabled={isStatusUpdating || !canEdit}
                        className={`rounded-full px-3 py-1 ${getLeadStatusTone(lead.status)} ${theme === 'dark' ? 'bg-slate-950/80' : 'bg-white'} disabled:cursor-not-allowed disabled:opacity-70`}
                      >
                        {LEAD_STATUS_OPTIONS.map((item) => (
                          <option key={item} value={item}>{getLeadStatusLabel(item)}</option>
                        ))}
                      </select>
                    </td>
                    <td className={theme === 'dark' ? 'px-5 py-4 text-slate-400' : 'px-5 py-4 text-slate-500'}>
                      <div>
                        <p>{formatDate(lead.createdAt)}</p>
                        <p className="text-xs">Active: {formatDate(lead.lastActivityAt)}</p>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex flex-wrap gap-2">
                        <button type="button" onClick={(event) => { event.stopPropagation(); loadLead(lead.id).catch(() => {}); }} className="table-action">Open</button>
                        {canEdit && lead.status !== 'Contacted' && <button type="button" onClick={(event) => { event.stopPropagation(); quickUpdateStatus(lead, 'Contacted').catch(() => {}); }} className="table-action">Contacte</button>}
                        {canEdit && lead.status !== 'Non Qualified' && <button type="button" onClick={(event) => { event.stopPropagation(); quickUpdateStatus(lead, 'Non Qualified').catch(() => {}); }} className="table-action">Non qualifie</button>}
                        {canEdit && lead.status !== 'Not Interested' && <button type="button" onClick={(event) => { event.stopPropagation(); quickUpdateStatus(lead, 'Not Interested').catch(() => {}); }} className="table-action">Pas interesse</button>}
                        {canEdit && lead.status !== 'Interested' && <button type="button" onClick={(event) => { event.stopPropagation(); quickUpdateStatus(lead, 'Interested').catch(() => {}); }} className="table-action">Interesse</button>}
                        {canEdit && bucket === 'leads' && <button type="button" onClick={(event) => { event.stopPropagation(); moveLeadToBucket(lead.id, 'treated').catch(() => {}); }} className="table-action">Traiter</button>}
                        {canEdit && bucket === 'treated' && <button type="button" onClick={(event) => { event.stopPropagation(); moveLeadToBucket(lead.id, 'leads').catch(() => {}); }} className="table-action">Remettre</button>}
                        {canEdit && <button type="button" onClick={(event) => { event.stopPropagation(); startEdit(lead); }} className="table-action">Edit</button>}
                        {user?.role === 'admin' && canEdit && <button type="button" onClick={(event) => { event.stopPropagation(); handleDelete(lead.id).catch(() => {}); }} className="table-action danger">Delete</button>}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {!isLoadingLeads && leads.length === 0 && (
            <div className={theme === 'dark' ? 'border-t border-white/10 px-5 py-6 text-sm text-slate-400' : 'border-t border-slate-200 px-5 py-6 text-sm text-slate-500'}>
              Aucun lead ne correspond a vos filtres actuels.
            </div>
          )}
        </div>

        <div className={theme === 'dark' ? 'flex items-center justify-between rounded-3xl border border-white/10 bg-white/6 px-5 py-4 text-sm text-slate-300' : 'flex items-center justify-between rounded-3xl border border-slate-200 bg-white px-5 py-4 text-sm text-slate-600 shadow-sm'}>
          <span>Page {pagination.page} sur {pagination.totalPages} · 20 lignes par page</span>
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
      </section>

      <section className="space-y-6">
        {selectedLead && (
          <div className={theme === 'dark' ? 'rounded-3xl border border-white/10 bg-white/6 p-6' : 'rounded-3xl border border-slate-200 bg-white p-6 shadow-sm'}>
            <div className="flex flex-wrap items-center gap-2">
              <h2 className={theme === 'dark' ? 'text-xl font-semibold text-white' : 'text-xl font-semibold text-slate-900'}>{selectedLead.name}</h2>
              {selectedLead.duplicateFlag?.isDuplicate && <span className="rounded-full bg-red-500/10 px-2 py-0.5 text-xs font-medium text-red-300 ring-1 ring-red-400/20">Doublon</span>}
              <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${getScoreTone(selectedLead.score?.label)}`}>
                Score {selectedLead.score?.value || 0} · {selectedLead.score?.label || 'Cold'}
              </span>
            </div>
            <p className={theme === 'dark' ? 'mt-2 text-sm text-slate-400' : 'mt-2 text-sm text-slate-500'}>ID: {selectedLead.leadCode || '-'} · Numero: {selectedLead.sequenceNumber || '-'}</p>
            <p className={theme === 'dark' ? 'mt-2 text-sm text-slate-400' : 'mt-2 text-sm text-slate-500'}>Campaign: {selectedLead.campaign || 'General'} · Country: {selectedLead.country || '-'}</p>
            {selectedLead.source && <p className={theme === 'dark' ? 'mt-1 text-sm text-slate-500' : 'mt-1 text-sm text-slate-500'}>Source: {selectedLead.source}</p>}
            <p className={theme === 'dark' ? 'mt-1 text-sm text-slate-500' : 'mt-1 text-sm text-slate-500'}>Last activity: {formatDate(selectedLead.lastActivityAt)}</p>
            {selectedLead.duplicateFlag?.isDuplicate && (
              <p className="mt-1 text-sm text-red-300">
                Duplicate match via {selectedLead.duplicateFlag.matchedBy?.join(', ') || 'existing lead'}.
              </p>
            )}
            <div className="mt-4 flex flex-wrap gap-2">
              <select
                value={selectedLead.status}
                aria-label={`Update selected lead status for ${selectedLead.name}`}
                onChange={(event) => quickUpdateStatus(selectedLead, event.target.value).catch(() => {})}
                disabled={isStatusUpdating || !canEdit}
                className={`rounded-full px-3 py-1 text-sm ${getLeadStatusTone(selectedLead.status)} ${theme === 'dark' ? 'bg-slate-950/80' : 'bg-white'} disabled:cursor-not-allowed disabled:opacity-70`}
              >
                {LEAD_STATUS_OPTIONS.map((item) => (
                  <option key={item} value={item}>{getLeadStatusLabel(item)}</option>
                ))}
              </select>
              {selectedLead.statusTimeline?.contactedAt && <span className="rounded-full bg-amber-500/10 px-3 py-1 text-xs text-amber-100">Contacte: {formatDate(selectedLead.statusTimeline.contactedAt)}</span>}
              {selectedLead.statusTimeline?.nonQualifiedAt && <span className="rounded-full bg-rose-500/10 px-3 py-1 text-xs text-rose-100">Non qualifie: {formatDate(selectedLead.statusTimeline.nonQualifiedAt)}</span>}
              {selectedLead.statusTimeline?.notInterestedAt && <span className="rounded-full bg-orange-500/10 px-3 py-1 text-xs text-orange-100">Pas interesse: {formatDate(selectedLead.statusTimeline.notInterestedAt)}</span>}
              {selectedLead.statusTimeline?.interestedAt && <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs text-emerald-100">Interesse: {formatDate(selectedLead.statusTimeline.interestedAt)}</span>}
            </div>

            {(selectedLead.country || selectedLead.phone || selectedLead.email || selectedLead.details?.studyField || selectedLead.details?.studyLevel || selectedLead.details?.financialSituation || selectedLead.details?.alternanceAwareness || selectedLead.details?.dateOfBirth || selectedLead.details?.message) && (
              <div className={theme === 'dark' ? 'mt-6 rounded-3xl border border-white/10 bg-slate-950/40 p-5' : 'mt-6 rounded-3xl border border-slate-200 bg-slate-50 p-5'}>
                <h3 className={theme === 'dark' ? 'text-sm font-semibold uppercase tracking-[0.2em] text-slate-400' : 'text-sm font-semibold uppercase tracking-[0.2em] text-slate-500'}>Application details</h3>
                <div className={theme === 'dark' ? 'mt-4 grid gap-3 text-sm text-slate-200' : 'mt-4 grid gap-3 text-sm text-slate-700'}>
                  {selectedLead.country && <p><span className={theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}>Country:</span> {selectedLead.country}</p>}
                  {selectedLead.phone && <p><span className={theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}>Phone number:</span> {selectedLead.phone}</p>}
                  {selectedLead.email && <p><span className={theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}>Email address:</span> {selectedLead.email}</p>}
                  {selectedLead.details?.dateOfBirth && <p><span className="text-slate-400">Date of birth:</span> {selectedLead.details.dateOfBirth}</p>}
                  {selectedLead.details?.age !== null && selectedLead.details?.age !== undefined && <p><span className="text-slate-400">Age:</span> {selectedLead.details.age} ans</p>}
                  {selectedLead.details?.studyField && <p><span className="text-slate-400">Study field:</span> {selectedLead.details.studyField}</p>}
                  {selectedLead.details?.studyLevel && <p><span className="text-slate-400">Study level:</span> {selectedLead.details.studyLevel}</p>}
                  {selectedLead.details?.alternanceAwareness && <p><span className="text-slate-400">Alternance awareness:</span> {selectedLead.details.alternanceAwareness}</p>}
                  {selectedLead.details?.financialSituation && <p><span className="text-slate-400">Financial situation:</span> {selectedLead.details.financialSituation}</p>}
                  {selectedLead.details?.message && (
                    <div>
                      <p className={theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}>Message:</p>
                      <p className={theme === 'dark' ? 'mt-1 whitespace-pre-wrap rounded-2xl border border-white/10 bg-slate-950/50 p-4 text-slate-200' : 'mt-1 whitespace-pre-wrap rounded-2xl border border-slate-200 bg-white p-4 text-slate-700'}>{selectedLead.details.message}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="mt-6">
              <h3 className={theme === 'dark' ? 'text-sm font-semibold uppercase tracking-[0.2em] text-slate-400' : 'text-sm font-semibold uppercase tracking-[0.2em] text-slate-500'}>Lead score</h3>
              <div className={theme === 'dark' ? 'mt-4 rounded-2xl border border-white/10 bg-slate-950/40 p-4' : 'mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4'}>
                <p className={theme === 'dark' ? 'text-2xl font-semibold text-white' : 'text-2xl font-semibold text-slate-900'}>{selectedLead.score?.value || 0}/100</p>
                <p className={theme === 'dark' ? 'mt-1 text-sm text-slate-300' : 'mt-1 text-sm text-slate-600'}>{selectedLead.score?.label || 'Cold'}</p>
                <p className={theme === 'dark' ? 'mt-3 text-xs text-slate-400' : 'mt-3 text-xs text-slate-500'}>
                  {(selectedLead.score?.reasons || []).join(' · ') || 'No strong qualification signals yet.'}
                </p>
              </div>
            </div>

            <div className="mt-6">
              <h3 className={theme === 'dark' ? 'text-sm font-semibold uppercase tracking-[0.2em] text-slate-400' : 'text-sm font-semibold uppercase tracking-[0.2em] text-slate-500'}>Remarques</h3>
              <div className="mt-4 space-y-3">
                {(selectedLead.notes || []).length === 0 && <p className={theme === 'dark' ? 'text-sm text-slate-400' : 'text-sm text-slate-500'}>No notes yet.</p>}
                {(selectedLead.notes || []).map((item) => (
                  <div key={item.id} className={theme === 'dark' ? 'rounded-2xl border border-white/10 bg-slate-950/50 p-4' : 'rounded-2xl border border-slate-200 bg-slate-50 p-4'}>
                    <p className={theme === 'dark' ? 'text-sm text-white' : 'text-sm text-slate-900'}>{item.body}</p>
                    <p className={theme === 'dark' ? 'mt-2 text-xs text-slate-400' : 'mt-2 text-xs text-slate-500'}>{item.author?.name || 'Unknown'} · {formatDate(item.createdAt)}</p>
                  </div>
                ))}
              </div>
              {canEdit && (
                <>
                  <textarea
                    value={note}
                    onChange={(event) => setNote(event.target.value)}
                    placeholder="Ajouter une remarque sur ce lead"
                    className={theme === 'dark' ? 'mt-4 min-h-28 w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white' : 'mt-4 min-h-28 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900'}
                  />
                  <button type="button" onClick={() => handleAddNote().catch(() => {})} className="btn-primary mt-3" disabled={isAddingNote}>
                    <MessageSquareMore size={16} /> Ajouter une remarque
                  </button>
                </>
              )}
            </div>

            <div className="mt-6">
              <h3 className={theme === 'dark' ? 'text-sm font-semibold uppercase tracking-[0.2em] text-slate-400' : 'text-sm font-semibold uppercase tracking-[0.2em] text-slate-500'}>Follow-up tasks</h3>
              <div className="mt-4 space-y-3">
                {(selectedLead.tasks || []).length === 0 && <p className={theme === 'dark' ? 'text-sm text-slate-400' : 'text-sm text-slate-500'}>No follow-up tasks yet.</p>}
                {(selectedLead.tasks || []).map((task) => (
                  <div key={task.id} className={theme === 'dark' ? 'rounded-2xl border border-white/10 bg-slate-950/50 p-4' : 'rounded-2xl border border-slate-200 bg-slate-50 p-4'}>
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className={theme === 'dark' ? 'text-sm font-medium text-white' : 'text-sm font-medium text-slate-900'}>{task.title}</p>
                        <p className={theme === 'dark' ? 'mt-1 text-xs text-slate-400' : 'mt-1 text-xs text-slate-500'}>
                          Due {formatDate(task.dueAt)} · {task.createdBy?.name || 'Unknown'}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${
                          task.status === 'completed'
                            ? 'bg-emerald-500/10 text-emerald-300 ring-1 ring-emerald-400/20'
                            : task.status === 'overdue'
                              ? 'bg-red-500/10 text-red-300 ring-1 ring-red-400/20'
                              : 'bg-cyan-500/10 text-cyan-300 ring-1 ring-cyan-400/20'
                        }`}>
                          {task.status}
                        </span>
                        {canEdit && (
                          <button type="button" onClick={() => handleToggleTask(task, task.status !== 'completed').catch(() => {})} className="table-action">
                            {task.status === 'completed' ? 'Reopen' : 'Complete'}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {canEdit && (
                <div className="mt-4 grid gap-3">
                  <input
                    value={taskForm.title}
                    onChange={(event) => setTaskForm((current) => ({ ...current, title: event.target.value }))}
                    placeholder="Task title"
                    className={theme === 'dark' ? 'w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white' : 'w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900'}
                  />
                  <input
                    type="datetime-local"
                    value={taskForm.dueAt}
                    onChange={(event) => setTaskForm((current) => ({ ...current, dueAt: event.target.value }))}
                    className={theme === 'dark' ? 'w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white' : 'w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900'}
                  />
                  <button type="button" onClick={() => handleAddTask().catch(() => {})} className="btn-secondary">
                    Add follow-up task
                  </button>
                </div>
              )}
            </div>

            <div className="mt-6">
              <h3 className={theme === 'dark' ? 'text-sm font-semibold uppercase tracking-[0.2em] text-slate-400' : 'text-sm font-semibold uppercase tracking-[0.2em] text-slate-500'}>Activity timeline</h3>
              <div className="mt-4 space-y-3">
                {(selectedLead.activityLog || []).length === 0 && <p className={theme === 'dark' ? 'text-sm text-slate-400' : 'text-sm text-slate-500'}>No activity yet.</p>}
                {(selectedLead.activityLog || []).map((item) => (
                  <div key={item.id} className={theme === 'dark' ? 'rounded-2xl border border-white/10 bg-slate-950/50 p-4' : 'rounded-2xl border border-slate-200 bg-slate-50 p-4'}>
                    <div className="flex items-center justify-between gap-3">
                      <p className={theme === 'dark' ? 'text-sm font-medium text-white' : 'text-sm font-medium text-slate-900'}>{item.label}</p>
                      <p className={theme === 'dark' ? 'text-xs text-slate-400' : 'text-xs text-slate-500'}>{formatDate(item.createdAt)}</p>
                    </div>
                    <p className={theme === 'dark' ? 'mt-2 text-xs text-slate-400' : 'mt-2 text-xs text-slate-500'}>
                      {item.actor?.name || 'System'} · {item.type}
                    </p>
                    {item.meta?.changedFields?.length > 0 && (
                      <p className={theme === 'dark' ? 'mt-1 text-xs text-slate-500' : 'mt-1 text-xs text-slate-500'}>
                        Changed: {item.meta.changedFields.join(', ')}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className={theme === 'dark' ? 'rounded-3xl border border-white/10 bg-white/6 p-6' : 'rounded-3xl border border-slate-200 bg-white p-6 shadow-sm'}>
          <div className="flex items-center justify-between">
            <h2 className={theme === 'dark' ? 'text-xl font-semibold text-white' : 'text-xl font-semibold text-slate-900'}>{editingLead ? 'Edition verrouillee' : 'Ajout manuel'}</h2>
            {editingLead && <button type="button" onClick={() => { setEditingLead(null); setForm(initialForm); setEditingUnlocked(false); }} className={theme === 'dark' ? 'text-sm text-slate-400' : 'text-sm text-slate-500'}>Reset</button>}
          </div>

          <form onSubmit={handleSubmit} className="mt-5 space-y-4">
            {['name', 'email', 'phone', 'country', 'campaign'].map((field) => (
              <input
                key={field}
                value={form[field] || ''}
                onChange={(event) => setForm((current) => ({ ...current, [field]: event.target.value }))}
                placeholder={field[0].toUpperCase() + field.slice(1)}
                disabled={Boolean(editingLead) && !editingUnlocked}
                className={theme === 'dark' ? 'w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white disabled:cursor-not-allowed disabled:opacity-50' : 'w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 disabled:cursor-not-allowed disabled:opacity-50'}
              />
            ))}

            <select
              value={form.status}
              onChange={(event) => setForm((current) => ({ ...current, status: event.target.value }))}
              disabled={Boolean(editingLead) && !editingUnlocked}
              className={theme === 'dark' ? 'w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white disabled:cursor-not-allowed disabled:opacity-50' : 'w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 disabled:cursor-not-allowed disabled:opacity-50'}
            >
              {LEAD_STATUS_OPTIONS.map((item) => (
                <option key={item} value={item}>{getLeadStatusLabel(item)}</option>
              ))}
            </select>

            {canManageAssignments && (
              <select
                value={form.assignedTo || ''}
                onChange={(event) => setForm((current) => ({ ...current, assignedTo: event.target.value }))}
                disabled={Boolean(editingLead) && !editingUnlocked}
                className={theme === 'dark' ? 'w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white disabled:cursor-not-allowed disabled:opacity-50' : 'w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 disabled:cursor-not-allowed disabled:opacity-50'}
              >
                <option value="">Assign to agent</option>
                {metaUsers.map((agent) => (
                  <option key={agent.id} value={agent.id}>{agent.name}</option>
                ))}
              </select>
            )}

            {editingLead ? (
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 rounded-2xl border border-amber-400/20 bg-amber-500/10 px-4 py-3 text-sm text-amber-100">
                  <Lock size={16} /> Edition verrouillee pour eviter les modifications par erreur.
                </div>
                <button type="button" onClick={() => setEditingUnlocked((value) => !value)} className="btn-secondary w-full">
                  {editingUnlocked ? 'Reverrouiller' : 'Debloquer temporairement l edition'}
                </button>
                {editingUnlocked && (
                  <button type="submit" className="btn-primary w-full" disabled={isSubmittingLead}>
                    Sauvegarder les changements
                  </button>
                )}
              </div>
            ) : canEdit ? (
              <button type="submit" className="btn-primary w-full" disabled={isSubmittingLead}>
                Ajouter un lead manuellement
              </button>
            ) : (
              <div className={theme === 'dark' ? 'rounded-2xl border border-white/10 bg-slate-950/50 p-4 text-sm text-slate-400' : 'rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-500'}>
                Viewer access is read-only. Create/edit actions are disabled for this role.
              </div>
            )}
          </form>
        </div>

        {!selectedLead && (
          <div className={theme === 'dark' ? 'rounded-3xl border border-dashed border-white/10 bg-white/4 p-6 text-center' : 'rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center'}>
            <p className={theme === 'dark' ? 'text-sm uppercase tracking-[0.24em] text-slate-500' : 'text-sm uppercase tracking-[0.24em] text-slate-500'}>Apercu lead</p>
            <p className={theme === 'dark' ? 'mt-3 text-lg font-semibold text-white' : 'mt-3 text-lg font-semibold text-slate-900'}>Cliquez sur une ligne du tableau</p>
            <p className={theme === 'dark' ? 'mt-2 text-sm text-slate-400' : 'mt-2 text-sm text-slate-500'}>La fiche commerciale du lead, les statuts dates et les remarques apparaitront ici.</p>
          </div>
        )}

        <div className={theme === 'dark' ? 'rounded-3xl border border-white/10 bg-white/6 p-6' : 'rounded-3xl border border-slate-200 bg-white p-6 shadow-sm'}>
          <div className="flex items-center gap-2">
            <Link2 size={18} className="text-amber-300" />
            <h2 className={theme === 'dark' ? 'text-xl font-semibold text-white' : 'text-xl font-semibold text-slate-900'}>Public intake links</h2>
          </div>
          <div className="mt-5 flex gap-3">
            <input
              value={inviteCampaign}
              onChange={(event) => setInviteCampaign(event.target.value)}
              placeholder="Campaign name"
              className={theme === 'dark' ? 'flex-1 rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white' : 'flex-1 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900'}
            />
            {canCreateInvite && (
              <button type="button" onClick={() => handleGenerateInvite().catch(() => {})} className="btn-primary">
                Generate
              </button>
            )}
          </div>
          <div className="mt-5 space-y-3">
            {invites.map((invite) => (
              <div key={invite.id || invite.token} className={theme === 'dark' ? 'rounded-2xl border border-white/10 bg-slate-950/50 p-4' : 'rounded-2xl border border-slate-200 bg-slate-50 p-4'}>
                <p className={theme === 'dark' ? 'font-medium text-white' : 'font-medium text-slate-900'}>{invite.campaign || 'General form'}</p>
                <p className="mt-2 break-all text-sm text-cyan-200">{invite.url}</p>
              </div>
            ))}
          </div>
          {(isStatusUpdating || isMovingLead || isLoadingLeads || isSubmittingLead || isAddingNote || isBulkProcessing) && <p className={theme === 'dark' ? 'mt-4 text-sm text-slate-400' : 'mt-4 text-sm text-slate-500'}>Mise a jour en cours...</p>}
        </div>
      </section>

      {showImport && <ExcelImportModal onClose={() => setShowImport(false)} onImport={handleImport} />}
    </div>
  );
}
