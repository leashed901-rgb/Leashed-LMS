'use client';

import React from 'react';
import { AlertTriangle, Check, X } from 'lucide-react';

interface WorkspaceConfirmDialogProps {
  isOpen: boolean;
  title: string;
  description: string;
  impactDetails?: string[];
  confirmLabel?: string;
  isDestructive?: boolean;
  isProcessing?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export const WorkspaceConfirmDialog: React.FC<WorkspaceConfirmDialogProps> = ({
  isOpen,
  title,
  description,
  impactDetails,
  confirmLabel = 'Confirm & Proceed',
  isDestructive = false,
  isProcessing = false,
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div 
        id="workspace-confirm-dialog"
        className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl border border-slate-200"
      >
        <div className="flex items-start gap-4">
          <div className={`p-3 rounded-xl shrink-0 ${
            isDestructive ? 'bg-rose-50 text-rose-600 border border-rose-200' : 'bg-amber-50 text-amber-600 border border-amber-200'
          }`}>
            <AlertTriangle className="h-6 w-6" />
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="text-base font-bold text-slate-900 leading-snug">
              {title}
            </h3>
            <p className="mt-1.5 text-xs text-slate-600 leading-relaxed">
              {description}
            </p>

            {impactDetails && impactDetails.length > 0 && (
              <div className="mt-3 rounded-lg bg-slate-50 p-3 border border-slate-200 text-xs text-slate-700 space-y-1.5">
                <span className="font-semibold text-slate-800 block text-[11px] uppercase tracking-wider">
                  Affected Google Workspace Resources:
                </span>
                <ul className="list-disc list-inside space-y-1 text-slate-600 pl-1">
                  {impactDetails.map((detail, idx) => (
                    <li key={idx} className="leading-normal">{detail}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
          <button
            type="button"
            id="btn-workspace-cancel"
            onClick={onCancel}
            disabled={isProcessing}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-100 border border-slate-300 transition-colors disabled:opacity-50"
          >
            <X className="h-3.5 w-3.5" />
            Cancel
          </button>

          <button
            type="button"
            id="btn-workspace-confirm"
            onClick={onConfirm}
            disabled={isProcessing}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold text-white shadow-sm transition-all disabled:opacity-50 ${
              isDestructive
                ? 'bg-rose-600 hover:bg-rose-700'
                : 'bg-indigo-600 hover:bg-indigo-700'
            }`}
          >
            {isProcessing ? (
              <span className="flex items-center gap-2">
                <span className="h-3.5 w-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Processing...
              </span>
            ) : (
              <>
                <Check className="h-3.5 w-3.5" />
                {confirmLabel}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
