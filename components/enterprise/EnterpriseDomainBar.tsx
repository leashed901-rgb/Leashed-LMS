'use client';

import React from 'react';
import { 
  TenantSlug, 
  ENTERPRISE_TENANTS, 
  EnterpriseUser 
} from '@/lib/db/multiTenantService';
import { 
  ShieldCheck, 
  Lock, 
  Server, 
  Globe, 
  ExternalLink,
  Layers,
  ChevronDown
} from 'lucide-react';

interface EnterpriseDomainBarProps {
  currentTenant: TenantSlug;
  onSwitchTenant: (tenant: TenantSlug) => void;
  currentUser: EnterpriseUser | null;
  onOpenWorklogModal?: () => void;
}

export const EnterpriseDomainBar: React.FC<EnterpriseDomainBarProps> = ({
  currentTenant,
  onSwitchTenant,
  currentUser,
  onOpenWorklogModal,
}) => {
  const tenant = ENTERPRISE_TENANTS[currentTenant];

  return (
    <div className="w-full bg-slate-950 text-slate-200 border-b border-slate-800 text-xs py-1.5 px-3 sm:px-6 flex flex-wrap items-center justify-between gap-2 shadow-xs z-50">
      {/* Left: Enterprise Domain Indicator */}
      <div className="flex items-center gap-2.5 flex-wrap">
        <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-700/80 rounded px-2.5 py-1 text-slate-300 font-mono text-[11px]">
          <Lock className="w-3 h-3 text-emerald-400" />
          <span className="text-slate-400">https://</span>
          <span className="font-bold text-white tracking-tight">{tenant.domain}</span>
          <span className="hidden md:inline-block text-[10px] text-emerald-400 bg-emerald-950/80 border border-emerald-800/80 px-1.5 py-0.2 rounded font-sans uppercase tracking-wider font-semibold ml-1">
            256-Bit TLS
          </span>
        </div>

        <div className="hidden lg:flex items-center gap-2 text-slate-400 text-[11px]">
          <span className="flex items-center gap-1">
            <Server className="w-3 h-3 text-blue-400" />
            <span>SQL Multi-Tenant RLS: <strong className="text-slate-200 font-medium">Enforced</strong></span>
          </span>
          <span className="text-slate-600">|</span>
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-indigo-400" />
            <span>Compliance: <strong className="text-slate-200 font-medium">EDA-2026</strong></span>
          </span>
        </div>
      </div>

      {/* Right: Tenant Portal Switcher (Quick Portal Navigation) */}
      <div className="flex items-center gap-2">
        <span className="hidden sm:inline text-slate-400 text-[11px] font-medium">Portal:</span>
        <div className="flex items-center bg-slate-900/90 p-0.5 rounded border border-slate-800">
          {(['learn', 'instructor', 'partner', 'global'] as TenantSlug[]).map((slug) => {
            const t = ENTERPRISE_TENANTS[slug];
            const isActive = currentTenant === slug;
            return (
              <button
                key={slug}
                onClick={() => onSwitchTenant(slug)}
                className={`px-2.5 py-0.5 rounded text-[11px] font-medium transition-all cursor-pointer ${
                  isActive
                    ? 'bg-blue-600 text-white font-semibold shadow-xs'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
                title={`Switch to ${t.name} (${t.domain})`}
              >
                {slug === 'learn' && 'learn (front door)'}
                {slug === 'instructor' && 'instructor'}
                {slug === 'partner' && 'partner'}
                {slug === 'global' && 'global (admin)'}
              </button>
            );
          })}
        </div>

        {/* Worklog Button */}
        {onOpenWorklogModal && (
          <button
            onClick={onOpenWorklogModal}
            className="flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 text-[11px] font-medium transition-colors cursor-pointer"
            title="Inspect Enterprise Architecture Worklog"
          >
            <Layers className="w-3 h-3 text-amber-400" />
            <span className="hidden sm:inline">Worklog</span>
          </button>
        )}
      </div>
    </div>
  );
};
