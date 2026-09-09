'use client';

import React from 'react';
import { ScreenId } from './screenTypes';
import { LearnerSidebar } from './LearnerSidebar';
import { 
  Check, 
  Store, 
  Download, 
  Sparkles,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

interface Screen12Props {
  onNavigate: (screen: ScreenId) => void;
}

export const Screen12GraduationSalonLaunch: React.FC<Screen12Props> = ({ onNavigate }) => {
  return (
    <div className="h-screen font-sans text-slate-800 antialiased flex bg-slate-50 overflow-hidden">
      {/* Sidebar Navigation */}
      <LearnerSidebar currentScreen="screen-12" onNavigate={onNavigate} />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 bg-[#f8fafc] overflow-y-auto" data-purpose="graduation-container">
        {/* Top Header */}
        <header className="bg-white border-b border-slate-200/80 px-8 py-6">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-2 text-amber-600 mb-1 font-semibold text-xs uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>Milestone Achieved</span>
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Graduation &amp; Salon Launch</h1>
            <p className="text-sm text-slate-500 mt-1">Congratulations! You have completed all 6 modules and are ready to launch your business.</p>
          </div>
        </header>

        {/* Content Body */}
        <div className="max-w-5xl mx-auto w-full p-8 space-y-8">
          {/* Top Hero Card: 100% Ready */}
          <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 rounded-3xl text-white p-8 md:p-10 shadow-xl relative overflow-hidden">
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-3 max-w-xl">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
                  <ShieldCheck className="w-4 h-4" />
                  All Requirements Satisfied
                </span>
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
                  You are officially certified &amp; launch-ready!
                </h2>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Your business plan is approved, your starting grant is disbursed, and your commercial suite is configured. You can now step into your dedicated Salon Workspace.
                </p>
              </div>

              {/* Ready CTA Box */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10 flex flex-col items-center justify-center text-center shrink-0 min-w-[220px]">
                <span className="text-4xl font-extrabold text-emerald-400">100%</span>
                <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold mt-1">Readiness Score</span>
                <button
                  onClick={() => onNavigate('screen-14')}
                  className="mt-4 w-full px-5 py-2.5 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Store className="w-4 h-4" />
                  <span>Launch Salon</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Checklist of Graduation Milestones */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-sm flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                <Check className="w-5 h-5 stroke-[2.5]" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">Life Skills Foundation</h3>
                <p className="text-xs text-slate-500 mt-0.5">Financial literacy, time mgmt &amp; professional communication.</p>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-sm flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                <Check className="w-5 h-5 stroke-[2.5]" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">Pet Grooming Practical Training</h3>
                <p className="text-xs text-slate-500 mt-0.5">Safety, sanitary clipping, bathing &amp; breed-specific styling.</p>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-sm flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                <Check className="w-5 h-5 stroke-[2.5]" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">Customer Service &amp; Leadership</h3>
                <p className="text-xs text-slate-500 mt-0.5">Conflict resolution, client intake &amp; service etiquette.</p>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-sm flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                <Check className="w-5 h-5 stroke-[2.5]" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">Comprehensive Business Plan</h3>
                <p className="text-xs text-slate-500 mt-0.5">Approved by Leashed.io advisory council &amp; mentors.</p>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-sm flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                <Check className="w-5 h-5 stroke-[2.5]" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">Equipment &amp; Grant Funding</h3>
                <p className="text-xs text-slate-500 mt-0.5">$10,000 startup capital &amp; professional grooming kit issued.</p>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-sm flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                <Check className="w-5 h-5 stroke-[2.5]" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">Final Clinical Evaluation</h3>
                <p className="text-xs text-slate-500 mt-0.5">Live demonstration with master groomer passed with distinction.</p>
              </div>
            </div>
          </div>

          {/* Action Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 bg-white rounded-2xl border border-slate-200/90 shadow-sm">
            <div>
              <h4 className="text-base font-bold text-slate-900">Graduate Documents</h4>
              <p className="text-xs text-slate-500">Official diploma, verification transcript, and startup charter.</p>
            </div>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button 
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold transition cursor-pointer"
                type="button"
              >
                <Download className="w-4 h-4" />
                <span>Download Diploma</span>
              </button>
              <button 
                onClick={() => onNavigate('screen-14')}
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/20 transition cursor-pointer"
                type="button"
              >
                <Store className="w-4 h-4" />
                <span>Enter Salon Workspace</span>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
