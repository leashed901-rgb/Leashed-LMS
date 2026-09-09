'use client';

import React, { useState } from 'react';
import { ScreenId } from './screenTypes';
import { LearnerSidebar } from './LearnerSidebar';
import { 
  Coins, 
  Scissors, 
  Home, 
  Users, 
  ChevronRight, 
  Briefcase, 
  HeartHandshake, 
  HeartPulse, 
  Baby, 
  Check, 
  ArrowRight
} from 'lucide-react';

interface Screen11Props {
  onNavigate: (screen: ScreenId) => void;
}

export const Screen11FundingReferrals: React.FC<Screen11Props> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'available' | 'my-referrals'>('available');
  const [appliedGrant, setAppliedGrant] = useState<string | null>(null);

  return (
    <div className="h-screen font-sans text-slate-800 antialiased flex bg-slate-50 overflow-hidden">
      {/* Sidebar Navigation */}
      <LearnerSidebar currentScreen="screen-11" onNavigate={onNavigate} />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 bg-[#f8fafc] overflow-y-auto">
        {/* Top Header / Navigation Tabs */}
        <header className="bg-white border-b border-slate-200 px-8 pt-6 sticky top-0 z-10">
          <div className="mb-4">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Funding &amp; Partner Referrals</h1>
            <p className="text-sm text-slate-500 mt-1">Access financial grants, equipment funding, and supportive local network services.</p>
          </div>
          {/* Tab Bar */}
          <div className="flex gap-8 border-b border-slate-200 text-sm font-medium">
            <button 
              onClick={() => setActiveTab('available')}
              className={`pb-3 font-semibold focus:outline-none flex items-center gap-2 cursor-pointer ${
                activeTab === 'available' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              Available Programs
              <span className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded-full font-semibold">3</span>
            </button>
            <button 
              onClick={() => setActiveTab('my-referrals')}
              className={`pb-3 transition-colors focus:outline-none cursor-pointer ${
                activeTab === 'my-referrals' ? 'text-blue-600 border-b-2 border-blue-600 font-semibold' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              My Referrals
            </button>
          </div>
        </header>

        {/* Main Section Body */}
        <div className="p-8 max-w-6xl w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Available Funding Grants */}
            <section className="lg:col-span-7 space-y-4" data-purpose="available-programs-list">
              {/* Small Business Grant Card */}
              <article className="bg-white rounded-xl p-5 border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0 text-xl border border-blue-100">
                  <Coins className="w-6 h-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline justify-between gap-2">
                    <h3 className="text-base font-semibold text-slate-900">Small Business Grant</h3>
                    <span className="text-sm font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">Up to $10,000</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    Direct capital assistance designed to support independent mobile and storefront grooming startup costs, licenses, and marketing.
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-xs text-slate-400">Deadline: Rolling basis</span>
                    <button 
                      onClick={() => setAppliedGrant('grant-1')}
                      className={`px-4 py-1.5 text-xs font-medium rounded-lg shadow-sm transition-colors cursor-pointer ${
                        appliedGrant === 'grant-1'
                          ? 'bg-emerald-600 text-white'
                          : 'bg-blue-600 hover:bg-blue-700 text-white'
                      }`}
                      type="button"
                    >
                      {appliedGrant === 'grant-1' ? 'Submitted ✓' : 'Apply Now'}
                    </button>
                  </div>
                </div>
              </article>

              {/* Salon Start-Up Fund Card */}
              <article className="bg-white rounded-xl p-5 border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center flex-shrink-0 text-xl border border-indigo-100">
                  <Scissors className="w-6 h-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline justify-between gap-2">
                    <h3 className="text-base font-semibold text-slate-900">Salon Start-Up Fund</h3>
                    <span className="text-sm font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">Up to $25,000</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    Comprehensive funding package including commercial equipment loans, renovation stipends, and wholesale grooming inventory setup.
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-xs text-slate-400">Requirement: Business Plan Approved</span>
                    <button 
                      onClick={() => setAppliedGrant('grant-2')}
                      className={`px-4 py-1.5 text-xs font-medium rounded-lg shadow-sm transition-colors cursor-pointer ${
                        appliedGrant === 'grant-2'
                          ? 'bg-emerald-600 text-white'
                          : 'bg-blue-600 hover:bg-blue-700 text-white'
                      }`}
                      type="button"
                    >
                      {appliedGrant === 'grant-2' ? 'Submitted ✓' : 'Apply Now'}
                    </button>
                  </div>
                </div>
              </article>

              {/* Housing Support Card */}
              <article className="bg-white rounded-xl p-5 border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center flex-shrink-0 text-xl border border-teal-100">
                  <Home className="w-6 h-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline justify-between gap-2">
                    <h3 className="text-base font-semibold text-slate-900">Housing Support</h3>
                    <span className="text-sm font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">Multiple Partners</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    Emergency shelter stipends, utility relief programs, and transitional housing resources paired with our regional non-profit alliance.
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-xs text-emerald-600 font-medium flex items-center gap-1">
                      <Check className="w-3 h-3 stroke-[2.5]" /> Immediate Intake Available
                    </span>
                    <button 
                      onClick={() => onNavigate('screen-13')}
                      className="px-4 py-1.5 border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-medium rounded-lg transition-colors cursor-pointer" 
                      type="button"
                    >
                      Learn More
                    </button>
                  </div>
                </div>
              </article>
            </section>

            {/* Right Column: Partner Referrals Directory */}
            <section className="lg:col-span-5" data-purpose="partner-referrals-directory">
              <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
                  <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <Users className="w-4 h-4 text-blue-500" />
                    Partner Referrals
                  </h2>
                  <span className="text-xs text-slate-400">Verified Network</span>
                </div>
                <p className="text-xs text-slate-500 mb-5">
                  Connect directly with partner organizations to receive dedicated case guidance and wrap-around support services.
                </p>

                {/* Referrals Links List */}
                <ul className="space-y-3" role="list">
                  <li>
                    <button 
                      onClick={() => onNavigate('screen-13')}
                      className="w-full text-left group flex items-center justify-between p-3 rounded-lg border border-slate-100 bg-slate-50/60 hover:bg-blue-50/50 hover:border-blue-200 transition-all cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center text-sm group-hover:bg-blue-600 group-hover:text-white transition-colors">
                          <HeartHandshake className="w-4 h-4" />
                        </div>
                        <span className="text-xs font-semibold text-slate-700 group-hover:text-blue-700 transition-colors">Local Nonprofit Organizations</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition-colors" />
                    </button>
                  </li>

                  <li>
                    <button 
                      onClick={() => onNavigate('screen-19')}
                      className="w-full text-left group flex items-center justify-between p-3 rounded-lg border border-slate-100 bg-slate-50/60 hover:bg-blue-50/50 hover:border-blue-200 transition-all cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center text-sm group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                          <Briefcase className="w-4 h-4" />
                        </div>
                        <span className="text-xs font-semibold text-slate-700 group-hover:text-blue-700 transition-colors">Workforce Development</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition-colors" />
                    </button>
                  </li>

                  <li>
                    <button 
                      onClick={() => onNavigate('screen-13')}
                      className="w-full text-left group flex items-center justify-between p-3 rounded-lg border border-slate-100 bg-slate-50/60 hover:bg-blue-50/50 hover:border-blue-200 transition-all cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center text-sm group-hover:bg-amber-600 group-hover:text-white transition-colors">
                          <Home className="w-4 h-4" />
                        </div>
                        <span className="text-xs font-semibold text-slate-700 group-hover:text-blue-700 transition-colors">Housing Assistance</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition-colors" />
                    </button>
                  </li>

                  <li>
                    <button 
                      onClick={() => onNavigate('screen-13')}
                      className="w-full text-left group flex items-center justify-between p-3 rounded-lg border border-slate-100 bg-slate-50/60 hover:bg-blue-50/50 hover:border-blue-200 transition-all cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center text-sm group-hover:bg-purple-600 group-hover:text-white transition-colors">
                          <HeartPulse className="w-4 h-4" />
                        </div>
                        <span className="text-xs font-semibold text-slate-700 group-hover:text-blue-700 transition-colors">Mental Health Services</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition-colors" />
                    </button>
                  </li>

                  <li>
                    <button 
                      onClick={() => onNavigate('screen-13')}
                      className="w-full text-left group flex items-center justify-between p-3 rounded-lg border border-slate-100 bg-slate-50/60 hover:bg-blue-50/50 hover:border-blue-200 transition-all cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-rose-100 text-rose-600 flex items-center justify-center text-sm group-hover:bg-rose-600 group-hover:text-white transition-colors">
                          <Baby className="w-4 h-4" />
                        </div>
                        <span className="text-xs font-semibold text-slate-700 group-hover:text-blue-700 transition-colors">Childcare Support</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition-colors" />
                    </button>
                  </li>
                </ul>

                {/* Additional Help Banner */}
                <div className="mt-6 p-4 rounded-lg bg-slate-50 border border-slate-200/80 text-center">
                  <p className="text-xs text-slate-600 font-medium">Need custom assistance?</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">Your Navigator can submit referrals on your behalf.</p>
                  <button 
                    onClick={() => onNavigate('screen-13')}
                    className="mt-3 w-full py-1.5 px-3 bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 text-xs font-medium rounded-md shadow-xs transition cursor-pointer" 
                    type="button"
                  >
                    Request Navigator Help
                  </button>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};
