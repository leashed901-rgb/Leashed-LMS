'use client';

import React, { useState } from 'react';
import { ScreenId } from './screenTypes';
import { GraduationCap, Users, Building2, Store, Shield, ArrowRight } from 'lucide-react';

interface Screen3Props {
  onNavigate: (screen: ScreenId) => void;
}

type WorkspaceOption = 'learner' | 'cohort' | 'partner' | 'salon' | 'admin';

export const Screen3WorkspaceSelection: React.FC<Screen3Props> = ({ onNavigate }) => {
  const [selectedWorkspace, setSelectedWorkspace] = useState<WorkspaceOption>('learner');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedWorkspace === 'learner') {
      onNavigate('screen-4'); // Learner Dashboard
    } else if (selectedWorkspace === 'cohort') {
      onNavigate('screen-19'); // Partner Agency / Cohort Portal
    } else if (selectedWorkspace === 'partner') {
      onNavigate('screen-19'); // Partner Agency Portal
    } else if (selectedWorkspace === 'salon') {
      onNavigate('screen-14'); // Salon Workspace
    } else if (selectedWorkspace === 'admin') {
      onNavigate('screen-20'); // Program Admin Workspace
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4 antialiased text-slate-800">
      <main className="w-full max-w-xl bg-white rounded-2xl shadow-xl border border-slate-200/80 overflow-hidden" data-purpose="workspace-selection-card">
        {/* Modal Header with Logo and Info */}
        <header className="pt-8 px-8 pb-5 border-b border-slate-100">
          {/* Leashed.io Brand Logo */}
          <div className="flex items-center gap-2 mb-6" data-purpose="brand-logo">
            <div className="w-8 h-8 rounded-lg bg-sky-600 flex items-center justify-center text-white shadow-sm">
              <svg aria-hidden="true" className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-4.5-2a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zm9 0a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zM8 15c-1.657 0-3 1.343-3 3 0 2 3.5 3.5 7 3.5s7-1.5 7-3.5c0-1.657-1.343-3-3-3H8z"></path>
              </svg>
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">Leashed.io</span>
          </div>
          {/* Section Title & Subheading */}
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Select Your Workspace</h1>
            <p className="text-sm text-slate-500 mt-1">Each workspace is a secure, isolated environment.</p>
          </div>
        </header>

        {/* Workspace Options List Form */}
        <form onSubmit={handleSubmit} className="p-8 space-y-3" data-purpose="workspace-options-form" id="workspace-form">
          <fieldset>
            <legend className="sr-only">Choose a workspace option</legend>

            {/* Option 1: Learner Workspace */}
            <label 
              onClick={() => setSelectedWorkspace('learner')}
              className="workspace-option block cursor-pointer select-none mb-3"
            >
              <input
                type="radio"
                name="workspace"
                value="learner"
                checked={selectedWorkspace === 'learner'}
                onChange={() => setSelectedWorkspace('learner')}
                className="sr-only"
              />
              <div className={`card-content flex items-center justify-between p-4 rounded-xl border transition-all duration-150 ${
                selectedWorkspace === 'learner' 
                  ? 'border-sky-600 bg-sky-50/70 ring-1 ring-sky-600' 
                  : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/50'
              }`}>
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-lg bg-blue-500 text-white flex items-center justify-center flex-shrink-0 shadow-sm">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-sm font-semibold text-slate-900 leading-tight">Learner Workspace</h2>
                    <p className="text-xs text-slate-500 mt-0.5">Your training, schedule, progress, and resources.</p>
                  </div>
                </div>
                <ArrowRight className={`w-5 h-5 transition-transform duration-150 ml-2 ${
                  selectedWorkspace === 'learner' ? 'text-sky-600 translate-x-1' : 'text-slate-400'
                }`} />
              </div>
            </label>

            {/* Option 2: Training Cohort Workspace */}
            <label 
              onClick={() => setSelectedWorkspace('cohort')}
              className="workspace-option block cursor-pointer select-none mb-3"
            >
              <input
                type="radio"
                name="workspace"
                value="cohort"
                checked={selectedWorkspace === 'cohort'}
                onChange={() => setSelectedWorkspace('cohort')}
                className="sr-only"
              />
              <div className={`card-content flex items-center justify-between p-4 rounded-xl border transition-all duration-150 ${
                selectedWorkspace === 'cohort' 
                  ? 'border-sky-600 bg-sky-50/70 ring-1 ring-sky-600' 
                  : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/50'
              }`}>
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-lg bg-emerald-500 text-white flex items-center justify-center flex-shrink-0 shadow-sm">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-sm font-semibold text-slate-900 leading-tight">Training Cohort Workspace</h2>
                    <p className="text-xs text-slate-500 mt-0.5">Manage cohorts, attendance, and support.</p>
                  </div>
                </div>
                <ArrowRight className={`w-5 h-5 transition-transform duration-150 ml-2 ${
                  selectedWorkspace === 'cohort' ? 'text-sky-600 translate-x-1' : 'text-slate-400'
                }`} />
              </div>
            </label>

            {/* Option 3: Partner Agency Workspace */}
            <label 
              onClick={() => setSelectedWorkspace('partner')}
              className="workspace-option block cursor-pointer select-none mb-3"
            >
              <input
                type="radio"
                name="workspace"
                value="partner"
                checked={selectedWorkspace === 'partner'}
                onChange={() => setSelectedWorkspace('partner')}
                className="sr-only"
              />
              <div className={`card-content flex items-center justify-between p-4 rounded-xl border transition-all duration-150 ${
                selectedWorkspace === 'partner' 
                  ? 'border-sky-600 bg-sky-50/70 ring-1 ring-sky-600' 
                  : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/50'
              }`}>
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-lg bg-indigo-500 text-white flex items-center justify-center flex-shrink-0 shadow-sm">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-sm font-semibold text-slate-900 leading-tight">Partner Agency Workspace</h2>
                    <p className="text-xs text-slate-500 mt-0.5">Refer participants and track outcomes.</p>
                  </div>
                </div>
                <ArrowRight className={`w-5 h-5 transition-transform duration-150 ml-2 ${
                  selectedWorkspace === 'partner' ? 'text-sky-600 translate-x-1' : 'text-slate-400'
                }`} />
              </div>
            </label>

            {/* Option 4: Salon Workspace */}
            <label 
              onClick={() => setSelectedWorkspace('salon')}
              className="workspace-option block cursor-pointer select-none mb-3"
            >
              <input
                type="radio"
                name="workspace"
                value="salon"
                checked={selectedWorkspace === 'salon'}
                onChange={() => setSelectedWorkspace('salon')}
                className="sr-only"
              />
              <div className={`card-content flex items-center justify-between p-4 rounded-xl border transition-all duration-150 ${
                selectedWorkspace === 'salon' 
                  ? 'border-sky-600 bg-sky-50/70 ring-1 ring-sky-600' 
                  : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/50'
              }`}>
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-lg bg-amber-500 text-white flex items-center justify-center flex-shrink-0 shadow-sm">
                    <Store className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-sm font-semibold text-slate-900 leading-tight">Salon Workspace</h2>
                    <p className="text-xs text-slate-500 mt-0.5">Run your business, manage clients, and grow.</p>
                  </div>
                </div>
                <ArrowRight className={`w-5 h-5 transition-transform duration-150 ml-2 ${
                  selectedWorkspace === 'salon' ? 'text-sky-600 translate-x-1' : 'text-slate-400'
                }`} />
              </div>
            </label>

            {/* Option 5: Program Admin Workspace */}
            <label 
              onClick={() => setSelectedWorkspace('admin')}
              className="workspace-option block cursor-pointer select-none mb-4"
            >
              <input
                type="radio"
                name="workspace"
                value="admin"
                checked={selectedWorkspace === 'admin'}
                onChange={() => setSelectedWorkspace('admin')}
                className="sr-only"
              />
              <div className={`card-content flex items-center justify-between p-4 rounded-xl border transition-all duration-150 ${
                selectedWorkspace === 'admin' 
                  ? 'border-sky-600 bg-sky-50/70 ring-1 ring-sky-600' 
                  : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/50'
              }`}>
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-lg bg-slate-700 text-white flex items-center justify-center flex-shrink-0 shadow-sm">
                    <Shield className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-sm font-semibold text-slate-900 leading-tight">Program Admin Workspace</h2>
                    <p className="text-xs text-slate-500 mt-0.5">Oversee all workspaces, curriculum, and reporting.</p>
                  </div>
                </div>
                <ArrowRight className={`w-5 h-5 transition-transform duration-150 ml-2 ${
                  selectedWorkspace === 'admin' ? 'text-sky-600 translate-x-1' : 'text-slate-400'
                }`} />
              </div>
            </label>
          </fieldset>

          {/* Action Footer */}
          <footer className="pt-3 flex justify-end">
            <button
              type="submit"
              className="inline-flex items-center justify-center px-6 py-2.5 text-sm font-semibold rounded-lg bg-sky-600 text-white hover:bg-sky-700 active:bg-sky-800 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 cursor-pointer"
            >
              <span>Continue</span>
              <ArrowRight className="w-4 h-4 ml-2 -mr-0.5" />
            </button>
          </footer>
        </form>
      </main>
    </div>
  );
};
