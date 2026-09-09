'use client';

import React, { useState } from 'react';
import { ScreenId } from './screenTypes';
import { SalonSidebar } from './SalonSidebar';
import { 
  Megaphone, 
  Sparkles, 
  Share2, 
  Star, 
  Send, 
  Copy, 
  Check, 
  Plus, 
  TrendingUp,
  MessageCircle
} from 'lucide-react';

interface Screen17Props {
  onNavigate: (screen: ScreenId) => void;
}

export const Screen17SalonMarketingGrowth: React.FC<Screen17Props> = ({ onNavigate }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="h-screen font-sans text-slate-800 antialiased flex bg-slate-50 overflow-hidden">
      {/* Sidebar Navigation */}
      <SalonSidebar currentScreen="screen-17" onNavigate={onNavigate} />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 bg-[#f8fafc] overflow-y-auto">
        {/* Top Header */}
        <header className="bg-white border-b border-slate-200 px-8 py-5 flex items-center justify-between sticky top-0 z-10">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Marketing &amp; Growth</h1>
            <p className="text-sm text-slate-500 mt-0.5">Automate rebooking reminders, attract new pet owners, and manage reviews.</p>
          </div>

          <button className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg shadow-sm transition cursor-pointer">
            <Plus className="w-4 h-4" />
            <span>Create Campaign</span>
          </button>
        </header>

        {/* Content Body */}
        <div className="p-8 max-w-6xl w-full mx-auto space-y-6">
          {/* Top Row: Review & Referral Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Reviews Summary */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Client Reputation</span>
                  <span className="text-xs text-blue-600 font-semibold">Google Verified</span>
                </div>
                <div className="flex items-baseline gap-3 mt-3">
                  <span className="text-4xl font-extrabold text-slate-900">4.9</span>
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-current" />
                    ))}
                  </div>
                  <span className="text-xs text-slate-500 font-medium">(42 Reviews)</span>
                </div>

                <div className="mt-4 p-3.5 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-600">
                  <p className="italic leading-relaxed">
                    &quot;Taylor did such an amazing job with Barnaby! Best groomer in town, patient and super professional.&quot;
                  </p>
                  <span className="block text-slate-400 text-[11px] font-semibold mt-1">— Jessica P. (Mini Poodle Owner)</span>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-500">Auto-request reviews after check-out</span>
                <span className="text-xs font-bold text-emerald-600">Active ✓</span>
              </div>
            </div>

            {/* Referral Engine Card */}
            <div className="bg-gradient-to-br from-blue-900 to-indigo-950 text-white rounded-2xl p-6 shadow-md flex flex-col justify-between">
              <div>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold border border-blue-500/30">
                  <Share2 className="w-3.5 h-3.5" /> Viral Referral Program
                </span>
                <h3 className="text-xl font-bold mt-2">Give $10, Get $10</h3>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  Every time an existing client invites a neighbor, both receive $10 toward their next premium bath or haircut.
                </p>

                {/* Referral Link Copy Bar */}
                <div className="mt-4 flex items-center gap-2 bg-white/10 backdrop-blur-md p-2 rounded-xl border border-white/10">
                  <input
                    type="text"
                    readOnly
                    value="https://bellasalon.leashed.io/invite?ref=TAYLOR"
                    className="bg-transparent text-xs text-slate-200 outline-none flex-1 px-2 font-mono"
                  />
                  <button
                    onClick={handleCopy}
                    className="px-3 py-1 bg-white text-blue-950 font-bold text-xs rounded-lg hover:bg-slate-100 transition flex items-center gap-1 cursor-pointer shrink-0"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
              </div>

              <div className="mt-4 text-xs text-slate-300 flex items-center justify-between">
                <span>14 new clients acquired this quarter</span>
                <span className="font-bold text-emerald-400">+$1,120 revenue</span>
              </div>
            </div>
          </div>

          {/* Active Campaigns List */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <h2 className="text-base font-bold text-slate-900 mb-4">Active Automated Campaigns</h2>

            <div className="space-y-4">
              {/* Campaign 1 */}
              <div className="p-4 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-slate-900">6-Week Rebooking SMS Reminder</h4>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        Running
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">Sends automated text message 42 days after last grooming service.</p>
                  </div>
                </div>

                <div className="flex items-center gap-6 text-xs text-right">
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase">Sent / Clicked</span>
                    <span className="font-bold text-slate-800">48 sent &bull; 86% opened</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase">Conversion</span>
                    <span className="font-bold text-emerald-600">74% rebooked</span>
                  </div>
                </div>
              </div>

              {/* Campaign 2 */}
              <div className="p-4 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-slate-900">Puppy First-Groom Package (15% Off)</h4>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        Running
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">Social media lead page campaign targeting new puppy parents in 5-mile radius.</p>
                  </div>
                </div>

                <div className="flex items-center gap-6 text-xs text-right">
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase">Total Leads</span>
                    <span className="font-bold text-slate-800">18 new signups</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase">Booked Revenue</span>
                    <span className="font-bold text-emerald-600">$1,350 booked</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
