'use client';

import React, { useState } from 'react';
import { ScreenId } from './screenTypes';
import { SalonSidebar } from './SalonSidebar';
import { 
  BarChart3, 
  TrendingUp, 
  Calendar, 
  Download, 
  Users, 
  Scissors, 
  PieChart,
  DollarSign
} from 'lucide-react';

interface Screen18Props {
  onNavigate: (screen: ScreenId) => void;
}

export const Screen18SalonReportsAnalytics: React.FC<Screen18Props> = ({ onNavigate }) => {
  const [period, setPeriod] = useState<'30days' | 'quarter' | 'ytd'>('30days');

  return (
    <div className="h-screen font-sans text-slate-800 antialiased flex bg-slate-50 overflow-hidden">
      {/* Sidebar Navigation */}
      <SalonSidebar currentScreen="screen-18" onNavigate={onNavigate} />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 bg-[#f8fafc] overflow-y-auto">
        {/* Top Header */}
        <header className="bg-white border-b border-slate-200 px-8 py-5 flex items-center justify-between sticky top-0 z-10">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Reports &amp; Analytics</h1>
            <p className="text-sm text-slate-500 mt-0.5">Business performance, customer retention, service popularity, and revenue forecasts.</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg text-xs font-semibold">
              <button
                onClick={() => setPeriod('30days')}
                className={`px-3 py-1.5 rounded-md transition cursor-pointer ${
                  period === '30days' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Last 30 Days
              </button>
              <button
                onClick={() => setPeriod('quarter')}
                className={`px-3 py-1.5 rounded-md transition cursor-pointer ${
                  period === 'quarter' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                This Quarter
              </button>
              <button
                onClick={() => setPeriod('ytd')}
                className={`px-3 py-1.5 rounded-md transition cursor-pointer ${
                  period === 'ytd' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Year-to-Date
              </button>
            </div>

            <button className="inline-flex items-center gap-1.5 px-3.5 py-2 border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold rounded-lg transition cursor-pointer">
              <Download className="w-4 h-4" />
              <span>Download PDF</span>
            </button>
          </div>
        </header>

        {/* Analytics Workspace */}
        <div className="p-8 max-w-6xl w-full mx-auto space-y-6">
          {/* Top Metric Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Gross Salon Revenue</span>
              <h3 className="text-2xl font-extrabold text-slate-900 mt-1">$22,350</h3>
              <div className="flex items-center gap-1 text-xs text-emerald-600 font-semibold mt-1">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>+24% vs previous period</span>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Customer Retention</span>
              <h3 className="text-2xl font-extrabold text-slate-900 mt-1">84.2%</h3>
              <span className="text-xs text-slate-500 font-medium">Industry standard: 65%</span>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Average Rebook Cycle</span>
              <h3 className="text-2xl font-extrabold text-slate-900 mt-1">5.4 wks</h3>
              <span className="text-xs text-emerald-600 font-medium">Optimal hygiene cycle</span>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Net Profit Margin</span>
              <h3 className="text-2xl font-extrabold text-emerald-600 mt-1">68.5%</h3>
              <span className="text-xs text-slate-500 font-medium">After supplies &amp; rent</span>
            </div>
          </div>

          {/* Revenue Bar Visual & Service Distribution */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Revenue Trend Visual (7 cols) */}
            <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-base font-bold text-slate-900">Revenue Progression</h3>
                    <p className="text-xs text-slate-500">Monthly gross earnings since program graduation</p>
                  </div>
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                    Continuous Growth
                  </span>
                </div>

                {/* Simulated Chart Bars */}
                <div className="space-y-4 pt-4">
                  <div>
                    <div className="flex justify-between text-xs font-semibold mb-1">
                      <span className="text-slate-700">July (Graduation Launch)</span>
                      <span className="text-slate-900 font-bold">$4,200</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-3">
                      <div className="bg-blue-400 h-3 rounded-full" style={{ width: '42%' }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-semibold mb-1">
                      <span className="text-slate-700">August</span>
                      <span className="text-slate-900 font-bold">$5,100</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-3">
                      <div className="bg-blue-500 h-3 rounded-full" style={{ width: '51%' }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-semibold mb-1">
                      <span className="text-slate-700">September</span>
                      <span className="text-slate-900 font-bold">$5,850</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-3">
                      <div className="bg-blue-600 h-3 rounded-full" style={{ width: '58.5%' }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-semibold mb-1">
                      <span className="text-slate-700">October (Projected)</span>
                      <span className="text-blue-600 font-bold">$7,200</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-3">
                      <div className="bg-blue-700 h-3 rounded-full" style={{ width: '72%' }}></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span>Data certified via Leashed.io Financial Engine</span>
                <button 
                  onClick={() => onNavigate('screen-16')}
                  className="font-bold text-blue-600 hover:underline cursor-pointer"
                >
                  View Transactions →
                </button>
              </div>
            </div>

            {/* Service Popularity Breakdown (5 cols) */}
            <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900 mb-1">Service Breakdown</h3>
                <p className="text-xs text-slate-500 mb-4">Proportion of gross bookings by service tier</p>

                <div className="space-y-3.5">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="w-3 h-3 rounded-full bg-blue-600"></span>
                      <span className="text-xs font-bold text-slate-800">Full Groom &amp; Haircut</span>
                    </div>
                    <span className="text-xs font-extrabold text-slate-900">52%</span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="w-3 h-3 rounded-full bg-indigo-500"></span>
                      <span className="text-xs font-bold text-slate-800">Bath &amp; Blowout</span>
                    </div>
                    <span className="text-xs font-extrabold text-slate-900">28%</span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="w-3 h-3 rounded-full bg-teal-500"></span>
                      <span className="text-xs font-bold text-slate-800">Deshedding Treatment</span>
                    </div>
                    <span className="text-xs font-extrabold text-slate-900">14%</span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="w-3 h-3 rounded-full bg-amber-500"></span>
                      <span className="text-xs font-bold text-slate-800">Nail Trimming &amp; Extras</span>
                    </div>
                    <span className="text-xs font-extrabold text-slate-900">6%</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 text-xs text-slate-500">
                <span>Top requested breed: <strong className="text-slate-800">Golden Retriever &bull; Doodle &bull; Poodle</strong></span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
