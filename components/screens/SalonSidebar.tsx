'use client';

import React from 'react';
import { ScreenId } from './screenTypes';
import { 
  Scissors, 
  Users, 
  CalendarCheck, 
  CreditCard, 
  Package, 
  Megaphone, 
  ShieldCheck, 
  BarChart3, 
  Settings,
  Layers
} from 'lucide-react';

interface SalonSidebarProps {
  currentScreen: ScreenId;
  onNavigate: (screen: ScreenId) => void;
}

export const SalonSidebar: React.FC<SalonSidebarProps> = ({ currentScreen, onNavigate }) => {
  return (
    <aside className="w-64 bg-[#0f172a] text-slate-300 flex flex-col justify-between shrink-0 min-h-screen select-none border-r border-slate-800" data-purpose="salon-sidebar">
      <div>
        {/* Platform Logo */}
        <div className="p-6 border-b border-slate-800/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white text-base font-bold shadow-md shadow-blue-500/20">
              <Scissors className="w-4 h-4" />
            </div>
            <div className="flex flex-col">
              <span className="text-white text-lg font-bold tracking-tight">Leashed.io</span>
              <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Salon Workspace</span>
            </div>
          </div>

          <button
            onClick={() => onNavigate('screen-3')}
            title="Switch Workspace"
            className="p-1 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
          >
            <Layers className="w-4 h-4" />
          </button>
        </div>

        {/* Salon Indicator Badge */}
        <div className="px-5 py-3 border-b border-slate-800/60 bg-slate-900/40">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span className="text-xs font-semibold text-slate-200">Bella&apos;s Pet Salon</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-0.5">Open • Closes 6:00 PM</p>
        </div>

        {/* Navigation Links */}
        <nav aria-label="Salon Navigation" className="p-3 space-y-1 text-sm font-medium">
          {/* Overview / Appointments -> Screen 14 */}
          <button
            onClick={() => onNavigate('screen-14')}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors text-left cursor-pointer ${
              currentScreen === 'screen-14'
                ? 'bg-blue-600 text-white font-semibold shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <CalendarCheck className="w-4 h-4 shrink-0" />
            <span>Appointments</span>
          </button>

          {/* Clients & Pets -> Screen 15 */}
          <button
            onClick={() => onNavigate('screen-15')}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors text-left cursor-pointer ${
              currentScreen === 'screen-15'
                ? 'bg-blue-600 text-white font-semibold shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Users className="w-4 h-4 shrink-0" />
            <span>Clients &amp; Pets</span>
          </button>

          {/* Payments & Financials -> Screen 16 */}
          <button
            onClick={() => onNavigate('screen-16')}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors text-left cursor-pointer ${
              currentScreen === 'screen-16'
                ? 'bg-blue-600 text-white font-semibold shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <CreditCard className="w-4 h-4 shrink-0" />
            <span>Payments</span>
          </button>

          {/* Marketing & Growth -> Screen 17 */}
          <button
            onClick={() => onNavigate('screen-17')}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors text-left cursor-pointer ${
              currentScreen === 'screen-17'
                ? 'bg-blue-600 text-white font-semibold shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Megaphone className="w-4 h-4 shrink-0" />
            <span>Marketing</span>
          </button>

          {/* Reports & Analytics -> Screen 18 */}
          <button
            onClick={() => onNavigate('screen-18')}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors text-left cursor-pointer ${
              currentScreen === 'screen-18'
                ? 'bg-blue-600 text-white font-semibold shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <BarChart3 className="w-4 h-4 shrink-0" />
            <span>Reports &amp; Analytics</span>
          </button>

          {/* Compliance */}
          <button
            onClick={() => onNavigate('screen-14')}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors text-left cursor-pointer"
          >
            <ShieldCheck className="w-4 h-4 shrink-0" />
            <span>Compliance</span>
          </button>

          {/* Settings */}
          <button
            onClick={() => onNavigate('screen-14')}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors text-left cursor-pointer"
          >
            <Settings className="w-4 h-4 shrink-0" />
            <span>Settings</span>
          </button>
        </nav>
      </div>

      {/* User Status Card */}
      <div className="p-4 border-t border-slate-800/80 bg-slate-900/40">
        <div className="flex items-center gap-3 px-2 py-1">
          <div className="w-9 h-9 rounded-full bg-slate-700 ring-2 ring-blue-500 flex items-center justify-center text-white font-semibold text-xs">
            TS
          </div>
          <div className="overflow-hidden flex-1">
            <div className="text-sm font-medium text-white truncate">Taylor S.</div>
            <div className="text-xs text-slate-400 truncate">Graduate Owner</div>
          </div>
        </div>
      </div>
    </aside>
  );
};
