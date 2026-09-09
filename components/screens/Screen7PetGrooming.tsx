'use client';

import React from 'react';
import { ScreenId } from './screenTypes';
import { LearnerSidebar } from './LearnerSidebar';
import { Check, Lock, ArrowRight } from 'lucide-react';

interface Screen7Props {
  onNavigate: (screen: ScreenId) => void;
}

export const Screen7PetGrooming: React.FC<Screen7Props> = ({ onNavigate }) => {
  return (
    <div className="h-screen font-sans text-slate-800 antialiased flex bg-slate-50 overflow-hidden">
      {/* Sidebar Navigation */}
      <LearnerSidebar currentScreen="screen-7" onNavigate={onNavigate} />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 bg-[#f8fafc] overflow-y-auto">
        {/* Header Banner / Module Progress Section */}
        <header className="bg-white border-b border-slate-200 px-8 py-6">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Pet Grooming Training</h1>
              <p className="text-sm font-medium text-slate-500 mt-1">4 of 8 lessons complete</p>
            </div>
            {/* Progress Indicator */}
            <div className="flex items-center gap-4 min-w-[240px]">
              <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                <div className="bg-blue-600 h-2.5 rounded-full transition-all duration-300" style={{ width: '50%' }}></div>
              </div>
              <span className="text-sm font-bold text-slate-700">50%</span>
            </div>
          </div>
        </header>

        {/* Content Workspace */}
        <div className="max-w-6xl mx-auto w-full p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Lesson List Section */}
            <section className="lg:col-span-6 space-y-4" data-purpose="module-list">
              {/* Lesson 1: Completed */}
              <article className="flex items-center gap-4 p-3 bg-white rounded-xl border border-slate-200/90 shadow-sm hover:border-slate-300 transition">
                <div className="w-16 h-16 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0 font-bold text-xs">
                  Tools
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-slate-900 leading-snug">1. Grooming Tools &amp; Safety</h3>
                  <div className="flex items-center gap-1.5 mt-1">
                    <span className="inline-flex items-center gap-1 text-[12px] font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                      <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                      Completed
                    </span>
                  </div>
                </div>
                <div className="pr-2">
                  <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-xs font-bold">✓</span>
                </div>
              </article>

              {/* Lesson 2: Active / In Progress */}
              <article 
                onClick={() => onNavigate('screen-5')}
                className="flex items-center gap-4 p-3 bg-blue-50/40 rounded-xl border-2 border-blue-500 shadow-sm transition cursor-pointer hover:bg-blue-50/70"
              >
                <div className="w-16 h-16 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center flex-shrink-0 font-bold text-xs">
                  Bath
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-slate-900 leading-snug">2. Bathing and Drying</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="inline-flex items-center text-[12px] font-medium text-blue-600 bg-blue-100/70 px-2 py-0.5 rounded-md">
                      In Progress
                    </span>
                  </div>
                </div>
                <div className="pr-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse"></span>
                </div>
              </article>

              {/* Lesson 3: Locked */}
              <article className="flex items-center gap-4 p-3 bg-slate-50/70 rounded-xl border border-slate-200/80 opacity-75">
                <div className="w-16 h-16 rounded-lg bg-slate-200 text-slate-500 flex items-center justify-center flex-shrink-0 font-bold text-xs">
                  Brush
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium text-slate-600 leading-snug">3. Brushing Techniques</h3>
                  <div className="flex items-center gap-1 mt-1 text-slate-400">
                    <Lock className="w-3.5 h-3.5" />
                    <span className="text-xs">Locked</span>
                  </div>
                </div>
              </article>

              {/* Lesson 4: Locked */}
              <article className="flex items-center gap-4 p-3 bg-slate-50/70 rounded-xl border border-slate-200/80 opacity-75">
                <div className="w-16 h-16 rounded-lg bg-slate-200 text-slate-500 flex items-center justify-center flex-shrink-0 font-bold text-xs">
                  Nails
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium text-slate-600 leading-snug">4. Nail Trimming</h3>
                  <div className="flex items-center gap-1 mt-1 text-slate-400">
                    <Lock className="w-3.5 h-3.5" />
                    <span className="text-xs">Locked</span>
                  </div>
                </div>
              </article>
            </section>

            {/* Active Lesson Preview */}
            <section className="lg:col-span-6 bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5 flex flex-col justify-between" data-purpose="active-lesson-card">
              <div>
                {/* Active Lesson Banner Image */}
                <div className="relative rounded-xl overflow-hidden mb-4 bg-slate-100 aspect-[4/3]">
                  <img 
                    alt="Trainer with happy golden retriever during bath" 
                    className="w-full h-full object-cover" 
                    src="https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=800&q=80"
                  />
                  <div className="absolute top-3 right-3 bg-slate-900/70 backdrop-blur-sm text-white text-xs px-2.5 py-1 rounded-full font-medium">
                    Lesson 2
                  </div>
                </div>
                {/* Active Lesson Details */}
                <div className="space-y-2">
                  <h2 className="text-xl font-bold text-slate-900 tracking-tight">Lesson 2: Bathing and Drying</h2>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Learn temperature control, safe water handling around sensitive eyes and ears, coat-specific shampoo applications, and stress-free blow drying routines.
                  </p>
                </div>
              </div>
              {/* Bottom Action Button */}
              <div className="mt-6 pt-4 border-t border-slate-100">
                <button 
                  onClick={() => onNavigate('screen-5')}
                  className="w-full py-3 px-6 rounded-xl font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 transition duration-150 shadow-md shadow-blue-500/20 flex items-center justify-center gap-2 cursor-pointer" 
                  type="button"
                >
                  <span>Continue Lesson</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};
