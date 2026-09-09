'use client';

import React, { useState } from 'react';
import { ScreenId } from './screenTypes';
import { SalonSidebar } from './SalonSidebar';
import { 
  Search, 
  Plus, 
  Phone, 
  Mail, 
  ShieldCheck, 
  Heart, 
  Calendar,
  Sparkles,
  Scissors
} from 'lucide-react';

interface Screen15Props {
  onNavigate: (screen: ScreenId) => void;
}

export const Screen15SalonClientsPets: React.FC<Screen15Props> = ({ onNavigate }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'vip' | 'special'>('all');

  const clients = [
    {
      id: '1',
      name: 'Sarah Jenkins',
      phone: '(555) 234-8901',
      email: 'sarah.j@example.com',
      petName: 'Max',
      breed: 'Golden Retriever',
      age: '3 yrs',
      rabies: 'Valid thru 11/2026',
      notes: 'Very gentle, enjoys head scratches, use oatmeal shampoo.',
      visits: 8,
      vip: false,
      specialHandling: false
    },
    {
      id: '2',
      name: 'Jessica Pearson',
      phone: '(555) 431-7782',
      email: 'j.pearson@example.com',
      petName: 'Barnaby',
      breed: 'Mini Poodle',
      age: '4 yrs',
      rabies: 'Valid thru 09/2026',
      notes: 'High energy, requires precision scissor finish on muzzle.',
      visits: 14,
      vip: true,
      specialHandling: false
    },
    {
      id: '3',
      name: 'Mike Ross',
      phone: '(555) 872-1290',
      email: 'mike.ross@example.com',
      petName: 'Luna',
      breed: 'French Bulldog',
      age: '2 yrs',
      rabies: 'Valid thru 05/2026',
      notes: 'Sensitive ear canal skin, use low heat drying and lukewarm water.',
      visits: 4,
      vip: false,
      specialHandling: true
    },
    {
      id: '4',
      name: 'Donna Paulsen',
      phone: '(555) 902-3344',
      email: 'donna.p@example.com',
      petName: 'Charlie',
      breed: 'Labradoodle',
      age: '1 yr',
      rabies: 'Valid thru 01/2027',
      notes: 'Puppy coat transition phase. Introduce dryer sound gradually.',
      visits: 3,
      vip: false,
      specialHandling: true
    }
  ];

  const filtered = clients.filter(c => {
    if (activeTab === 'vip' && !c.vip) return false;
    if (activeTab === 'special' && !c.specialHandling) return false;
    if (searchTerm) {
      const match = c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                    c.petName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    c.breed.toLowerCase().includes(searchTerm.toLowerCase());
      if (!match) return false;
    }
    return true;
  });

  return (
    <div className="h-screen font-sans text-slate-800 antialiased flex bg-slate-50 overflow-hidden">
      {/* Sidebar Navigation */}
      <SalonSidebar currentScreen="screen-15" onNavigate={onNavigate} />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 bg-[#f8fafc] overflow-y-auto">
        {/* Top Header */}
        <header className="bg-white border-b border-slate-200 px-8 py-4 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-4 flex-1 max-w-md">
            <div className="relative w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search clients, dog names, phone numbers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs border border-slate-200 rounded-lg outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg shadow-sm transition cursor-pointer">
              <Plus className="w-4 h-4" />
              <span>Add Client Profile</span>
            </button>
          </div>
        </header>

        {/* Directory Content */}
        <div className="p-8 max-w-6xl w-full mx-auto space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Clients &amp; Pets Directory</h1>
              <p className="text-sm text-slate-500 mt-0.5">Manage health documentation, vaccination dates, and handling notes.</p>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-2 bg-white border border-slate-200 p-1 rounded-lg">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-3 py-1 text-xs font-medium rounded-md transition cursor-pointer ${
                  activeTab === 'all' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                All Clients ({clients.length})
              </button>
              <button
                onClick={() => setActiveTab('vip')}
                className={`px-3 py-1 text-xs font-medium rounded-md transition cursor-pointer ${
                  activeTab === 'vip' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                VIP Members
              </button>
              <button
                onClick={() => setActiveTab('special')}
                className={`px-3 py-1 text-xs font-medium rounded-md transition cursor-pointer ${
                  activeTab === 'special' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                Special Handling
              </button>
            </div>
          </div>

          {/* Client Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filtered.map((client) => (
              <div 
                key={client.id}
                className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition flex flex-col justify-between"
              >
                <div>
                  {/* Card Header */}
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-base font-bold text-slate-900">{client.name}</h3>
                        {client.vip && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                            <Sparkles className="w-3 h-3" /> VIP
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
                        <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> {client.phone}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1"><Mail className="w-3 h-3" /> {client.email}</span>
                      </div>
                    </div>

                    <span className="px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 text-xs font-bold">
                      {client.visits} Visits
                    </span>
                  </div>

                  {/* Pet Info Box */}
                  <div className="mt-4 p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
                          {client.petName.charAt(0)}
                        </span>
                        <div>
                          <span className="text-sm font-bold text-slate-900">{client.petName}</span>
                          <span className="text-xs text-slate-500 ml-1.5 font-medium">({client.breed}, {client.age})</span>
                        </div>
                      </div>

                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        {client.rabies}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 italic bg-white p-2.5 rounded-lg border border-slate-200/60 mt-2">
                      &quot;{client.notes}&quot;
                    </p>
                  </div>
                </div>

                {/* Footer Buttons */}
                <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <button 
                    onClick={() => onNavigate('screen-16')}
                    className="text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
                  >
                    View Billing History
                  </button>

                  <button
                    onClick={() => onNavigate('screen-14')}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg shadow-sm transition cursor-pointer"
                  >
                    <Scissors className="w-3.5 h-3.5" />
                    <span>Book Groom</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};
