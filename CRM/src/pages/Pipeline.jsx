import { useCallback, useEffect, useMemo, useState } from 'react';
import { apiRequest } from '../lib/api';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { getLeadStatusLabel, LEAD_STATUS_OPTIONS } from '../lib/leads';

const stages = LEAD_STATUS_OPTIONS;

export default function Pipeline() {
  const { token } = useAuth();
  const { theme } = useTheme();
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [updatingLeadId, setUpdatingLeadId] = useState('');

  const refreshLeads = useCallback(async () => {
    setLoading(true);
    try {
      const data = await apiRequest('/api/leads?limit=50&page=1&bucket=leads', { token });
      setLeads(data.leads);
      setError('');
    } catch (loadError) {
      setError(loadError.message || 'Unable to load the pipeline.');
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    refreshLeads().catch(() => {});
  }, [refreshLeads]);

  const grouped = useMemo(
    () => stages.map((stage) => ({ stage, leads: leads.filter((lead) => lead.status === stage) })),
    [leads],
  );

  async function moveLead(leadId, status) {
    const currentLead = leads.find((lead) => lead.id === leadId);
    if (!currentLead || currentLead.status === status) {
      return;
    }

    setUpdatingLeadId(leadId);
    setError('');

    try {
      const data = await apiRequest(`/api/leads/${leadId}`, {
        method: 'PATCH',
        token,
        body: { status },
      });

      setLeads((current) => current.map((lead) => (lead.id === leadId ? data.lead : lead)));
    } catch (updateError) {
      setError(updateError.message || 'Unable to update the lead status.');
    } finally {
      setUpdatingLeadId('');
    }
  }

  return (
    <div className="space-y-6">
      <div className={theme === 'dark' ? 'rounded-3xl border border-white/10 bg-white/6 p-6' : 'rounded-3xl border border-slate-200 bg-white p-6 shadow-sm'}>
        <h1 className={theme === 'dark' ? 'text-3xl font-semibold text-white' : 'text-3xl font-semibold text-slate-900'}>Pipeline board</h1>
        <p className={theme === 'dark' ? 'mt-2 text-slate-300' : 'mt-2 text-slate-600'}>Move leads between stages and keep the team aligned on progress.</p>
        {error && <p className="mt-4 rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">{error}</p>}
      </div>

      {loading && (
        <div className={theme === 'dark' ? 'rounded-3xl border border-white/10 bg-white/6 p-6 text-slate-300' : 'rounded-3xl border border-slate-200 bg-white p-6 text-slate-600 shadow-sm'}>
          Loading pipeline...
        </div>
      )}

      <div className="grid gap-5 xl:grid-cols-4">
        {grouped.map((column) => (
          <div key={column.stage} className={theme === 'dark' ? 'rounded-3xl border border-white/10 bg-white/6 p-5' : 'rounded-3xl border border-slate-200 bg-white p-5 shadow-sm'}>
            <div className="mb-5 flex items-center justify-between">
              <h2 className={theme === 'dark' ? 'text-lg font-semibold text-white' : 'text-lg font-semibold text-slate-900'}>{getLeadStatusLabel(column.stage)}</h2>
              <span className={theme === 'dark' ? 'rounded-full bg-white/10 px-3 py-1 text-sm text-slate-300' : 'rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-600'}>{column.leads.length}</span>
            </div>

            <div className="space-y-4">
              {column.leads.map((lead) => (
                <div key={lead.id} className={theme === 'dark' ? 'rounded-2xl border border-white/10 bg-slate-950/60 p-4' : 'rounded-2xl border border-slate-200 bg-slate-50 p-4'}>
                  <p className={theme === 'dark' ? 'font-medium text-white' : 'font-medium text-slate-900'}>{lead.name}</p>
                  <p className={theme === 'dark' ? 'mt-1 text-sm text-slate-400' : 'mt-1 text-sm text-slate-500'}>{lead.campaign || 'General'} · {lead.country || 'Unknown'}</p>
                  <p className={theme === 'dark' ? 'mt-2 text-xs uppercase tracking-[0.2em] text-slate-500' : 'mt-2 text-xs uppercase tracking-[0.2em] text-slate-400'}>
                    Current status: {getLeadStatusLabel(lead.status)}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {stages.filter((stage) => stage !== lead.status).map((stage) => (
                      <button
                        key={stage}
                        type="button"
                        onClick={() => moveLead(lead.id, stage)}
                        className="table-action"
                        disabled={updatingLeadId === lead.id}
                      >
                        {getLeadStatusLabel(stage)}
                      </button>
                    ))}
                  </div>
                  {updatingLeadId === lead.id && (
                    <p className={theme === 'dark' ? 'mt-3 text-xs text-slate-400' : 'mt-3 text-xs text-slate-500'}>
                      Updating status...
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
