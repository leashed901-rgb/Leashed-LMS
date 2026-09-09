'use client';

import React from 'react';
import { Scenario, SceneNode, BranchOption, SceneEmotion } from '@/lib/types';
import { 
  Plus, 
  Trash2, 
  Sparkles, 
  CheckCircle, 
  ArrowRight, 
  Sliders, 
  User, 
  MessageSquare,
  AlertCircle
} from 'lucide-react';

interface SceneNodeEditorProps {
  scenario: Scenario;
  scene: SceneNode;
  onUpdateScene: (updated: SceneNode) => void;
  onDeleteScene: (sceneId: string) => void;
  onSetAsStart: (sceneId: string) => void;
}

const EMOTIONS: { value: SceneEmotion; label: string; icon: string }[] = [
  { value: 'neutral', label: 'Neutral', icon: '😐' },
  { value: 'pleased', label: 'Pleased / Delighted', icon: '😊' },
  { value: 'stressed', label: 'Stressed / Agitated', icon: '😰' },
  { value: 'frustrated', label: 'Frustrated / Angry', icon: '😠' },
  { value: 'skeptical', label: 'Skeptical / Doubting', icon: '🤨' },
  { value: 'relieved', label: 'Relieved / Calmed', icon: '😌' },
];

export const SceneNodeEditor: React.FC<SceneNodeEditorProps> = ({
  scenario,
  scene,
  onUpdateScene,
  onDeleteScene,
  onSetAsStart,
}) => {
  const allScenes = Object.values(scenario.scenes);

  const handleFieldChange = <K extends keyof SceneNode>(key: K, value: SceneNode[K]) => {
    onUpdateScene({ ...scene, [key]: value });
  };

  const handleAddOption = () => {
    const newOpt: BranchOption = {
      id: `opt-${Date.now()}`,
      text: 'New tactical response choice...',
      feedback: 'Feedback explaining the consequences of this choice.',
      targetSceneId: scene.isTerminalNode ? '' : (allScenes.find(s => s.id !== scene.id)?.id || 'scene-success'),
      scoreDeltas: { empathy: 10, compliance: 10, efficiency: 5 },
      pedagogicalTip: 'Tip on best communication practices.'
    };
    onUpdateScene({
      ...scene,
      options: [...(scene.options || []), newOpt]
    });
  };

  const handleUpdateOption = (optId: string, updates: Partial<BranchOption>) => {
    const updatedOptions = (scene.options || []).map(opt => {
      if (opt.id === optId) {
        return { ...opt, ...updates };
      }
      return opt;
    });
    onUpdateScene({ ...scene, options: updatedOptions });
  };

  const handleDeleteOption = (optId: string) => {
    const updatedOptions = (scene.options || []).filter(opt => opt.id !== optId);
    onUpdateScene({ ...scene, options: updatedOptions });
  };

  return (
    <div className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
      {/* Header controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded bg-indigo-100 px-2 py-0.5 font-mono text-xs font-bold text-indigo-700">
              #{scene.id}
            </span>
            <h3 className="text-base font-bold text-slate-900">Scene & Dialogue Inspector</h3>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Configure character reactions, speech dialogue, and decision branches
          </p>
        </div>

        <div className="flex items-center gap-2">
          {!scene.isStartNode && (
            <button
              onClick={() => onSetAsStart(scene.id)}
              className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
            >
              Set as Start Scene
            </button>
          )}

          <button
            onClick={() => onDeleteScene(scene.id)}
            disabled={allScenes.length <= 2}
            className="rounded-lg border border-rose-200 px-3 py-1.5 text-xs font-semibold text-rose-600 hover:bg-rose-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Trash2 className="h-3.5 w-3.5 inline mr-1" />
            Delete Scene
          </button>
        </div>
      </div>

      {/* Main Form Settings */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Title */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Scene Title
          </label>
          <input
            type="text"
            value={scene.title}
            onChange={(e) => handleFieldChange('title', e.target.value)}
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            placeholder="e.g., Initial Outage Escalation Call"
          />
        </div>

        {/* Setting */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Physical / Virtual Setting
          </label>
          <input
            type="text"
            value={scene.setting}
            onChange={(e) => handleFieldChange('setting', e.target.value)}
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            placeholder="e.g., High-Priority Virtual War Room"
          />
        </div>
      </div>

      {/* Character & Emotion */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50/60 p-4 rounded-xl border border-slate-100">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Speaker Character
          </label>
          <select
            value={scene.characterId}
            onChange={(e) => handleFieldChange('characterId', e.target.value)}
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-900 focus:border-indigo-500 focus:outline-none"
          >
            {scenario.characters.map(char => (
              <option key={char.id} value={char.id}>
                {char.avatar} {char.name} ({char.role})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Character Emotional State
          </label>
          <div className="grid grid-cols-3 gap-1.5">
            {EMOTIONS.map(emo => (
              <button
                key={emo.value}
                type="button"
                onClick={() => handleFieldChange('characterEmotion', emo.value)}
                className={`flex items-center gap-1 justify-center rounded-md px-2 py-1.5 text-xs font-medium border transition-all ${
                  scene.characterEmotion === emo.value
                    ? 'border-indigo-600 bg-indigo-50 text-indigo-700 font-bold'
                    : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                }`}
              >
                <span>{emo.icon}</span>
                <span className="truncate">{emo.label.split('/')[0]}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Spoken Dialogue */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center justify-between">
          <span>Character Spoken Dialogue</span>
          <span className="text-[11px] text-slate-400 font-normal">Supports real-time Voiceover TTS</span>
        </label>
        <textarea
          rows={3}
          value={scene.dialogue}
          onChange={(e) => handleFieldChange('dialogue', e.target.value)}
          className="w-full rounded-lg border border-slate-200 p-3 text-xs text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 leading-relaxed font-sans"
          placeholder="Enter what the character says aloud to the learner..."
        />
      </div>

      {/* Terminal Node Toggle */}
      <div className="rounded-xl border border-slate-200 p-4 bg-slate-50/50">
        <div className="flex items-center justify-between">
          <div>
            <label className="text-xs font-bold text-slate-900 flex items-center gap-1.5 cursor-pointer">
              <input
                type="checkbox"
                checked={!!scene.isTerminalNode}
                onChange={(e) => {
                  const isTerm = e.target.checked;
                  onUpdateScene({
                    ...scene,
                    isTerminalNode: isTerm,
                    outcomeType: isTerm ? (scene.outcomeType || 'success') : undefined,
                    options: isTerm ? [] : scene.options
                  });
                }}
                className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
              />
              Mark as Terminal Ending Node (No further branches)
            </label>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Terminal scenes conclude the simulation with an outcome assessment and debrief notes.
            </p>
          </div>

          {scene.isTerminalNode && (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleFieldChange('outcomeType', 'success')}
                className={`rounded-lg px-2.5 py-1 text-xs font-semibold border transition-all ${
                  scene.outcomeType === 'success'
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-800'
                    : 'border-slate-200 bg-white text-slate-600'
                }`}
              >
                🏆 Success Outcome
              </button>
              <button
                type="button"
                onClick={() => handleFieldChange('outcomeType', 'failure')}
                className={`rounded-lg px-2.5 py-1 text-xs font-semibold border transition-all ${
                  scene.outcomeType === 'failure'
                    ? 'border-rose-600 bg-rose-50 text-rose-800'
                    : 'border-slate-200 bg-white text-slate-600'
                }`}
              >
                ⚠️ Failure / Churn
              </button>
            </div>
          )}
        </div>

        {scene.isTerminalNode && (
          <div className="mt-3 pt-3 border-t border-slate-200">
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Debrief Notes & Pedagogical Takeaways
            </label>
            <textarea
              rows={2}
              value={scene.debriefNotes || ''}
              onChange={(e) => handleFieldChange('debriefNotes', e.target.value)}
              className="w-full rounded-lg border border-slate-200 p-2.5 text-xs text-slate-800 bg-white"
              placeholder="Explain the root reasons for this outcome and recommended action mapping..."
            />
          </div>
        )}
      </div>

      {/* Decision Options (if not terminal) */}
      {!scene.isTerminalNode && (
        <div className="space-y-4 pt-2">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Learner Response Options ({scene.options?.length || 0})
              </h4>
              <p className="text-[11px] text-slate-500">
                Each option routes the learner to a branched scene and adjusts competencies.
              </p>
            </div>

            <button
              onClick={handleAddOption}
              className="flex items-center gap-1 rounded-lg bg-indigo-50 border border-indigo-200 px-3 py-1.5 text-xs font-semibold text-indigo-700 hover:bg-indigo-100 transition-colors"
            >
              <Plus className="h-3.5 w-3.5" />
              Add Response Choice
            </button>
          </div>

          <div className="space-y-3">
            {(scene.options || []).map((opt, idx) => (
              <div
                key={opt.id || idx}
                className="rounded-xl border border-slate-200 bg-slate-50/40 p-4 space-y-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-200 text-[10px] font-bold text-slate-700">
                    {idx + 1}
                  </span>
                  <div className="flex-1">
                    <label className="block text-[11px] font-semibold text-slate-700 mb-0.5">
                      Learner Choice Text
                    </label>
                    <textarea
                      rows={2}
                      value={opt.text}
                      onChange={(e) => handleUpdateOption(opt.id, { text: e.target.value })}
                      className="w-full rounded-lg border border-slate-200 bg-white p-2 text-xs text-slate-900 focus:border-indigo-500 focus:outline-none"
                      placeholder="What the learner can choose to reply..."
                    />
                  </div>
                  <button
                    onClick={() => handleDeleteOption(opt.id)}
                    className="p-1 text-slate-400 hover:text-rose-600 rounded transition-colors"
                    title="Remove choice"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>

                {/* Feedback and Target Scene */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-0.5">
                      Immediate Feedback for Learner
                    </label>
                    <input
                      type="text"
                      value={opt.feedback}
                      onChange={(e) => handleUpdateOption(opt.id, { feedback: e.target.value })}
                      className="w-full rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs text-slate-800"
                      placeholder="Explains why this choice works or fails..."
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-0.5">
                      Target Scene Branch
                    </label>
                    <select
                      value={opt.targetSceneId}
                      onChange={(e) => handleUpdateOption(opt.id, { targetSceneId: e.target.value })}
                      className="w-full rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs text-slate-900 font-medium"
                    >
                      {allScenes.map(s => (
                        <option key={s.id} value={s.id}>
                          ➔ {s.title} (#{s.id})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Score deltas */}
                <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-slate-200/60 text-xs">
                  <span className="text-[11px] font-semibold text-slate-500 flex items-center gap-1">
                    <Sliders className="h-3 w-3" /> Metric Impact:
                  </span>
                  
                  <div className="flex items-center gap-1">
                    <span className="text-emerald-700 font-medium">Empathy:</span>
                    <input
                      type="number"
                      value={opt.scoreDeltas?.empathy ?? 0}
                      onChange={(e) => handleUpdateOption(opt.id, {
                        scoreDeltas: { ...(opt.scoreDeltas || { empathy: 0, compliance: 0, efficiency: 0 }), empathy: parseInt(e.target.value) || 0 }
                      })}
                      className="w-14 rounded border border-slate-200 bg-white px-1.5 py-0.5 text-xs text-center"
                    />
                  </div>

                  <div className="flex items-center gap-1">
                    <span className="text-blue-700 font-medium">Compliance:</span>
                    <input
                      type="number"
                      value={opt.scoreDeltas?.compliance ?? 0}
                      onChange={(e) => handleUpdateOption(opt.id, {
                        scoreDeltas: { ...(opt.scoreDeltas || { empathy: 0, compliance: 0, efficiency: 0 }), compliance: parseInt(e.target.value) || 0 }
                      })}
                      className="w-14 rounded border border-slate-200 bg-white px-1.5 py-0.5 text-xs text-center"
                    />
                  </div>

                  <div className="flex items-center gap-1">
                    <span className="text-purple-700 font-medium">Efficiency:</span>
                    <input
                      type="number"
                      value={opt.scoreDeltas?.efficiency ?? 0}
                      onChange={(e) => handleUpdateOption(opt.id, {
                        scoreDeltas: { ...(opt.scoreDeltas || { empathy: 0, compliance: 0, efficiency: 0 }), efficiency: parseInt(e.target.value) || 0 }
                      })}
                      className="w-14 rounded border border-slate-200 bg-white px-1.5 py-0.5 text-xs text-center"
                    />
                  </div>
                </div>
              </div>
            ))}

            {(!scene.options || scene.options.length === 0) && (
              <div className="rounded-lg border border-dashed border-slate-300 p-4 text-center text-xs text-slate-500">
                No response choices added yet. Click &quot;Add Response Choice&quot; above to create branched paths.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
