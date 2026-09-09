'use client';

import React, { useState } from 'react';
import { Scenario } from '@/lib/types';
import { 
  X, 
  Sparkles, 
  Wand2, 
  Loader2, 
  Check, 
  Layers, 
  ShieldAlert, 
  HeartHandshake, 
  Users,
  Building
} from 'lucide-react';

interface AIGenerateScenarioModalProps {
  isOpen: boolean;
  onClose: () => void;
  onScenarioGenerated: (newScenario: Scenario) => void;
}

const PRESET_TOPICS = [
  {
    title: 'Customer Success: Hostile SLA Outage De-escalation',
    category: 'Customer Success',
    difficulty: 'Intermediate',
    desc: 'An enterprise client demands immediate contract termination after severe system downtime.'
  },
  {
    title: 'Healthcare: Emergency Room HIPAA Breach Under Pressure',
    category: 'Healthcare',
    difficulty: 'Advanced',
    desc: 'A prominent journalist demands patient status during a high-profile hospital crisis.'
  },
  {
    title: 'Leadership: Delivering High-Stakes Performance PIP Feedback',
    category: 'Leadership',
    difficulty: 'Intermediate',
    desc: 'Manage defensive reaction from an underperforming senior engineer with empathy and clear accountability.'
  },
  {
    title: 'Cybersecurity: Deepfake Audio CFO Wire Transfer Verification',
    category: 'Cybersecurity',
    difficulty: 'Beginner',
    desc: 'Verify urgent phone requests using multi-factor out-of-band verification protocols.'
  }
];

export const AIGenerateScenarioModal: React.FC<AIGenerateScenarioModalProps> = ({
  isOpen,
  onClose,
  onScenarioGenerated,
}) => {
  const [topic, setTopic] = useState('');
  const [department, setDepartment] = useState('Customer Success');
  const [difficulty, setDifficulty] = useState<'Beginner' | 'Intermediate' | 'Advanced'>('Intermediate');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleGenerate = async (selectedTopic?: string) => {
    const activeTopic = selectedTopic || topic;
    if (!activeTopic.trim()) return;

    setIsLoading(true);
    setErrorMsg(null);

    try {
      const res = await fetch('/api/gemini/scenario', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: activeTopic,
          difficulty,
          department,
          charactersCount: 2
        })
      });

      if (!res.ok) {
        throw new Error('Failed to generate scenario from AI');
      }

      const generated: Scenario = await res.json();
      onScenarioGenerated(generated);
      onClose();
    } catch (err: any) {
      console.error(err);
      setErrorMsg('Could not complete generation. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs animate-fadeIn">
      <div className="w-full max-w-2xl rounded-2xl bg-white shadow-2xl border border-slate-200 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 bg-gradient-to-r from-indigo-50/70 to-blue-50/70 px-6 py-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-sm">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">AI Branching Scenario Generator</h3>
              <p className="text-xs text-slate-500">
                Powered by Gemini 3.8 Flash • Generates complete character personas, DAG branches & scoring
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            disabled={isLoading}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5 overflow-y-auto max-h-[75vh]">
          {/* Custom Topic Input */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Describe Training Dilemma or Simulation Scenario
            </label>
            <textarea
              rows={3}
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g., A client threatens to leave because our newest software update wiped their custom dashboard templates..."
              className="w-full rounded-xl border border-slate-200 p-3 text-xs text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          {/* Configuration controls */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Domain / Department
              </label>
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-800"
              >
                <option value="Customer Success">Customer Success & Support</option>
                <option value="Cybersecurity">Information Security & IT</option>
                <option value="Healthcare">Healthcare & Clinical Compliance</option>
                <option value="Leadership">Executive Leadership & People Ops</option>
                <option value="Sales">High-Ticket Enterprise Sales</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Scenario Complexity
              </label>
              <div className="grid grid-cols-3 gap-1">
                {(['Beginner', 'Intermediate', 'Advanced'] as const).map((diff) => (
                  <button
                    key={diff}
                    type="button"
                    onClick={() => setDifficulty(diff)}
                    className={`rounded-lg py-1.5 text-xs font-semibold border transition-all ${
                      difficulty === diff
                        ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                        : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {diff}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Presets */}
          <div className="space-y-2 pt-1">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Or Click a Pre-Engineered Simulation Template:
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {PRESET_TOPICS.map((preset, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setTopic(preset.title);
                    setDepartment(preset.category);
                    handleGenerate(preset.title);
                  }}
                  disabled={isLoading}
                  className="rounded-xl border border-slate-200 bg-slate-50/50 p-3 text-left hover:border-indigo-500 hover:bg-indigo-50/30 hover:shadow-xs transition-all group"
                >
                  <div className="flex items-center justify-between text-[11px] font-semibold text-indigo-700 mb-1">
                    <span>{preset.category}</span>
                    <span className="text-slate-400 font-mono text-[10px]">{preset.difficulty}</span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 group-hover:text-indigo-950 line-clamp-1">
                    {preset.title.split(': ')[1] || preset.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 line-clamp-2 mt-0.5">
                    {preset.desc}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {errorMsg && (
            <div className="rounded-lg bg-rose-50 border border-rose-200 p-3 text-xs text-rose-700">
              {errorMsg}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-slate-100 bg-slate-50 px-6 py-3.5 flex items-center justify-between">
          <span className="text-xs text-slate-500">
            Generates 4-6 interconnected scene nodes with branching logic.
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              disabled={isLoading}
              className="rounded-lg px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-200 transition-colors"
            >
              Cancel
            </button>

            <button
              onClick={() => handleGenerate()}
              disabled={isLoading || !topic.trim()}
              className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2 text-xs font-bold text-white hover:bg-indigo-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  Generating DAG Simulation...
                </>
              ) : (
                <>
                  <Wand2 className="h-3.5 w-3.5" />
                  Generate Branched Scenario
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
