'use client';

import React, { useState } from 'react';
import { LearningPath, Course } from '@/lib/types';
import { 
  Compass, 
  GitBranch, 
  Sparkles, 
  Users, 
  Clock, 
  CheckCircle2, 
  ArrowRight, 
  Plus, 
  ShieldCheck,
  Zap,
  Sliders
} from 'lucide-react';

interface LearningPathsViewProps {
  paths: LearningPath[];
  courses: Course[];
  onSelectCourse: (courseId: string) => void;
  onLaunchScenario: (scenarioId?: string) => void;
}

export const LearningPathsView: React.FC<LearningPathsViewProps> = ({
  paths,
  courses,
  onSelectCourse,
  onLaunchScenario,
}) => {
  const [activePathId, setActivePathId] = useState<string>(paths[0]?.id || '');
  const [activePathList, setActivePathList] = useState<LearningPath[]>(paths);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newRole, setNewRole] = useState('');
  const [newDept, setNewDept] = useState('Engineering');

  const currentPath = activePathList.find(p => p.id === activePathId) || activePathList[0];

  const handleCreatePath = () => {
    if (!newRole.trim()) return;
    const newPath: LearningPath = {
      id: `path-${Date.now()}`,
      title: `${newRole} Adaptive Master Track`,
      targetRole: newRole,
      department: newDept,
      description: `Personalized, competency-based curriculum automated for ${newRole} in ${newDept}.`,
      courses: courses.map(c => c.id).slice(0, 2),
      estimatedWeeks: 3,
      activeLearners: 12,
      adaptiveRules: [
        'Initial diagnostic scenario assesses baseline judgment before unlocking advanced modules.',
        'Scenario failure triggers automated restorative micro-simulations within 48 hours.'
      ]
    };

    setActivePathList(prev => [...prev, newPath]);
    setActivePathId(newPath.id);
    setShowCreateModal(false);
    setNewRole('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded-md bg-indigo-50 px-2 py-0.5 text-xs font-bold text-indigo-700 border border-indigo-200">
                AI AUTOMATION
              </span>
              <h2 className="text-base font-bold text-slate-900">
                AI Learning Path Automation & Personalization Engine
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              AI maps multi-tiered course pathways and adjusts content sequencing automatically based on learner scenario performance.
            </p>
          </div>

          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-1.5 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-bold text-white hover:bg-indigo-700 transition-all shadow-sm"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>Generate New Path</span>
          </button>
        </div>

        {/* Path tabs */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap gap-2">
          {activePathList.map(p => (
            <button
              key={p.id}
              onClick={() => setActivePathId(p.id)}
              className={`rounded-xl px-3.5 py-2 text-xs font-bold transition-all border ${
                activePathId === p.id
                  ? 'border-indigo-600 bg-indigo-50 text-indigo-700 shadow-xs'
                  : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
              }`}
            >
              <div className="text-left">
                <div>{p.title}</div>
                <div className="text-[10px] font-normal text-slate-400 mt-0.5">{p.department} • {p.targetRole}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Path Detail */}
      {currentPath && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left 2 Cols: Pathway Sequence */}
          <div className="lg:col-span-2 space-y-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-6">
              <div>
                <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                  <span>Target Cohort: {currentPath.targetRole}</span>
                  <span>{currentPath.estimatedWeeks} Weeks Estimated Duration</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900">{currentPath.title}</h3>
                <p className="text-xs text-slate-600 mt-1">{currentPath.description}</p>
              </div>

              {/* Sequential Milestones */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Curriculum Milestones & Prerequisite Chain
                </h4>

                <div className="space-y-3 relative before:absolute before:left-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
                  {currentPath.courses.map((courseId, idx) => {
                    const c = courses.find(item => item.id === courseId);
                    if (!c) return null;

                    return (
                      <div key={courseId} className="relative flex items-start gap-4 pl-8">
                        <span className="absolute left-2.5 top-3 flex h-3.5 w-3.5 -translate-x-1/2 items-center justify-center rounded-full bg-indigo-600 text-white ring-4 ring-white" />
                        
                        <div className="flex-1 rounded-xl border border-slate-200 bg-slate-50/50 p-4 hover:bg-indigo-50/20 transition-all">
                          <div className="flex items-center justify-between gap-2">
                            <span className="rounded bg-indigo-100 px-2 py-0.5 text-[10px] font-bold text-indigo-700">
                              Step {idx + 1}
                            </span>
                            <span className="text-[11px] text-slate-500 font-mono">{c.estimatedHours} hrs</span>
                          </div>

                          <h5 className="text-xs font-bold text-slate-900 mt-1">{c.title}</h5>
                          <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-2">{c.description}</p>

                          {c.scenarioId && (
                            <div className="mt-3 flex items-center justify-between pt-2 border-t border-slate-200/60">
                              <span className="text-[11px] font-semibold text-emerald-700 flex items-center gap-1">
                                <GitBranch className="h-3 w-3" /> Includes Interactive Simulation
                              </span>
                              <button
                                onClick={() => onLaunchScenario(c.scenarioId)}
                                className="text-xs font-bold text-indigo-600 hover:text-indigo-800"
                              >
                                Test Scenario ➔
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Right Col: Adaptive Rules Engine */}
          <div className="space-y-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs space-y-4">
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
                  <Sliders className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Personalization Algorithm</h4>
                  <p className="text-[10px] text-slate-500">Live adaptation triggers</p>
                </div>
              </div>

              <div className="space-y-2.5">
                {currentPath.adaptiveRules.map((rule, rIdx) => (
                  <div key={rIdx} className="rounded-xl border border-emerald-100 bg-emerald-50/50 p-3 text-xs text-emerald-950 flex items-start gap-2">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-200 text-emerald-800 font-bold text-[10px]">
                      {rIdx + 1}
                    </span>
                    <p className="leading-relaxed">{rule}</p>
                  </div>
                ))}
              </div>

              <div className="rounded-xl bg-slate-50 p-3.5 border border-slate-100 space-y-2 text-xs">
                <div className="flex justify-between text-slate-700 font-medium">
                  <span>Enrolled Learners:</span>
                  <span className="font-bold">{currentPath.activeLearners} Active</span>
                </div>
                <div className="flex justify-between text-slate-700 font-medium">
                  <span>Cohort Completion:</span>
                  <span className="font-bold text-emerald-600">86%</span>
                </div>
                <div className="flex justify-between text-slate-700 font-medium">
                  <span>Adaptations Fired:</span>
                  <span className="font-bold text-indigo-600">24 Rules Automated</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* Modal to create path */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs animate-fadeIn">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl border border-slate-200 space-y-4">
            <h3 className="text-sm font-bold text-slate-900">Generate AI Learning Path</h3>
            <p className="text-xs text-slate-500">
              Specify the target employee role and department to auto-wire personalized learning sequences.
            </p>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Target Role</label>
                <input
                  type="text"
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value)}
                  placeholder="e.g., Solutions Architect, ICU Nurse, Account Exec"
                  className="w-full rounded-lg border border-slate-200 p-2 text-xs focus:border-indigo-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Department</label>
                <select
                  value={newDept}
                  onChange={(e) => setNewDept(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 p-2 text-xs bg-white"
                >
                  <option value="Customer Success">Customer Success</option>
                  <option value="Engineering & IT">Engineering & IT</option>
                  <option value="Finance & Operations">Finance & Operations</option>
                  <option value="Healthcare">Healthcare & Clinical</option>
                  <option value="Sales">Sales & Business Development</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setShowCreateModal(false)}
                className="rounded-lg px-4 py-2 text-xs text-slate-600 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                onClick={handleCreatePath}
                disabled={!newRole.trim()}
                className="rounded-lg bg-indigo-600 px-4 py-2 text-xs font-bold text-white hover:bg-indigo-700 disabled:opacity-50"
              >
                Automate Path
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
