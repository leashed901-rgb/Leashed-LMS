'use client';

import React from 'react';
import { ScreenId } from './screenTypes';
import { LearnerSidebar } from './LearnerSidebar';
import { 
  TrendingUp, 
  Award, 
  Check, 
  Download, 
  GraduationCap, 
  Flag,
  ArrowRight
} from 'lucide-react';

interface Screen9Props {
  onNavigate: (screen: ScreenId) => void;
}

export const Screen9ProgressCertifications: React.FC<Screen9Props> = ({ onNavigate }) => {
  return (
    <div className="h-screen font-sans text-slate-800 antialiased flex bg-slate-50 overflow-hidden">
      {/* Sidebar Navigation */}
      <LearnerSidebar currentScreen="screen-9" onNavigate={onNavigate} />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 bg-[#f8fafc] overflow-y-auto" data-purpose="main-dashboard-body">
        {/* Top Bar */}
        <header className="bg-white border-b border-slate-200/80 px-6 lg:px-10 py-4 flex items-center justify-between shadow-sm">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight">My Progress</h1>
            <p className="text-sm text-slate-500 mt-0.5">Track your curriculum completion, certifications, and graduation roadmap.</p>
          </div>
          {/* Right Utility Actions */}
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Cohort 4</div>
              <div className="text-sm font-bold text-slate-700">Graduation: Aug 2025</div>
            </div>
          </div>
        </header>

        {/* Content Workspace */}
        <div className="p-6 lg:p-10 max-w-7xl w-full mx-auto space-y-8">
          {/* Top Row: Radial Progress & Certifications Earned */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Column 1: Donut / Circular Progress Overview (5 cols) */}
            <section className="lg:col-span-5 bg-white rounded-2xl border border-slate-200/90 p-8 shadow-sm flex flex-col items-center justify-center text-center relative overflow-hidden" data-purpose="circular-progress-card">
              <div className="w-full flex justify-between items-center mb-6">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Coursework Metric</span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  <TrendingUp className="w-3.5 h-3.5" /> On Track
                </span>
              </div>
              {/* SVG Radial Gauge */}
              <div className="relative w-56 h-56 flex items-center justify-center my-2">
                <svg className="w-full h-full -rotate-90 origin-center" viewBox="0 0 160 160">
                  {/* Background Ring */}
                  <circle cx="80" cy="80" fill="transparent" r="64" stroke="#e2e8f0" strokeWidth="14"></circle>
                  {/* Active Progress Ring (67% of 402 circumference ≈ 269 filled) */}
                  <circle 
                    cx="80" 
                    cy="80" 
                    fill="transparent" 
                    r="64" 
                    stroke="#0284c7" 
                    strokeDasharray="402" 
                    strokeDashoffset="132" 
                    strokeLinecap="round" 
                    strokeWidth="14"
                  ></circle>
                </svg>
                {/* Center Stat */}
                <div className="absolute flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-5xl font-extrabold tracking-tight text-slate-900">67%</span>
                  <span className="text-xs font-medium text-slate-500 uppercase tracking-wider mt-1">Completed</span>
                </div>
              </div>
              {/* Progress Detail Text */}
              <div className="mt-4">
                <p className="text-lg font-bold text-slate-800">4 of 6 Courses Complete</p>
                <p className="text-sm text-slate-500 mt-1 max-w-xs mx-auto">
                  You&apos;re making steady headway! Complete your remaining 2 leadership modules to unlock salon prep.
                </p>
              </div>
            </section>

            {/* Column 2: Certifications Earned (7 cols) */}
            <section className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/90 p-8 shadow-sm flex flex-col justify-between" data-purpose="certifications-card">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-xl font-bold text-slate-900">Certifications Earned</h2>
                    <p className="text-xs text-slate-500 mt-0.5">Official badges and accreditations verified by Leashed.io</p>
                  </div>
                  <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded-full border border-blue-100">
                    3 Badges Awarded
                  </span>
                </div>
                {/* List of Earned Certifications */}
                <div className="space-y-4">
                  {/* Cert Item 1 */}
                  <div className="p-4 rounded-xl border border-slate-200/80 bg-slate-50/50 hover:bg-slate-50 transition-all flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-200/80">
                        <Award className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-base font-semibold text-slate-900 leading-tight">Life Skills Foundation</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600">
                            <Check className="w-3.5 h-3.5" /> Completed
                          </span>
                          <span className="text-slate-300">•</span>
                          <span className="text-xs text-slate-500 font-medium">Mar 12, 2025</span>
                        </div>
                      </div>
                    </div>
                    <button className="text-slate-400 hover:text-blue-600 p-2 text-sm font-medium transition-colors cursor-pointer" title="Download certificate">
                      <Download className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Cert Item 2 */}
                  <div className="p-4 rounded-xl border border-slate-200/80 bg-slate-50/50 hover:bg-slate-50 transition-all flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-200/80">
                        <Award className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-base font-semibold text-slate-900 leading-tight">Pet Care Basics</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600">
                            <Check className="w-3.5 h-3.5" /> Completed
                          </span>
                          <span className="text-slate-300">•</span>
                          <span className="text-xs text-slate-500 font-medium">Mar 18, 2025</span>
                        </div>
                      </div>
                    </div>
                    <button className="text-slate-400 hover:text-blue-600 p-2 text-sm font-medium transition-colors cursor-pointer" title="Download certificate">
                      <Download className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Cert Item 3 */}
                  <div className="p-4 rounded-xl border border-slate-200/80 bg-slate-50/50 hover:bg-slate-50 transition-all flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-200/80">
                        <Award className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-base font-semibold text-slate-900 leading-tight">Customer Service</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600">
                            <Check className="w-3.5 h-3.5" /> Completed
                          </span>
                          <span className="text-slate-300">•</span>
                          <span className="text-xs text-slate-500 font-medium">Apr 2, 2025</span>
                        </div>
                      </div>
                    </div>
                    <button className="text-slate-400 hover:text-blue-600 p-2 text-sm font-medium transition-colors cursor-pointer" title="Download certificate">
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span>Verified credentials are synced with your public portfolio.</span>
                <button 
                  onClick={() => onNavigate('screen-12')}
                  className="font-semibold text-blue-600 hover:text-blue-700 hover:underline cursor-pointer"
                >
                  View Graduation Status →
                </button>
              </div>
            </section>
          </div>

          {/* Bottom Section: Program Timeline */}
          <section className="bg-white rounded-2xl border border-slate-200/90 p-8 shadow-sm" data-purpose="program-timeline-card">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-8">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Program Timeline</h2>
                <p className="text-xs text-slate-500 mt-0.5">6-month curriculum milestone tracker from orientation to launch</p>
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-blue-600 inline-block"></span> Current Month</span>
                <span className="mx-1">•</span>
                <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block"></span> Completed</span>
              </div>
            </div>

            {/* Horizontal Stepper / Progress Steps */}
            <div className="relative py-4">
              <div className="hidden md:block absolute top-10 left-10 right-10 h-1 bg-slate-200 -z-0">
                <div className="h-1 bg-blue-600 w-[60%]"></div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-6 gap-6 relative z-10">
                {/* Month 1: Complete */}
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-sm shadow-md ring-4 ring-white">
                    <Check className="w-5 h-5" />
                  </div>
                  <div className="mt-3">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wide">Month 1</p>
                    <p className="text-sm font-bold text-slate-900 mt-0.5">Life Skills</p>
                    <span className="inline-block mt-1 text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">Finished</span>
                  </div>
                </div>

                {/* Month 2: Complete */}
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-sm shadow-md ring-4 ring-white">
                    <Check className="w-5 h-5" />
                  </div>
                  <div className="mt-3">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wide">Month 2</p>
                    <p className="text-sm font-bold text-slate-900 mt-0.5">Pet Care</p>
                    <span className="inline-block mt-1 text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">Finished</span>
                  </div>
                </div>

                {/* Month 3: Complete */}
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-sm shadow-md ring-4 ring-white">
                    <Check className="w-5 h-5" />
                  </div>
                  <div className="mt-3">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wide">Month 3</p>
                    <p className="text-sm font-bold text-slate-900 mt-0.5">Business</p>
                    <span className="inline-block mt-1 text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">Finished</span>
                  </div>
                </div>

                {/* Month 4: In Progress / Active */}
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm shadow-lg ring-4 ring-blue-100 animate-pulse">
                    <span>4</span>
                  </div>
                  <div className="mt-3">
                    <p className="text-xs font-bold text-blue-600 uppercase tracking-wide">Month 4</p>
                    <p className="text-sm font-bold text-slate-900 mt-0.5">Leadership</p>
                    <span className="inline-block mt-1 text-[11px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">In Progress</span>
                  </div>
                </div>

                {/* Month 5: Upcoming */}
                <div className="flex flex-col items-center text-center opacity-60">
                  <div className="w-12 h-12 rounded-full bg-slate-100 border-2 border-slate-300 text-slate-500 flex items-center justify-center font-bold text-sm ring-4 ring-white">
                    <span>5</span>
                  </div>
                  <div className="mt-3">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wide">Month 5</p>
                    <p className="text-sm font-semibold text-slate-700 mt-0.5">Launch</p>
                    <span className="inline-block mt-1 text-[11px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">Upcoming</span>
                  </div>
                </div>

                {/* Month 6: Upcoming / Graduation */}
                <div 
                  onClick={() => onNavigate('screen-12')}
                  className="flex flex-col items-center text-center cursor-pointer hover:opacity-100 transition-opacity"
                >
                  <div className="w-12 h-12 rounded-full bg-amber-100 border-2 border-amber-300 text-amber-700 flex items-center justify-center font-bold text-sm ring-4 ring-white shadow-sm">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div className="mt-3">
                    <p className="text-xs font-bold text-amber-600 uppercase tracking-wide">Month 6</p>
                    <p className="text-sm font-semibold text-slate-700 mt-0.5">Graduation</p>
                    <span className="inline-block mt-1 text-[11px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">View Final</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Next Action Prompt Footer */}
            <div className="mt-8 p-4 bg-blue-50/70 border border-blue-100 rounded-xl flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3 text-left">
                <div className="w-9 h-9 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0">
                  <Flag className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900">Current Milestone: Month 4 Leadership &amp; Conflict Handling</div>
                  <div className="text-xs text-slate-600">2 assignments remaining before entering Salon Launch operations.</div>
                </div>
              </div>
              <button 
                onClick={() => onNavigate('screen-8')}
                className="w-full md:w-auto px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg shadow-sm transition-all whitespace-nowrap cursor-pointer flex items-center justify-center gap-1.5"
              >
                <span>Continue Module</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};
