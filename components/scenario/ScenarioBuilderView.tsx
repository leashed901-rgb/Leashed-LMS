'use client';

import React, { useState } from 'react';
import { Scenario, SceneNode } from '@/lib/types';
import { ScenarioGraphCanvas } from './ScenarioGraphCanvas';
import { SceneNodeEditor } from './SceneNodeEditor';
import { ScenarioPlayerModal } from './ScenarioPlayerModal';
import { AIGenerateScenarioModal } from './AIGenerateScenarioModal';
import { ExportHubModal } from './ExportHubModal';
import { 
  GitFork, 
  Play, 
  Sparkles, 
  Share2, 
  Plus, 
  LayoutGrid, 
  Sliders, 
  BookOpen, 
  CheckCircle2, 
  AlertCircle,
  HelpCircle
} from 'lucide-react';

interface ScenarioBuilderViewProps {
  scenarios: Scenario[];
  activeScenarioId: string;
  onSelectScenario: (id: string) => void;
  onUpdateScenario: (updated: Scenario) => void;
  onCreateScenario: (scenario: Scenario) => void;
}

export const ScenarioBuilderView: React.FC<ScenarioBuilderViewProps> = ({
  scenarios,
  activeScenarioId,
  onSelectScenario,
  onUpdateScenario,
  onCreateScenario,
}) => {
  const currentScenario = scenarios.find(s => s.id === activeScenarioId) || scenarios[0];

  const [rawSelectedSceneId, setRawSelectedSceneId] = useState<string>(currentScenario.startSceneId);
  const selectedSceneId = (currentScenario && currentScenario.scenes[rawSelectedSceneId]) 
    ? rawSelectedSceneId 
    : currentScenario.startSceneId;
  const setSelectedSceneId = setRawSelectedSceneId;
  const [viewMode, setViewMode] = useState<'canvas' | 'editor'>('canvas');
  const [isPlayerOpen, setIsPlayerOpen] = useState(false);
  const [isAIGenOpen, setIsAIGenOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [playFromSceneId, setPlayFromSceneId] = useState<string | undefined>(undefined);

  const handleUpdateScene = (updatedScene: SceneNode) => {
    const updatedScenes = {
      ...currentScenario.scenes,
      [updatedScene.id]: updatedScene,
    };
    onUpdateScenario({
      ...currentScenario,
      scenes: updatedScenes,
    });
  };

  const handleDeleteScene = (sceneId: string) => {
    if (Object.keys(currentScenario.scenes).length <= 2) return;
    const nextScenes = { ...currentScenario.scenes };
    delete nextScenes[sceneId];

    let nextStart = currentScenario.startSceneId;
    if (nextStart === sceneId) {
      nextStart = Object.keys(nextScenes)[0];
    }

    onUpdateScenario({
      ...currentScenario,
      startSceneId: nextStart,
      scenes: nextScenes,
    });

    setSelectedSceneId(nextStart);
  };

  const handleSetAsStart = (sceneId: string) => {
    const nextScenes = { ...currentScenario.scenes };
    // Clear old start
    Object.keys(nextScenes).forEach(id => {
      nextScenes[id] = { ...nextScenes[id], isStartNode: id === sceneId };
    });

    onUpdateScenario({
      ...currentScenario,
      startSceneId: sceneId,
      scenes: nextScenes,
    });
  };

  const handleAddScene = () => {
    const newId = `scene-${Date.now().toString().slice(-4)}`;
    const newScene: SceneNode = {
      id: newId,
      title: `Branch Scene ${Object.keys(currentScenario.scenes).length + 1}`,
      characterId: currentScenario.characters[0]?.id || 'char-1',
      characterEmotion: 'neutral',
      dialogue: 'What is your appraisal of this development?',
      setting: 'Office Conference Room',
      x: 350,
      y: 200,
      options: [
        {
          id: `opt-${Date.now()}`,
          text: 'Suggest immediate operational review',
          feedback: 'Sound procedural response.',
          targetSceneId: currentScenario.startSceneId,
          scoreDeltas: { empathy: 10, compliance: 10, efficiency: 10 }
        }
      ]
    };

    onUpdateScenario({
      ...currentScenario,
      scenes: {
        ...currentScenario.scenes,
        [newId]: newScene,
      }
    });

    setSelectedSceneId(newId);
    setViewMode('editor');
  };

  const handlePlayFromScene = (sceneId: string) => {
    setPlayFromSceneId(sceneId);
    setIsPlayerOpen(true);
  };

  const selectedScene = currentScenario.scenes[selectedSceneId] || currentScenario.scenes[currentScenario.startSceneId];

  return (
    <div className="space-y-6">
      {/* Top Banner & Control Deck */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          
          {/* Left: Scenario Selector & Meta */}
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-md bg-indigo-50 px-2 py-0.5 text-xs font-bold text-indigo-700 border border-indigo-200/60">
                SCENARIO STUDIO
              </span>
              
              <select
                value={currentScenario.id}
                onChange={(e) => onSelectScenario(e.target.value)}
                className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm font-bold text-slate-900 focus:border-indigo-500 focus:outline-none"
              >
                {scenarios.map(sc => (
                  <option key={sc.id} value={sc.id}>
                    {sc.title} ({sc.category})
                  </option>
                ))}
              </select>

              <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-semibold text-slate-600">
                {currentScenario.difficulty}
              </span>
            </div>

            <p className="text-xs text-slate-600 max-w-2xl line-clamp-2">
              {currentScenario.description}
            </p>
          </div>

          {/* Right: Actions */}
          <div className="flex flex-wrap items-center gap-2">
            {/* View Mode Switcher */}
            <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
              <button
                onClick={() => setViewMode('canvas')}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                  viewMode === 'canvas'
                    ? 'bg-white text-indigo-600 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <LayoutGrid className="h-3.5 w-3.5" />
                <span>Flow Canvas</span>
              </button>

              <button
                onClick={() => setViewMode('editor')}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                  viewMode === 'editor'
                    ? 'bg-white text-indigo-600 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Sliders className="h-3.5 w-3.5" />
                <span>Dialogue Inspector</span>
              </button>
            </div>

            {/* AI Generator Button */}
            <button
              onClick={() => setIsAIGenOpen(true)}
              className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-indigo-50 to-blue-50 border border-indigo-200 px-3.5 py-2 text-xs font-bold text-indigo-700 hover:from-indigo-100 hover:to-blue-100 transition-all shadow-xs"
            >
              <Sparkles className="h-3.5 w-3.5 text-indigo-600" />
              <span>AI Generate</span>
            </button>

            {/* Export & SCORM */}
            <button
              onClick={() => setIsExportOpen(true)}
              className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors shadow-xs"
              title="Export SCORM, xAPI, or Web Embed"
            >
              <Share2 className="h-3.5 w-3.5 text-slate-500" />
              <span>Export</span>
            </button>

            {/* Play Simulator */}
            <button
              onClick={() => {
                setPlayFromSceneId(undefined);
                setIsPlayerOpen(true);
              }}
              className="flex items-center gap-1.5 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-bold text-white hover:bg-indigo-700 transition-all shadow-sm hover:shadow active:scale-98"
            >
              <Play className="h-3.5 w-3.5 fill-current" />
              <span>Simulate Scenario</span>
            </button>
          </div>
        </div>

        {/* Characters Bar */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center gap-4 text-xs">
          <span className="font-semibold text-slate-500">Scenario Characters:</span>
          {currentScenario.characters.map(char => (
            <div key={char.id} className="flex items-center gap-2 rounded-lg bg-slate-50 px-2.5 py-1 border border-slate-100">
              <span className="text-base leading-none">{char.avatar}</span>
              <div>
                <span className="font-bold text-slate-900">{char.name}</span>
                <span className="text-slate-400 text-[10px] ml-1.5">({char.role})</span>
              </div>
            </div>
          ))}

          <div className="ml-auto text-[11px] text-slate-400 flex items-center gap-1">
            <span>Author: {currentScenario.author}</span>
          </div>
        </div>
      </div>

      {/* Main Studio View Area */}
      {viewMode === 'canvas' ? (
        <div className="space-y-4">
          <ScenarioGraphCanvas
            scenario={currentScenario}
            selectedSceneId={selectedSceneId}
            onSelectScene={(id) => {
              setSelectedSceneId(id);
              setViewMode('editor');
            }}
            onAddScene={handleAddScene}
            onPlayFromScene={handlePlayFromScene}
          />
        </div>
      ) : (
        /* Inspector / Node Editor Mode */
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left mini-navigator */}
          <div className="lg:col-span-1 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Scenes ({Object.keys(currentScenario.scenes).length})
              </span>
              <button
                onClick={handleAddScene}
                className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
              >
                <Plus className="h-3 w-3" /> Add
              </button>
            </div>

            <div className="space-y-1.5 max-h-[600px] overflow-y-auto pr-1">
              {Object.values(currentScenario.scenes).map(sc => (
                <button
                  key={sc.id}
                  onClick={() => setSelectedSceneId(sc.id)}
                  className={`w-full text-left rounded-xl p-2.5 text-xs transition-all border ${
                    selectedSceneId === sc.id
                      ? 'border-indigo-600 bg-indigo-50/70 text-indigo-900 font-bold shadow-xs'
                      : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] text-slate-400 mb-0.5">
                    <span>#{sc.id}</span>
                    {sc.isStartNode && <span className="font-bold text-indigo-600">START</span>}
                    {sc.outcomeType === 'success' && <span className="font-bold text-emerald-600">SUCCESS</span>}
                    {sc.outcomeType === 'failure' && <span className="font-bold text-rose-600">FAIL</span>}
                  </div>
                  <div className="line-clamp-1">{sc.title}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Right Editor */}
          <div className="lg:col-span-3">
            {selectedScene ? (
              <SceneNodeEditor
                scenario={currentScenario}
                scene={selectedScene}
                onUpdateScene={handleUpdateScene}
                onDeleteScene={handleDeleteScene}
                onSetAsStart={handleSetAsStart}
              />
            ) : (
              <div className="p-8 text-center text-xs text-slate-500 rounded-2xl border border-slate-200 bg-white">
                Select a scene from the list to edit its dialogue and branches.
              </div>
            )}
          </div>
        </div>
      )}

      {/* Modals */}
      <ScenarioPlayerModal
        scenario={currentScenario}
        initialSceneId={playFromSceneId}
        isOpen={isPlayerOpen}
        onClose={() => {
          setIsPlayerOpen(false);
          setPlayFromSceneId(undefined);
        }}
      />

      <AIGenerateScenarioModal
        isOpen={isAIGenOpen}
        onClose={() => setIsAIGenOpen(false)}
        onScenarioGenerated={(newSc) => {
          onCreateScenario(newSc);
          setSelectedSceneId(newSc.startSceneId);
        }}
      />

      <ExportHubModal
        scenario={currentScenario}
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
      />
    </div>
  );
};
