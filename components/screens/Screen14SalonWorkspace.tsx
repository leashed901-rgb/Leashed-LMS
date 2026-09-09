'use client';

import React, { useState } from 'react';
import { ScreenId } from './screenTypes';
import { SalonSidebar } from './SalonSidebar';
import { 
  DollarSign, 
  Calendar, 
  Clock, 
  Plus, 
  Search, 
  Bell, 
  Filter,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

interface Screen14Props {
  onNavigate: (screen: ScreenId) => void;
}

export const Screen14SalonWorkspace: React.FC<Screen14Props> = ({ onNavigate }) => {
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'completed'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const appointments = [
    {
      id: '1',
      time: '9:00 AM',
      pet: 'Max',
      breed: 'Golden Retriever',
      service: 'Full Groom & Deshedding',
      owner: 'Sarah Jenkins',
      phone: '(555) 234-8901',
      status: 'completed',
      price: '$85.00'
    },
    {
      id: '2',
      time: '11:00 AM',
      pet: 'Luna',
      breed: 'French Bulldog',
      service: 'Bath & Nail Trim',
      owner: 'Mike Ross',
      phone: '(555) 872-1290',
      status: 'completed',
      price: '$55.00'
    },
    {
      id: '3',
      time: '1:30 PM',
      pet: 'Barnaby',
      breed: 'Mini Poodle',
      service: 'Teddy Bear Cut',
      owner: 'Jessica Pearson',
      phone: '(555) 431-7782',
      status: 'in-progress',
      price: '$95.00'
    },
    {
      id: '4',
      time: '3:00 PM',
      pet: 'Charlie',
      breed: 'Labradoodle',
      service: 'Full Groom',
      owner: 'Donna Paulsen',
      phone: '(555) 902-3344',
      status: 'upcoming',
      price: '$95.00'
    },
    {
      id: '5',
      time: '4:30 PM',
      pet: 'Bella',
      breed: 'Shih Tzu',
      service: 'Sanitary Trim & Bath',
      owner: 'Rachel Zane',
      phone: '(555) 671-5541',
      status: 'upcoming',
      price: '$50.00'
    }
  ];

  const filteredAppointments = appointments.filter(apt => {
    if (filter === 'upcoming' && apt.status !== 'upcoming') return false;
    if (filter === 'completed' && apt.status !== 'completed') return false;
    if (searchTerm) {
      const match = apt.pet.toLowerCase().includes(searchTerm.toLowerCase()) || 
                    apt.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    apt.service.toLowerCase().includes(searchTerm.toLowerCase());
      if (!match) return false;
    }
    return true;
  });

  return (
    <div className="h-screen font-sans text-slate-800 antialiased flex bg-slate-50 overflow-hidden">
      {/* Sidebar Navigation */}
      <SalonSidebar currentScreen="screen-14" onNavigate={onNavigate} />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 bg-[#f8fafc] overflow-y-auto">
        {/* Top Header */}
        <header className="bg-white border-b border-slate-200 px-8 py-4 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-4 flex-1 max-w-md">
            <div className="relative w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search appointments, pets, clients..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs border border-slate-200 rounded-lg outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition cursor-pointer">
              <Bell className="w-5 h-5" />
            </button>
            <button 
              onClick={() => onNavigate('screen-15')}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg shadow-sm transition cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>New Appointment</span>
            </button>
          </div>
        </header>

        {/* Dashboard Workspace */}
        <div className="p-8 max-w-6xl w-full mx-auto space-y-6">
          {/* Header Title */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Today&apos;s Appointments</h1>
              <p className="text-sm text-slate-500 mt-0.5">Thursday, Oct 24 • 5 Appointments Scheduled</p>
            </div>
            {/* Filter Toggle */}
            <div className="flex items-center gap-2 bg-white border border-slate-200 p-1 rounded-lg">
              <button
                onClick={() => setFilter('all')}
                className={`px-3 py-1 text-xs font-medium rounded-md transition cursor-pointer ${
                  filter === 'all' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                All (5)
              </button>
              <button
                onClick={() => setFilter('upcoming')}
                className={`px-3 py-1 text-xs font-medium rounded-md transition cursor-pointer ${
                  filter === 'upcoming' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                Upcoming (2)
              </button>
              <button
                onClick={() => setFilter('completed')}
                className={`px-3 py-1 text-xs font-medium rounded-md transition cursor-pointer ${
                  filter === 'completed' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                Completed (2)
              </button>
            </div>
          </div>

          {/* Quick Metrics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Today&apos;s Revenue</span>
                <h3 className="text-2xl font-extrabold text-slate-900 mt-1">$420.00</h3>
                <span className="text-xs text-emerald-600 font-medium">+$140 vs yesterday</span>
              </div>
              <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <DollarSign className="w-6 h-6" />
              </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Completed Sessions</span>
                <h3 className="text-2xl font-extrabold text-slate-900 mt-1">2 / 5</h3>
                <span className="text-xs text-blue-600 font-medium">40% completed</span>
              </div>
              <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6" />
              </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">In Salon Now</span>
                <h3 className="text-2xl font-extrabold text-slate-900 mt-1">1 Pet</h3>
                <span className="text-xs text-amber-600 font-medium">Barnaby (Table 1)</span>
              </div>
              <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <Clock className="w-6 h-6" />
              </div>
            </div>
          </div>

          {/* Appointments Table / List Card */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <h2 className="text-sm font-bold text-slate-900">Appointment Roster</h2>
              <span className="text-xs text-slate-500">Auto-synced with Online Booking</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-600">
                <thead className="bg-slate-50 border-b border-slate-100 uppercase tracking-wider font-semibold text-[11px] text-slate-400">
                  <tr>
                    <th className="px-6 py-3.5">Time</th>
                    <th className="px-6 py-3.5">Pet &amp; Breed</th>
                    <th className="px-6 py-3.5">Service</th>
                    <th className="px-6 py-3.5">Owner</th>
                    <th className="px-6 py-3.5">Status</th>
                    <th className="px-6 py-3.5 text-right">Price</th>
                    <th className="px-6 py-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredAppointments.map((apt) => (
                    <tr key={apt.id} className="hover:bg-slate-50/70 transition">
                      <td className="px-6 py-4 font-bold text-slate-900 whitespace-nowrap">
                        {apt.time}
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-semibold text-slate-900">{apt.pet}</div>
                        <div className="text-[11px] text-slate-400">{apt.breed}</div>
                      </td>
                      <td className="px-6 py-4 font-medium text-slate-800">
                        {apt.service}
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-medium text-slate-800">{apt.owner}</div>
                        <div className="text-[11px] text-slate-400">{apt.phone}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {apt.status === 'completed' && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                            Completed
                          </span>
                        )}
                        {apt.status === 'in-progress' && (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
                            In Salon
                          </span>
                        )}
                        {apt.status === 'upcoming' && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-slate-100 text-slate-600">
                            Upcoming
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 font-bold text-slate-900 text-right whitespace-nowrap">
                        {apt.price}
                      </td>
                      <td className="px-6 py-4 text-right whitespace-nowrap">
                        <button 
                          onClick={() => onNavigate('screen-15')}
                          className="text-blue-600 hover:text-blue-800 font-semibold text-xs hover:underline cursor-pointer"
                        >
                          View Pet Details
                        </button>
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
