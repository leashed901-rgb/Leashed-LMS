'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { 
  TenantSlug, 
  ENTERPRISE_TENANTS, 
  SEEDED_ENTERPRISE_USERS,
  MultiTenantService,
  EnterpriseUser
} from '@/lib/db/multiTenantService';
import { 
  ShieldCheck, 
  Lock, 
  KeyRound, 
  AlertCircle, 
  ArrowRight, 
  ArrowLeft,
  CheckCircle2, 
  Eye, 
  EyeOff, 
  Server,
  Layers,
  Sparkles,
  ExternalLink
} from 'lucide-react';

interface FullPageAuthProps {
  tenantSlug: TenantSlug;
  onSuccess: (user: EnterpriseUser) => void;
  onNavigateBack: () => void;
  onSwitchTenant: (tenant: TenantSlug) => void;
}

export const FullPageAuth: React.FC<FullPageAuthProps> = ({
  tenantSlug,
  onSuccess,
  onNavigateBack,
  onSwitchTenant,
}) => {
  const tenant = ENTERPRISE_TENANTS[tenantSlug];
  const seeded = SEEDED_ENTERPRISE_USERS[tenantSlug];

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fast prefill for demonstration
  const handleUseEnterpriseDemo = () => {
    setEmail(seeded.email);
    setPassword('Enterprise2026!Secured');
    setError(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    setTimeout(() => {
      const authResult = MultiTenantService.authenticateUser(tenantSlug, email, password);
      setIsSubmitting(false);

      if (!authResult.success) {
        setError(authResult.error || 'Authentication failed. Please verify your credentials.');
        return;
      }

      if (authResult.user) {
        onSuccess(authResult.user);
      }
    }, 400);
  };

  return (
    <div className="min-h-screen w-full bg-slate-950 text-slate-100 flex flex-col font-sans relative overflow-hidden">
      {/* Background Ambience tailored to tenant */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div 
          className={`absolute -top-40 -left-40 w-96 h-96 rounded-full blur-3xl ${
            tenantSlug === 'global' 
              ? 'bg-rose-600' 
              : tenantSlug === 'instructor' 
              ? 'bg-indigo-600' 
              : tenantSlug === 'partner' 
              ? 'bg-teal-600' 
              : 'bg-blue-600'
          }`} 
        />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full blur-3xl bg-slate-700" />
      </div>

      {/* Top Enterprise Security Header */}
      <header className="w-full border-b border-slate-800/80 bg-slate-900/60 backdrop-blur-md px-6 py-4 flex items-center justify-between z-10">
        <div className="flex items-center gap-3">
          <button
            onClick={onNavigateBack}
            className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white px-2.5 py-1.5 rounded-lg border border-slate-700/60 hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Public Front Door</span>
          </button>
          
          <div className="h-4 w-px bg-slate-800 hidden sm:block" />

          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-slate-400">Target Domain:</span>
            <span className="font-mono text-xs font-bold text-white bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
              {tenant.domain}
            </span>
          </div>
        </div>

        {/* Tenant Switching Quick-Bar for Testing */}
        <div className="hidden md:flex items-center gap-2">
          <span className="text-xs text-slate-400">Switch URL:</span>
          <div className="flex items-center bg-slate-900 p-0.5 rounded-lg border border-slate-800 text-xs">
            {(['learn', 'instructor', 'partner', 'global'] as TenantSlug[]).map((slug) => (
              <button
                key={slug}
                onClick={() => onSwitchTenant(slug)}
                className={`px-2.5 py-1 rounded text-xs font-medium cursor-pointer transition-colors ${
                  tenantSlug === slug
                    ? 'bg-blue-600 text-white font-semibold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {slug}.leashed.io
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-8 z-10">
        <div className="w-full max-w-md bg-slate-900/90 border border-slate-800 rounded-2xl shadow-2xl p-6 sm:p-8 backdrop-blur-xl">
          {/* Tenant Badge & Title */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-3 border border-slate-700 bg-slate-800 text-blue-400">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
              <span>{tenant.badge}</span>
            </div>

            <h1 className="text-2xl font-bold tracking-tight text-white mb-2">
              {tenantSlug === 'learn' && 'Student Portal Sign In'}
              {tenantSlug === 'instructor' && 'Faculty & Evaluator Portal'}
              {tenantSlug === 'partner' && 'Workforce Partner Gateway'}
              {tenantSlug === 'global' && 'Global System Administration'}
            </h1>
            
            <p className="text-sm text-slate-400 leading-relaxed">
              {tenant.tagline}
            </p>
          </div>

          {/* Hardened Security & Zero Role-Switching Guarantee */}
          <div className="mb-6 p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-xs text-slate-300 flex items-start gap-2.5">
            <Lock className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <div className="font-semibold text-white flex items-center gap-2">
                <span>Domain Authority Locked</span>
                <span className="text-[10px] bg-emerald-950 border border-emerald-800 text-emerald-400 font-bold px-1.5 py-0.2 rounded uppercase">
                  {tenant.role}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Client role-switching is disabled. Credentials strictly bound to <code className="text-slate-300 font-mono">{tenant.domain}</code>.
              </p>
            </div>
          </div>

          {/* Error Banner */}
          {error && (
            <div className="mb-6 p-3.5 rounded-xl bg-rose-950/60 border border-rose-800 text-xs text-rose-200 flex items-start gap-2.5 animate-fadeIn">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <div className="leading-relaxed">
                <span className="font-semibold block mb-0.5">Access Authorization Fault</span>
                {error}
              </div>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Enterprise Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={`user@${tenant.domain}`}
                className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors font-mono"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-medium text-slate-300">
                  Password
                </label>
                <a
                  href="#forgot-password"
                  onClick={(e) => {
                    e.preventDefault();
                    setError('Enterprise password recovery: please contact your institutional tenant administrator.');
                  }}
                  className="text-xs text-blue-400 hover:text-blue-300 transition-colors"
                >
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors pr-10 font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me & MFA notice */}
            <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-slate-700 bg-slate-950 text-blue-600 focus:ring-blue-500 w-3.5 h-3.5"
                />
                <span>Remember session for 24 hours</span>
              </label>

              {tenant.complianceTier === 'Global-Root-NIST' && (
                <span className="text-[10px] text-amber-400 font-semibold uppercase tracking-wider">
                  MFA Enforced
                </span>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-2 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 active:scale-[0.99] transition-all shadow-md cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>Authenticating with {tenant.domain}...</span>
              ) : (
                <>
                  <span>Sign In to {tenant.domain}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Preload Button */}
          <div className="mt-5 pt-4 border-t border-slate-800">
            <button
              type="button"
              onClick={handleUseEnterpriseDemo}
              className="w-full py-2 px-3 rounded-lg bg-slate-800/80 hover:bg-slate-800 text-xs font-medium text-slate-300 hover:text-white border border-slate-700/80 transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <KeyRound className="w-3.5 h-3.5 text-blue-400" />
              <span>Use Verified Enterprise Demo Credentials</span>
            </button>
            <p className="text-[11px] text-slate-500 text-center mt-2 font-mono">
              Prefills: {seeded.email}
            </p>
          </div>

          {/* Compliance & Audit Footer */}
          <div className="mt-6 text-center text-[11px] text-slate-500">
            <p>{tenant.securityNotice}</p>
            <p className="mt-1 text-slate-600">
              EDA AI Upskill Accelerator Framework • Title IV & FERPA Compliant
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-4 border-t border-slate-900 text-center text-xs text-slate-600">
        &copy; {new Date().getFullYear()} Leashed.io Enterprise Multi-Tenant Infrastructure. All rights reserved.
      </footer>
    </div>
  );
};
