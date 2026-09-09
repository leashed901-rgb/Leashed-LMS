'use client';

import React, { useState } from 'react';
import { ScreenId } from './screenTypes';
import { 
  Building2, 
  Users, 
  Award, 
  TrendingUp, 
  Download, 
  Plus, 
  Search, 
  CheckCircle2, 
  Clock, 
  Layers,
  ArrowRight,
  ShieldAlert
} from 'lucide-react';

interface Screen19Props {
  onNavigate: (screen: ScreenId) => void;
}

export const Screen19PartnerAgencyPortal: React.FC<Screen19Props> = ({ onNavigate }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const candidates = [
    {
      id: 'c-1',
      name: 'Taylor R.',
      email: 'taylor.r@learn.leashed.io',
      progress: '67%',
      modules: '4 of 6 completed',
      status: 'On Track',
      statusColor: 'emerald',
      mentor: 'Marcus Vance'
    },
    {
      id: 'c-2',
      name: 'Jordan M.',
      email: 'jordan.m@learn.leashed.io',
      progress: '62%',
      modules: '3 of 6 completed',
      status: 'On Track',
      statusColor: 'emerald',
      mentor: 'Marcus Vance'
    },
    {
      id: 'c-3',
      name: 'Casey L.',
      email: 'casey.l@learn.leashed.io',
      progress: '71%',
      modules: '5 of 6 completed',
      status: 'Advanced',
      statusColor: 'blue',
      mentor: 'Dr. David Chen'
    },
    {
      id: 'c-4',
      name: 'Morgan D.',
      email: 'morgan.d@learn.leashed.io',
      progress: '58%',
      modules: '3 of 6 completed',
      status: 'Needs Check-in',
      statusColor: 'amber',
      mentor: 'Elena Ramos'
    },
    {
      id: 'c-5',
      name: 'Sam P.',
      email: 'sam.p@learn.leashed.io',
      progress: '65%',
      modules: '4 of 6 completed',
      status: 'On Track',
      statusColor: 'emerald',
      mentor: 'Marcus Vance'
    }
  ];

  const filtered = candidates.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.mentor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="h-screen font-sans text-slate-800 antialiased flex bg-slate-50 overflow-hidden">
      {/* Partner Agency Sidebar */}
      <aside className="w-64 bg-[#091e3a] text-slate-300 flex flex-col justify-between shrink-0 min-h-screen select-none border-r border-slate-800">
        <div>
          <div className="p-6 border-b border-slate-800/80 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white text-base font-bold shadow-md">
                <Building2 className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-white text-lg font-bold tracking-tight">Leashed.io</span>
                <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Partner Portal</span>
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
            <span className="text-xs font-bold text-slate-200">Urban Workforce Alliance</span>
            <p className="text-[11px] text-slate-400 mt-0.5">Partner Agency #402 &bull; Active</p>
          </div>

          <nav className="p-3 space-y-1 text-sm font-medium">
            <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg bg-indigo-600 text-white font-semibold shadow-sm text-left">
              <Users className="w-4 h-4" />
              <span>Cohort Roster</span>
            </button>
            <button 
              onClick={() => onNavigate('screen-11')}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors text-left cursor-pointer"
            >
              <Award className="w-4 h-4" />
              <span>Candidate Referrals</span>
            </button>
            <button 
              onClick={() => onNavigate('screen-20')}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors text-left cursor-pointer"
            >
              <TrendingUp className="w-4 h-4" />
              <span>Outcomes &amp; Grants</span>
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
        {/* Header */}
        <header className="bg-white border-b border-slate-200 px-8 py-5 flex items-center justify-between sticky top-0 z-10">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Partner Agency &amp; Cohort Portal</h1>
            <p className="text-sm text-slate-500 mt-0.5">Cohort 4 &bull; Urban Workforce Alliance &bull; Active Cohort Oversight</p>
          </div>

          <div className="flex items-center gap-3">
            <button className="inline-flex items-center gap-1.5 px-3.5 py-2 border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold rounded-lg transition cursor-pointer">
              <Download className="w-4 h-4" />
              <span>Export EDA Compliance</span>
            </button>
            <button 
              onClick={() => onNavigate('screen-11')}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg shadow-sm transition cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Refer Candidate</span>
            </button>
          </div>
        </header>

        {/* Dashboard Workspace */}
        <div className="p-8 max-w-6xl w-full mx-auto space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Enrolled Candidates</span>
              <h3 className="text-2xl font-extrabold text-slate-900 mt-1">24 Active</h3>
              <span className="text-xs text-emerald-600 font-semibold">100% attendance rate</span>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Cohort Retention</span>
              <h3 className="text-2xl font-extrabold text-slate-900 mt-1">96%</h3>
              <span className="text-xs text-slate-500 font-medium">1 leave-of-absence</span>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Badges Awarded</span>
              <h3 className="text-2xl font-extrabold text-indigo-600 mt-1">72 Total</h3>
              <span className="text-xs text-indigo-700 font-medium">Life skills &amp; pet care</span>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Next Major Milestone</span>
              <h3 className="text-2xl font-extrabold text-slate-900 mt-1">Friday</h3>
              <span className="text-xs text-blue-600 font-medium">Practical bath evaluations</span>
            </div>
          </div>

          {/* Roster Table Card */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Filter by candidate or mentor..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-4 py-1.5 text-xs border border-slate-200 rounded-lg outline-none focus:border-indigo-600"
                />
              </div>

              <span className="text-xs text-slate-400">Synchronized with State Workforce Registry</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-600">
                <thead className="bg-slate-50 border-b border-slate-100 uppercase tracking-wider font-semibold text-[11px] text-slate-400">
                  <tr>
                    <th className="px-6 py-3.5">Candidate Name</th>
                    <th className="px-6 py-3.5">Curriculum Progress</th>
                    <th className="px-6 py-3.5">Completed Modules</th>
                    <th className="px-6 py-3.5">Assigned Mentor</th>
                    <th className="px-6 py-3.5">Status</th>
                    <th className="px-6 py-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filtered.map((c) => (
                    <tr key={c.id} className="hover:bg-slate-50/70 transition">
                      <td className="px-6 py-4">
                        <div className="font-bold text-slate-900">{c.name}</div>
                        <div className="text-[11px] text-slate-400">{c.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <div className="w-24 bg-slate-100 rounded-full h-2">
                            <div className="bg-indigo-600 h-2 rounded-full" style={{ width: c.progress }}></div>
                          </div>
                          <span className="font-bold text-slate-800">{c.progress}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-medium text-slate-700 whitespace-nowrap">
                        {c.modules}
                      </td>
                      <td className="px-6 py-4 font-semibold text-slate-800 whitespace-nowrap">
                        {c.mentor}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {c.statusColor === 'emerald' && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                            <CheckCircle2 className="w-3 h-3" /> On Track
                          </span>
                        )}
                        {c.statusColor === 'blue' && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                            Advanced
                          </span>
                        )}
                        {c.statusColor === 'amber' && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                            <Clock className="w-3 h-3" /> Check-in Req.
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right whitespace-nowrap">
                        <button 
                          onClick={() => onNavigate('screen-4')}
                          className="text-indigo-600 hover:text-indigo-800 font-semibold text-xs hover:underline cursor-pointer"
                        >
                          View Learner Record →
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
