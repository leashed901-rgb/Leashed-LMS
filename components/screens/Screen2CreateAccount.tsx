'use client';

import React, { useState } from 'react';
import { ScreenId } from './screenTypes';
import { ArrowRight, Lock, Mail, User, KeyRound } from 'lucide-react';

interface Screen2Props {
  onNavigate: (screen: ScreenId) => void;
}

export const Screen2CreateAccount: React.FC<Screen2Props> = ({ onNavigate }) => {
  const [fullName, setFullName] = useState('Taylor Reynolds');
  const [email, setEmail] = useState('taylor.r@learn.leashed.io');
  const [programCode, setProgramCode] = useState('COHORT-4-EDA');
  const [password, setPassword] = useState('••••••••••••');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNavigate('screen-3'); // Routes to Workspace Selection
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4 antialiased text-slate-800">
      <main className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-200/80 overflow-hidden">
        {/* Header */}
        <header className="pt-8 px-8 pb-5 border-b border-slate-100 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blue-600 text-white shadow-sm mb-4">
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
              <path d="M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-4.5-2a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zm9 0a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zM8 15c-1.657 0-3 1.343-3 3 0 2 3.5 3.5 7 3.5s7-1.5 7-3.5c0-1.657-1.343-3-3-3H8z"></path>
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Create Account</h1>
          <p className="text-sm text-slate-500 mt-1">Join Cohort 4 &bull; Pet Grooming &amp; Business Accelerator</p>
        </header>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-8 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Full Legal Name
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="First and last name"
                className="w-full pl-9 pr-4 py-2.5 text-sm border border-slate-200 rounded-xl outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full pl-9 pr-4 py-2.5 text-sm border border-slate-200 rounded-xl outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Cohort Invitation Code
            </label>
            <div className="relative">
              <KeyRound className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={programCode}
                onChange={(e) => setProgramCode(e.target.value)}
                placeholder="e.g. COHORT-4-EDA"
                className="w-full pl-9 pr-4 py-2.5 text-sm border border-slate-200 rounded-xl outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Create Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 text-sm border border-slate-200 rounded-xl outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold text-sm rounded-xl shadow-sm shadow-blue-500/20 transition cursor-pointer"
            >
              <span>Create Account</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="text-center pt-4 border-t border-slate-100">
            <p className="text-xs text-slate-500">
              Already enrolled?{' '}
              <button
                type="button"
                onClick={() => onNavigate('screen-1')}
                className="font-semibold text-blue-600 hover:underline cursor-pointer"
              >
                Sign In
              </button>
            </p>
          </div>
        </form>
      </main>
    </div>
  );
};
