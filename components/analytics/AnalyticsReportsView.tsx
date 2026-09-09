'use client';

import React, { useState } from 'react';
import { LearnerReport } from '@/lib/types';
import { 
  BarChart3, 
  Sparkles, 
  TrendingUp, 
  AlertCircle, 
  CheckCircle2, 
  Users, 
  Loader2, 
  FileText, 
  ShieldAlert, 
  Send,
  Download
} from 'lucide-react';

interface AnalyticsReportsViewProps {
  reports: LearnerReport[];
}

export const AnalyticsReportsView: React.FC<AnalyticsReportsViewProps> = ({
  reports,
}) => {
  const [aiSummary, setAiSummary] = useState<{
    executiveTakeaway: string;
    healthScore: number;
    topRisks: { department: string; issue: string; severity: string }[];
    recommendations: { action: string; target: string; estimatedImpact: string }[];
  } | null>({
    executiveTakeaway: "Overall organizational compliance stands strong at 84%, but predictive heuristics highlight a critical skill gap in customer-facing escalation and phishing vigilance across junior cohorts.",
    healthScore: 84,
    topRisks: [
      {
        department: "Engineering Support",
        issue: "Learners exhibit a 42% retry rate on high-friction client dialogue nodes, indicating defensiveness under pressure.",
        severity: "High"
      },
      {
        department: "Operations",
        issue: "18% of learners have stalled at 0% progress due to lack of mobile micro-learning notification reminders.",
        severity: "Medium"
      }
    ],
    recommendations: [
      {
        action: "Deploy Targeted Empathy Scenario Drill",
        target: "Learners scoring below 70 in Escalation Simulations",
        estimatedImpact: "+24% improvement in first-call resolution"
      },
      {
        action: "Schedule Quarterly Spear-Phishing Drill",
        target: "All Staff with ERP Transaction authority",
        estimatedImpact: "Reduces security risk by 78%"
      }
    ]
  });

  const [isLoadingSummary, setIsLoadingSummary] = useState(false);

  const handleRefreshSummary = async () => {
    setIsLoadingSummary(true);
    try {
      const res = await fetch('/api/gemini/summary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          reports,
          teamMetrics: { totalLearners: reports.length, completionRate: 78 }
        })
      });
      const data = await res.json();
      setAiSummary(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoadingSummary(false);
    }
  };

  const completedCount = reports.filter(r => r.status === 'Completed').length;
  const atRiskCount = reports.filter(r => r.status === 'At Risk').length;
  const avgScenarioScore = Math.round(
    reports.reduce((acc, r) => acc + r.scenarioAverageScore, 0) / reports.length
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded-md bg-indigo-50 px-2 py-0.5 text-xs font-bold text-indigo-700 border border-indigo-200">
                PREDICTIVE ANALYTICS
              </span>
              <h2 className="text-base font-bold text-slate-900">
                AI Reports & Behavioral Simulation Insights
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              AI flags completion trends, friction bottlenecks, and scenario skill gaps across your organization before they impact operations.
            </p>
          </div>

          <button
            onClick={handleRefreshSummary}
            disabled={isLoadingSummary}
            className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-bold text-white hover:bg-indigo-700 transition-all shadow-sm"
          >
            {isLoadingSummary ? (
              <>
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                Scanning Reports...
              </>
            ) : (
              <>
                <Sparkles className="h-3.5 w-3.5" />
                Scan & Summarize with AI
              </>
            )}
          </button>
        </div>

        {/* Metric Cards Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-5 pt-4 border-t border-slate-100">
          <div className="rounded-xl bg-slate-50 p-3 border border-slate-100">
            <span className="text-[11px] font-semibold text-slate-500">Active Learners</span>
            <div className="text-xl font-bold text-slate-900 mt-0.5">{reports.length} Team Members</div>
          </div>

          <div className="rounded-xl bg-slate-50 p-3 border border-slate-100">
            <span className="text-[11px] font-semibold text-slate-500">Avg Scenario Score</span>
            <div className="text-xl font-bold text-indigo-600 mt-0.5">{avgScenarioScore}%</div>
          </div>

          <div className="rounded-xl bg-slate-50 p-3 border border-slate-100">
            <span className="text-[11px] font-semibold text-slate-500">Certified Completed</span>
            <div className="text-xl font-bold text-emerald-600 mt-0.5">{completedCount} Learners</div>
          </div>

          <div className="rounded-xl bg-slate-50 p-3 border border-slate-100">
            <span className="text-[11px] font-semibold text-slate-500">At-Risk Learners</span>
            <div className="text-xl font-bold text-rose-600 mt-0.5">{atRiskCount} Flagged</div>
          </div>
        </div>
      </div>

      {/* AI Report Summary Hero Card */}
      {aiSummary && (
        <div className="rounded-2xl border border-indigo-200 bg-gradient-to-r from-indigo-50/70 via-white to-blue-50/50 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white shadow-xs">
                <Sparkles className="h-4 w-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">AI Report Summary & Executive Takeaway</h3>
                <span className="text-[11px] text-slate-500">Instant scan generated by Gemini</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-600">Training Health Index:</span>
              <span className="rounded-full bg-emerald-100 px-3 py-0.5 text-xs font-bold text-emerald-800 border border-emerald-200">
                {aiSummary.healthScore} / 100
              </span>
            </div>
          </div>

          <div className="rounded-xl bg-white/80 p-4 border border-indigo-100 text-xs text-slate-800 leading-relaxed font-medium">
            &quot;{aiSummary.executiveTakeaway}&quot;
          </div>

          {/* Risks & Recommendations Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            {/* Top Risks */}
            <div className="space-y-2">
              <span className="text-[11px] font-bold text-rose-700 uppercase tracking-wider flex items-center gap-1">
                <ShieldAlert className="h-3.5 w-3.5" /> Identified Engagement Gaps & Risks:
              </span>
              <div className="space-y-2">
                {aiSummary.topRisks.map((risk, idx) => (
                  <div key={idx} className="rounded-xl border border-rose-100 bg-rose-50/40 p-3 text-xs">
                    <div className="flex items-center justify-between font-bold text-rose-900 mb-0.5">
                      <span>{risk.department}</span>
                      <span className="text-[10px] px-1.5 py-0.2 rounded bg-rose-100 text-rose-700">{risk.severity} Severity</span>
                    </div>
                    <p className="text-rose-800/90 text-[11px] leading-relaxed">{risk.issue}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Prescriptive Interventions */}
            <div className="space-y-2">
              <span className="text-[11px] font-bold text-indigo-700 uppercase tracking-wider flex items-center gap-1">
                <TrendingUp className="h-3.5 w-3.5" /> Prescriptive AI Interventions:
              </span>
              <div className="space-y-2">
                {aiSummary.recommendations.map((rec, idx) => (
                  <div key={idx} className="rounded-xl border border-indigo-100 bg-indigo-50/40 p-3 text-xs">
                    <div className="font-bold text-indigo-950 mb-0.5">{rec.action}</div>
                    <div className="flex items-center justify-between text-[10px] text-indigo-700 mt-1">
                      <span>Target: {rec.target}</span>
                      <span className="font-bold font-mono">{rec.estimatedImpact}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Detailed Learner Roster Table */}
      <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-xs">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Individual Learner Performance & Scenario Scores</h3>
            <p className="text-xs text-slate-500">Live progress tracking across department cohorts</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-700 uppercase text-[10px] font-bold border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Learner Name</th>
                <th className="py-3 px-4">Department</th>
                <th className="py-3 px-4">Courses (Done/Assigned)</th>
                <th className="py-3 px-4">Scenario Competency</th>
                <th className="py-3 px-4">Last Activity</th>
                <th className="py-3 px-4">Status & Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {reports.map((lr) => (
                <tr key={lr.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-3 px-4">
                    <div className="font-bold text-slate-900">{lr.name}</div>
                    <div className="text-[11px] text-slate-400">{lr.email}</div>
                  </td>
                  <td className="py-3 px-4">{lr.department}</td>
                  <td className="py-3 px-4 font-mono font-medium">
                    {lr.completedCourses} / {lr.assignedCourses}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <span className="font-bold font-mono text-slate-900">{lr.scenarioAverageScore}%</span>
                      <div className="w-16 h-1.5 rounded-full bg-slate-100 overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            lr.scenarioAverageScore >= 80 ? 'bg-emerald-500' : lr.scenarioAverageScore >= 60 ? 'bg-amber-500' : 'bg-rose-500'
                          }`}
                          style={{ width: `${lr.scenarioAverageScore}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-slate-500">{lr.lastActive}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                        lr.status === 'Completed'
                          ? 'bg-emerald-100 text-emerald-800'
                          : lr.status === 'At Risk'
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {lr.status}
                      </span>

                      {lr.status === 'At Risk' && (
                        <button
                          onClick={() => alert(`Assigned restorative adaptive scenario simulation to ${lr.name}.`)}
                          className="rounded bg-rose-50 border border-rose-200 px-2 py-0.5 text-[10px] font-semibold text-rose-700 hover:bg-rose-100"
                        >
                          Auto-Remediate
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
