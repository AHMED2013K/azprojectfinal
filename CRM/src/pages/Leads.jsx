import { useCallback, useEffect, useMemo, useState } from 'react';
import { Download, Link2, Lock, MessageSquareMore, Search, Upload } from 'lucide-react';
import { apiRequest } from '../lib/api';
import { API_URL } from '../lib/api';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { formatDate, getLeadRowTone, getLeadStatusTone } from '../lib/format';
import ExcelImportModal from '../components/ExcelImportModal';
import { useSocket } from '../context/SocketContext';

const initialForm = {
  name: '',
  email: '',
  phone: '',
  country: '',
  campaign: '',
  status: 'New',
};

export default function Leads() {
  const { token, user } = useAuth();
  const { theme } = useTheme();
  const { socket } = useSocket();
  const [leads, setLeads] = useState([]);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1 });
  const [form, setForm] = useState(initialForm);
  const [editingLead, setEditingLead] = useState(null);
  const [selectedLead, setSelectedLead] = useState(null);
  const [note, setNote] = useState('');
  const [showImport, setShowImport] = useState(false);
  const [invites, setInvites] = useState([]);
  const [inviteCampaign, setInviteCampaign] = useState('');
  const [metaUsers, setMetaUsers] = useState([]);
  const [editingUnlocked, setEditingUnlocked] = useState(false);

  const refreshLeads = useCallback(async (page = pagination.page, currentSearch = search, currentStatus = status) => {
    const params = new URLSearchParams({
      page: String(page),
      limit: '8',
      ...(currentSearch ? { search: currentSearch } : {}),
      ...(currentStatus ? { status: currentStatus } : {}),
    });

    const data = await apiRequest(`/api/leads?${params.toString()}`, { token });
    setLeads(data.leads);
    setPagination(data.pagination);
  }, [pagination.page, search, status, token]);

  useEffect(() => {
    apiRequest('/api/leads/meta/users', { token }).then((data) => setMetaUsers(data.users)).catch(() => {});
    apiRequest('/api/invites', { token }).then((data) => setInvites(data.invites)).catch(() => {});
  }, [token]);

  useEffect(() => {
    refreshLeads(pagination.page, search, status).catch(() => {});
  }, [refreshLeads, token, search, status, pagination.page]);

  useEffect(() => {
    if (!socket) {
      return undefined;
    }

    const handleNotification = (notification) => {
      if (notification.type === 'lead') {
        refreshLeads(1, search, status).catch(() => {});
      }
    };

    socket.on('notification:new', handleNotification);
    return () => socket.off('notification:new', handleNotification);
  }, [refreshLeads, socket, search, status]);

  const leadMap = useMemo(() => new Map(leads.map((lead) => [lead.id, lead])), [leads]);

  useEffect(() => {
    if (selectedLead && leadMap.has(selectedLead.id)) {
      setSelectedLead(leadMap.get(selectedLead.id));
    }
  }, [leadMap, selectedLead]);

  async function loadLead(id) {
    const data = await apiRequest(`/api/leads/${id}`, { token });
    setSelectedLead(data.lead);
    setEditingUnlocked(false);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (editingLead) {
      await apiRequest(`/api/leads/${editingLead.id}`, {
        method: 'PATCH',
        token,
        body: form,
      });
    } else {
      await apiRequest('/api/leads', {
        method: 'POST',
        token,
        body: form,
      });
    }

    setForm(initialForm);
    setEditingLead(null);
    setPagination((current) => ({ ...current, page: 1 }));
    await refreshLeads(1, search, status);
  }

  async function handleDelete(id) {
    await apiRequest(`/api/leads/${id}`, { method: 'DELETE', token });
    setLeads((current) => current.filter((lead) => lead.id !== id));
    if (selectedLead?.id === id) {
      setSelectedLead(null);
    }
  }

  async function handleImport(file) {
    const formData = new FormData();
    formData.append('file', file);
    await apiRequest('/api/leads/import/file', { method: 'POST', token, body: formData });
    setShowImport(false);
    setPagination((current) => ({ ...current, page: 1 }));
    await refreshLeads(1, search, status);
  }

  async function handleAddNote() {
    if (!selectedLead || !note.trim()) {
      return;
    }

    const data = await apiRequest(`/api/leads/${selectedLead.id}/notes`, {
      method: 'POST',
      token,
      body: { body: note },
    });

    setSelectedLead(data.lead);
    setNote('');
  }

  async function handleGenerateInvite() {
    const data = await apiRequest('/api/invites', {
      method: 'POST',
      token,
      body: { campaign: inviteCampaign },
    });
    setInvites((current) => [data.invite, ...current]);
    setInviteCampaign('');
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
    const response = await fetch(`${API_URL}/api/leads/export`, {
      credentials: 'include',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'edugrowth-leads.csv';
    link.click();
    window.URL.revokeObjectURL(url);
  }

  async function quickUpdateStatus(lead, nextStatus) {
    await apiRequest(`/api/leads/${lead.id}`, {
      method: 'PATCH',
      token,
      body: { status: nextStatus },
    });
    await refreshLeads(pagination.page, search, status);
    if (selectedLead?.id === lead.id) {
      await loadLead(lead.id);
    }
  }

  const stats = useMemo(() => ({
    total: leads.length,
    newCount: leads.filter((lead) => lead.status === 'New').length,
    contacted: leads.filter((lead) => lead.status === 'Contacted').length,
    notInterested: leads.filter((lead) => lead.status === 'Not Interested').length,
    converted: leads.filter((lead) => lead.status === 'Converted').length,
  }), [leads]);

  return (
    <div className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
      <section className="space-y-6">
        <div className={theme === 'dark' ? 'flex flex-col gap-4 rounded-3xl border border-white/10 bg-white/6 p-6 xl:flex-row xl:items-center xl:justify-between' : 'flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm xl:flex-row xl:items-center xl:justify-between'}>
          <div>
            <h1 className={theme === 'dark' ? 'text-3xl font-semibold text-white' : 'text-3xl font-semibold text-slate-900'}>Leads</h1>
            <p className={theme === 'dark' ? 'mt-2 text-slate-300' : 'mt-2 text-slate-600'}>Vue commerciale compacte pour trier, contacter et suivre chaque candidature comme dans un tableau de suivi.</p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button type="button" onClick={() => setShowImport(true)} className="btn-secondary">
              <Upload size={16} /> Import
            </button>
            <button type="button" onClick={handleExport} className="btn-secondary">
              <Download size={16} /> Export
            </button>
          </div>
        </div>

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
            <option value="">All statuses</option>
            <option value="New">New</option>
            <option value="Contacted">Contacted</option>
            <option value="Not Interested">Not Interested</option>
            <option value="Converted">Converted</option>
          </select>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          {[
            { label: 'Nouveaux', value: stats.newCount, tone: 'from-fuchsia-500/20 to-fuchsia-500/5 text-fuchsia-100' },
            { label: 'Contactes', value: stats.contacted, tone: 'from-amber-500/20 to-amber-500/5 text-amber-100' },
            { label: 'Pas interesses', value: stats.notInterested, tone: 'from-rose-500/20 to-rose-500/5 text-rose-100' },
            { label: 'Convertis', value: stats.converted, tone: 'from-emerald-500/20 to-emerald-500/5 text-emerald-100' },
          ].map((item) => (
            <div key={item.label} className={`rounded-3xl border border-white/10 bg-gradient-to-br ${item.tone} p-5`}>
              <p className="text-sm uppercase tracking-[0.2em] text-slate-300">{item.label}</p>
              <p className="mt-3 text-3xl font-semibold">{item.value}</p>
            </div>
          ))}
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          {[
            { label: 'Leads visibles', value: stats.total, helper: 'sur cette page' },
            { label: 'Recherche active', value: search ? 'Oui' : 'Non', helper: search || 'aucun filtre texte' },
            { label: 'Filtre statut', value: status || 'Tous', helper: 'pipeline courant' },
            { label: 'Selection', value: selectedLead?.name || 'Aucune', helper: selectedLead?.status || 'cliquez une ligne' },
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
                  {['Lead', 'Age', 'Campaign', 'Country', 'Status', 'Date added', 'Actions'].map((column) => (
                    <th key={column} className="px-5 py-4">{column}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {leads.map((lead) => (
                  <tr
                    key={lead.id}
                    onClick={() => {
                      loadLead(lead.id);
                    }}
                    className={`cursor-pointer border-t ${theme === 'dark' ? 'border-white/5 text-slate-200 hover:bg-white/[0.04]' : 'border-slate-200 text-slate-700 hover:bg-slate-50'} text-sm ${getLeadRowTone(lead.status)} ${selectedLead?.id === lead.id ? 'ring-1 ring-cyan-300/30' : ''} transition`}
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-start gap-3">
                        <span className={`mt-1 h-2.5 w-2.5 rounded-full ${lead.status === 'Converted' ? 'bg-emerald-300' : lead.status === 'Contacted' ? 'bg-amber-300' : lead.status === 'Not Interested' ? 'bg-rose-300' : 'bg-fuchsia-300'}`} />
                        <div>
                          <p className={theme === 'dark' ? 'font-medium text-white' : 'font-medium text-slate-900'}>{lead.name}</p>
                          <p className={theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}>{lead.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4">{lead.details?.age ?? '-'}</td>
                    <td className="px-5 py-4">{lead.campaign || '-'}</td>
                    <td className="px-5 py-4">{lead.country || '-'}</td>
                    <td className="px-5 py-4">
                      <span className={`rounded-full px-3 py-1 ${getLeadStatusTone(lead.status)}`}>{lead.status}</span>
                    </td>
                    <td className={theme === 'dark' ? 'px-5 py-4 text-slate-400' : 'px-5 py-4 text-slate-500'}>{formatDate(lead.createdAt)}</td>
                    <td className="px-5 py-4">
                      <div className="flex flex-wrap gap-2">
                        <button type="button" onClick={(event) => { event.stopPropagation(); loadLead(lead.id); }} className="table-action">Open</button>
                        {lead.status !== 'Contacted' && <button type="button" onClick={(event) => { event.stopPropagation(); quickUpdateStatus(lead, 'Contacted'); }} className="table-action">Contacte</button>}
                        {lead.status !== 'Not Interested' && <button type="button" onClick={(event) => { event.stopPropagation(); quickUpdateStatus(lead, 'Not Interested'); }} className="table-action">Pas interesse</button>}
                        {lead.status !== 'Converted' && <button type="button" onClick={(event) => { event.stopPropagation(); quickUpdateStatus(lead, 'Converted'); }} className="table-action">Converti</button>}
                        <button type="button" onClick={(event) => { event.stopPropagation(); startEdit(lead); }} className="table-action">Edit</button>
                        <button type="button" onClick={(event) => { event.stopPropagation(); handleDelete(lead.id); }} className="table-action danger">Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className={theme === 'dark' ? 'flex items-center justify-between rounded-3xl border border-white/10 bg-white/6 px-5 py-4 text-sm text-slate-300' : 'flex items-center justify-between rounded-3xl border border-slate-200 bg-white px-5 py-4 text-sm text-slate-600 shadow-sm'}>
          <span>Page {pagination.page} of {pagination.totalPages}</span>
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
            <h2 className={theme === 'dark' ? 'text-xl font-semibold text-white' : 'text-xl font-semibold text-slate-900'}>{selectedLead.name}</h2>
            <p className={theme === 'dark' ? 'mt-2 text-sm text-slate-400' : 'mt-2 text-sm text-slate-500'}>Campaign: {selectedLead.campaign || 'General'}</p>
            {selectedLead.source && <p className={theme === 'dark' ? 'mt-1 text-sm text-slate-500' : 'mt-1 text-sm text-slate-500'}>Source: {selectedLead.source}</p>}
            <div className="mt-4 flex flex-wrap gap-2">
              <span className={`rounded-full px-3 py-1 text-sm ${getLeadStatusTone(selectedLead.status)}`}>{selectedLead.status}</span>
              {selectedLead.statusTimeline?.contactedAt && <span className="rounded-full bg-amber-500/10 px-3 py-1 text-xs text-amber-100">Contacte: {formatDate(selectedLead.statusTimeline.contactedAt)}</span>}
              {selectedLead.statusTimeline?.notInterestedAt && <span className="rounded-full bg-rose-500/10 px-3 py-1 text-xs text-rose-100">Pas interesse: {formatDate(selectedLead.statusTimeline.notInterestedAt)}</span>}
              {selectedLead.statusTimeline?.convertedAt && <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs text-emerald-100">Converti: {formatDate(selectedLead.statusTimeline.convertedAt)}</span>}
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
              <textarea
                value={note}
                onChange={(event) => setNote(event.target.value)}
                placeholder="Ajouter une remarque sur ce lead"
                className={theme === 'dark' ? 'mt-4 min-h-28 w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white' : 'mt-4 min-h-28 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900'}
              />
              <button type="button" onClick={handleAddNote} className="btn-primary mt-3">
                <MessageSquareMore size={16} /> Ajouter une remarque
              </button>
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
              {['New', 'Contacted', 'Not Interested', 'Converted'].map((item) => (
                <option key={item} value={item}>{item}</option>
              ))}
            </select>

            {user?.role === 'admin' && (
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
                  <button type="submit" className="btn-primary w-full">
                    Sauvegarder les changements
                  </button>
                )}
              </div>
            ) : (
              <button type="submit" className="btn-primary w-full">
                Ajouter un lead manuellement
              </button>
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
            <button type="button" onClick={handleGenerateInvite} className="btn-primary">
              Generate
            </button>
          </div>
          <div className="mt-5 space-y-3">
            {invites.map((invite) => (
              <div key={invite.id || invite.token} className={theme === 'dark' ? 'rounded-2xl border border-white/10 bg-slate-950/50 p-4' : 'rounded-2xl border border-slate-200 bg-slate-50 p-4'}>
                <p className={theme === 'dark' ? 'font-medium text-white' : 'font-medium text-slate-900'}>{invite.campaign || 'General form'}</p>
                <p className="mt-2 break-all text-sm text-cyan-200">{invite.url}</p>
              </div>
            ))}
          </div>
        </div>

      </section>

      {showImport && <ExcelImportModal onClose={() => setShowImport(false)} onImport={handleImport} />}
    </div>
  );
}
