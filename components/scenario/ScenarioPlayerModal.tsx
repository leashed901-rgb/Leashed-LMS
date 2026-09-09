'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Scenario, SceneNode, BranchOption, Character } from '@/lib/types';
import { 
  X, 
  Volume2, 
  VolumeX, 
  RotateCcw, 
  ArrowRight, 
  Trophy, 
  AlertTriangle, 
  Award, 
  CheckCircle2, 
  Sparkles,
  Sliders,
  ShieldCheck,
  HeartHandshake,
  Zap
} from 'lucide-react';

interface ScenarioPlayerModalProps {
  scenario: Scenario;
  initialSceneId?: string;
  isOpen: boolean;
  onClose: () => void;
}

export const ScenarioPlayerModal: React.FC<ScenarioPlayerModalProps> = (props) => {
  if (!props.isOpen) return null;

  return (
    <ScenarioPlayerModalContent
      key={`${props.scenario.id}-${props.initialSceneId || 'root'}`}
      {...props}
    />
  );
};

const ScenarioPlayerModalContent: React.FC<ScenarioPlayerModalProps> = ({
  scenario,
  initialSceneId,
  onClose,
}) => {
  const startScene = initialSceneId || scenario.startSceneId;
  const [currentSceneId, setCurrentSceneId] = useState<string>(startScene);
  const [history, setHistory] = useState<{ sceneId: string; optionChosen?: BranchOption }[]>([
    { sceneId: startScene }
  ]);
  
  // Dynamic metrics state
  const [metrics, setMetrics] = useState({
    empathy: scenario.metrics.find(m => m.key === 'empathy')?.startingValue ?? 60,
    compliance: scenario.metrics.find(m => m.key === 'compliance')?.startingValue ?? 70,
    efficiency: scenario.metrics.find(m => m.key === 'efficiency')?.startingValue ?? 60,
  });

  // Recent score feedback animation
  const [lastDelta, setLastDelta] = useState<{ label: string; value: number } | null>(null);

  // Immediate choice feedback dialog state
  const [activeFeedback, setActiveFeedback] = useState<{
    option: BranchOption;
    targetSceneId: string;
  } | null>(null);

  // Audio Voiceover State (Web Speech API)
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechRate, setSpeechRate] = useState(1.0);
  const [autoNarrate, setAutoNarrate] = useState(true);

  const currentScene: SceneNode = scenario.scenes[currentSceneId] || scenario.scenes[scenario.startSceneId];
  const character: Character = scenario.characters.find(c => c.id === currentScene?.characterId) || {
    id: 'unknown',
    name: 'Narrator',
    role: 'Simulation Voice',
    department: 'LMS',
    avatar: '🎙️',
    accentColor: '#6366f1'
  };

  // Voiceover playback function
  const handleSpeakDialogue = (textToSpeak?: string) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    
    window.speechSynthesis.cancel();

    if (isSpeaking) {
      setIsSpeaking(false);
      return;
    }

    const text = textToSpeak || `${character.name} says: ${currentScene.dialogue}`;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = speechRate;
    utterance.pitch = 1.0;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  // Trigger auto-voiceover when scene updates
  useEffect(() => {
    if (!autoNarrate || !currentScene) return;
    const text = `${character.name} says: ${currentScene.dialogue}`;
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = speechRate;
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    }
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [currentSceneId, autoNarrate, character.name, currentScene, speechRate]);

  const handleSelectOption = (opt: BranchOption) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);

    // Apply score deltas
    const newEmpathy = Math.max(0, Math.min(100, metrics.empathy + (opt.scoreDeltas.empathy || 0)));
    const newCompliance = Math.max(0, Math.min(100, metrics.compliance + (opt.scoreDeltas.compliance || 0)));
    const newEfficiency = Math.max(0, Math.min(100, metrics.efficiency + (opt.scoreDeltas.efficiency || 0)));

    setMetrics({
      empathy: newEmpathy,
      compliance: newCompliance,
      efficiency: newEfficiency,
    });

    if (opt.scoreDeltas.empathy !== 0) {
      setLastDelta({ label: 'Empathy', value: opt.scoreDeltas.empathy });
    } else if (opt.scoreDeltas.compliance !== 0) {
      setLastDelta({ label: 'Compliance', value: opt.scoreDeltas.compliance });
    } else if (opt.scoreDeltas.efficiency !== 0) {
      setLastDelta({ label: 'Speed', value: opt.scoreDeltas.efficiency });
    }

    // Present pedagogical feedback modal before transitioning scene
    setActiveFeedback({
      option: opt,
      targetSceneId: opt.targetSceneId,
    });
  };

  const handleContinueAfterFeedback = () => {
    if (!activeFeedback) return;
    const nextTarget = activeFeedback.targetSceneId;
    setActiveFeedback(null);
    setHistory(prev => [...prev, { sceneId: nextTarget, optionChosen: activeFeedback.option }]);
    setCurrentSceneId(nextTarget);
  };

  const handleRestart = () => {
    const startId = initialSceneId || scenario.startSceneId;
    setCurrentSceneId(startId);
    setHistory([{ sceneId: startId }]);
    setMetrics({
      empathy: scenario.metrics.find(m => m.key === 'empathy')?.startingValue ?? 60,
      compliance: scenario.metrics.find(m => m.key === 'compliance')?.startingValue ?? 70,
      efficiency: scenario.metrics.find(m => m.key === 'efficiency')?.startingValue ?? 60,
    });
    setActiveFeedback(null);
    setLastDelta(null);
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
  };

  const isTerminal = currentScene.isTerminalNode || !currentScene.options || currentScene.options.length === 0;
  const isSuccess = currentScene.outcomeType === 'success';
  const isFailure = currentScene.outcomeType === 'failure';

  const emotionColors: Record<string, string> = {
    neutral: 'bg-slate-100 text-slate-800 border-slate-200',
    pleased: 'bg-emerald-100 text-emerald-900 border-emerald-300',
    frustrated: 'bg-rose-100 text-rose-900 border-rose-300',
    stressed: 'bg-amber-100 text-amber-900 border-amber-300',
    skeptical: 'bg-purple-100 text-purple-900 border-purple-300',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 p-4 backdrop-blur-xs animate-fadeIn">
      <div className="relative flex flex-col w-full max-w-4xl h-[90vh] max-h-[800px] rounded-2xl bg-white shadow-2xl border border-slate-200 overflow-hidden">
        
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-6 py-3.5 border-b border-slate-100 bg-slate-50/70">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-ping" />
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-100">
                Simulation Sandbox
              </span>
            </div>
            <h3 className="text-sm font-bold text-slate-900 truncate max-w-md">
              {scenario.title}
            </h3>
          </div>

          <div className="flex items-center gap-2">
            {/* Audio Voiceover Control */}
            <div className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-lg px-2.5 py-1 shadow-2xs">
              <button
                onClick={() => setAutoNarrate(!autoNarrate)}
                className={`text-[11px] font-semibold transition-colors ${
                  autoNarrate ? 'text-indigo-600' : 'text-slate-400'
                }`}
                title="Toggle Auto Voiceover"
              >
                Auto-TTS: {autoNarrate ? 'ON' : 'OFF'}
              </button>

              <div className="h-3 w-px bg-slate-200" />

              <button
                onClick={() => handleSpeakDialogue()}
                className="text-slate-600 hover:text-indigo-600 p-0.5"
                title={isSpeaking ? 'Stop speech' : 'Play voiceover'}
              >
                {isSpeaking ? (
                  <VolumeX className="h-4 w-4 text-rose-600 animate-pulse" />
                ) : (
                  <Volume2 className="h-4 w-4" />
                )}
              </button>

              {/* Speed rate selector */}
              <select
                value={speechRate}
                onChange={(e) => setSpeechRate(parseFloat(e.target.value))}
                className="bg-transparent text-[10px] font-bold text-slate-700 focus:outline-none"
              >
                <option value="0.85">0.85x</option>
                <option value="1.0">1.0x</option>
                <option value="1.25">1.25x</option>
              </select>
            </div>

            {/* Restart Button */}
            <button
              onClick={handleRestart}
              className="flex items-center gap-1 text-xs font-semibold text-slate-600 hover:text-slate-900 px-2.5 py-1 rounded-lg border border-slate-200 hover:bg-slate-100 transition-colors"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Restart</span>
            </button>

            {/* Close Modal */}
            <button
              onClick={() => {
                if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
                  window.speechSynthesis.cancel();
                }
                setIsSpeaking(false);
                onClose();
              }}
              className="rounded-lg p-1 text-slate-400 hover:bg-slate-200 hover:text-slate-700 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Dynamic Metric Bar (Empathy, Compliance, Efficiency) */}
        <div className="grid grid-cols-3 gap-2 px-6 py-2.5 bg-slate-100/70 border-b border-slate-200 text-xs">
          {/* Empathy Score */}
          <div className="flex items-center justify-between bg-white rounded-lg px-3 py-1.5 border border-slate-200 shadow-2xs">
            <div className="flex items-center gap-1.5 font-bold text-slate-700">
              <HeartHandshake className="h-3.5 w-3.5 text-emerald-600" />
              <span>Empathy</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-16 h-2 rounded-full bg-slate-100 overflow-hidden">
                <div
                  className="h-full rounded-full bg-emerald-500 transition-all duration-500"
                  style={{ width: `${metrics.empathy}%` }}
                />
              </div>
              <span className="font-mono font-bold text-slate-900">{metrics.empathy}%</span>
            </div>
          </div>

          {/* Compliance Score */}
          <div className="flex items-center justify-between bg-white rounded-lg px-3 py-1.5 border border-slate-200 shadow-2xs">
            <div className="flex items-center gap-1.5 font-bold text-slate-700">
              <ShieldCheck className="h-3.5 w-3.5 text-blue-600" />
              <span>Compliance</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-16 h-2 rounded-full bg-slate-100 overflow-hidden">
                <div
                  className="h-full rounded-full bg-blue-500 transition-all duration-500"
                  style={{ width: `${metrics.compliance}%` }}
                />
              </div>
              <span className="font-mono font-bold text-slate-900">{metrics.compliance}%</span>
            </div>
          </div>

          {/* Efficiency Score */}
          <div className="flex items-center justify-between bg-white rounded-lg px-3 py-1.5 border border-slate-200 shadow-2xs">
            <div className="flex items-center gap-1.5 font-bold text-slate-700">
              <Zap className="h-3.5 w-3.5 text-purple-600" />
              <span>Resolution Speed</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-16 h-2 rounded-full bg-slate-100 overflow-hidden">
                <div
                  className="h-full rounded-full bg-purple-500 transition-all duration-500"
                  style={{ width: `${metrics.efficiency}%` }}
                />
              </div>
              <span className="font-mono font-bold text-slate-900">{metrics.efficiency}%</span>
            </div>
          </div>
        </div>

        {/* Delta Toast Notification */}
        {lastDelta && (
          <div className="absolute top-24 right-6 z-20 flex items-center gap-1.5 rounded-lg bg-slate-900/90 text-white px-3 py-1 text-xs shadow-md animate-bounce">
            <Sparkles className="h-3.5 w-3.5 text-amber-400" />
            <span>
              {lastDelta.label}: {lastDelta.value >= 0 ? `+${lastDelta.value}` : lastDelta.value}
            </span>
          </div>
        )}

        {/* Main Simulation Viewport */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6">
          
          {/* Character Dialogue Stage */}
          <div className="rounded-2xl border border-slate-200/90 bg-gradient-to-b from-white to-slate-50/50 p-6 shadow-xs space-y-5">
            
            {/* Setting & Stage Metadata */}
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span className="flex items-center gap-1.5 font-medium">
                📍 {currentScene.setting || 'Executive Office'}
              </span>
              <span className="font-mono text-[11px] bg-slate-100 px-2 py-0.5 rounded">
                Scene {history.length} of Simulation
              </span>
            </div>

            {/* Character & Speech Bubble */}
            <div className="flex items-start gap-4 md:gap-6">
              {/* Character Avatar Stage */}
              <div className="flex flex-col items-center shrink-0">
                <div className="relative flex h-20 w-20 md:h-24 md:w-24 items-center justify-center rounded-2xl bg-white border-2 border-indigo-100 shadow-md text-4xl md:text-5xl">
                  {character.avatar}
                  {/* Emotion Pill Badge */}
                  <span className={`absolute -bottom-2 rounded-full px-2 py-0.5 text-[10px] font-extrabold uppercase border shadow-2xs ${emotionColors[currentScene.characterEmotion] || emotionColors.neutral}`}>
                    {currentScene.characterEmotion}
                  </span>
                </div>

                <div className="mt-3 text-center">
                  <div className="text-xs font-bold text-slate-900">{character.name}</div>
                  <div className="text-[11px] text-slate-500">{character.role}</div>
                </div>
              </div>

              {/* Speech Bubble */}
              <div className="flex-1 rounded-2xl border border-slate-200 bg-white p-5 shadow-xs relative">
                {/* Speech Bubble Arrow */}
                <div className="absolute -left-2.5 top-6 h-4 w-4 rotate-45 border-b border-l border-slate-200 bg-white" />

                <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Character Dialogue
                  </span>
                  <button
                    onClick={() => handleSpeakDialogue()}
                    className="text-indigo-600 hover:text-indigo-800 text-xs font-semibold flex items-center gap-1"
                  >
                    <Volume2 className="h-3.5 w-3.5" />
                    <span>Replay Audio</span>
                  </button>
                </div>

                <p className="text-sm md:text-base font-medium text-slate-800 leading-relaxed">
                  &ldquo;{currentScene.dialogue}&rdquo;
                </p>
              </div>
            </div>

          </div>

          {/* Decision Deck or Terminal Debrief */}
          {!isTerminal ? (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Your Decision Options:
                </h4>
                <span className="text-[11px] text-slate-400">
                  Select the response that optimizes empathy and compliance
                </span>
              </div>

              <div className="grid grid-cols-1 gap-2.5">
                {currentScene.options.map((opt, idx) => (
                  <button
                    key={opt.id}
                    onClick={() => handleSelectOption(opt)}
                    className="group flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4 text-left shadow-2xs hover:border-indigo-500 hover:bg-indigo-50/40 hover:shadow-xs transition-all active:scale-99"
                  >
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-bold text-slate-700 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <div className="flex-1">
                      <div className="text-xs md:text-sm font-semibold text-slate-900 group-hover:text-indigo-950">
                        {opt.text}
                      </div>
                    </div>
                    <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-indigo-600 shrink-0 self-center transition-transform group-hover:translate-x-1" />
                  </button>
                ))}
              </div>
            </div>
          ) : (
            /* Terminal Debrief Panel */
            <div className={`rounded-2xl border p-6 text-center space-y-4 ${
              isSuccess 
                ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950'
                : 'bg-rose-50/70 border-rose-200 text-rose-950'
            }`}>
              <div className="flex justify-center">
                {isSuccess ? (
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600 shadow-xs">
                    <Trophy className="h-8 w-8" />
                  </div>
                ) : (
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-rose-100 text-rose-600 shadow-xs">
                    <AlertTriangle className="h-8 w-8" />
                  </div>
                )}
              </div>

              <div>
                <h3 className="text-lg font-bold">
                  {isSuccess ? 'Scenario Completed Successfully!' : 'Scenario Escalation / Failure'}
                </h3>
                <p className="text-xs text-slate-600 max-w-lg mx-auto mt-1 leading-relaxed">
                  {isSuccess 
                    ? 'Outstanding resolution. You preserved employee trust and maintained operational compliance under pressure.'
                    : 'The interaction stalled due to premature assumptions or defensiveness. Review pedagogical feedback and replay.'}
                </p>
              </div>

              {/* Final Score Report */}
              <div className="flex items-center justify-center gap-6 py-2">
                <div className="text-center">
                  <div className="text-lg font-bold font-mono">{metrics.empathy}%</div>
                  <div className="text-[10px] uppercase font-bold text-slate-500">Empathy</div>
                </div>
                <div className="h-8 w-px bg-slate-300" />
                <div className="text-center">
                  <div className="text-lg font-bold font-mono">{metrics.compliance}%</div>
                  <div className="text-[10px] uppercase font-bold text-slate-500">Compliance</div>
                </div>
                <div className="h-8 w-px bg-slate-300" />
                <div className="text-center">
                  <div className="text-lg font-bold font-mono">{metrics.efficiency}%</div>
                  <div className="text-[10px] uppercase font-bold text-slate-500">Efficiency</div>
                </div>
              </div>

              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  onClick={handleRestart}
                  className="rounded-xl bg-white border border-slate-300 px-5 py-2.5 text-xs font-bold text-slate-800 hover:bg-slate-100 transition-colors shadow-2xs"
                >
                  Replay Simulation
                </button>
                <button
                  onClick={onClose}
                  className="rounded-xl bg-indigo-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-indigo-700 transition-colors shadow-xs"
                >
                  Finish & Save Debrief
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Immediate Pedagogical Feedback Modal Overlay */}
        {activeFeedback && (
          <div className="absolute inset-0 z-30 flex items-center justify-center bg-slate-900/60 p-6 backdrop-blur-xs animate-fadeIn">
            <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl border border-slate-200 space-y-4">
              <div className="flex items-center gap-2 text-indigo-700">
                <Sparkles className="h-5 w-5" />
                <h4 className="text-sm font-bold text-slate-900">Instructional Feedback</h4>
              </div>

              <div className="rounded-xl bg-slate-50 p-3.5 border border-slate-100 text-xs text-slate-700">
                <span className="font-bold text-slate-900">Your Action:</span>
                <p className="mt-1 italic">&ldquo;{activeFeedback.option.text}&rdquo;</p>
              </div>

              {activeFeedback.option.feedback && (
                <div className="rounded-xl bg-indigo-50/70 p-3.5 border border-indigo-100 text-xs text-indigo-950 leading-relaxed">
                  <span className="font-bold">Pedagogical Analysis:</span>
                  <p className="mt-1">{activeFeedback.option.feedback}</p>
                </div>
              )}

              {/* Metric impacts */}
              <div className="flex items-center gap-4 text-xs font-mono pt-1">
                <span className={activeFeedback.option.scoreDeltas.empathy >= 0 ? 'text-emerald-700 font-bold' : 'text-rose-600 font-bold'}>
                  Empathy: {activeFeedback.option.scoreDeltas.empathy >= 0 ? `+${activeFeedback.option.scoreDeltas.empathy}` : activeFeedback.option.scoreDeltas.empathy}%
                </span>
                <span className={activeFeedback.option.scoreDeltas.compliance >= 0 ? 'text-blue-700 font-bold' : 'text-rose-600 font-bold'}>
                  Compliance: {activeFeedback.option.scoreDeltas.compliance >= 0 ? `+${activeFeedback.option.scoreDeltas.compliance}` : activeFeedback.option.scoreDeltas.compliance}%
                </span>
                <span className={activeFeedback.option.scoreDeltas.efficiency >= 0 ? 'text-purple-700 font-bold' : 'text-rose-600 font-bold'}>
                  Speed: {activeFeedback.option.scoreDeltas.efficiency >= 0 ? `+${activeFeedback.option.scoreDeltas.efficiency}` : activeFeedback.option.scoreDeltas.efficiency}%
                </span>
              </div>

              <button
                onClick={handleContinueAfterFeedback}
                className="w-full rounded-xl bg-indigo-600 py-2.5 text-xs font-bold text-white hover:bg-indigo-700 transition-colors shadow-sm"
              >
                Proceed to Character Reaction ➔
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
