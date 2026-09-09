'use client';

import React, { useState, useEffect } from 'react';
import { Navbar, NavTab } from '@/components/Navbar';
import { ScenarioBuilderView } from '@/components/scenario/ScenarioBuilderView';
import { Roadmap72HourView } from '@/components/roadmap/Roadmap72HourView';
import { CourseStudioView } from '@/components/courses/CourseStudioView';
import { LearningPathsView } from '@/components/paths/LearningPathsView';
import { AnalyticsReportsView } from '@/components/analytics/AnalyticsReportsView';
import { CourseLibraryView } from '@/components/library/CourseLibraryView';
import { WorkspaceHubView } from '@/components/workspace/WorkspaceHubView';
import { LandingPageView } from '@/components/landing/LandingPageView';
import { ScenarioPlayerModal } from '@/components/scenario/ScenarioPlayerModal';
import { AIGenerateScenarioModal } from '@/components/scenario/AIGenerateScenarioModal';
import { AuthModal, AuthUser } from '@/components/auth/AuthModal';
import { 
  INITIAL_SCENARIOS, 
  INITIAL_COURSES, 
  INITIAL_LEARNING_PATHS, 
  INITIAL_LEARNER_REPORTS 
} from '@/lib/sample-data';
import { Scenario, Course, LearningPath, LearnerReport } from '@/lib/types';

export default function Home() {
  const [activeTab, setActiveTab] = useState<NavTab>('landing');
  const [scenarios, setScenarios] = useState<Scenario[]>(INITIAL_SCENARIOS);
  const [activeScenarioId, setActiveScenarioId] = useState<string>(INITIAL_SCENARIOS[0].id);
  const [courses, setCourses] = useState<Course[]>(INITIAL_COURSES);
  const [paths, setPaths] = useState<LearningPath[]>(INITIAL_LEARNING_PATHS);
  const [reports, setReports] = useState<LearnerReport[]>(INITIAL_LEARNER_REPORTS);

  // Auth and Gating state (lazy initialized from localStorage)
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('leashed_auth_user');
        return stored ? JSON.parse(stored) : null;
      } catch {
        return null;
      }
    }
    return null;
  });
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signup');
  const [authGateMessage, setAuthGateMessage] = useState<string | undefined>(undefined);
  const [pendingTab, setPendingTab] = useState<NavTab | null>(null);

  // Global modal triggers
  const [isPlayerOpen, setIsPlayerOpen] = useState(false);
  const [isAIGenOpen, setIsAIGenOpen] = useState(false);

  const currentScenario = scenarios.find(s => s.id === activeScenarioId) || scenarios[0];

  const handleOpenAuth = (mode: 'signin' | 'signup' = 'signup', gateMessage?: string) => {
    setAuthMode(mode);
    setAuthGateMessage(gateMessage);
    setIsAuthModalOpen(true);
  };

  const handleSelectTab = (tab: NavTab) => {
    if (tab === 'landing') {
      setActiveTab('landing');
      return;
    }

    // Auth gate for LMS tabs
    if (!currentUser) {
      setPendingTab(tab);
      const tabLabels: Record<NavTab, string> = {
        landing: 'Home',
        'scenario-builder': 'Scenario Studio',
        '72h-plan': '72-Hour Roadmap',
        courses: 'Course Studio',
        paths: 'Learning Pathways',
        analytics: 'Analytics & Outcomes',
        library: 'SCORM Templates',
        'google-workspace': 'Google Workspace Hub',
      };
      handleOpenAuth('signup', `Create your account or sign in to access the ${tabLabels[tab]} portal.`);
      return;
    }

    setActiveTab(tab);
  };

  const handleAuthSuccess = (user: AuthUser) => {
    setCurrentUser(user);
    try {
      localStorage.setItem('leashed_auth_user', JSON.stringify(user));
    } catch (e) {
      console.error('Error storing session:', e);
    }
    setIsAuthModalOpen(false);

    if (pendingTab) {
      setActiveTab(pendingTab);
      setPendingTab(null);
    } else if (activeTab === 'landing') {
      setActiveTab('courses');
    }
  };

  const handleSignOut = () => {
    setCurrentUser(null);
    try {
      localStorage.removeItem('leashed_auth_user');
    } catch (e) {
      console.error('Error removing session:', e);
    }
    setActiveTab('landing');
  };

  const handleUpdateScenario = (updated: Scenario) => {
    setScenarios(prev => prev.map(s => s.id === updated.id ? updated : s));
  };

  const handleCreateScenario = (newScenario: Scenario) => {
    setScenarios(prev => [newScenario, ...prev]);
    setActiveScenarioId(newScenario.id);
    setActiveTab('scenario-builder');
  };

  const handleUpdateCourse = (updated: Course) => {
    setCourses(prev => prev.map(c => c.id === updated.id ? updated : c));
  };

  const handleAddCourse = (newCourse: Course) => {
    setCourses(prev => [newCourse, ...prev]);
  };

  const handleLaunchScenario = (scenarioId?: string) => {
    if (scenarioId) {
      setActiveScenarioId(scenarioId);
    }
    setIsPlayerOpen(true);
  };

  return (
    <div className="min-h-screen w-full m-0 p-0 bg-slate-100/60 font-sans text-slate-900 flex flex-col">
      {activeTab === 'landing' ? (
        <LandingPageView
          onNavigateToTab={handleSelectTab}
          onLaunchScenario={handleLaunchScenario}
          onOpenAuth={handleOpenAuth}
          currentUser={currentUser}
        />
      ) : (
        <>
          {/* Global Navigation Bar for LMS Studio */}
          <Navbar
            activeTab={activeTab}
            onSelectTab={handleSelectTab}
            onOpenQuickGenerate={() => setIsAIGenOpen(true)}
            onPlayCurrentScenario={() => setIsPlayerOpen(true)}
            currentUser={currentUser}
            onOpenAuth={handleOpenAuth}
            onSignOut={handleSignOut}
          />

          {/* Main Container - Full Bleed Edge to Edge */}
          <main className="flex-1 w-full p-4 sm:p-6 lg:p-8">
            {activeTab === 'scenario-builder' && (
              <ScenarioBuilderView
                scenarios={scenarios}
                activeScenarioId={activeScenarioId}
                onSelectScenario={setActiveScenarioId}
                onUpdateScenario={handleUpdateScenario}
                onCreateScenario={handleCreateScenario}
              />
            )}

            {activeTab === '72h-plan' && (
              <Roadmap72HourView />
            )}

            {activeTab === 'courses' && (
              <CourseStudioView
                courses={courses}
                onUpdateCourse={handleUpdateCourse}
                onAddCourse={handleAddCourse}
                onLaunchScenario={handleLaunchScenario}
              />
            )}

            {activeTab === 'paths' && (
              <LearningPathsView
                paths={paths}
                courses={courses}
                onSelectCourse={() => {
                  setActiveTab('courses');
                }}
                onLaunchScenario={handleLaunchScenario}
              />
            )}

            {activeTab === 'analytics' && (
              <AnalyticsReportsView reports={reports} />
            )}

            {activeTab === 'library' && (
              <CourseLibraryView />
            )}

            {activeTab === 'google-workspace' && (
              <WorkspaceHubView scenarios={scenarios} courses={courses} />
            )}
          </main>

          {/* Studio Footer */}
          <footer className="border-t border-slate-200 bg-white py-4 text-center text-xs text-slate-500">
            <div className="w-full px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-slate-700">Leashed.io Social Impact LMS</span>
                <span>•</span>
                <span>Skills. Stability. Second Chances.</span>
              </div>
              <div className="flex items-center gap-4 text-[11px] text-slate-500">
                <button
                  onClick={() => setActiveTab('landing')}
                  className="text-teal-600 font-semibold hover:underline cursor-pointer"
                >
                  &larr; Return to Landing Page
                </button>
                <span>•</span>
                <span>Powered by Gemini 2.5 Flash</span>
              </div>
            </div>
          </footer>
        </>
      )}

      {/* Global Modals for simulation & generation */}
      {currentScenario && (
        <ScenarioPlayerModal
          scenario={currentScenario}
          isOpen={isPlayerOpen}
          onClose={() => setIsPlayerOpen(false)}
        />
      )}

      <AIGenerateScenarioModal
        isOpen={isAIGenOpen}
        onClose={() => setIsAIGenOpen(false)}
        onScenarioGenerated={handleCreateScenario}
      />

      {/* Authentication & Access Gate Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        initialMode={authMode}
        gateMessage={authGateMessage}
        onClose={() => {
          setIsAuthModalOpen(false);
          setPendingTab(null);
        }}
        onSuccess={handleAuthSuccess}
      />
    </div>
  );
}
