'use client';

import React from 'react';
import { ScreenId } from './screenTypes';
import { LearnerSidebar } from './LearnerSidebar';
import { Bell, Check, ChevronRight } from 'lucide-react';

interface Screen4Props {
  onNavigate: (screen: ScreenId) => void;
}

export const Screen4LearnerDashboard: React.FC<Screen4Props> = ({ onNavigate }) => {
  return (
    <div className="h-screen font-sans text-slate-800 antialiased flex bg-slate-50 overflow-hidden">
      {/* Sidebar Navigation */}
      <LearnerSidebar currentScreen="screen-4" onNavigate={onNavigate} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top Navigation Header */}
        <header className="bg-white border-b border-slate-200 px-8 py-3.5 flex items-center justify-end gap-4" data-purpose="top-header">
          {/* Notification Icon */}
          <button aria-label="Notifications" className="p-1.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition cursor-pointer" type="button">
            <Bell className="w-5 h-5" />
          </button>
          {/* User Top Icon */}
          <button 
            aria-label="User Profile" 
            onClick={() => onNavigate('screen-9')}
            className="flex items-center gap-2 p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition cursor-pointer" 
            type="button"
          >
            <div className="w-7 h-7 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center">
              TR
            </div>
          </button>
        </header>

        {/* Main Container */}
        <main className="flex-1 max-w-4xl w-full mx-auto px-8 py-8 space-y-7">
          {/* Greeting Header */}
          <div data-purpose="page-greeting">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Good morning, Taylor!</h1>
            <p className="text-sm text-slate-500 mt-1">Keep going — you&apos;re making progress!</p>
          </div>

          {/* Card: Program Progress */}
          <section className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm" data-purpose="progress-card">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-semibold text-slate-900">Program Progress</h2>
            </div>
            <div className="flex items-center justify-between text-xs text-slate-500 font-medium mb-2">
              <span>Week 4 of 24</span>
              <span className="text-slate-700 font-semibold">17%</span>
            </div>
            {/* Progress Bar Container */}
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
              <div className="bg-blue-600 h-full rounded-full transition-all duration-500" style={{ width: '17%' }}></div>
            </div>
          </section>

          {/* Section: Quick Actions */}
          <section data-purpose="quick-actions-section">
            <h2 className="text-sm font-semibold text-slate-900 mb-3.5">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Card: Continue Learning */}
              <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex flex-col justify-between" data-purpose="continue-learning-card">
                <div>
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">Continue Learning</span>
                  <h3 className="text-sm font-bold text-slate-800 leading-snug">Life Skills: Financial Literacy</h3>
                </div>
                <div className="mt-5">
                  <button
                    onClick={() => onNavigate('screen-6')}
                    className="inline-flex items-center justify-center px-4 py-2 text-xs font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 shadow-sm transition cursor-pointer"
                  >
                    Resume
                  </button>
                </div>
              </div>

              {/* Card: Next Session */}
              <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex flex-col justify-between" data-purpose="next-session-card">
                <div>
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">Next Session</span>
                  <h3 className="text-sm font-bold text-slate-800 leading-snug">Pet Grooming Basics</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Today • 10:00 AM</p>
                </div>
                <div className="mt-5">
                  <button
                    onClick={() => onNavigate('screen-7')}
                    className="inline-flex items-center justify-center px-4 py-2 text-xs font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 shadow-sm transition cursor-pointer"
                  >
                    View Schedule
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Section: Upcoming Deadlines */}
          <section data-purpose="upcoming-deadlines-section">
            <h2 className="text-sm font-semibold text-slate-900 mb-3.5">Upcoming Deadlines</h2>
            <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
              {/* Deadline Row Item */}
              <div 
                onClick={() => onNavigate('screen-6')}
                className="flex items-center justify-between group cursor-pointer hover:bg-slate-50 p-2 rounded-lg transition" 
                data-purpose="deadline-item"
              >
                <div className="flex items-center gap-3">
                  {/* Checkmark circle indicator */}
                  <div className="w-5 h-5 rounded-full border border-slate-300 flex items-center justify-center text-transparent group-hover:text-slate-400 group-hover:border-slate-400 transition">
                    <Check className="w-3 h-3" />
                  </div>
                  <span className="text-sm font-medium text-slate-800">Complete Life Skills Module 2</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400">Due in 3 days</span>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};
