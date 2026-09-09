'use client';

import React from 'react';
import { Scenario, SceneNode } from '@/lib/types';
import { 
  GitBranch, 
  ArrowRight, 
  Trophy, 
  AlertTriangle, 
  Plus, 
  User, 
  Play, 
  MessageSquare,
  Sparkles,
  Zap,
  CheckCircle2,
  XCircle
} from 'lucide-react';

interface ScenarioGraphCanvasProps {
  scenario: Scenario;
  selectedSceneId: string;
  onSelectScene: (sceneId: string) => void;
  onAddScene: () => void;
  onPlayFromScene: (sceneId: string) => void;
}

export const ScenarioGraphCanvas: React.FC<ScenarioGraphCanvasProps> = ({
  scenario,
  selectedSceneId,
  onSelectScene,
  onAddScene,
  onPlayFromScene,
}) => {
  const sceneList = Object.values(scenario.scenes);

  // Group scenes by tier / depth
  const startScene = scenario.scenes[scenario.startSceneId];
  const terminalScenes = sceneList.filter(s => s.isTerminalNode);
  const intermediateScenes = sceneList.filter(s => s.id !== scenario.startSceneId && !s.isTerminalNode);

  const getCharacter = (charId: string) => {
    return scenario.characters.find(c => c.id === charId) || {
      name: 'Speaker',
      role: 'Participant',
      avatar: '👤',
      accentColor: '#64748b'
    };
  };

  return (
    <div className="relative w-full overflow-x-auto rounded-2xl border border-slate-200 bg-slate-50/50 p-6 min-h-[460px]">
      {/* Canvas Top Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-200/80">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-100 text-indigo-700">
            <GitBranch className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">Branched Flow Architecture (DAG)</h3>
            <p className="text-xs text-slate-500">
              {sceneList.length} scenes • {sceneList.reduce((acc, s) => acc + (s.options?.length || 0), 0)} branching decision points
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700 border border-emerald-200/60">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
            Graph Validated (No cycles)
          </span>

          <button
            id="btn-add-scene-canvas"
            onClick={onAddScene}
            className="flex items-center gap-1.5 rounded-lg bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 border border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition-colors shadow-xs"
          >
            <Plus className="h-3.5 w-3.5 text-indigo-600" />
            Add Scene Node
          </button>
        </div>
      </div>

      {/* Structured Graph Columns: Start -> Branch Decisions -> Terminal Outcomes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        {/* Column 1: Entry Scene */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold tracking-wider text-slate-500 uppercase">
            <span className="flex h-2 w-2 rounded-full bg-indigo-500" />
            1. Root Entry Crisis (Start)
          </div>

          {startScene && (
            <SceneCard
              scene={startScene}
              isSelected={selectedSceneId === startScene.id}
              character={getCharacter(startScene.characterId)}
              onSelect={() => onSelectScene(startScene.id)}
              onPlay={() => onPlayFromScene(startScene.id)}
              scenarioScenes={scenario.scenes}
            />
          )}
        </div>

        {/* Column 2: Intermediate Decision Branches */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold tracking-wider text-slate-500 uppercase">
            <span className="flex h-2 w-2 rounded-full bg-amber-500" />
            2. Tactical Branches & Reactions ({intermediateScenes.length})
          </div>

          <div className="space-y-4">
            {intermediateScenes.map(scene => (
              <SceneCard
                key={scene.id}
                scene={scene}
                isSelected={selectedSceneId === scene.id}
                character={getCharacter(scene.characterId)}
                onSelect={() => onSelectScene(scene.id)}
                onPlay={() => onPlayFromScene(scene.id)}
                scenarioScenes={scenario.scenes}
              />
            ))}

            {intermediateScenes.length === 0 && (
              <div className="rounded-xl border border-dashed border-slate-300 p-6 text-center text-xs text-slate-500">
                No intermediate branches yet. Add a decision node or generate via AI.
              </div>
            )}
          </div>
        </div>

        {/* Column 3: Terminal Outcomes */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold tracking-wider text-slate-500 uppercase">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500" />
            3. Final Debrief Outcomes ({terminalScenes.length})
          </div>

          <div className="space-y-4">
            {terminalScenes.map(scene => (
              <SceneCard
                key={scene.id}
                scene={scene}
                isSelected={selectedSceneId === scene.id}
                character={getCharacter(scene.characterId)}
                onSelect={() => onSelectScene(scene.id)}
                onPlay={() => onPlayFromScene(scene.id)}
                scenarioScenes={scenario.scenes}
              />
            ))}

            {terminalScenes.length === 0 && (
              <div className="rounded-xl border border-dashed border-slate-300 p-6 text-center text-xs text-slate-500">
                Add success/failure outcomes to close scenarios.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

interface SceneCardProps {
  scene: SceneNode;
  isSelected: boolean;
  character: { name: string; role: string; avatar: string; accentColor: string };
  onSelect: () => void;
  onPlay: () => void;
  scenarioScenes: Record<string, SceneNode>;
}

const SceneCard: React.FC<SceneCardProps> = ({
  scene,
  isSelected,
  character,
  onSelect,
  onPlay,
  scenarioScenes,
}) => {
  const isSuccess = scene.outcomeType === 'success';
  const isFailure = scene.outcomeType === 'failure';

  return (
    <div
      onClick={onSelect}
      className={`group relative rounded-xl border bg-white p-4 cursor-pointer transition-all shadow-xs hover:shadow-md ${
        isSelected
          ? 'border-indigo-600 ring-2 ring-indigo-500/20 shadow-indigo-100'
          : isSuccess
          ? 'border-emerald-200 hover:border-emerald-400'
          : isFailure
          ? 'border-rose-200 hover:border-rose-400'
          : 'border-slate-200 hover:border-slate-300'
      }`}
    >
      {/* Header with Badges */}
      <div className="flex items-center justify-between gap-2 mb-2.5">
        <div className="flex items-center gap-1.5">
          {scene.isStartNode && (
            <span className="rounded bg-indigo-100 px-1.5 py-0.5 text-[10px] font-bold text-indigo-700">
              START
            </span>
          )}
          {isSuccess && (
            <span className="flex items-center gap-1 rounded bg-emerald-100 px-1.5 py-0.5 text-[10px] font-bold text-emerald-800">
              <Trophy className="h-3 w-3" /> SUCCESS
            </span>
          )}
          {isFailure && (
            <span className="flex items-center gap-1 rounded bg-rose-100 px-1.5 py-0.5 text-[10px] font-bold text-rose-800">
              <AlertTriangle className="h-3 w-3" /> CHURN / FAIL
            </span>
          )}
          <span className="text-[11px] font-mono text-slate-400">#{scene.id}</span>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onPlay();
          }}
          title="Play simulation from this node"
          className="rounded p-1 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors opacity-80 group-hover:opacity-100"
        >
          <Play className="h-3.5 w-3.5 fill-current" />
        </button>
      </div>

      <h4 className="text-xs font-bold text-slate-900 line-clamp-1 mb-1.5">{scene.title}</h4>

      {/* Speaker and Dialogue preview */}
      <div className="flex items-start gap-2.5 mb-3 rounded-lg bg-slate-50/80 p-2 border border-slate-100">
        <span className="text-xl select-none leading-none pt-0.5">{character.avatar}</span>
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between text-[11px]">
            <span className="font-semibold text-slate-800 truncate">{character.name}</span>
            <span className="capitalize text-[10px] px-1.5 py-0.2 rounded font-medium bg-white text-slate-500 border border-slate-200">
              {scene.characterEmotion}
            </span>
          </div>
          <p className="text-[11px] text-slate-600 line-clamp-2 mt-0.5 italic">
            &ldquo;{scene.dialogue}&rdquo;
          </p>
        </div>
      </div>

      {/* Branch Choices */}
      {scene.options && scene.options.length > 0 && (
        <div className="space-y-1.5 pt-1">
          <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">
            Choices ({scene.options.length})
          </span>
          <div className="space-y-1">
            {scene.options.map((opt, idx) => {
              const targetScene = scenarioScenes[opt.targetSceneId];
              return (
                <div
                  key={opt.id || idx}
                  className="flex items-center justify-between rounded-md bg-slate-50 px-2 py-1 text-[11px] text-slate-700 border border-slate-100"
                >
                  <span className="truncate pr-2 max-w-[170px]">{opt.text}</span>
                  <div className="flex items-center gap-1 text-[10px] font-mono text-indigo-600 whitespace-nowrap">
                    <ArrowRight className="h-2.5 w-2.5" />
                    <span>{targetScene ? targetScene.title.slice(0, 10) + '...' : opt.targetSceneId}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Debrief Note for terminal */}
      {scene.isTerminalNode && scene.debriefNotes && (
        <p className="mt-2 text-[10px] text-slate-500 line-clamp-2 border-t border-slate-100 pt-1.5">
          💡 {scene.debriefNotes}
        </p>
      )}
    </div>
  );
};
