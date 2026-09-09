'use client';

import React from 'react';
import { ScreenId } from './screenTypes';
import { 
  Home, 
  BookOpen, 
  Calendar, 
  MessageSquare, 
  Target, 
  FolderOpen, 
  ClipboardCheck, 
  FileText, 
  LifeBuoy,
  Layers,
  HandCoins,
  Award
} from 'lucide-react';

interface LearnerSidebarProps {
  currentScreen: ScreenId;
  onNavigate: (screen: ScreenId) => void;
}

export const LearnerSidebar: React.FC<LearnerSidebarProps> = ({ currentScreen, onNavigate }) => {
  const isCoursesActive = ['screen-5', 'screen-6', 'screen-7', 'screen-8'].includes(currentScreen);

  return (
    <aside className="w-64 bg-[#0c1b2a] text-slate-300 flex flex-col shrink-0 min-h-screen select-none border-r border-slate-800" data-purpose="sidebar-navigation">
      {/* Brand Logo Section */}
      <div className="px-6 py-5 flex items-center justify-between border-b border-slate-800/80">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-blue-500 flex items-center justify-center text-white">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <circle cx="6.5" cy="8.5" r="2.5"></circle>
              <circle cx="17.5" cy="8.5" r="2.5"></circle>
              <circle cx="10" cy="4.5" r="2.5"></circle>
              <circle cx="14" cy="4.5" r="2.5"></circle>
              <path d="M12 11.5c-3.2 0-6 2.3-6 5.5 0 2.8 2.5 5 6 5s6-2.2 6-5c0-3.2-2.8-5.5-6-5.5z"></path>
            </svg>
          </div>
          <span className="text-white text-lg font-bold tracking-tight">Leashed.io</span>
        </div>
      </div>

      {/* User Mini Profile */}
      <div className="px-6 py-4 flex items-center justify-between border-b border-slate-800/60" data-purpose="sidebar-user-card">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center ring-2 ring-blue-500/30">
              TR
            </div>
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-[#0c1b2a]"></span>
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-sm font-semibold text-white truncate leading-snug">Taylor R.</span>
            <span className="text-xs text-slate-400 font-medium truncate">Learner</span>
          </div>
        </div>

        {/* Switch Workspace Quick Button */}
        <button
          onClick={() => onNavigate('screen-3')}
          title="Switch Workspace"
          className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
        >
          <Layers className="w-4 h-4" />
        </button>
      </div>

      {/* Navigation Menu Items */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto" data-purpose="sidebar-menu">
        {/* Home -> Screen 4 */}
        <button
          onClick={() => onNavigate('screen-4')}
          className={`w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors text-left cursor-pointer ${
            currentScreen === 'screen-4'
              ? 'bg-[#1a334d] text-white'
              : 'text-slate-400 hover:text-white hover:bg-[#16283d]'
          }`}
        >
          <Home className={`w-4 h-4 shrink-0 ${currentScreen === 'screen-4' ? 'text-blue-400' : ''}`} />
          <span>Home</span>
        </button>

        {/* My Courses -> Screen 6 (Life Skills) */}
        <button
          onClick={() => onNavigate('screen-6')}
          className={`w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors text-left cursor-pointer ${
            isCoursesActive
              ? 'bg-[#1a334d] text-white'
              : 'text-slate-400 hover:text-white hover:bg-[#16283d]'
          }`}
        >
          <BookOpen className={`w-4 h-4 shrink-0 ${isCoursesActive ? 'text-blue-400' : ''}`} />
          <span>My Courses</span>
        </button>

        {/* Pet Grooming Training -> Screen 7 */}
        <button
          onClick={() => onNavigate('screen-7')}
          className={`w-full flex items-center gap-3 pl-7 pr-3 py-1.5 text-xs font-medium rounded-lg transition-colors text-left cursor-pointer ${
            currentScreen === 'screen-7' || currentScreen === 'screen-5'
              ? 'bg-blue-600/20 text-blue-300'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
          }`}
        >
          <span>• Pet Grooming</span>
        </button>

        {/* Business & Leadership -> Screen 8 */}
        <button
          onClick={() => onNavigate('screen-8')}
          className={`w-full flex items-center gap-3 pl-7 pr-3 py-1.5 text-xs font-medium rounded-lg transition-colors text-left cursor-pointer ${
            currentScreen === 'screen-8' || currentScreen === 'screen-10'
              ? 'bg-blue-600/20 text-blue-300'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
          }`}
        >
          <span>• Business &amp; Leadership</span>
        </button>

        {/* Schedule */}
        <button
          onClick={() => onNavigate('screen-4')}
          className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg text-slate-400 hover:text-white hover:bg-[#16283d] transition-colors text-left cursor-pointer"
        >
          <Calendar className="w-4 h-4 shrink-0" />
          <span>Schedule</span>
        </button>

        {/* Messages */}
        <button
          onClick={() => onNavigate('screen-13')}
          className={`w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors text-left cursor-pointer ${
            currentScreen === 'screen-13'
              ? 'bg-[#1a334d] text-white'
              : 'text-slate-400 hover:text-white hover:bg-[#16283d]'
          }`}
        >
          <MessageSquare className="w-4 h-4 shrink-0" />
          <span>Messages</span>
        </button>

        {/* Goals & Progress -> Screen 9 */}
        <button
          onClick={() => onNavigate('screen-9')}
          className={`w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors text-left cursor-pointer ${
            currentScreen === 'screen-9'
              ? 'bg-[#1a334d] text-white'
              : 'text-slate-400 hover:text-white hover:bg-[#16283d]'
          }`}
        >
          <Target className={`w-4 h-4 shrink-0 ${currentScreen === 'screen-9' ? 'text-blue-400' : ''}`} />
          <span>Goals &amp; Progress</span>
        </button>

        {/* Business Plan Builder -> Screen 10 */}
        <button
          onClick={() => onNavigate('screen-10')}
          className={`w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors text-left cursor-pointer ${
            currentScreen === 'screen-10'
              ? 'bg-[#1a334d] text-white'
              : 'text-slate-400 hover:text-white hover:bg-[#16283d]'
          }`}
        >
          <FileText className={`w-4 h-4 shrink-0 ${currentScreen === 'screen-10' ? 'text-blue-400' : ''}`} />
          <span>Business Plan</span>
        </button>

        {/* Funding & Referrals -> Screen 11 */}
        <button
          onClick={() => onNavigate('screen-11')}
          className={`w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors text-left cursor-pointer ${
            currentScreen === 'screen-11'
              ? 'bg-[#1a334d] text-white'
              : 'text-slate-400 hover:text-white hover:bg-[#16283d]'
          }`}
        >
          <HandCoins className={`w-4 h-4 shrink-0 ${currentScreen === 'screen-11' ? 'text-blue-400' : ''}`} />
          <span>Funding &amp; Referrals</span>
        </button>

        {/* Graduation -> Screen 12 */}
        <button
          onClick={() => onNavigate('screen-12')}
          className={`w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors text-left cursor-pointer ${
            currentScreen === 'screen-12'
              ? 'bg-[#1a334d] text-white'
              : 'text-slate-400 hover:text-white hover:bg-[#16283d]'
          }`}
        >
          <Award className={`w-4 h-4 shrink-0 ${currentScreen === 'screen-12' ? 'text-amber-400' : ''}`} />
          <span>Graduation</span>
        </button>

        {/* Support -> Screen 13 */}
        <button
          onClick={() => onNavigate('screen-13')}
          className={`w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors text-left cursor-pointer ${
            currentScreen === 'screen-13'
              ? 'bg-[#1a334d] text-white'
              : 'text-slate-400 hover:text-white hover:bg-[#16283d]'
          }`}
        >
          <LifeBuoy className={`w-4 h-4 shrink-0 ${currentScreen === 'screen-13' ? 'text-blue-400' : ''}`} />
          <span>Support</span>
        </button>
      </nav>

      {/* Switch Workspace Footer */}
      <div className="p-3 border-t border-slate-800">
        <button
          onClick={() => onNavigate('screen-3')}
          className="w-full flex items-center justify-between px-3 py-2 rounded-lg bg-slate-800/60 hover:bg-slate-800 text-xs font-medium text-slate-300 transition-colors cursor-pointer"
        >
          <span>Switch Workspace</span>
          <span className="text-[10px] text-sky-400 bg-sky-950 px-1.5 py-0.5 rounded">All 18</span>
        </button>
      </div>
    </aside>
  );
};
