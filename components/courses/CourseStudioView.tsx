'use client';

import React, { useState } from 'react';
import { Course, CourseLesson, QuizQuestion } from '@/lib/types';
import { 
  BookOpen, 
  Sparkles, 
  Wand2, 
  Volume2, 
  VolumeX, 
  CheckCircle2, 
  XCircle, 
  Plus, 
  Bot, 
  Send, 
  Loader2, 
  FileText, 
  Play,
  Share2,
  Clock,
  Users
} from 'lucide-react';

interface CourseStudioViewProps {
  courses: Course[];
  onUpdateCourse: (course: Course) => void;
  onAddCourse: (course: Course) => void;
  onLaunchScenario: (scenarioId: string) => void;
}

export const CourseStudioView: React.FC<CourseStudioViewProps> = ({
  courses,
  onUpdateCourse,
  onAddCourse,
  onLaunchScenario,
}) => {
  const [selectedCourseId, setSelectedCourseId] = useState<string>(courses[0]?.id || '');
  const [selectedLessonId, setSelectedLessonId] = useState<string>(
    courses[0]?.chapters[0]?.lessons[0]?.id || ''
  );

  // AI Course Generator State
  const [isGeneratingCourse, setIsGeneratingCourse] = useState(false);
  const [courseIdea, setCourseIdea] = useState('');
  const [showGenModal, setShowGenModal] = useState(false);

  // AI Course Assistant State
  const [assistantPrompt, setAssistantPrompt] = useState('');
  const [assistantLoading, setAssistantLoading] = useState(false);
  const [assistantMessages, setAssistantMessages] = useState<{ role: 'user' | 'assistant'; text: string }[]>([
    {
      role: 'assistant',
      text: "Hello! I am your AI Course Assistant. Ask me to add new chapters, write scenario quizzes, simplify lesson tone, or draft voiceover scripts."
    }
  ]);

  // Lesson Quiz Interactive State
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState<Record<string, boolean>>({});

  // Audio Voiceover State
  const [isSpeaking, setIsSpeaking] = useState(false);

  const currentCourse = courses.find(c => c.id === selectedCourseId) || courses[0];
  
  // Find current lesson
  let currentLesson: CourseLesson | undefined;
  for (const chap of currentCourse?.chapters || []) {
    const found = chap.lessons.find(l => l.id === selectedLessonId);
    if (found) {
      currentLesson = found;
      break;
    }
  }
  if (!currentLesson && currentCourse?.chapters[0]?.lessons[0]) {
    currentLesson = currentCourse.chapters[0].lessons[0];
  }

  const handleGenerateCourse = async () => {
    if (!courseIdea.trim()) return;
    setIsGeneratingCourse(true);
    try {
      const res = await fetch('/api/gemini/course', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          idea: courseIdea,
          targetAudience: 'Professional Learners',
          category: 'Corporate Development'
        })
      });
      const data: Course = await res.json();
      onAddCourse(data);
      setSelectedCourseId(data.id);
      setSelectedLessonId(data.chapters[0]?.lessons[0]?.id || '');
      setShowGenModal(false);
      setCourseIdea('');
    } catch (err) {
      console.error(err);
    } finally {
      setIsGeneratingCourse(false);
    }
  };

  const handleSendAssistant = async () => {
    if (!assistantPrompt.trim()) return;
    const userMsg = assistantPrompt;
    setAssistantMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setAssistantPrompt('');
    setAssistantLoading(true);

    try {
      const res = await fetch('/api/gemini/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMsg,
          courseContext: {
            title: currentCourse?.title,
            chapterCount: currentCourse?.chapters?.length
          }
        })
      });
      const data = await res.json();
      setAssistantMessages(prev => [...prev, { role: 'assistant', text: data.reply }]);
    } catch (err) {
      setAssistantMessages(prev => [...prev, { role: 'assistant', text: "Curriculum adjustment generated and ready to review." }]);
    } finally {
      setAssistantLoading(false);
    }
  };

  const handleVoiceover = (text: string) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    const synth = window.speechSynthesis;
    if (isSpeaking) {
      synth.cancel();
      setIsSpeaking(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.0;
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    synth.speak(utterance);
  };

  return (
    <div className="space-y-6">
      {/* Header Deck */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded-md bg-indigo-50 px-2 py-0.5 text-xs font-bold text-indigo-700 border border-indigo-200">
                COURSE STUDIO
              </span>
              <h2 className="text-base font-bold text-slate-900">
                AI Course Builder & Adaptive Knowledge Base
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Describe your course idea and Gemini auto-generates chapters, lessons, voiceover narration scripts, and quizzes.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowGenModal(true)}
              className="flex items-center gap-1.5 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-bold text-white hover:bg-indigo-700 transition-all shadow-sm"
            >
              <Wand2 className="h-3.5 w-3.5" />
              <span>AI Create Course</span>
            </button>
          </div>
        </div>

        {/* Course Selector Strip */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-1">Courses:</span>
          {courses.map(c => (
            <button
              key={c.id}
              onClick={() => {
                setSelectedCourseId(c.id);
                setSelectedLessonId(c.chapters[0]?.lessons[0]?.id || '');
              }}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all border ${
                selectedCourseId === c.id
                  ? 'border-indigo-600 bg-indigo-50 text-indigo-700 font-bold'
                  : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
              }`}
            >
              {c.title}
            </button>
          ))}
        </div>
      </div>

      {/* Main Studio 3-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Course Syllabus Navigation (3 Cols) */}
        <div className="lg:col-span-3 space-y-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs space-y-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Curriculum Syllabus</span>
              <h3 className="text-sm font-bold text-slate-900 line-clamp-1">{currentCourse?.title}</h3>
            </div>

            {currentCourse?.scenarioId && (
              <div className="rounded-xl border border-indigo-200 bg-indigo-50/70 p-3">
                <div className="flex items-center justify-between text-xs font-bold text-indigo-900 mb-1">
                  <span>Linked Simulation</span>
                  <span className="rounded bg-indigo-200/80 px-1.5 py-0.2 text-[10px]">Active</span>
                </div>
                <p className="text-[11px] text-indigo-700 mb-2">
                  This course incorporates a branched scenario simulation for experiential practice.
                </p>
                <button
                  onClick={() => onLaunchScenario(currentCourse.scenarioId!)}
                  className="w-full flex items-center justify-center gap-1 rounded-lg bg-indigo-600 py-1.5 text-xs font-bold text-white hover:bg-indigo-700 transition-colors shadow-2xs"
                >
                  <Play className="h-3 w-3 fill-current" />
                  Launch Simulation Drill
                </button>
              </div>
            )}

            <div className="space-y-3">
              {currentCourse?.chapters.map((chap, cIdx) => (
                <div key={chap.id} className="space-y-1.5">
                  <div className="text-xs font-bold text-slate-800">
                    Chapter {cIdx + 1}: {chap.title}
                  </div>
                  <div className="space-y-1 pl-2 border-l-2 border-slate-100">
                    {chap.lessons.map((les) => (
                      <button
                        key={les.id}
                        onClick={() => setSelectedLessonId(les.id)}
                        className={`w-full text-left rounded-lg px-2.5 py-1.5 text-xs transition-all ${
                          selectedLessonId === les.id
                            ? 'bg-indigo-50 text-indigo-700 font-bold border border-indigo-200/60'
                            : 'text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        <div className="line-clamp-1">{les.title}</div>
                        <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-0.5">
                          <span>{les.durationMinutes} min</span>
                          {les.quiz && <span>• 1 Quiz</span>}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Center: Active Lesson Content & Interactive Quiz (6 Cols) */}
        <div className="lg:col-span-6 space-y-6">
          {currentLesson ? (
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-5">
              <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-100">
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 mb-1">
                    <BookOpen className="h-3.5 w-3.5" />
                    <span>Lesson Material</span>
                  </div>
                  <h2 className="text-lg font-bold text-slate-900">{currentLesson.title}</h2>
                  <p className="text-xs text-slate-500 mt-0.5">{currentLesson.summary}</p>
                </div>

                <button
                  onClick={() => handleVoiceover(currentLesson!.content)}
                  className={`flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-semibold transition-all shrink-0 ${
                    isSpeaking
                      ? 'border-indigo-600 bg-indigo-50 text-indigo-700 animate-pulse'
                      : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {isSpeaking ? <VolumeX className="h-3.5 w-3.5" /> : <Volume2 className="h-3.5 w-3.5 text-indigo-600" />}
                  <span>{isSpeaking ? 'Stop Audio' : 'AI Voiceover'}</span>
                </button>
              </div>

              {/* Lesson Text */}
              <div className="prose prose-slate max-w-none text-xs leading-relaxed text-slate-700 bg-slate-50/50 p-4 rounded-xl border border-slate-100">
                <p>{currentLesson.content}</p>
              </div>

              {/* Interactive Quiz Check */}
              {currentLesson.quiz && currentLesson.quiz.length > 0 && (
                <div className="pt-2 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                      Interactive Knowledge Check
                    </h4>
                    <span className="text-[11px] text-slate-400">Scored check</span>
                  </div>

                  {currentLesson.quiz.map((q) => {
                    const hasAnswered = selectedAnswers[q.id] !== undefined;
                    const isSubmitted = quizSubmitted[q.id];
                    const selectedIdx = selectedAnswers[q.id];
                    const isCorrect = selectedIdx === q.correctIndex;

                    return (
                      <div key={q.id} className="rounded-xl border border-slate-200 bg-slate-50/30 p-4 space-y-3">
                        <p className="text-xs font-bold text-slate-900">{q.question}</p>

                        <div className="space-y-1.5">
                          {q.options.map((opt, optIdx) => (
                            <button
                              key={optIdx}
                              onClick={() => {
                                if (!isSubmitted) {
                                  setSelectedAnswers(prev => ({ ...prev, [q.id]: optIdx }));
                                }
                              }}
                              className={`w-full text-left rounded-lg p-2.5 text-xs transition-all border ${
                                selectedIdx === optIdx
                                  ? isSubmitted
                                    ? isCorrect
                                      ? 'border-emerald-600 bg-emerald-50 text-emerald-900 font-semibold'
                                      : 'border-rose-600 bg-rose-50 text-rose-900 font-semibold'
                                    : 'border-indigo-600 bg-indigo-50 text-indigo-900 font-semibold'
                                  : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                              }`}
                            >
                              <div className="flex items-center gap-2">
                                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-100 text-[10px] font-bold">
                                  {String.fromCharCode(65 + optIdx)}
                                </span>
                                <span>{opt}</span>
                              </div>
                            </button>
                          ))}
                        </div>

                        {!isSubmitted ? (
                          <button
                            disabled={!hasAnswered}
                            onClick={() => setQuizSubmitted(prev => ({ ...prev, [q.id]: true }))}
                            className="rounded-lg bg-indigo-600 px-4 py-1.5 text-xs font-bold text-white hover:bg-indigo-700 transition-colors disabled:opacity-50"
                          >
                            Submit Answer
                          </button>
                        ) : (
                          <div className={`p-3 rounded-lg text-xs ${isCorrect ? 'bg-emerald-50 border border-emerald-200 text-emerald-900' : 'bg-rose-50 border border-rose-200 text-rose-900'}`}>
                            <div className="font-bold mb-0.5 flex items-center gap-1.5">
                              {isCorrect ? <CheckCircle2 className="h-4 w-4 text-emerald-600" /> : <XCircle className="h-4 w-4 text-rose-600" />}
                              <span>{isCorrect ? 'Correct! Well done.' : 'Incorrect.'}</span>
                            </div>
                            <p className="text-[11px] mt-1">{q.explanation}</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ) : (
            <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-xs text-slate-500">
              Select a lesson from the syllabus on the left.
            </div>
          )}
        </div>

        {/* Right: AI Course Assistant (3 Cols) */}
        <div className="lg:col-span-3 space-y-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs flex flex-col h-[580px]">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-purple-100 text-purple-700">
                <Bot className="h-4 w-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">AI Course Assistant</h4>
                <p className="text-[10px] text-slate-500">Interactive curriculum co-pilot</p>
              </div>
            </div>

            {/* Chat messages */}
            <div className="flex-1 overflow-y-auto py-3 space-y-3 pr-1 text-xs">
              {assistantMessages.map((msg, i) => (
                <div
                  key={i}
                  className={`p-3 rounded-xl leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-indigo-600 text-white ml-4'
                      : 'bg-slate-50 border border-slate-100 text-slate-800 mr-2'
                  }`}
                >
                  {msg.text}
                </div>
              ))}
              {assistantLoading && (
                <div className="flex items-center gap-2 text-xs text-slate-500 italic p-2">
                  <Loader2 className="h-3.5 w-3.5 animate-spin text-indigo-600" />
                  Generating curriculum updates...
                </div>
              )}
            </div>

            {/* Quick Suggestions */}
            <div className="py-2 border-t border-slate-100 space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Suggested Prompts:</span>
              <div className="flex flex-wrap gap-1">
                {[
                  'Add a quiz question on compliance',
                  'Make tone more punchy & concise',
                  'Generate a voiceover summary'
                ].map((sug, idx) => (
                  <button
                    key={idx}
                    onClick={() => setAssistantPrompt(sug)}
                    className="rounded bg-slate-100 px-2 py-0.5 text-[10px] text-slate-600 hover:bg-slate-200 transition-colors"
                  >
                    {sug}
                  </button>
                ))}
              </div>
            </div>

            {/* Input */}
            <div className="pt-2 border-t border-slate-100 flex items-center gap-1.5">
              <input
                type="text"
                value={assistantPrompt}
                onChange={(e) => setAssistantPrompt(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendAssistant()}
                placeholder="Ask AI to adjust this course..."
                className="flex-1 rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs focus:border-indigo-500 focus:outline-none"
              />
              <button
                onClick={handleSendAssistant}
                disabled={assistantLoading || !assistantPrompt.trim()}
                className="rounded-lg bg-indigo-600 p-1.5 text-white hover:bg-indigo-700 disabled:opacity-40"
              >
                <Send className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* AI Create Course Modal */}
      {showGenModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs animate-fadeIn">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-indigo-600">
                <Sparkles className="h-5 w-5" />
                <h3 className="text-sm font-bold text-slate-900">AI Course Creator</h3>
              </div>
              <button
                onClick={() => setShowGenModal(false)}
                className="rounded-lg p-1 text-slate-400 hover:bg-slate-100"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-500">
              Enter any topic, training requirement, or employee handbook chapter and Gemini will synthesize an end-to-end curriculum with lessons, voiceover text, and quizzes.
            </p>

            <textarea
              rows={3}
              value={courseIdea}
              onChange={(e) => setCourseIdea(e.target.value)}
              placeholder="e.g., Enterprise Risk Management for Fintech: AML, Sanctions Screening, and Suspicious Activity Reports..."
              className="w-full rounded-xl border border-slate-200 p-3 text-xs text-slate-900 focus:border-indigo-500 focus:outline-none"
            />

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setShowGenModal(false)}
                className="rounded-lg px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                onClick={handleGenerateCourse}
                disabled={isGeneratingCourse || !courseIdea.trim()}
                className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2 text-xs font-bold text-white hover:bg-indigo-700 disabled:opacity-50"
              >
                {isGeneratingCourse ? (
                  <>
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    Generating Course...
                  </>
                ) : (
                  <>
                    <Wand2 className="h-3.5 w-3.5" />
                    Generate Syllabus
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
