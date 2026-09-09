'use client';

import React from 'react';
import { ScreenId } from './screenTypes';
import { LearnerSidebar } from './LearnerSidebar';
import { Check, Lock, FileText, ArrowRight } from 'lucide-react';

interface Screen8Props {
  onNavigate: (screen: ScreenId) => void;
}

export const Screen8BusinessLeadership: React.FC<Screen8Props> = ({ onNavigate }) => {
  return (
    <div className="h-screen font-sans text-slate-800 antialiased flex bg-slate-50 overflow-hidden">
      {/* Sidebar Navigation */}
      <LearnerSidebar currentScreen="screen-8" onNavigate={onNavigate} />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 bg-[#f8fafc] overflow-y-auto" data-purpose="course-detail-view">
        {/* Top Navigation / Header */}
        <header className="bg-white border-b border-slate-200 px-8 py-5 flex-shrink-0" data-purpose="module-progress-header">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Business &amp; Leadership</h1>
              <p className="text-sm font-medium text-slate-500 mt-0.5">2 of 6 modules complete</p>
            </div>
            {/* Progress Percentage and Visual Bar */}
            <div className="flex items-center gap-4 w-full md:w-64" data-purpose="progress-tracker">
              <div className="flex-1 bg-slate-200 rounded-full h-2 overflow-hidden">
                <div className="bg-blue-600 h-2 rounded-full transition-all duration-500" style={{ width: '33%' }}></div>
              </div>
              <span className="text-sm font-semibold text-slate-700 min-w-[2.5rem] text-right">33%</span>
            </div>
          </div>
        </header>

        {/* Main Workspace / Curriculum Area */}
        <section className="flex-1 px-8 py-8" data-purpose="curriculum-content">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Modules List (Left / Central Section) */}
            <div className="lg:col-span-7 space-y-4" data-purpose="module-list">
              {/* Module 1: Mindset & Motivation (Completed) */}
              <div className="bg-white rounded-xl border border-slate-200 p-4 flex items-center justify-between shadow-sm hover:border-slate-300 transition-colors">
                <div className="flex items-center gap-3.5 min-w-0">
                  <span className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4 stroke-[2.5]" />
                  </span>
                  <div className="truncate">
                    <h4 className="text-sm font-bold text-slate-900 truncate">1. Mindset &amp; Motivation</h4>
                    <p className="text-xs font-semibold text-emerald-600 mt-0.5">Completed</p>
                  </div>
                </div>
                <button className="text-slate-400 hover:text-slate-600 text-xs font-medium px-2 py-1 cursor-pointer" type="button">Review</button>
              </div>

              {/* Module 2: Customer Service (Completed) */}
              <div className="bg-white rounded-xl border border-slate-200 p-4 flex items-center justify-between shadow-sm hover:border-slate-300 transition-colors">
                <div className="flex items-center gap-3.5 min-w-0">
                  <span className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4 stroke-[2.5]" />
                  </span>
                  <div className="truncate">
                    <h4 className="text-sm font-bold text-slate-900 truncate">2. Customer Service</h4>
                    <p className="text-xs font-semibold text-emerald-600 mt-0.5">Completed</p>
                  </div>
                </div>
                <button className="text-slate-400 hover:text-slate-600 text-xs font-medium px-2 py-1 cursor-pointer" type="button">Review</button>
              </div>

              {/* Module 3: Marketing & Branding (In Progress - Active) */}
              <div 
                onClick={() => onNavigate('screen-10')}
                className="bg-blue-50/50 rounded-xl border-2 border-blue-500 p-4 flex items-center justify-between shadow-sm cursor-pointer hover:bg-blue-50/80"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <span className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center flex-shrink-0">
                    3
                  </span>
                  <div className="truncate">
                    <h4 className="text-sm font-bold text-blue-950 truncate">3. Marketing &amp; Branding</h4>
                    <p className="text-xs font-semibold text-blue-600 mt-0.5">In Progress</p>
                  </div>
                </div>
                <span className="text-xs font-medium text-slate-500 bg-white border border-slate-200 px-2.5 py-1 rounded-md shadow-2xs">Estimated 1h 15m</span>
              </div>

              {/* Module 4: Financial Management (Locked) */}
              <div className="bg-white/80 rounded-xl border border-slate-200/80 p-4 flex items-center justify-between opacity-75 shadow-xs">
                <div className="flex items-center gap-3.5 min-w-0">
                  <span className="w-8 h-8 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center flex-shrink-0">
                    <Lock className="w-4 h-4" />
                  </span>
                  <div className="truncate">
                    <h4 className="text-sm font-semibold text-slate-600 truncate">4. Financial Management</h4>
                    <p className="text-xs text-slate-400 mt-0.5">Locked</p>
                  </div>
                </div>
                <Lock className="w-4 h-4 text-slate-400" />
              </div>
            </div>

            {/* Right Promo / Action Card Section */}
            <aside className="lg:col-span-5" data-purpose="action-card-column">
              <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 flex flex-col justify-between h-full min-h-[300px]">
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
                    <FileText className="w-6 h-6" />
                  </div>
                  <h2 className="text-xl font-bold text-slate-900 leading-snug">
                    Build Your Business Plan
                  </h2>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Learn how to structure your salon, find customers, and manage finances.
                  </p>
                </div>
                {/* Call to action button */}
                <div className="pt-8">
                  <button 
                    onClick={() => onNavigate('screen-10')}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-xl shadow-sm transition duration-150 ease-in-out flex items-center justify-center gap-2 group cursor-pointer" 
                    type="button"
                  >
                    <span>Start Module</span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </div>
            </aside>
          </div>
        </section>
      </main>
    </div>
  );
};
