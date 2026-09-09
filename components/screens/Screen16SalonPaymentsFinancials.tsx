'use client';

import React, { useState } from 'react';
import { ScreenId } from './screenTypes';
import { SalonSidebar } from './SalonSidebar';
import { 
  DollarSign, 
  TrendingUp, 
  CreditCard, 
  Download, 
  Plus, 
  CheckCircle2, 
  Receipt,
  HeartHandshake
} from 'lucide-react';

interface Screen16Props {
  onNavigate: (screen: ScreenId) => void;
}

export const Screen16SalonPaymentsFinancials: React.FC<Screen16Props> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'transactions' | 'expenses' | 'payouts'>('transactions');

  const transactions = [
    {
      id: 'tx-101',
      date: 'Oct 24, 2025 • 9:45 AM',
      client: 'Sarah Jenkins',
      pet: 'Max (Golden Retriever)',
      method: 'Card (•••• 4242)',
      service: '$85.00',
      tip: '$15.00',
      total: '$100.00',
      status: 'settled'
    },
    {
      id: 'tx-102',
      date: 'Oct 24, 2025 • 11:50 AM',
      client: 'Mike Ross',
      pet: 'Luna (French Bulldog)',
      method: 'Apple Pay',
      service: '$55.00',
      tip: '$10.00',
      total: '$65.00',
      status: 'settled'
    },
    {
      id: 'tx-103',
      date: 'Oct 23, 2025 • 4:10 PM',
      client: 'Rachel Zane',
      pet: 'Bella (Shih Tzu)',
      method: 'Cash',
      service: '$50.00',
      tip: '$10.00',
      total: '$60.00',
      status: 'settled'
    },
    {
      id: 'tx-104',
      date: 'Oct 23, 2025 • 2:30 PM',
      client: 'Jessica Pearson',
      pet: 'Barnaby (Mini Poodle)',
      method: 'Card (•••• 9012)',
      service: '$95.00',
      tip: '$20.00',
      total: '$115.00',
      status: 'settled'
    }
  ];

  return (
    <div className="h-screen font-sans text-slate-800 antialiased flex bg-slate-50 overflow-hidden">
      {/* Sidebar Navigation */}
      <SalonSidebar currentScreen="screen-16" onNavigate={onNavigate} />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 bg-[#f8fafc] overflow-y-auto">
        {/* Top Header */}
        <header className="bg-white border-b border-slate-200 px-8 py-5 flex items-center justify-between sticky top-0 z-10">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Payments &amp; Financials</h1>
            <p className="text-sm text-slate-500 mt-0.5">Track point-of-sale transactions, gratuities, and salon profits.</p>
          </div>

          <div className="flex items-center gap-3">
            <button className="inline-flex items-center gap-1.5 px-3.5 py-2 border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold rounded-lg transition cursor-pointer">
              <Download className="w-4 h-4" />
              <span>Export CSV</span>
            </button>
            <button 
              onClick={() => onNavigate('screen-14')}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg shadow-sm transition cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Take Payment</span>
            </button>
          </div>
        </header>

        {/* Content Workspace */}
        <div className="p-8 max-w-6xl w-full mx-auto space-y-6">
          {/* Metrics Summary Row */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Month-to-Date Revenue</span>
              <h3 className="text-2xl font-extrabold text-slate-900 mt-1">$6,480.00</h3>
              <div className="flex items-center gap-1 text-xs text-emerald-600 font-semibold mt-1">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>+18.4% vs last mo</span>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Average Ticket</span>
              <h3 className="text-2xl font-extrabold text-slate-900 mt-1">$78.50</h3>
              <span className="text-xs text-slate-500 font-medium">82 Total transactions</span>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Tips Collected</span>
              <h3 className="text-2xl font-extrabold text-emerald-600 mt-1">$840.00</h3>
              <span className="text-xs text-emerald-700 font-medium">100% directly retained</span>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Outstanding Invoices</span>
              <h3 className="text-2xl font-extrabold text-slate-900 mt-1">$0.00</h3>
              <span className="text-xs text-emerald-600 font-medium flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> All settled
              </span>
            </div>
          </div>

          {/* Transactions Table Card */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            {/* Table Header & Filter Tabs */}
            <div className="px-6 py-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4 text-xs font-semibold">
                <button
                  onClick={() => setActiveTab('transactions')}
                  className={`pb-1 border-b-2 transition cursor-pointer ${
                    activeTab === 'transactions' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-800'
                  }`}
                >
                  Recent Transactions
                </button>
                <button
                  onClick={() => setActiveTab('expenses')}
                  className={`pb-1 border-b-2 transition cursor-pointer ${
                    activeTab === 'expenses' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-800'
                  }`}
                >
                  Operating Expenses
                </button>
                <button
                  onClick={() => setActiveTab('payouts')}
                  className={`pb-1 border-b-2 transition cursor-pointer ${
                    activeTab === 'payouts' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-800'
                  }`}
                >
                  Bank Payouts
                </button>
              </div>

              <span className="text-xs text-slate-400">Integrated with Stripe POS</span>
            </div>

            {/* Table Content */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-600">
                <thead className="bg-slate-50 border-b border-slate-100 uppercase tracking-wider font-semibold text-[11px] text-slate-400">
                  <tr>
                    <th className="px-6 py-3.5">Transaction Date</th>
                    <th className="px-6 py-3.5">Client &amp; Pet</th>
                    <th className="px-6 py-3.5">Payment Method</th>
                    <th className="px-6 py-3.5">Service Fee</th>
                    <th className="px-6 py-3.5">Tip</th>
                    <th className="px-6 py-3.5 text-right">Total Charged</th>
                    <th className="px-6 py-3.5 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {transactions.map((tx) => (
                    <tr key={tx.id} className="hover:bg-slate-50/70 transition">
                      <td className="px-6 py-4 font-semibold text-slate-900 whitespace-nowrap">
                        {tx.date}
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-bold text-slate-900">{tx.client}</div>
                        <div className="text-[11px] text-slate-400">{tx.pet}</div>
                      </td>
                      <td className="px-6 py-4 font-medium text-slate-700 whitespace-nowrap">
                        {tx.method}
                      </td>
                      <td className="px-6 py-4 font-medium text-slate-800">
                        {tx.service}
                      </td>
                      <td className="px-6 py-4 font-semibold text-emerald-600">
                        {tx.tip}
                      </td>
                      <td className="px-6 py-4 font-extrabold text-slate-900 text-right whitespace-nowrap">
                        {tx.total}
                      </td>
                      <td className="px-6 py-4 text-right whitespace-nowrap">
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          <CheckCircle2 className="w-3 h-3" /> Settled
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
