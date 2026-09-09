'use client';

import React from 'react';
import { ScreenId } from './screenTypes';
import { LearnerSidebar } from './LearnerSidebar';
import { Coins, Heart, MessageSquare, Clock } from 'lucide-react';

interface Screen6Props {
  onNavigate: (screen: ScreenId) => void;
}

export const Screen6LifeSkills: React.FC<Screen6Props> = ({ onNavigate }) => {
  return (
    <div className="h-screen font-sans text-slate-800 antialiased flex bg-slate-50 overflow-hidden">
      {/* Sidebar Navigation */}
      <LearnerSidebar currentScreen="screen-6" onNavigate={onNavigate} />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 bg-[#f8fafc] overflow-y-auto" data-purpose="content-area">
        {/* Header Section */}
        <header className="bg-white border-b border-slate-200 px-8 py-7" data-purpose="module-progress-header">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            {/* Title & Counter */}
            <div>
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Life Skills Foundation</h1>
              <p className="text-sm font-medium text-slate-500 mt-1">3 of 6 modules complete</p>
            </div>
            {/* Progress Indicator */}
            <div className="w-full md:w-80 flex flex-col items-end">
              <span className="text-sm font-semibold text-slate-700 mb-1.5">50%</span>
              <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200/80">
                <div className="h-full bg-sky-500 rounded-full w-1/2 transition-all duration-500"></div>
              </div>
            </div>
          </div>
        </header>

        {/* Modules Grid Section */}
        <section className="flex-1 px-8 py-8 max-w-6xl w-full mx-auto" data-purpose="module-cards-grid">
          {/* 2x2 Grid container matching Screen 6 layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Card 1: Financial Literacy */}
            <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm hover:shadow transition-shadow flex flex-col justify-between" data-purpose="card-financial-literacy">
              <div>
                <div className="flex items-start justify-between">
                  <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center">
                    <Coins className="w-6 h-6 stroke-current" />
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-1 bg-slate-100 text-slate-600 rounded-md">Not Started</span>
                </div>
                <div className="mt-4">
                  <h2 className="text-lg font-semibold text-slate-900">Financial Literacy</h2>
                  <p className="text-xs font-medium text-slate-400 mt-1">0 / 5 complete</p>
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100">
                <button 
                  onClick={() => onNavigate('screen-7')}
                  className="w-full py-2.5 px-4 bg-sky-50 text-sky-600 hover:bg-sky-100 font-semibold rounded-lg text-sm transition-colors flex items-center justify-center cursor-pointer" 
                  type="button"
                >
                  Start
                </button>
              </div>
            </div>

            {/* Card 2: Communication */}
            <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm hover:shadow transition-shadow flex flex-col justify-between" data-purpose="card-communication">
              <div>
                <div className="flex items-start justify-between">
                  <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center">
                    <Heart className="w-6 h-6 stroke-current" />
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-1 bg-amber-50 text-amber-600 rounded-md">In Progress</span>
                </div>
                <div className="mt-4">
                  <h2 className="text-lg font-semibold text-slate-900">Communication</h2>
                  <p className="text-xs font-medium text-slate-400 mt-1">2 / 6 complete</p>
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100">
                <button 
                  onClick={() => onNavigate('screen-7')}
                  className="w-full py-2.5 px-4 bg-sky-600 hover:bg-sky-700 text-white font-semibold rounded-lg text-sm shadow-sm shadow-sky-600/20 transition-colors flex items-center justify-center cursor-pointer" 
                  type="button"
                >
                  Continue
                </button>
              </div>
            </div>

            {/* Card 3: Conflict Resolution */}
            <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm hover:shadow transition-shadow flex flex-col justify-between" data-purpose="card-conflict-resolution">
              <div>
                <div className="flex items-start justify-between">
                  <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center">
                    <MessageSquare className="w-6 h-6 stroke-current" />
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-1 bg-slate-100 text-slate-600 rounded-md">Not Started</span>
                </div>
                <div className="mt-4">
                  <h2 className="text-lg font-semibold text-slate-900">Conflict Resolution</h2>
                  <p className="text-xs font-medium text-slate-400 mt-1">0 / 6 complete</p>
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100">
                <button 
                  onClick={() => onNavigate('screen-7')}
                  className="w-full py-2.5 px-4 bg-sky-50 text-sky-600 hover:bg-sky-100 font-semibold rounded-lg text-sm transition-colors flex items-center justify-center cursor-pointer" 
                  type="button"
                >
                  Start
                </button>
              </div>
            </div>

            {/* Card 4: Time Management */}
            <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm hover:shadow transition-shadow flex flex-col justify-between" data-purpose="card-time-management">
              <div>
                <div className="flex items-start justify-between">
                  <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center">
                    <Clock className="w-6 h-6 stroke-current" />
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-1 bg-amber-50 text-amber-600 rounded-md">In Progress</span>
                </div>
                <div className="mt-4">
                  <h2 className="text-lg font-semibold text-slate-900">Time Management</h2>
                  <p className="text-xs font-medium text-slate-400 mt-1">1 / 6 complete</p>
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100">
                <button 
                  onClick={() => onNavigate('screen-7')}
                  className="w-full py-2.5 px-4 bg-sky-600 hover:bg-sky-700 text-white font-semibold rounded-lg text-sm shadow-sm shadow-sky-600/20 transition-colors flex items-center justify-center cursor-pointer" 
                  type="button"
                >
                  Continue
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};
