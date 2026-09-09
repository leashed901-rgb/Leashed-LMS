'use client';

import React, { useState } from 'react';
import { ScreenId } from './screenTypes';
import { LearnerSidebar } from './LearnerSidebar';
import { Zap, Check, ArrowRight, ArrowLeft, Info } from 'lucide-react';

interface Screen10Props {
  onNavigate: (screen: ScreenId) => void;
}

export const Screen10BusinessPlanBuilder: React.FC<Screen10Props> = ({ onNavigate }) => {
  const [selectedTargets, setSelectedTargets] = useState<string[]>(['pet-owners', 'veterinarians']);
  const [otherText, setOtherText] = useState('');
  const [draftSaved, setDraftSaved] = useState(false);

  const toggleTarget = (id: string) => {
    setSelectedTargets(prev => 
      prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]
    );
  };

  const handleSaveDraft = () => {
    setDraftSaved(true);
    setTimeout(() => setDraftSaved(false), 2000);
  };

  return (
    <div className="h-screen font-sans text-slate-800 antialiased flex bg-slate-50 overflow-hidden">
      {/* Sidebar Navigation */}
      <LearnerSidebar currentScreen="screen-10" onNavigate={onNavigate} />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-h-screen overflow-y-auto" data-purpose="content-area">
        {/* Top Bar with Progress / Header */}
        <header className="bg-white border-b border-slate-200/80 px-8 py-6">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Business Plan Builder</h1>
              <div className="flex items-center gap-2 mt-1.5">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-sky-50 text-sky-700 border border-sky-200">
                  Step 2 of 5
                </span>
                <span className="text-sm font-medium text-slate-500">Market Research</span>
              </div>
            </div>
            {/* Horizontal Step Indicators */}
            <div aria-label="Step Progress" className="flex items-center gap-2">
              <div className="flex items-center gap-1.5">
                <div className="w-7 h-7 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs font-semibold">
                  <Check className="w-4 h-4 stroke-[2.5]" />
                </div>
                <div className="w-8 h-1 bg-emerald-500 rounded-full"></div>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-7 h-7 rounded-full bg-sky-600 text-white flex items-center justify-center text-xs font-bold shadow-sm ring-4 ring-sky-100">
                  2
                </div>
                <div className="w-8 h-1 bg-slate-200 rounded-full"></div>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-7 h-7 rounded-full bg-slate-100 text-slate-400 border border-slate-300 flex items-center justify-center text-xs font-medium">
                  3
                </div>
                <div className="w-8 h-1 bg-slate-200 rounded-full"></div>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-7 h-7 rounded-full bg-slate-100 text-slate-400 border border-slate-300 flex items-center justify-center text-xs font-medium">
                  4
                </div>
                <div className="w-8 h-1 bg-slate-200 rounded-full"></div>
              </div>
              <div className="w-7 h-7 rounded-full bg-slate-100 text-slate-400 border border-slate-300 flex items-center justify-center text-xs font-medium">
                5
              </div>
            </div>
          </div>
        </header>

        {/* Main Questionnaire Section */}
        <div className="flex-1 px-8 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Form Container Card */}
            <section className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-8 transition-all" data-purpose="form-step-container">
              {/* Question Header Block */}
              <div className="mb-6">
                <div className="flex items-center gap-2 text-sky-600 mb-2">
                  <Zap className="w-5 h-5" />
                  <span className="text-xs font-bold uppercase tracking-wider">Module 2: Customer Strategy</span>
                </div>
                <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                  Target Market: Who are your customers?
                </h2>
                <p className="text-sm text-slate-500 mt-1">
                  Select all customer segments you plan to serve initially. This helps tailor your marketing and operational strategy.
                </p>
              </div>

              {/* Multi-Select Options List */}
              <div className="space-y-3.5" data-purpose="target-market-options">
                {/* Option 1: Pet Owners */}
                <div 
                  onClick={() => toggleTarget('pet-owners')}
                  className={`flex items-start gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    selectedTargets.includes('pet-owners')
                      ? 'border-sky-600 bg-sky-50/40'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="flex items-center h-6">
                    <input 
                      type="checkbox"
                      checked={selectedTargets.includes('pet-owners')}
                      onChange={() => {}}
                      className="h-5 w-5 rounded border-slate-300 text-sky-600 focus:ring-sky-500 cursor-pointer"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-slate-900">Pet Owners</span>
                      <span className="text-xs font-medium px-2 py-0.5 rounded bg-sky-100 text-sky-800">Primary</span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">Direct individual pet owners in your local neighborhood seeking recurring grooming.</p>
                  </div>
                </div>

                {/* Option 2: Veterinarians */}
                <div 
                  onClick={() => toggleTarget('veterinarians')}
                  className={`flex items-start gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    selectedTargets.includes('veterinarians')
                      ? 'border-sky-600 bg-sky-50/40'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="flex items-center h-6">
                    <input 
                      type="checkbox"
                      checked={selectedTargets.includes('veterinarians')}
                      onChange={() => {}}
                      className="h-5 w-5 rounded border-slate-300 text-sky-600 focus:ring-sky-500 cursor-pointer"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-slate-900">Veterinarians</span>
                      <span className="text-xs font-medium px-2 py-0.5 rounded bg-slate-100 text-slate-700">Referral Partner</span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">Clinical partners recommending specialized medicated baths or post-op grooming care.</p>
                  </div>
                </div>

                {/* Option 3: Animal Shelters */}
                <div 
                  onClick={() => toggleTarget('shelters')}
                  className={`flex items-start gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    selectedTargets.includes('shelters')
                      ? 'border-sky-600 bg-sky-50/40'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="flex items-center h-6">
                    <input 
                      type="checkbox"
                      checked={selectedTargets.includes('shelters')}
                      onChange={() => {}}
                      className="h-5 w-5 rounded border-slate-300 text-sky-600 focus:ring-sky-500 cursor-pointer"
                    />
                  </div>
                  <div className="flex-1">
                    <span className="font-semibold text-slate-800">Animal Shelters</span>
                    <p className="text-xs text-slate-500 mt-0.5">Nonprofit rescue groups requiring intake prep and pre-adoption grooming packages.</p>
                  </div>
                </div>

                {/* Option 4: Mobile Grooming Clients */}
                <div 
                  onClick={() => toggleTarget('mobile')}
                  className={`flex items-start gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    selectedTargets.includes('mobile')
                      ? 'border-sky-600 bg-sky-50/40'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="flex items-center h-6">
                    <input 
                      type="checkbox"
                      checked={selectedTargets.includes('mobile')}
                      onChange={() => {}}
                      className="h-5 w-5 rounded border-slate-300 text-sky-600 focus:ring-sky-500 cursor-pointer"
                    />
                  </div>
                  <div className="flex-1">
                    <span className="font-semibold text-slate-800">Mobile Grooming Clients</span>
                    <p className="text-xs text-slate-500 mt-0.5">High-convenience at-home or van-based grooming services for busy owners.</p>
                  </div>
                </div>

                {/* Option 5: Other */}
                <div className="p-4 rounded-xl border border-slate-200 hover:border-slate-300 bg-white transition-all">
                  <label className="flex items-center gap-4 cursor-pointer">
                    <input 
                      type="checkbox"
                      checked={selectedTargets.includes('other')}
                      onChange={() => toggleTarget('other')}
                      className="h-5 w-5 rounded border-slate-300 text-sky-600 focus:ring-sky-500 cursor-pointer"
                    />
                    <span className="font-semibold text-slate-800">Other</span>
                  </label>
                  <div className="mt-3 pl-9">
                    <input 
                      type="text"
                      value={otherText}
                      onChange={(e) => setOtherText(e.target.value)}
                      placeholder="e.g., Doggy daycares, show dog breeders, boutique hotels..." 
                      className="w-full text-sm border-0 border-b border-slate-300 bg-transparent px-1 py-1.5 text-slate-800 placeholder-slate-400 focus:ring-0 focus:border-sky-600 transition outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Tip / Advisory callout */}
              <div className="mt-6 p-4 rounded-xl bg-slate-50 border border-slate-200/60 flex items-start gap-3">
                <Info className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
                <p className="text-xs leading-relaxed text-slate-600">
                  <strong className="font-medium text-slate-800">Advisor Tip:</strong> Focusing on 1-2 core customer segments in year one increases retention rates by 35% before expanding into secondary channels like shelters or breeders.
                </p>
              </div>
            </section>
          </div>
        </div>

        {/* Bottom Action Bar */}
        <footer className="bg-white border-t border-slate-200/90 py-4 px-8 mt-auto sticky bottom-0" data-purpose="bottom-action-bar">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            {/* Draft Save & Status */}
            <div className="flex items-center gap-3">
              <button 
                onClick={handleSaveDraft}
                className="px-4 py-2 text-sm font-semibold text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors border border-transparent hover:border-slate-200 cursor-pointer" 
                type="button"
              >
                {draftSaved ? 'Saved! ✓' : 'Save Draft'}
              </button>
              <span className="hidden sm:inline-flex items-center gap-1.5 text-xs text-slate-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                Auto-saved 2m ago
              </span>
            </div>
            {/* Navigation Buttons */}
            <div className="flex items-center gap-3">
              <button 
                onClick={() => onNavigate('screen-8')}
                className="px-4 py-2 text-sm font-semibold text-slate-600 hover:text-slate-800 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer flex items-center gap-1" 
                type="button"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>
              <button 
                onClick={() => onNavigate('screen-11')}
                className="px-6 py-2.5 text-sm font-semibold text-white bg-sky-600 hover:bg-sky-500 active:bg-sky-700 rounded-lg shadow-sm shadow-sky-600/30 transition-all flex items-center gap-2 cursor-pointer" 
                type="button"
              >
                <span>Next</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};
