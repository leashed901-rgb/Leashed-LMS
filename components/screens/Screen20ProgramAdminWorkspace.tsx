'use client';

import React, { useState } from 'react';
import { ScreenId } from './screenTypes';
import { 
  Shield, 
  Layers, 
  Building2, 
  GraduationCap, 
  Store, 
  Users, 
  DollarSign, 
  Download, 
  Plus, 
  Search, 
  CheckCircle2, 
  ArrowRight,
  Settings,
  Database
} from 'lucide-react';

interface Screen20Props {
  onNavigate: (screen: ScreenId) => void;
}

export const Screen20ProgramAdminWorkspace: React.FC<Screen20Props> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'tenants' | 'curriculum' | 'compliance'>('tenants');
  const [searchTerm, setSearchTerm] = useState('');

  const tenants = [
    {
      id: 't-1',
      name: 'Taylor R. Learner Workspace',
      domain: 'learn.leashed.io/taylor',
      type: 'Learner',
      status: 'Active',
      screen: 'screen-4' as ScreenId,
      created: 'Jan 15, 2025'
    },
    {
      id: 't-2',
      name: 'Bella\'s Pet Salon',
      domain: 'salon.leashed.io/bellas',
      type: 'Salon Graduate',
      status: 'Active',
      screen: 'screen-14' as ScreenId,
      created: 'Mar 1, 2025'
    },
    {
      id: 't-3',
      name: 'Urban Workforce Alliance',
      domain: 'partner.leashed.io/uwa',
      type: 'Partner Agency',
      status: 'Active',
      screen: 'screen-19' as ScreenId,
      created: 'Dec 10, 2024'
    },
    {
      id: 't-4',
      name: 'Cohort 4 Practical Training Hub',
      domain: 'instructor.leashed.io/c4',
      type: 'Training Cohort',
      status: 'Active',
      screen: 'screen-7' as ScreenId,
      created: 'Feb 1, 2025'
    },
    {
      id: 't-5',
      name: 'Jordan M. Learner Workspace',
      domain: 'learn.leashed.io/jordan',
      type: 'Learner',
      status: 'Active',
      screen: 'screen-6' as ScreenId,
      created: 'Jan 15, 2025'
    }
  ];

  const filteredTenants = tenants.filter(t => 
    t.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    t.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.domain.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="h-screen font-sans text-slate-800 antialiased flex bg-slate-50 overflow-hidden">
      {/* Admin Sidebar */}
      <aside className="w-64 bg-[#0f172a] text-slate-300 flex flex-col justify-between shrink-0 min-h-screen select-none border-r border-slate-800">
        <div>
          <div className="p-6 border-b border-slate-800/80 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-slate-700 flex items-center justify-center text-white text-base font-bold shadow-md">
                <Shield className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-white text-lg font-bold tracking-tight">Leashed.io</span>
                <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Admin Console</span>
              </div>
            </div>

            <button
              onClick={() => onNavigate('screen-3')}
              title="Switch Workspace"
              className="p-1 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
            >
              <Layers className="w-4 h-4" />
            </button>
          </div>

          <div className="px-5 py-3 border-b border-slate-800/60 bg-slate-900/40">
            <span className="text-xs font-bold text-slate-200">Global Administration</span>
            <p className="text-[11px] text-slate-400 mt-0.5">Role: Superadmin</p>
          </div>

          <nav className="p-3 space-y-1 text-sm font-medium">
            <button 
              onClick={() => setActiveTab('tenants')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition ${
                activeTab === 'tenants' ? 'bg-slate-800 text-white font-semibold' : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Multi-Tenant Hub</span>
            </button>
            <button 
              onClick={() => setActiveTab('curriculum')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition ${
                activeTab === 'curriculum' ? 'bg-slate-800 text-white font-semibold' : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              <span>Curriculum Control</span>
            </button>
            <button 
              onClick={() => setActiveTab('compliance')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition ${
                activeTab === 'compliance' ? 'bg-slate-800 text-white font-semibold' : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Database className="w-4 h-4" />
              <span>Grants &amp; Compliance</span>
            </button>
          </nav>
        </div>

        <div className="p-4 border-t border-slate-800 bg-slate-900/40">
          <button
            onClick={() => onNavigate('screen-3')}
            className="w-full flex items-center justify-between px-3 py-2 rounded-lg bg-slate-800/60 hover:bg-slate-800 text-xs font-medium text-slate-300 transition-colors cursor-pointer"
          >
            <span>Switch Workspace</span>
            <span className="text-[10px] text-sky-400 bg-sky-950 px-1.5 py-0.5 rounded">All 18</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 bg-[#f8fafc] overflow-y-auto">
        {/* Top Bar */}
        <header className="bg-white border-b border-slate-200 px-8 py-5 flex items-center justify-between sticky top-0 z-10">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Program Administrator Console</h1>
            <p className="text-sm text-slate-500 mt-0.5">Global multi-tenant governance, curriculum oversight, and grant compliance.</p>
          </div>

          <div className="flex items-center gap-3">
            <button className="inline-flex items-center gap-1.5 px-3.5 py-2 border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold rounded-lg transition cursor-pointer">
              <Download className="w-4 h-4" />
              <span>System Audit Log</span>
            </button>
            <button 
              onClick={() => onNavigate('screen-3')}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg shadow-sm transition cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Provision Tenant</span>
            </button>
          </div>
        </header>

        {/* Console Workspace */}
        <div className="p-8 max-w-6xl w-full mx-auto space-y-6">
          {/* Executive Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Tenant Workspaces</span>
              <h3 className="text-2xl font-extrabold text-slate-900 mt-1">18 Configured</h3>
              <span className="text-xs text-emerald-600 font-semibold">100% operational</span>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">EDA Grant Disbursed</span>
              <h3 className="text-2xl font-extrabold text-slate-900 mt-1">$142,500</h3>
              <span className="text-xs text-slate-500 font-medium">Out of $250,000 cap</span>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Graduation Rate</span>
              <h3 className="text-2xl font-extrabold text-indigo-600 mt-1">92.4%</h3>
              <span className="text-xs text-indigo-700 font-medium">Over 4 cohorts</span>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Active Instructors</span>
              <h3 className="text-2xl font-extrabold text-slate-900 mt-1">12 Certified</h3>
              <span className="text-xs text-blue-600 font-medium">All sessions covered</span>
            </div>
          </div>

          {/* Tab Content: Tenants */}
          {activeTab === 'tenants' && (
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="relative w-full sm:w-80">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search tenant name, domain, type..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-9 pr-4 py-1.5 text-xs border border-slate-200 rounded-lg outline-none focus:border-slate-800"
                  />
                </div>

                <span className="text-xs text-slate-400">PostgreSQL Isolated Multi-Tenant Architecture</span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-600">
                  <thead className="bg-slate-50 border-b border-slate-100 uppercase tracking-wider font-semibold text-[11px] text-slate-400">
                    <tr>
                      <th className="px-6 py-3.5">Tenant Organization / User</th>
                      <th className="px-6 py-3.5">Subdomain</th>
                      <th className="px-6 py-3.5">Environment Type</th>
                      <th className="px-6 py-3.5">Provisioned</th>
                      <th className="px-6 py-3.5">Status</th>
                      <th className="px-6 py-3.5 text-right">Direct Navigation</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredTenants.map((t) => (
                      <tr key={t.id} className="hover:bg-slate-50/70 transition">
                        <td className="px-6 py-4 font-bold text-slate-900">
                          {t.name}
                        </td>
                        <td className="px-6 py-4 font-mono text-[11px] text-blue-600 whitespace-nowrap">
                          {t.domain}
                        </td>
                        <td className="px-6 py-4 font-medium text-slate-800 whitespace-nowrap">
                          {t.type}
                        </td>
                        <td className="px-6 py-4 text-slate-500 whitespace-nowrap">
                          {t.created}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                            <CheckCircle2 className="w-3 h-3" /> Active
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right whitespace-nowrap">
                          <button 
                            onClick={() => onNavigate(t.screen)}
                            className="inline-flex items-center gap-1 text-slate-900 hover:text-blue-600 font-semibold text-xs hover:underline cursor-pointer"
                          >
                            <span>Open Workspace</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Tab Content: Curriculum */}
          {activeTab === 'curriculum' && (
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-4">
              <h3 className="text-base font-bold text-slate-900">Curriculum Standards &amp; Accreditation</h3>
              <p className="text-xs text-slate-500">Manage lesson plans, video resources, and practical demonstration grading rubrics.</p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
                  <h4 className="font-bold text-sm text-slate-900">1. Life Skills Foundation</h4>
                  <p className="text-xs text-slate-500 mt-1">6 modules • Financial literacy, communication &amp; time management.</p>
                  <button 
                    onClick={() => onNavigate('screen-6')}
                    className="mt-3 text-xs font-semibold text-blue-600 hover:underline cursor-pointer"
                  >
                    Review Life Skills Curriculum →
                  </button>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
                  <h4 className="font-bold text-sm text-slate-900">2. Pet Grooming Practical</h4>
                  <p className="text-xs text-slate-500 mt-1">8 modules • Clinical safety, bathing, blowouts &amp; sanitary trims.</p>
                  <button 
                    onClick={() => onNavigate('screen-7')}
                    className="mt-3 text-xs font-semibold text-blue-600 hover:underline cursor-pointer"
                  >
                    Review Pet Grooming Curriculum →
                  </button>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
                  <h4 className="font-bold text-sm text-slate-900">3. Business &amp; Leadership</h4>
                  <p className="text-xs text-slate-500 mt-1">6 modules • Business plan builder, client intake &amp; marketing.</p>
                  <button 
                    onClick={() => onNavigate('screen-8')}
                    className="mt-3 text-xs font-semibold text-blue-600 hover:underline cursor-pointer"
                  >
                    Review Business Curriculum →
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Tab Content: Compliance */}
          {activeTab === 'compliance' && (
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-4">
              <h3 className="text-base font-bold text-slate-900">EDA Workforce Grant &amp; Federal Reporting</h3>
              <p className="text-xs text-slate-500">Audited records submitted via EDGE portal for the AI Upskill Accelerator Pilot Program.</p>
              
              <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200 text-xs text-blue-950 space-y-2">
                <p className="font-bold">Federal Reporting Milestone Notice:</p>
                <p>Application Deadline: July 10, 2026, 4:59pm ET via submission portal (EDGE). All 24 candidate records and post-graduation wage verification data are automatically formatted for EDA quarterly submission.</p>
              </div>

              <div className="pt-2 flex gap-3">
                <button 
                  onClick={() => onNavigate('screen-11')}
                  className="px-4 py-2 bg-slate-900 text-white text-xs font-semibold rounded-lg shadow-sm hover:bg-slate-800 transition cursor-pointer"
                >
                  View Grant Referrals
                </button>
                <button 
                  onClick={() => onNavigate('screen-19')}
                  className="px-4 py-2 border border-slate-300 text-slate-700 text-xs font-semibold rounded-lg hover:bg-slate-50 transition cursor-pointer"
                >
                  View Cohort Performance
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};
