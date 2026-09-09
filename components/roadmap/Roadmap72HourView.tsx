'use client';

import React, { useState } from 'react';
import { 
  Clock, 
  CheckCircle2, 
  ShieldCheck, 
  Layers, 
  Cpu, 
  Bug, 
  TrendingUp, 
  Award, 
  FileText, 
  ChevronRight,
  GitBranch,
  Sparkles,
  Zap,
  Terminal,
  Compass
} from 'lucide-react';

export const Roadmap72HourView: React.FC = () => {
  const [activeSection, setActiveSection] = useState<'plan' | 'requirements' | 'technical' | 'testing' | 'competitors'>('plan');

  const [completedTasks, setCompletedTasks] = useState<Record<string, boolean>>({
    't-01': true,
    't-02': true,
    't-03': true,
    't-04': true,
    't-05': true,
    't-06': true,
    't-07': true,
    't-08': true,
    't-09': true,
    't-10': true,
    't-11': true,
    't-12': true,
  });

  const toggleTask = (id: string) => {
    setCompletedTasks(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="rounded-2xl border border-blue-200 bg-gradient-to-r from-blue-50/80 via-indigo-50/50 to-white p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="rounded-md bg-blue-600 px-2.5 py-0.5 text-xs font-bold text-white tracking-wide">
                ENGINEERING EXECUTION PLAN
              </span>
              <span className="text-xs font-semibold text-blue-900 font-mono">
                TARGET: 72-HOUR GA SHIPMENT
              </span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              Scenario Builder Module: Technical Architecture & 72-Hour Product Plan
            </h2>
            <p className="text-xs text-slate-600 max-w-3xl leading-relaxed">
              Deconstructed roadmap engineered to rival Articulate 360 Rise and BranchTrack by fusing AI prompt-chained DAG generation, interactive branch simulation, and SCORM 2004 / xAPI interoperability.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-white rounded-xl border border-blue-200/80 p-3 shadow-xs">
            <div className="text-right">
              <div className="text-xs font-bold text-slate-900">Sprint Health: 100%</div>
              <div className="text-[11px] text-emerald-600 font-semibold">12 of 12 Milestones Active</div>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <CheckCircle2 className="h-5 w-5" />
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-1.5 mt-6 pt-4 border-t border-blue-100">
          {[
            { id: 'plan', label: '72h Sprint Timeline', icon: Clock },
            { id: 'requirements', label: 'Requirements Breakdown', icon: FileText },
            { id: 'technical', label: 'Technical & Data Architecture', icon: Cpu },
            { id: 'testing', label: 'Testing & QA Validation Phases', icon: Bug },
            { id: 'competitors', label: 'Market Competitor Benchmark', icon: TrendingUp },
          ].map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveSection(tab.id as any)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeSection === tab.id
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-white/80 text-slate-700 hover:bg-white hover:text-slate-900 border border-slate-200/60'
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Section 1: 72h Sprint Timeline */}
      {activeSection === 'plan' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Block 1: Hour 0 - 12 */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs mb-3">
                  <span className="rounded bg-indigo-100 px-2 py-0.5 font-mono font-bold text-indigo-800">
                    HOURS 00 — 12
                  </span>
                  <span className="text-[11px] font-semibold text-emerald-600">Foundation</span>
                </div>
                <h3 className="text-sm font-bold text-slate-900 mb-2">Core DAG Schema & State Machine</h3>
                <p className="text-xs text-slate-500 mb-4 leading-relaxed">
                  Design the JSON schema for branched scenes, multi-dimensional metric deltas, and state management.
                </p>

                <ul className="space-y-2 text-xs text-slate-700">
                  {[
                    { id: 't-01', text: 'Typed SceneNode & BranchOption interfaces' },
                    { id: 't-02', text: 'Cycle & deadlock detection algorithm' },
                    { id: 't-03', text: 'Local state store with real-time undo/redo' },
                  ].map(item => (
                    <li key={item.id} className="flex items-start gap-2">
                      <input
                        type="checkbox"
                        checked={!!completedTasks[item.id]}
                        onChange={() => toggleTask(item.id)}
                        className="mt-0.5 rounded text-indigo-600 focus:ring-indigo-500"
                      />
                      <span className={completedTasks[item.id] ? 'line-through text-slate-400' : ''}>
                        {item.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-400 font-mono">
                Deliverable: Validated Data Model
              </div>
            </div>

            {/* Block 2: Hour 13 - 30 */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs mb-3">
                  <span className="rounded bg-blue-100 px-2 py-0.5 font-mono font-bold text-blue-800">
                    HOURS 13 — 30
                  </span>
                  <span className="text-[11px] font-semibold text-emerald-600">Core Engine</span>
                </div>
                <h3 className="text-sm font-bold text-slate-900 mb-2">AI Generation & Visual Flow Canvas</h3>
                <p className="text-xs text-slate-500 mb-4 leading-relaxed">
                  Build the interactive node canvas editor and integrate the Gemini 3.8 Flash automated scenario generator.
                </p>

                <ul className="space-y-2 text-xs text-slate-700">
                  {[
                    { id: 't-04', text: 'Server-side Gemini DAG generator API' },
                    { id: 't-05', text: 'Interactive Visual Flow Graph Canvas' },
                    { id: 't-06', text: 'Live Dialogue & Character Inspector' },
                  ].map(item => (
                    <li key={item.id} className="flex items-start gap-2">
                      <input
                        type="checkbox"
                        checked={!!completedTasks[item.id]}
                        onChange={() => toggleTask(item.id)}
                        className="mt-0.5 rounded text-blue-600 focus:ring-blue-500"
                      />
                      <span className={completedTasks[item.id] ? 'line-through text-slate-400' : ''}>
                        {item.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-400 font-mono">
                Deliverable: Canvas Studio & AI Gen
              </div>
            </div>

            {/* Block 3: Hour 31 - 50 */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs mb-3">
                  <span className="rounded bg-purple-100 px-2 py-0.5 font-mono font-bold text-purple-800">
                    HOURS 31 — 50
                  </span>
                  <span className="text-[11px] font-semibold text-emerald-600">Simulation</span>
                </div>
                <h3 className="text-sm font-bold text-slate-900 mb-2">Player Simulator & Voiceover TTS</h3>
                <p className="text-xs text-slate-500 mb-4 leading-relaxed">
                  Develop the learner-facing simulation player with animated avatar emotions, instant feedback, and TTS voiceover.
                </p>

                <ul className="space-y-2 text-xs text-slate-700">
                  {[
                    { id: 't-07', text: 'Character emotional state animations' },
                    { id: 't-08', text: 'Web Speech Synthesis voiceover narrator' },
                    { id: 't-09', text: 'Pedagogical feedback toast & debrief' },
                  ].map(item => (
                    <li key={item.id} className="flex items-start gap-2">
                      <input
                        type="checkbox"
                        checked={!!completedTasks[item.id]}
                        onChange={() => toggleTask(item.id)}
                        className="mt-0.5 rounded text-purple-600 focus:ring-purple-500"
                      />
                      <span className={completedTasks[item.id] ? 'line-through text-slate-400' : ''}>
                        {item.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-400 font-mono">
                Deliverable: Interactive Simulation UI
              </div>
            </div>

            {/* Block 4: Hour 51 - 72 */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs mb-3">
                  <span className="rounded bg-emerald-100 px-2 py-0.5 font-mono font-bold text-emerald-800">
                    HOURS 51 — 72
                  </span>
                  <span className="text-[11px] font-semibold text-emerald-600">Launch QA</span>
                </div>
                <h3 className="text-sm font-bold text-slate-900 mb-2">SCORM Packaging, QA & Release</h3>
                <p className="text-xs text-slate-500 mb-4 leading-relaxed">
                  Complete SCORM 2004/xAPI export engine, automated graph fuzz testing, and competitive UX polish.
                </p>

                <ul className="space-y-2 text-xs text-slate-700">
                  {[
                    { id: 't-10', text: 'SCORM 2004 4th Ed & xAPI exporter' },
                    { id: 't-11', text: 'Automated orphan & cycle stress tests' },
                    { id: 't-12', text: 'LMS embed code generator & responsive QA' },
                  ].map(item => (
                    <li key={item.id} className="flex items-start gap-2">
                      <input
                        type="checkbox"
                        checked={!!completedTasks[item.id]}
                        onChange={() => toggleTask(item.id)}
                        className="mt-0.5 rounded text-emerald-600 focus:ring-emerald-500"
                      />
                      <span className={completedTasks[item.id] ? 'line-through text-slate-400' : ''}>
                        {item.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-400 font-mono">
                Deliverable: Production GA Launch
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Section 2: Requirements Breakdown */}
      {activeSection === 'requirements' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-3">
            <div className="flex items-center gap-2 text-indigo-700 font-bold text-sm">
              <Layers className="h-4 w-4" />
              1. Functional Requirements
            </div>
            <ul className="space-y-2 text-xs text-slate-600 leading-relaxed">
              <li className="p-2 rounded-lg bg-slate-50 border border-slate-100">
                <strong>Character Studio:</strong> Configure avatars, departments, custom accent colors, and 6 emotional reaction expressions.
              </li>
              <li className="p-2 rounded-lg bg-slate-50 border border-slate-100">
                <strong>Branched Scene Graph:</strong> Dynamic DAG supporting unlimited decision points, terminal outcomes, and bidirectional node jumps.
              </li>
              <li className="p-2 rounded-lg bg-slate-50 border border-slate-100">
                <strong>Multi-Dimensional Scoring:</strong> Track Empathy, Compliance, and Efficiency simultaneously with live meter feedback.
              </li>
              <li className="p-2 rounded-lg bg-slate-50 border border-slate-100">
                <strong>AI Generation:</strong> Prompt-to-simulation in seconds with calibrated pedagogical distractor choices.
              </li>
            </ul>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-3">
            <div className="flex items-center gap-2 text-blue-700 font-bold text-sm">
              <Zap className="h-4 w-4" />
              2. Non-Functional Requirements
            </div>
            <ul className="space-y-2 text-xs text-slate-600 leading-relaxed">
              <li className="p-2 rounded-lg bg-slate-50 border border-slate-100">
                <strong>Sub-100ms Transition Latency:</strong> Zero-delay branch state switches without full page reload.
              </li>
              <li className="p-2 rounded-lg bg-slate-50 border border-slate-100">
                <strong>Accessibility (WCAG 2.1 AA):</strong> Screen reader ARIA live regions for dialogue text and high-contrast metric bars.
              </li>
              <li className="p-2 rounded-lg bg-slate-50 border border-slate-100">
                <strong>Offline Browser Compatibility:</strong> Pure client-side simulation execution after loading JSON data.
              </li>
              <li className="p-2 rounded-lg bg-slate-50 border border-slate-100">
                <strong>Embed Flexibility:</strong> Sandboxed responsive iframe embed code with postMessage event hooks for external LMS tracking.
              </li>
            </ul>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-3">
            <div className="flex items-center gap-2 text-purple-700 font-bold text-sm">
              <Award className="h-4 w-4" />
              3. Instructional Design Pedagogy
            </div>
            <ul className="space-y-2 text-xs text-slate-600 leading-relaxed">
              <li className="p-2 rounded-lg bg-slate-50 border border-slate-100">
                <strong>Cathy Moore Action Mapping:</strong> Scenarios prioritize high-consequence business actions over passive factual recall.
              </li>
              <li className="p-2 rounded-lg bg-slate-50 border border-slate-100">
                <strong>Intrinsic Feedback:</strong> Show realistic counterpart consequences rather than superficial &quot;Correct/Incorrect&quot; labels.
              </li>
              <li className="p-2 rounded-lg bg-slate-50 border border-slate-100">
                <strong>Safe-to-Fail Sandboxing:</strong> Suboptimal branches allow restorative de-escalation rather than immediate dead-end termination.
              </li>
            </ul>
          </div>
        </div>
      )}

      {/* Section 3: Technical & Data Architecture */}
      {activeSection === 'technical' && (
        <div className="space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Terminal className="h-4 w-4 text-indigo-600" />
                Directed Acyclic Graph (DAG) Formal Specification
              </h3>
              <span className="text-xs font-mono text-slate-500">JSON Schema v1.2</span>
            </div>

            <div className="rounded-xl bg-slate-950 p-4 font-mono text-xs text-emerald-400 overflow-x-auto">
              <pre>{`// DAG Representation of Branching Scenario
interface ScenarioDAG {
  id: string;                      // Globally unique scenario identifier
  startSceneId: string;            // Pointer to entry node
  characters: Character[];         // Speaker entities & avatars
  metrics: MetricDefinition[];     // [Empathy, Compliance, Efficiency]
  scenes: {
    [sceneId: string]: {
      id: string;
      characterId: string;
      characterEmotion: "neutral" | "pleased" | "frustrated" | "stressed" | "skeptical";
      dialogue: string;
      isTerminalNode?: boolean;
      outcomeType?: "success" | "failure";
      options: {
        id: string;
        text: string;
        feedback: string;
        targetSceneId: string;    // Pointers form directed edges (E) between Nodes (V)
        scoreDeltas: { empathy: number; compliance: number; efficiency: number };
      }[];
    }
  }
}`}</pre>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-600">
              <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50">
                <h4 className="font-bold text-slate-900 mb-1">State Machine & Graph Traversal</h4>
                <p>
                  Execution follows a deterministic Finite State Automaton (FSA). Each user selection triggers an edge traversal, emitting an xAPI <code>http://adlnet.gov/expapi/verbs/responded</code> statement and updating cumulative competency vectors in real time.
                </p>
              </div>

              <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50">
                <h4 className="font-bold text-slate-900 mb-1">Gemini AI Prompt Chaining</h4>
                <p>
                  Scenarios are synthesized using single-pass JSON-constrained generation on <code>gemini-3.8-flash</code>. The system prompt enforces strict DAG acyclicity and guarantees every path resolves into a definitive debrief ending.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Section 4: Testing & QA Validation Phases */}
      {activeSection === 'testing' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-3">
              <div className="flex items-center gap-2 text-indigo-700 font-bold text-sm">
                <ShieldCheck className="h-4 w-4" />
                Phase 1: Graph Topology & Cycle Verification
              </div>
              <p className="text-xs text-slate-600">
                Automated tests execute depth-first search (DFS) on every newly generated or edited scenario to ensure:
              </p>
              <ul className="list-disc pl-4 text-xs text-slate-600 space-y-1">
                <li>Zero orphaned unreachable nodes.</li>
                <li>Zero infinite loops without terminal escape conditions.</li>
                <li>At least one guaranteed reachable <code>success</code> terminal state.</li>
              </ul>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-3">
              <div className="flex items-center gap-2 text-blue-700 font-bold text-sm">
                <Bug className="h-4 w-4" />
                Phase 2: Simulation Stress & Fuzz Testing
              </div>
              <p className="text-xs text-slate-600">
                Monte Carlo path simulator traverses 10,000 random decision branches per second to verify:
              </p>
              <ul className="list-disc pl-4 text-xs text-slate-600 space-y-1">
                <li>Metric bounds clamping [0, 100] never results in NaN or undefined.</li>
                <li>SpeechSynthesis API gracefully handles rapid scene skipping.</li>
                <li>Memory heap footprint remains stable under 30MB during extended runs.</li>
              </ul>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-3">
              <div className="flex items-center gap-2 text-emerald-700 font-bold text-sm">
                <CheckCircle2 className="h-4 w-4" />
                Phase 3: SCORM & xAPI Conformancy Testing
              </div>
              <p className="text-xs text-slate-600">
                Manifest packages tested against ADL SCORM Cloud test suite:
              </p>
              <ul className="list-disc pl-4 text-xs text-slate-600 space-y-1">
                <li><code>cmi.completion_status</code> correctly signals &quot;completed&quot;.</li>
                <li><code>cmi.score.scaled</code> reports normalised 0.00-1.00 competency.</li>
                <li>xAPI statements conform strictly to IEEE 9274.1.1 standard.</li>
              </ul>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-3">
              <div className="flex items-center gap-2 text-purple-700 font-bold text-sm">
                <Compass className="h-4 w-4" />
                Phase 4: User Acceptance & Device Matrix
              </div>
              <p className="text-xs text-slate-600">
                Cross-browser validation across Chrome, Safari iOS, Edge, and Firefox:
              </p>
              <ul className="list-disc pl-4 text-xs text-slate-600 space-y-1">
                <li>Touch target dimensions &ge; 44px on mobile devices.</li>
                <li>Keyboard navigation (Tab, Enter, Space) for all branch options.</li>
                <li>Zero audio autoplay blocking issues across mobile browsers.</li>
              </ul>
            </div>

          </div>
        </div>
      )}

      {/* Section 5: Market Competitor Benchmark */}
      {activeSection === 'competitors' && (
        <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-xs">
          <div className="p-5 border-b border-slate-100 bg-slate-50">
            <h3 className="text-sm font-bold text-slate-900">
              CogniFlow Scenario Studio vs. Market Leaders
            </h3>
            <p className="text-xs text-slate-500">
              Direct comparison against Articulate 360 Rise, BranchTrack, and ProProfs AI
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100/70 text-slate-700 uppercase text-[10px] font-bold border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Feature Capability</th>
                  <th className="py-3 px-4 text-indigo-700 bg-indigo-50/50">CogniFlow (This Studio)</th>
                  <th className="py-3 px-4">Articulate Rise 360</th>
                  <th className="py-3 px-4">BranchTrack</th>
                  <th className="py-3 px-4">ProProfs AI</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                <tr>
                  <td className="py-3 px-4 font-semibold">1-Click AI Scenario Generation</td>
                  <td className="py-3 px-4 font-bold text-emerald-600 bg-indigo-50/30">✓ Full DAG in 4s (Gemini)</td>
                  <td className="py-3 px-4 text-slate-400">✗ Manual entry only</td>
                  <td className="py-3 px-4 text-slate-400">✗ Manual entry only</td>
                  <td className="py-3 px-4 text-amber-600">⚠ Simple single quizzes</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold">Natural Voiceover (TTS)</td>
                  <td className="py-3 px-4 font-bold text-emerald-600 bg-indigo-50/30">✓ Built-in Multi-Speed</td>
                  <td className="py-3 px-4 text-slate-400">✗ Upload MP3 only</td>
                  <td className="py-3 px-4 text-amber-600">⚠ Paid add-on</td>
                  <td className="py-3 px-4 text-amber-600">⚠ Basic audio tool</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold">Multi-Vector Metrics</td>
                  <td className="py-3 px-4 font-bold text-emerald-600 bg-indigo-50/30">✓ Empathy, Policy, Speed</td>
                  <td className="py-3 px-4 text-slate-400">✗ Binary pass/fail meter</td>
                  <td className="py-3 px-4 text-amber-600">✓ Single score meter</td>
                  <td className="py-3 px-4 text-slate-400">✗ Points only</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold">Visual Flow Graph Canvas</td>
                  <td className="py-3 px-4 font-bold text-emerald-600 bg-indigo-50/30">✓ Interactive DAG Node UI</td>
                  <td className="py-3 px-4 text-slate-400">✗ Stacked vertical list</td>
                  <td className="py-3 px-4 text-emerald-600">✓ Visual tree editor</td>
                  <td className="py-3 px-4 text-slate-400">✗ Form list view</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold">SCORM 2004 & xAPI Export</td>
                  <td className="py-3 px-4 font-bold text-emerald-600 bg-indigo-50/30">✓ Zero-lockin Instant Export</td>
                  <td className="py-3 px-4 text-emerald-600">✓ Included in $1,399/yr</td>
                  <td className="py-3 px-4 text-emerald-600">✓ Enterprise tier only</td>
                  <td className="py-3 px-4 text-amber-600">⚠ Paid plan required</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold">Adaptive Path Integration</td>
                  <td className="py-3 px-4 font-bold text-emerald-600 bg-indigo-50/30">✓ Dynamic Remediation Hooks</td>
                  <td className="py-3 px-4 text-slate-400">✗ Static curriculum</td>
                  <td className="py-3 px-4 text-slate-400">✗ Isolated simulation</td>
                  <td className="py-3 px-4 text-slate-400">✗ Manual rules</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
};
