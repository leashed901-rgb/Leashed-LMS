'use client';

import React, { useState, useEffect } from 'react';
import { ScreenId, ALL_SCREENS } from '@/components/screens/screenTypes';
import { Screen1WelcomeSignIn } from '@/components/screens/Screen1WelcomeSignIn';
import { Screen2CreateAccount } from '@/components/screens/Screen2CreateAccount';
import { Screen3WorkspaceSelection } from '@/components/screens/Screen3WorkspaceSelection';
import { Screen4LearnerDashboard } from '@/components/screens/Screen4LearnerDashboard';
import { Screen5CoursePlayer } from '@/components/screens/Screen5CoursePlayer';
import { Screen6LifeSkills } from '@/components/screens/Screen6LifeSkills';
import { Screen7PetGrooming } from '@/components/screens/Screen7PetGrooming';
import { Screen8BusinessLeadership } from '@/components/screens/Screen8BusinessLeadership';
import { Screen9ProgressCertifications } from '@/components/screens/Screen9ProgressCertifications';
import { Screen10BusinessPlanBuilder } from '@/components/screens/Screen10BusinessPlanBuilder';
import { Screen11FundingReferrals } from '@/components/screens/Screen11FundingReferrals';
import { Screen12GraduationSalonLaunch } from '@/components/screens/Screen12GraduationSalonLaunch';
import { Screen13MentorNavigatorSupport } from '@/components/screens/Screen13MentorNavigatorSupport';
import { Screen14SalonWorkspace } from '@/components/screens/Screen14SalonWorkspace';
import { Screen15SalonClientsPets } from '@/components/screens/Screen15SalonClientsPets';
import { Screen16SalonPaymentsFinancials } from '@/components/screens/Screen16SalonPaymentsFinancials';
import { Screen17SalonMarketingGrowth } from '@/components/screens/Screen17SalonMarketingGrowth';
import { Screen18SalonReportsAnalytics } from '@/components/screens/Screen18SalonReportsAnalytics';
import { Screen19PartnerAgencyPortal } from '@/components/screens/Screen19PartnerAgencyPortal';
import { Screen20ProgramAdminWorkspace } from '@/components/screens/Screen20ProgramAdminWorkspace';

export default function Home() {
  // Start on Screen 3 (Workspace Selection) or sync with window hash
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('screen-3');

  // Listen to hash change for direct routing
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') as ScreenId;
      if (hash && ALL_SCREENS.some(s => s.id === hash)) {
        setCurrentScreen(hash);
      }
    };

    if (typeof window !== 'undefined') {
      handleHashChange();
      window.addEventListener('hashchange', handleHashChange);
      return () => window.removeEventListener('hashchange', handleHashChange);
    }
  }, []);

  const handleNavigate = (screenId: ScreenId) => {
    setCurrentScreen(screenId);
    if (typeof window !== 'undefined') {
      window.location.hash = screenId;
    }
  };

  // Render the current screen according to heading and router specification
  return (
    <div className="min-h-screen w-full bg-slate-50 antialiased text-slate-800">
      {currentScreen === 'screen-1' && (
        <Screen1WelcomeSignIn onNavigate={handleNavigate} />
      )}
      {currentScreen === 'screen-2' && (
        <Screen2CreateAccount onNavigate={handleNavigate} />
      )}
      {currentScreen === 'screen-3' && (
        <Screen3WorkspaceSelection onNavigate={handleNavigate} />
      )}
      {currentScreen === 'screen-4' && (
        <Screen4LearnerDashboard onNavigate={handleNavigate} />
      )}
      {currentScreen === 'screen-5' && (
        <Screen5CoursePlayer onNavigate={handleNavigate} />
      )}
      {currentScreen === 'screen-6' && (
        <Screen6LifeSkills onNavigate={handleNavigate} />
      )}
      {currentScreen === 'screen-7' && (
        <Screen7PetGrooming onNavigate={handleNavigate} />
      )}
      {currentScreen === 'screen-8' && (
        <Screen8BusinessLeadership onNavigate={handleNavigate} />
      )}
      {currentScreen === 'screen-9' && (
        <Screen9ProgressCertifications onNavigate={handleNavigate} />
      )}
      {currentScreen === 'screen-10' && (
        <Screen10BusinessPlanBuilder onNavigate={handleNavigate} />
      )}
      {currentScreen === 'screen-11' && (
        <Screen11FundingReferrals onNavigate={handleNavigate} />
      )}
      {currentScreen === 'screen-12' && (
        <Screen12GraduationSalonLaunch onNavigate={handleNavigate} />
      )}
      {currentScreen === 'screen-13' && (
        <Screen13MentorNavigatorSupport onNavigate={handleNavigate} />
      )}
      {currentScreen === 'screen-14' && (
        <Screen14SalonWorkspace onNavigate={handleNavigate} />
      )}
      {currentScreen === 'screen-15' && (
        <Screen15SalonClientsPets onNavigate={handleNavigate} />
      )}
      {currentScreen === 'screen-16' && (
        <Screen16SalonPaymentsFinancials onNavigate={handleNavigate} />
      )}
      {currentScreen === 'screen-17' && (
        <Screen17SalonMarketingGrowth onNavigate={handleNavigate} />
      )}
      {currentScreen === 'screen-18' && (
        <Screen18SalonReportsAnalytics onNavigate={handleNavigate} />
      )}
      {currentScreen === 'screen-19' && (
        <Screen19PartnerAgencyPortal onNavigate={handleNavigate} />
      )}
      {currentScreen === 'screen-20' && (
        <Screen20ProgramAdminWorkspace onNavigate={handleNavigate} />
      )}
    </div>
  );
}
