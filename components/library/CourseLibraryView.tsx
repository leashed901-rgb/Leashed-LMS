'use client';

import React, { useState } from 'react';
import { 
  Layers, 
  UploadCloud, 
  Download, 
  FileText, 
  FolderOpen, 
  Search, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight,
  DollarSign,
  Share2,
  FileArchive,
  BookMarked
} from 'lucide-react';

export const CourseLibraryView: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [importedStatus, setImportedStatus] = useState<string | null>(null);

  const TEMPLATES = [
    {
      id: 'tmpl-1',
      title: 'HIPAA Security & Patient Privacy Compliance',
      category: 'Healthcare & Clinical',
      modules: 4,
      duration: '45 mins',
      includesSimulation: true,
      description: 'Covers protected health information (PHI), secure handling protocols, and emergency room confidentiality breaches.'
    },
    {
      id: 'tmpl-2',
      title: 'Active Phishing & BEC Defense Simulator',
      category: 'Cybersecurity',
      modules: 3,
      duration: '30 mins',
      includesSimulation: true,
      description: 'Hands-on practice recognizing executive impersonation, lookalike domains, and out-of-band wire authentication.'
    },
    {
      id: 'tmpl-3',
      title: 'High-Stakes Client Escalation & Retention',
      category: 'Customer Success',
      modules: 5,
      duration: '50 mins',
      includesSimulation: true,
      description: 'De-escalate angry enterprise accounts during critical platform outages using active listening and contractual SLA governance.'
    },
    {
      id: 'tmpl-4',
      title: 'Delivering Constructive Feedback & PIP Coaching',
      category: 'Leadership & People',
      modules: 4,
      duration: '40 mins',
      includesSimulation: true,
      description: 'Guide difficult 1-on-1 dialogues with defensive employees, establishing clear accountability while maintaining psychological safety.'
    },
    {
      id: 'tmpl-5',
      title: 'Foreign Corrupt Practices Act (FCPA) & Global Anti-Bribery',
      category: 'Legal & Compliance',
      modules: 6,
      duration: '60 mins',
      includesSimulation: false,
      description: 'Comprehensive guidelines on international gifts, facilitation payments, third-party intermediary vetting, and DOJ enforcement.'
    },
    {
      id: 'tmpl-6',
      title: 'Workplace Safety & Hazard Response Runbook',
      category: 'Operations',
      modules: 3,
      duration: '25 mins',
      includesSimulation: true,
      description: 'OSHA standard operating procedures, chemical hazard containment, and emergency evacuation management.'
    }
  ];

  const filteredTemplates = TEMPLATES.filter(t => {
    const matchesCat = activeCategory === 'All' || t.category === activeCategory;
    const matchesSearch = t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          t.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleSimulateSCORMImport = () => {
    setImportedStatus('Validating manifest.xml... Uploading SCORM 2004 package...');
    setTimeout(() => {
      setImportedStatus('SCORM package parsed successfully! 4 interactive SCOs converted into adaptive lessons.');
    }, 1500);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded-md bg-indigo-50 px-2 py-0.5 text-xs font-bold text-indigo-700 border border-indigo-200">
                ENTERPRISE CONTENT HUB
              </span>
              <h2 className="text-base font-bold text-slate-900">
                100+ Ready-to-Use Editable Courses, SCORM Imports & Knowledge Base
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Import SCORM 1.2 / 2004 packages, access editable role-based training templates, or upload documents and PDFs.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleSimulateSCORMImport}
              className="flex items-center gap-1.5 rounded-xl bg-slate-900 px-4 py-2 text-xs font-bold text-white hover:bg-slate-800 transition-all shadow-xs"
            >
              <FileArchive className="h-3.5 w-3.5" />
              <span>Import SCORM Package</span>
            </button>
          </div>
        </div>

        {importedStatus && (
          <div className="mt-4 rounded-xl bg-emerald-50 border border-emerald-200 p-3 text-xs text-emerald-800 flex items-center justify-between animate-fadeIn">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              <span>{importedStatus}</span>
            </div>
            <button
              onClick={() => setImportedStatus(null)}
              className="text-emerald-700 hover:text-emerald-900 text-xs font-bold"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Search & Category Filter */}
        <div className="mt-5 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 w-full sm:w-80 rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs">
            <Search className="h-3.5 w-3.5 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search 100+ editable templates..."
              className="w-full bg-transparent focus:outline-none text-slate-800"
            />
          </div>

          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            {['All', 'Customer Success', 'Cybersecurity', 'Healthcare & Clinical', 'Leadership & People', 'Legal & Compliance'].map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition-all ${
                  activeCategory === cat
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid of Templates */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredTemplates.map(tmpl => (
          <div
            key={tmpl.id}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between text-[11px]">
                <span className="rounded bg-indigo-50 px-2 py-0.5 font-semibold text-indigo-700 border border-indigo-100">
                  {tmpl.category}
                </span>
                <span className="text-slate-400 font-mono">{tmpl.duration}</span>
              </div>

              <h4 className="text-sm font-bold text-slate-900 leading-snug">{tmpl.title}</h4>
              <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                {tmpl.description}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                {tmpl.includesSimulation && (
                  <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    <Sparkles className="h-3 w-3" /> Simulation Included
                  </span>
                )}
              </div>

              <button
                onClick={() => alert(`Imported "${tmpl.title}" into your course catalog!`)}
                className="flex items-center gap-1 font-bold text-indigo-600 hover:text-indigo-800"
              >
                <span>Use Template</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Resource Downloads & Knowledge Base Manuals Strip */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-indigo-700 font-bold text-sm">
            <Download className="h-4 w-4" />
            Downloadable Training Kits
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Download editable PDF learner workbooks, Word job aids, and Excel completion trackers.
          </p>
          <div className="flex flex-wrap gap-2 pt-1">
            <button
              onClick={() => alert('Downloaded Employee Incident Checklist PDF')}
              className="rounded-lg bg-slate-50 border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100"
            >
              📄 Checklist (PDF)
            </button>
            <button
              onClick={() => alert('Downloaded SLA Escalation Excel Matrix')}
              className="rounded-lg bg-slate-50 border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100"
            >
              📊 Tracker (Excel)
            </button>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-blue-700 font-bold text-sm">
            <FolderOpen className="h-4 w-4" />
            Shared Folders & Collaboration
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Organize materials into permission-controlled shared folders for Managers, Instructors, and Cohorts.
          </p>
          <span className="text-[11px] font-semibold text-slate-400">
            ✓ 14 active department folders synchronized
          </span>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-emerald-700 font-bold text-sm">
            <DollarSign className="h-4 w-4" />
            E-Commerce & Course Monetization
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Publish and monetize your interactive scenario courses directly on corporate storefronts or public links.
          </p>
          <span className="text-[11px] font-semibold text-emerald-700">
            ✓ Stripe & SCORM LMS connector ready
          </span>
        </div>
      </div>
    </div>
  );
};
