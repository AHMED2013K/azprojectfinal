import { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { apiRequest } from '../lib/api';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import StatCard from '../components/StatCard';
import { formatDate } from '../lib/format';
import { getLeadStatusLabel } from '../lib/leads';

const CHART_COLORS = ['#0891b2', '#0284c7', '#059669', '#d97706', '#db2777', '#7c3aed', '#e11d48', '#64748b'];

function PieBreakdownCard({ title, data, totalLeads, theme }) {
  if (!data?.length) {
    return (
      <div className={theme === 'dark' ? 'rounded-3xl border border-white/10 bg-white/6 p-6' : 'rounded-3xl border border-slate-200 bg-white p-6 shadow-sm'}>
        <h3 className={theme === 'dark' ? 'text-xl font-semibold text-white' : 'text-xl font-semibold text-slate-900'}>{title}</h3>
        <p className={theme === 'dark' ? 'mt-4 text-sm text-slate-400' : 'mt-4 text-sm text-slate-500'}>Pas encore assez de donnees.</p>
      </div>
    );
  }

  return (
    <div className={theme === 'dark' ? 'rounded-3xl border border-white/10 bg-white/6 p-6' : 'rounded-3xl border border-slate-200 bg-white p-6 shadow-sm'}>
      <h3 className={theme === 'dark' ? 'text-xl font-semibold text-white' : 'text-xl font-semibold text-slate-900'}>{title}</h3>
      <div className="mt-5 h-72">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} dataKey="value" nameKey="label" innerRadius={52} outerRadius={88} paddingAngle={3}>
              {data.map((entry, index) => (
                <Cell key={entry.label} fill={CHART_COLORS[index % CHART_COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value, _name, item) => {
                const percent = totalLeads ? `${((value / totalLeads) * 100).toFixed(1)}%` : '0%';
                return [`${value} leads (${percent})`, item.payload.label];
              }}
              contentStyle={{
                background: theme === 'dark' ? '#020617' : '#ffffff',
                color: theme === 'dark' ? '#e2e8f0' : '#0f172a',
                border: theme === 'dark' ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(148,163,184,0.35)',
                borderRadius: '16px',
              }}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 space-y-2">
        {data.map((item, index) => (
          <div key={item.label} className={theme === 'dark' ? 'flex items-center justify-between text-sm text-slate-300' : 'flex items-center justify-between text-sm text-slate-600'}>
            <div className="flex items-center gap-3">
              <span className="h-3 w-3 rounded-full" style={{ backgroundColor: CHART_COLORS[index % CHART_COLORS.length] }} />
              <span>{item.label}</span>
            </div>
            <span>{item.value} · {totalLeads ? ((item.value / totalLeads) * 100).toFixed(1) : '0.0'}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Dashboard() {
  const { token } = useAuth();
  const { theme } = useTheme();
  const [data, setData] = useState(null);

  useEffect(() => {
    apiRequest('/api/dashboard', { token }).then(setData).catch(() => {});
  }, [token]);

  if (!data) {
    return <div className="text-app">Loading dashboard...</div>;
  }

  return (
    <div className="space-y-6">
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Total Leads" value={data.stats.totalLeads} subtitle="Tous les leads dans le CRM" />
        <StatCard title="Rubrique Leads" value={data.stats.openLeads} subtitle={`${data.stats.totalLeads ? ((data.stats.openLeads / data.stats.totalLeads) * 100).toFixed(1) : '0.0'}% du total`} />
        <StatCard title="Rubrique Traites" value={data.stats.treatedLeads} subtitle={`${data.stats.totalLeads ? ((data.stats.treatedLeads / data.stats.totalLeads) * 100).toFixed(1) : '0.0'}% du total`} />
        <StatCard title="Agents Active" value={data.stats.agentsActivity} subtitle={`${data.stats.unreadNotifications} unread notifications`} />
        <StatCard title="Taches En Retard" value={data.stats.overdueTasks} subtitle="Relances a traiter en priorite" />
        <StatCard title="Leads Stales" value={data.stats.staleLeads} subtitle="Aucune activite depuis 3 jours" />
        <StatCard title="Non Assignes" value={data.stats.unassignedLeads} subtitle="A distribuer a l equipe" />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
        <div className={theme === 'dark' ? 'rounded-3xl border border-white/10 bg-white/6 p-6' : 'rounded-3xl border border-slate-200 bg-white p-6 shadow-sm'}>
          <h3 className={theme === 'dark' ? 'text-xl font-semibold text-white' : 'text-xl font-semibold text-slate-900'}>Recent lead activity</h3>
          <div className="mt-5 space-y-4">
            {data.recentLeads.map((lead) => (
              <div key={lead.id} className={theme === 'dark' ? 'rounded-2xl border border-white/10 bg-slate-950/50 p-4' : 'rounded-2xl border border-slate-200 bg-slate-50 p-4'}>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className={theme === 'dark' ? 'font-medium text-white' : 'font-medium text-slate-900'}>{lead.name}</p>
                    <p className={theme === 'dark' ? 'text-sm text-slate-400' : 'text-sm text-slate-500'}>{lead.email} · {lead.country || 'No country'}</p>
                  </div>
                  <div className="text-right">
                    <p className="inline-flex rounded-full bg-cyan-500/10 px-3 py-1 text-sm text-cyan-200">{getLeadStatusLabel(lead.status)}</p>
                    <p className={theme === 'dark' ? 'mt-2 text-xs text-slate-400' : 'mt-2 text-xs text-slate-500'}>{formatDate(lead.createdAt)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className={theme === 'dark' ? 'rounded-3xl border border-white/10 bg-white/6 p-6' : 'rounded-3xl border border-slate-200 bg-white p-6 shadow-sm'}>
            <h3 className={theme === 'dark' ? 'text-xl font-semibold text-white' : 'text-xl font-semibold text-slate-900'}>Funnel overview</h3>
            <div className="mt-5 space-y-4">
              {data.statusBreakdown.map((item) => (
                <div key={item.label}>
                  <div className={theme === 'dark' ? 'mb-2 flex items-center justify-between text-sm text-slate-300' : 'mb-2 flex items-center justify-between text-sm text-slate-600'}>
                    <span>{getLeadStatusLabel(item.label)}</span>
                    <span>{item.value} · {data.stats.totalLeads ? ((item.value / data.stats.totalLeads) * 100).toFixed(1) : '0.0'}%</span>
                  </div>
                  <div className={theme === 'dark' ? 'h-3 rounded-full bg-slate-800' : 'h-3 rounded-full bg-slate-200'}>
                    <div
                      className="h-3 rounded-full bg-gradient-to-r from-sky-600 to-cyan-500"
                      style={{ width: `${data.stats.totalLeads ? (item.value / data.stats.totalLeads) * 100 : 0}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={theme === 'dark' ? 'rounded-3xl border border-white/10 bg-white/6 p-6' : 'rounded-3xl border border-slate-200 bg-white p-6 shadow-sm'}>
            <h3 className={theme === 'dark' ? 'text-xl font-semibold text-white' : 'text-xl font-semibold text-slate-900'}>Announcements</h3>
            <div className="mt-5 space-y-4">
              {data.announcements.length === 0 && <p className={theme === 'dark' ? 'text-sm text-slate-400' : 'text-sm text-slate-500'}>No announcements yet.</p>}
              {data.announcements.map((announcement) => (
                <div key={announcement.id} className={theme === 'dark' ? 'rounded-2xl border border-white/10 bg-slate-950/50 p-4' : 'rounded-2xl border border-slate-200 bg-slate-50 p-4'}>
                  <p className={theme === 'dark' ? 'font-medium text-white' : 'font-medium text-slate-900'}>{announcement.title}</p>
                  <p className={theme === 'dark' ? 'mt-2 text-sm text-slate-300' : 'mt-2 text-sm text-slate-600'}>{announcement.body}</p>
                </div>
              ))}
            </div>
          </div>

          <div className={theme === 'dark' ? 'rounded-3xl border border-white/10 bg-white/6 p-6' : 'rounded-3xl border border-slate-200 bg-white p-6 shadow-sm'}>
            <h3 className={theme === 'dark' ? 'text-xl font-semibold text-white' : 'text-xl font-semibold text-slate-900'}>Activity and audit feed</h3>
            <div className="mt-5 space-y-3">
              {data.auditFeed.map((item) => (
                <div key={item.id} className={theme === 'dark' ? 'flex items-center justify-between rounded-2xl border border-white/10 bg-slate-950/50 p-4' : 'flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 p-4'}>
                  <div>
                    <p className={theme === 'dark' ? 'font-medium text-white' : 'font-medium text-slate-900'}>{item.actor?.name || 'System'}</p>
                    <p className={theme === 'dark' ? 'text-sm text-slate-400' : 'text-sm text-slate-500'}>{item.action}</p>
                  </div>
                  <p className={theme === 'dark' ? 'text-sm text-cyan-200' : 'text-sm text-sky-700'}>{formatDate(item.createdAt)}</p>
                </div>
              ))}
            </div>
          </div>

          <div className={theme === 'dark' ? 'rounded-3xl border border-white/10 bg-white/6 p-6' : 'rounded-3xl border border-slate-200 bg-white p-6 shadow-sm'}>
            <h3 className={theme === 'dark' ? 'text-xl font-semibold text-white' : 'text-xl font-semibold text-slate-900'}>Analyse mensuelle</h3>
            <div className="mt-5 space-y-4">
              {data.monthlyBreakdown.map((month) => (
                <div key={month.label} className={theme === 'dark' ? 'rounded-2xl border border-white/10 bg-slate-950/50 p-4' : 'rounded-2xl border border-slate-200 bg-slate-50 p-4'}>
                  <div className="flex items-center justify-between gap-4">
                    <p className={theme === 'dark' ? 'font-medium text-white' : 'font-medium text-slate-900'}>{month.label}</p>
                    <p className={theme === 'dark' ? 'text-sm text-cyan-200' : 'text-sm text-sky-700'}>{month.total} leads</p>
                  </div>
                  <p className={theme === 'dark' ? 'mt-3 text-sm text-slate-300' : 'mt-3 text-sm text-slate-600'}>
                    Nouveaux {month.newCount} · Contactes {month.contacted} · Non qualifies {month.nonQualified} · Pas interesses {month.notInterested} · Interesses {month.interested}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <div className={theme === 'dark' ? 'rounded-3xl border border-white/10 bg-white/6 p-6' : 'rounded-3xl border border-slate-200 bg-white p-6 shadow-sm'}>
          <h3 className={theme === 'dark' ? 'text-xl font-semibold text-white' : 'text-xl font-semibold text-slate-900'}>Overdue follow-ups</h3>
          <div className="mt-5 space-y-4">
            {data.overdueLeads.length === 0 && <p className={theme === 'dark' ? 'text-sm text-slate-400' : 'text-sm text-slate-500'}>Aucune relance en retard.</p>}
            {data.overdueLeads.map((lead) => {
              const overdueTask = (lead.tasks || []).find((task) => task.status === 'overdue');
              return (
                <div key={lead.id} className={theme === 'dark' ? 'rounded-2xl border border-white/10 bg-slate-950/50 p-4' : 'rounded-2xl border border-slate-200 bg-slate-50 p-4'}>
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className={theme === 'dark' ? 'font-medium text-white' : 'font-medium text-slate-900'}>{lead.name}</p>
                      <p className={theme === 'dark' ? 'mt-1 text-sm text-slate-400' : 'mt-1 text-sm text-slate-500'}>{overdueTask?.title || 'Follow-up overdue'} · {lead.assignedTo?.name || 'Unassigned'}</p>
                    </div>
                    <span className="rounded-full bg-red-500/10 px-3 py-1 text-xs text-red-300">Due {formatDate(overdueTask?.dueAt)}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className={theme === 'dark' ? 'rounded-3xl border border-white/10 bg-white/6 p-6' : 'rounded-3xl border border-slate-200 bg-white p-6 shadow-sm'}>
          <h3 className={theme === 'dark' ? 'text-xl font-semibold text-white' : 'text-xl font-semibold text-slate-900'}>Stale leads</h3>
          <div className="mt-5 space-y-4">
            {data.staleLeads.length === 0 && <p className={theme === 'dark' ? 'text-sm text-slate-400' : 'text-sm text-slate-500'}>Aucun lead stale pour le moment.</p>}
            {data.staleLeads.map((lead) => (
              <div key={lead.id} className={theme === 'dark' ? 'rounded-2xl border border-white/10 bg-slate-950/50 p-4' : 'rounded-2xl border border-slate-200 bg-slate-50 p-4'}>
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className={theme === 'dark' ? 'font-medium text-white' : 'font-medium text-slate-900'}>{lead.name}</p>
                    <p className={theme === 'dark' ? 'mt-1 text-sm text-slate-400' : 'mt-1 text-sm text-slate-500'}>{lead.email} · {lead.assignedTo?.name || 'Unassigned'}</p>
                  </div>
                  <span className="rounded-full bg-amber-500/10 px-3 py-1 text-xs text-amber-300">Active {formatDate(lead.lastActivityAt)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <PieBreakdownCard title="Domaines d'etudes / specialites" data={data.formBreakdowns.studyField} totalLeads={data.stats.totalLeads} theme={theme} />
        <PieBreakdownCard title="Niveaux d'etudes" data={data.formBreakdowns.studyLevel} totalLeads={data.stats.totalLeads} theme={theme} />
        <PieBreakdownCard title="Situation financiere" data={data.formBreakdowns.financialSituation} totalLeads={data.stats.totalLeads} theme={theme} />
        <PieBreakdownCard title="Connaissance de l'alternance" data={data.formBreakdowns.alternanceAwareness} totalLeads={data.stats.totalLeads} theme={theme} />
      </section>
    </div>
  );
}
