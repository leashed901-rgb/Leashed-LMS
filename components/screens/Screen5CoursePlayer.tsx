'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ScreenId } from './screenTypes';
import { 
  ChevronLeft, 
  Play, 
  Pause, 
  Volume2, 
  Settings, 
  Maximize, 
  Check, 
  ArrowRight,
  Lock,
  Layers
} from 'lucide-react';

interface Screen5Props {
  onNavigate: (screen: ScreenId) => void;
}

export const Screen5CoursePlayer: React.FC<Screen5Props> = ({ onNavigate }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'notes' | 'resources'>('overview');
  const [isCompleted, setIsCompleted] = useState(false);

  return (
    <div className="bg-slate-50 text-slate-800 min-h-screen flex flex-col antialiased selection:bg-blue-100 selection:text-blue-700">
      {/* Top Navigation Bar */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 px-4 lg:px-8 py-3.5 flex items-center justify-between shadow-sm">
        {/* Brand and Lesson Header */}
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2.5 cursor-pointer" onClick={() => onNavigate('screen-4')}>
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-sm shadow-blue-500/30">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14.5h-2v-2h2v2zm0-4h-2V7h2v5.5z"></path>
              </svg>
            </div>
            <span className="font-bold text-lg tracking-tight text-slate-900">Leashed<span className="text-blue-600">.io</span></span>
          </div>
          <div className="h-5 w-px bg-slate-200 hidden md:block"></div>
          {/* Course & Lesson Hierarchy */}
          <div className="hidden sm:flex flex-col">
            <div className="flex items-center space-x-2 text-xs font-semibold text-blue-600 uppercase tracking-wider">
              <button 
                onClick={() => onNavigate('screen-7')} 
                className="hover:underline flex items-center gap-1 cursor-pointer"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                Pet Grooming Basics
              </button>
            </div>
            <h1 className="text-sm font-semibold text-slate-800">Lesson 2: Bathing and Drying</h1>
          </div>
        </div>

        {/* Navigation Right Profile / Actions */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => onNavigate('screen-3')}
            className="flex items-center gap-1.5 px-3 py-1 text-xs font-medium text-slate-600 hover:text-slate-900 border border-slate-200 rounded-lg hover:bg-slate-50 transition cursor-pointer"
          >
            <Layers className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Workspace</span>
          </button>

          <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-full">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xs font-medium text-slate-600">Progress: 1/6 Completed</span>
          </div>
          <div className="flex items-center space-x-2.5 pl-2 border-l border-slate-200">
            <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center font-medium text-xs border border-slate-300">
              TR
            </div>
            <span className="text-xs font-medium text-slate-700 hidden lg:inline">Taylor R.</span>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 flex flex-col lg:flex-row gap-6">
        {/* Left Video and Content Column */}
        <section className="flex-1 flex flex-col gap-5 min-w-0" data-purpose="lesson-main-stage">
          {/* Lesson Title Header (Mobile visible) */}
          <div className="sm:hidden mb-1">
            <span className="text-xs font-semibold text-blue-600 uppercase tracking-wide">Pet Grooming Basics</span>
            <h1 className="text-lg font-bold text-slate-900 mt-0.5">Lesson 2: Bathing and Drying</h1>
          </div>

          {/* Video Player Frame Container */}
          <div className="w-full bg-slate-950 rounded-2xl overflow-hidden shadow-lg border border-slate-800 aspect-video relative group flex flex-col justify-between" data-purpose="video-player">
            {/* Video Canvas Placeholder Displaying Grooming Tutorial */}
            <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
              <Image 
                alt="Pet Grooming Bathing and Drying golden retriever tutorial" 
                className="object-cover object-center opacity-90 transition-transform duration-300 group-hover:scale-[1.01]" 
                src="https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&w=1200&q=80"
                fill
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30"></div>
              {/* Central Big Play Button Overlay */}
              <button 
                onClick={() => setIsPlaying(!isPlaying)}
                aria-label="Play video" 
                className="relative z-10 w-16 h-16 rounded-full bg-blue-600/90 text-white flex items-center justify-center hover:bg-blue-600 hover:scale-110 active:scale-95 transition-all shadow-xl shadow-blue-900/40 backdrop-blur-sm cursor-pointer" 
                type="button"
              >
                {isPlaying ? (
                  <Pause className="w-7 h-7 fill-current" />
                ) : (
                  <Play className="w-7 h-7 fill-current translate-x-0.5" />
                )}
              </button>
            </div>

            {/* Video Player Top Bar Overlay */}
            <div className="relative z-10 p-4 flex items-center justify-between text-white/90 text-xs drop-shadow-md">
              <div className="flex items-center space-x-2 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-md">
                <span className="font-medium tracking-wide">Pet Grooming Basics • Module 2</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="bg-red-600 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider text-white">HD</span>
              </div>
            </div>

            {/* Video Player Bottom Controls Overlay */}
            <div className="relative z-10 px-4 pb-3 pt-6 bg-gradient-to-t from-black/90 via-black/60 to-transparent flex flex-col gap-2">
              {/* Video Timeline Track */}
              <div className="w-full bg-white/30 h-1.5 rounded-full cursor-pointer overflow-hidden relative">
                <div className="bg-blue-500 h-full w-[38%] rounded-full relative">
                  <span className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow"></span>
                </div>
              </div>

              {/* Video Control Buttons & Time */}
              <div className="flex items-center justify-between text-white text-xs pt-1">
                <div className="flex items-center space-x-4">
                  {/* Play/Pause */}
                  <button 
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="hover:text-blue-400 transition-colors cursor-pointer" 
                    title="Play" 
                    type="button"
                  >
                    {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current" />}
                  </button>
                  {/* Volume */}
                  <button className="hover:text-blue-400 transition-colors cursor-pointer" title="Volume" type="button">
                    <Volume2 className="w-4 h-4" />
                  </button>
                  {/* Timestamp */}
                  <span className="text-slate-300 font-mono text-[11px]">06:14 / 16:20</span>
                </div>
                <div className="flex items-center space-x-3">
                  <button className="hover:text-blue-400 transition-colors cursor-pointer" title="Settings" type="button">
                    <Settings className="w-4 h-4" />
                  </button>
                  <button className="hover:text-blue-400 transition-colors cursor-pointer" title="Fullscreen" type="button">
                    <Maximize className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Action Navigation Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1 pb-1" data-purpose="lesson-action-controls">
            <button 
              onClick={() => setIsCompleted(!isCompleted)}
              className={`w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-5 py-2.5 rounded-lg border font-medium text-sm transition-colors shadow-sm cursor-pointer ${
                isCompleted 
                  ? 'border-emerald-600 bg-emerald-50 text-emerald-700' 
                  : 'border-blue-600 bg-white text-blue-600 hover:bg-blue-50'
              }`}
              type="button"
            >
              <Check className="w-4 h-4 stroke-[2.5]" />
              <span>{isCompleted ? 'Completed ✓' : 'Mark Complete'}</span>
            </button>
            <button 
              onClick={() => onNavigate('screen-7')}
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-2.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 font-medium text-sm transition-colors shadow-sm shadow-blue-500/20 cursor-pointer" 
              type="button"
            >
              <span>Next Lesson</span>
              <ArrowRight className="w-4 h-4 stroke-[2]" />
            </button>
          </div>

          {/* Content Tabs */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm" data-purpose="tab-content-container">
            {/* Tab Navigation */}
            <div className="border-b border-slate-200 pb-3">
              <nav aria-label="Lesson Details Tabs" className="flex space-x-8">
                <button 
                  onClick={() => setActiveTab('overview')}
                  className={`pb-2 text-sm font-semibold transition-colors cursor-pointer ${
                    activeTab === 'overview' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-slate-500 hover:text-slate-800'
                  }`} 
                  type="button"
                >
                  Overview
                </button>
                <button 
                  onClick={() => setActiveTab('notes')}
                  className={`pb-2 text-sm font-medium transition-colors cursor-pointer ${
                    activeTab === 'notes' ? 'border-b-2 border-blue-600 text-blue-600 font-semibold' : 'text-slate-500 hover:text-slate-800'
                  }`} 
                  type="button"
                >
                  Notes
                </button>
                <button 
                  onClick={() => setActiveTab('resources')}
                  className={`pb-2 text-sm font-medium transition-colors cursor-pointer ${
                    activeTab === 'resources' ? 'border-b-2 border-blue-600 text-blue-600 font-semibold' : 'text-slate-500 hover:text-slate-800'
                  }`} 
                  type="button"
                >
                  Resources
                </button>
              </nav>
            </div>

            {/* Tab Panel */}
            {activeTab === 'overview' && (
              <div className="pt-5 text-slate-600 leading-relaxed text-sm">
                <p className="text-slate-700">
                  In this lesson, you&apos;ll learn proper bathing and drying techniques, including water temperature, shampoo selection, and drying methods.
                </p>
                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3 pt-3 border-t border-slate-100 text-xs">
                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                    <span className="block font-semibold text-slate-800 mb-1">Key Concept 1</span>
                    <span>Water temperature balance and comfort inspection.</span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                    <span className="block font-semibold text-slate-800 mb-1">Key Concept 2</span>
                    <span>Coat-safe shampoo dilution &amp; lather techniques.</span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                    <span className="block font-semibold text-slate-800 mb-1">Key Concept 3</span>
                    <span>High-velocity blowout vs. fluff drying safely.</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'notes' && (
              <div className="pt-5 text-sm text-slate-600 space-y-2">
                <p className="font-semibold text-slate-800">Clinical Grooming Notes:</p>
                <ul className="list-disc pl-5 space-y-1 text-xs text-slate-600">
                  <li>Check water temp on the inside of the groomer&apos;s wrist prior to wetting the dog.</li>
                  <li>Use tearless facial shampoo around canine eyes and muzzle.</li>
                  <li>Keep high-velocity nozzle at least 3 inches away from skin to prevent thermal or tissue irritation.</li>
                </ul>
              </div>
            )}

            {activeTab === 'resources' && (
              <div className="pt-5 text-sm text-slate-600 space-y-2">
                <p className="font-semibold text-slate-800">Downloadable Resources:</p>
                <div className="flex gap-2 text-xs">
                  <span className="p-2 bg-slate-100 border border-slate-200 rounded text-slate-700 font-medium">Bathing Checklist (PDF)</span>
                  <span className="p-2 bg-slate-100 border border-slate-200 rounded text-slate-700 font-medium">Shampoo Dilution Chart (PDF)</span>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Right Course Modules Sidebar */}
        <aside className="w-full lg:w-80 flex-shrink-0" data-purpose="course-modules-sidebar">
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-5 sticky top-20">
            {/* Sidebar Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h2 className="font-bold text-slate-900 text-base">Course Modules</h2>
                <p className="text-xs text-slate-500 mt-0.5">Pet Grooming Basics</p>
              </div>
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-blue-50 text-blue-700">
                2 of 6
              </span>
            </div>

            {/* Modules List */}
            <nav aria-label="Modules list" className="mt-4 space-y-1.5">
              {/* Module 1: Introduction (Completed) */}
              <div className="group flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 border border-transparent transition-colors text-xs font-medium cursor-pointer">
                <div className="flex items-center space-x-3 truncate">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                  </span>
                  <span className="text-slate-700 group-hover:text-slate-900 truncate">1. Introduction</span>
                </div>
                <span className="text-[11px] text-emerald-600 font-semibold flex items-center space-x-1">
                  ✓
                </span>
              </div>

              {/* Module 2: Bathing and Drying (Current / Active) */}
              <div className="flex items-center justify-between p-3 rounded-lg bg-blue-50/80 border border-blue-200/90 text-xs font-semibold text-blue-900 shadow-xs">
                <div className="flex items-center space-x-3 truncate">
                  <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center flex-shrink-0 shadow-sm">
                    <Play className="w-2.5 h-2.5 fill-current translate-x-px" />
                  </span>
                  <span className="truncate text-blue-900">2. Bathing and Drying</span>
                </div>
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 bg-blue-200/60 rounded text-blue-800">
                  Playing
                </span>
              </div>

              {/* Module 3: Brushing Techniques (Upcoming) */}
              <div className="group flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 border border-transparent transition-colors text-xs font-medium cursor-pointer">
                <div className="flex items-center space-x-3 truncate">
                  <span className="w-5 h-5 rounded-full border border-slate-300 text-slate-400 flex items-center justify-center flex-shrink-0 text-[10px]">
                    3
                  </span>
                  <span className="text-slate-600 group-hover:text-slate-800 truncate">3. Brushing Techniques</span>
                </div>
              </div>

              {/* Module 4: Nail Trimming (Upcoming) */}
              <div className="group flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 border border-transparent transition-colors text-xs font-medium cursor-pointer">
                <div className="flex items-center space-x-3 truncate">
                  <span className="w-5 h-5 rounded-full border border-slate-300 text-slate-400 flex items-center justify-center flex-shrink-0 text-[10px]">
                    4
                  </span>
                  <span className="text-slate-600 group-hover:text-slate-800 truncate">4. Nail Trimming</span>
                </div>
              </div>

              {/* Module 5: Health & Safety (Upcoming) */}
              <div className="group flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 border border-transparent transition-colors text-xs font-medium cursor-pointer">
                <div className="flex items-center space-x-3 truncate">
                  <span className="w-5 h-5 rounded-full border border-slate-300 text-slate-400 flex items-center justify-center flex-shrink-0 text-[10px]">
                    5
                  </span>
                  <span className="text-slate-600 group-hover:text-slate-800 truncate">5. Health &amp; Safety</span>
                </div>
              </div>

              {/* Module 6: Practice Assessment (Locked / Final) */}
              <div className="flex items-center justify-between p-3 rounded-lg border border-transparent text-xs font-medium text-slate-400">
                <div className="flex items-center space-x-3 truncate">
                  <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center flex-shrink-0">
                    <Lock className="w-3 h-3" />
                  </span>
                  <span className="truncate">6. Practice Assessment</span>
                </div>
                <span className="text-[10px] text-slate-400 font-medium">Locked</span>
              </div>
            </nav>

            {/* Course Completion Metric Box */}
            <div className="mt-6 pt-4 border-t border-slate-100">
              <div className="flex items-center justify-between text-xs text-slate-600 mb-1.5">
                <span>Overall Course Progress</span>
                <span className="font-semibold text-slate-800">17%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                <div className="bg-blue-600 h-2 rounded-full w-[17%]"></div>
              </div>
            </div>
          </div>
        </aside>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-auto py-4 px-4 sm:px-8 text-center text-xs text-slate-500">
        <p>Leashed.io © 2025 • Real Skills. Real Support. Real Futures.</p>
      </footer>
    </div>
  );
};
