'use client';

import React, { useState } from 'react';
import { 
  TenantSlug, 
  ENTERPRISE_TENANTS, 
  EnterpriseUser, 
  MultiTenantService, 
  AuditLogRecord 
} from '@/lib/db/multiTenantService';
import { 
  ShieldCheck, 
  Server, 
  Database, 
  FileText, 
  AlertTriangle, 
  CheckCircle2, 
  Terminal, 
  Lock, 
  RefreshCw, 
  ExternalLink,
  Layers,
  Search,
  SlidersHorizontal,
  Code
} from 'lucide-react';

interface GlobalAdminDashboardProps {
  currentUser: EnterpriseUser;
  onSwitchTenant: (tenant: TenantSlug) => void;
}

export const GlobalAdminDashboard: React.FC<GlobalAdminDashboardProps> = ({
  currentUser,
  onSwitchTenant,
}) => {
  const [activeTab, setActiveTab] = useState<'cluster' | 'sql' | 'audit' | 'worklog'>('cluster');
  const [auditLogs, setAuditLogs] = useState<AuditLogRecord[]>(() => MultiTenantService.getAuditLogs());
  const [filterSeverity, setFilterSeverity] = useState<'ALL' | 'INFO' | 'WARN' | 'CRITICAL'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const refreshLogs = () => {
    setAuditLogs(MultiTenantService.getAuditLogs());
  };

  const filteredLogs = auditLogs.filter((log) => {
    if (filterSeverity !== 'ALL' && log.severity !== filterSeverity) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        log.details.toLowerCase().includes(q) ||
        log.tenantSlug.toLowerCase().includes(q) ||
        (log.userEmail && log.userEmail.toLowerCase().includes(q)) ||
        log.eventType.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-950 text-rose-400 border border-rose-800 flex items-center gap-1.5">
              <Lock className="w-3 h-3" />
              <span>global.leashed.io (Root Admin)</span>
            </span>
            <span className="text-xs text-slate-400">PostgreSQL Multi-Tenant Cluster</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Enterprise Governance & Tenant Management
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Super Administrator console for multi-tenant isolation, Row-Level Security, and compliance auditing.
          </p>
        </div>

        {/* Global Admin Profile Badge */}
        <div className="flex items-center gap-3 bg-slate-900 border border-slate-800 rounded-xl p-3">
          <div className="w-10 h-10 rounded-full bg-rose-600 flex items-center justify-center font-bold text-white shadow-md">
            GA
          </div>
          <div>
            <div className="text-xs font-bold text-white">{currentUser.fullName}</div>
            <div className="text-[11px] text-rose-400 font-mono">{currentUser.email}</div>
            <div className="text-[10px] text-slate-500">MFA Enforced • Root Clearance</div>
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pt-6 pb-2">
        <button
          onClick={() => setActiveTab('cluster')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
            activeTab === 'cluster'
              ? 'bg-slate-800 text-white border border-slate-700'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <Layers className="w-3.5 h-3.5 text-blue-400" />
          <span>Tenant Cluster Topography</span>
        </button>

        <button
          onClick={() => setActiveTab('sql')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
            activeTab === 'sql'
              ? 'bg-slate-800 text-white border border-slate-700'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <Database className="w-3.5 h-3.5 text-indigo-400" />
          <span>PostgreSQL & RLS Inspector</span>
        </button>

        <button
          onClick={() => setActiveTab('audit')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
            activeTab === 'audit'
              ? 'bg-slate-800 text-white border border-slate-700'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <Terminal className="w-3.5 h-3.5 text-emerald-400" />
          <span>Security Audit Stream</span>
          {auditLogs.some((l) => l.severity === 'CRITICAL') && (
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
          )}
        </button>

        <button
          onClick={() => setActiveTab('worklog')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
            activeTab === 'worklog'
              ? 'bg-slate-800 text-white border border-slate-700'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <FileText className="w-3.5 h-3.5 text-amber-400" />
          <span>Architectural Worklog</span>
        </button>
      </div>

      {/* Tab Contents */}
      <div className="mt-6">
        {/* 1. CLUSTER TOPOGRAPHY */}
        {activeTab === 'cluster' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {(Object.keys(ENTERPRISE_TENANTS) as TenantSlug[]).map((slug) => {
                const t = ENTERPRISE_TENANTS[slug];
                const isCurrent = slug === 'global';
                return (
                  <div
                    key={slug}
                    className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col justify-between hover:border-slate-700 transition-all shadow-md"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-mono text-xs font-bold text-blue-400 bg-blue-950/80 px-2.5 py-1 rounded-md border border-blue-800/80">
                          https://{t.domain}
                        </span>
                        <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-800/80 px-2 py-0.5 rounded-full flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Tenant Online</span>
                        </span>
                      </div>

                      <h2 className="text-base font-bold text-white mb-1">{t.name}</h2>
                      <p className="text-xs text-slate-400 leading-relaxed mb-4">
                        {t.tagline}
                      </p>

                      <div className="space-y-2 text-xs border-t border-slate-800/80 pt-3">
                        <div className="flex items-center justify-between text-slate-400">
                          <span>Primary Role Authority:</span>
                          <span className="font-semibold text-slate-200 font-mono">{t.role}</span>
                        </div>
                        <div className="flex items-center justify-between text-slate-400">
                          <span>Compliance Standard:</span>
                          <span className="font-medium text-slate-300">{t.complianceTier}</span>
                        </div>
                        <div className="flex items-center justify-between text-slate-400">
                          <span>Tenant UUID:</span>
                          <span className="font-mono text-[10px] text-slate-500">{t.id}</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-5 pt-3 border-t border-slate-800 flex items-center justify-between">
                      <span className="text-[11px] text-slate-500">
                        {slug === 'learn' ? 'Public Front Door' : 'Protected Enterprise Domain'}
                      </span>
                      <button
                        onClick={() => onSwitchTenant(slug)}
                        className="px-3 py-1.5 rounded-lg text-xs font-medium text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <span>Inspect {t.domain}</span>
                        <ExternalLink className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Zero-Trust Architecture Guarantee */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-950 border border-slate-800 text-xs text-slate-300">
              <div className="flex items-center gap-2 mb-2 font-bold text-white text-sm">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Zero-Trust Role Switching Ban Enforced</span>
              </div>
              <p className="leading-relaxed text-slate-400">
                To prevent privilege escalation attacks and unauthorized access, all role-switching UI elements have been permanently eradicated from authentication entry points. Roles are strictly bound to authenticated domain authority and verified at the database query layer via PostgreSQL Row-Level Security.
              </p>
            </div>
          </div>
        )}

        {/* 2. SQL & RLS INSPECTOR */}
        {activeTab === 'sql' && (
          <div className="space-y-6">
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-base font-bold text-white">PostgreSQL Multi-Tenant Table Architecture</h2>
                  <p className="text-xs text-slate-400">
                    Tables partition records via <code className="text-blue-400 font-mono">tenant_id UUID REFERENCES tenants(id)</code> with Row-Level Security policies.
                  </p>
                </div>
                <span className="px-2.5 py-1 rounded bg-indigo-950 text-indigo-300 border border-indigo-800 text-xs font-mono font-semibold">
                  RLS ACTIVE
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left text-slate-300">
                  <thead className="bg-slate-950/80 text-slate-400 uppercase font-mono text-[10px] border-b border-slate-800">
                    <tr>
                      <th className="px-4 py-3">Table Name</th>
                      <th className="px-4 py-3">Partition Key</th>
                      <th className="px-4 py-3">RLS Policy</th>
                      <th className="px-4 py-3">Isolation Rule</th>
                      <th className="px-4 py-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80 font-mono text-[11px]">
                    <tr>
                      <td className="px-4 py-3 font-bold text-white">tenants</td>
                      <td className="px-4 py-3 text-slate-400">id (PK)</td>
                      <td className="px-4 py-3 text-slate-500">Root Directory</td>
                      <td className="px-4 py-3 text-slate-400">Global Read / Root Admin Write</td>
                      <td className="px-4 py-3 text-emerald-400">Enforced</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-bold text-white">users</td>
                      <td className="px-4 py-3 text-blue-400">tenant_id</td>
                      <td className="px-4 py-3 text-indigo-300">tenant_isolation_users</td>
                      <td className="px-4 py-3 text-slate-400">tenant_id = app.current_tenant_id</td>
                      <td className="px-4 py-3 text-emerald-400">Enforced</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-bold text-white">courses</td>
                      <td className="px-4 py-3 text-blue-400">tenant_id</td>
                      <td className="px-4 py-3 text-indigo-300">tenant_isolation_courses</td>
                      <td className="px-4 py-3 text-slate-400">tenant_id = app.current_tenant_id</td>
                      <td className="px-4 py-3 text-emerald-400">Enforced</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-bold text-white">branching_scenarios</td>
                      <td className="px-4 py-3 text-blue-400">tenant_id</td>
                      <td className="px-4 py-3 text-indigo-300">tenant_isolation_scenarios</td>
                      <td className="px-4 py-3 text-slate-400">tenant_id = app.current_tenant_id</td>
                      <td className="px-4 py-3 text-emerald-400">Enforced</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-bold text-white">enrollments</td>
                      <td className="px-4 py-3 text-blue-400">tenant_id</td>
                      <td className="px-4 py-3 text-indigo-300">tenant_isolation_enrollments</td>
                      <td className="px-4 py-3 text-slate-400">tenant_id = app.current_tenant_id</td>
                      <td className="px-4 py-3 text-emerald-400">Enforced</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-bold text-white">audit_logs</td>
                      <td className="px-4 py-3 text-blue-400">tenant_id</td>
                      <td className="px-4 py-3 text-indigo-300">tenant_isolation_audit_logs</td>
                      <td className="px-4 py-3 text-slate-400">Append-Only • Immutable</td>
                      <td className="px-4 py-3 text-emerald-400">Enforced</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* DDL Preview Card */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-xs">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <Code className="w-3.5 h-3.5 text-blue-400" />
                  <span>DDL Sample: PostgreSQL Row-Level Security</span>
                </span>
                <span className="text-[10px] text-slate-500">/lib/db/schema.sql</span>
              </div>
              <pre className="text-slate-300 overflow-x-auto leading-relaxed text-[11px]">
{`-- Enforce Row-Level Security across all multi-tenant entity stores
ALTER TABLE enrollments ENABLE ROW LEVEL SECURITY;

CREATE POLICY tenant_isolation_enrollments ON enrollments
  FOR ALL
  USING (
    tenant_id = current_setting('app.current_tenant_id', true)::uuid
    OR current_setting('app.is_global_admin', true) = 'true'
  );`}
              </pre>
            </div>
          </div>
        )}

        {/* 3. SECURITY AUDIT STREAM */}
        {activeTab === 'audit' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-900 p-4 rounded-xl border border-slate-800">
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Search className="w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Filter logs by user, tenant, details..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500 w-full sm:w-64 font-mono"
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                <select
                  value={filterSeverity}
                  onChange={(e) => setFilterSeverity(e.target.value as any)}
                  className="bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-300 focus:outline-none"
                >
                  <option value="ALL">All Severities</option>
                  <option value="INFO">INFO Only</option>
                  <option value="WARN">WARN Only</option>
                  <option value="CRITICAL">CRITICAL Only</option>
                </select>

                <button
                  onClick={refreshLogs}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
                  title="Refresh Audit Logs"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Logs List */}
            <div className="space-y-2">
              {filteredLogs.map((log) => (
                <div
                  key={log.id}
                  className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800/90 text-xs flex flex-col md:flex-row md:items-center justify-between gap-3 hover:border-slate-700 transition-all font-mono"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                          log.severity === 'CRITICAL'
                            ? 'bg-rose-950 text-rose-400 border border-rose-800'
                            : log.severity === 'WARN'
                            ? 'bg-amber-950 text-amber-400 border border-amber-800'
                            : 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                        }`}
                      >
                        {log.severity}
                      </span>
                      <span className="font-bold text-white">{log.eventType}</span>
                      <span className="text-slate-500">•</span>
                      <span className="text-blue-400">[{log.tenantSlug}.leashed.io]</span>
                    </div>

                    <p className="text-slate-300 text-[11px] font-sans">{log.details}</p>

                    {log.userEmail && (
                      <div className="text-[10px] text-slate-500">
                        Identity: <span className="text-slate-400">{log.userEmail}</span> • IP: {log.ipAddress}
                      </div>
                    )}
                  </div>

                  <div className="text-[10px] text-slate-500 shrink-0 text-right">
                    {new Date(log.timestamp).toLocaleTimeString()} • {new Date(log.timestamp).toLocaleDateString()}
                  </div>
                </div>
              ))}

              {filteredLogs.length === 0 && (
                <div className="text-center py-12 text-slate-500 text-xs">
                  No audit log events match your filter criteria.
                </div>
              )}
            </div>
          </div>
        )}

        {/* 4. ARCHITECTURAL WORKLOG */}
        {activeTab === 'worklog' && (
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 text-xs text-slate-300 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <FileText className="w-4 h-4 text-amber-400" />
                <span>Enterprise Architecture Worklog (WORKLOG.md)</span>
              </h2>
              <span className="text-[10px] font-mono text-slate-500">Document Revision 2.4</span>
            </div>

            <div className="prose prose-invert max-w-none text-xs leading-relaxed space-y-3">
              <blockquote className="border-l-2 border-blue-500 pl-3 py-1 text-slate-300 italic bg-slate-950/60 rounded-r">
                &ldquo;No shortcuts, no quick wins ever. Enterprise is not just a name; enterprise is how it is architected and presented with the user in mind.&rdquo;
              </blockquote>

              <h3 className="text-sm font-bold text-white pt-2">Key Mandates Implemented</h3>
              <ul className="list-disc list-inside space-y-1 text-slate-300">
                <li>
                  <strong className="text-white">Full-Page Authentication:</strong> Removed all modal popups for signing in. Login is now hosted on dedicated, hardened full-page gateways.
                </li>
                <li>
                  <strong className="text-white">Zero Role-Switching:</strong> Removed client-side role toggles. Roles are server-authoritative and deterministic based on the domain boundary.
                </li>
                <li>
                  <strong className="text-white">Subdomain Multi-Tenancy:</strong> Partitioned user entry points into <code className="text-blue-400 font-mono">learn.leashed.io</code>, <code className="text-blue-400 font-mono">instructor.leashed.io</code>, <code className="text-blue-400 font-mono">partner.leashed.io</code>, and <code className="text-blue-400 font-mono">global.leashed.io</code>.
                </li>
                <li>
                  <strong className="text-white">SQL Multi-Tenant Schema:</strong> Created <code className="text-indigo-400 font-mono">/lib/db/schema.sql</code> with PostgreSQL Row-Level Security (RLS) policies and append-only audit logging.
                </li>
                <li>
                  <strong className="text-white">EDA Accelerator Alignment:</strong> Direct tracking for the $25M national pilot competition supporting rural and vulnerable adult upskilling.
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
