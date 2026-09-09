export type ScreenId = 
  | 'screen-3'  // 3. Workspace Selection
  | 'screen-4'  // 4. Learner Dashboard
  | 'screen-5'  // 5. Course Player
  | 'screen-6'  // 6. Life Skills Foundation
  | 'screen-7'  // 7. Pet Grooming Training
  | 'screen-8'  // 8. Business & Leadership
  | 'screen-9'  // 9. Progress & Certifications
  | 'screen-10' // 10. Business Plan Builder
  | 'screen-11' // 11. Funding & Partner Referrals
  | 'screen-12' // 12. Graduation
  | 'screen-13' // 13. Mentor & Navigator Support
  | 'screen-14' // 14. Salon Workspace
  | 'screen-15' // 15. Salon Clients & Pets
  | 'screen-16' // 16. Payments & Financials
  | 'screen-17' // 17. Marketing & Growth
  | 'screen-18' // 18. Reports & Analytics
  | 'screen-19' // 19. Partner Agency Portal
  | 'screen-20'; // 20. Program Admin Portal

export interface ScreenMeta {
  id: ScreenId;
  number: number;
  title: string;
  category: 'Workspace' | 'Learner' | 'Curriculum' | 'Salon' | 'Agency & Admin';
}

export const ALL_SCREENS: ScreenMeta[] = [
  { id: 'screen-3', number: 3, title: 'Workspace Selection', category: 'Workspace' },
  { id: 'screen-4', number: 4, title: 'Learner Dashboard', category: 'Learner' },
  { id: 'screen-5', number: 5, title: 'Course Player', category: 'Curriculum' },
  { id: 'screen-6', number: 6, title: 'Life Skills Foundation', category: 'Curriculum' },
  { id: 'screen-7', number: 7, title: 'Pet Grooming Training', category: 'Curriculum' },
  { id: 'screen-8', number: 8, title: 'Business & Leadership', category: 'Curriculum' },
  { id: 'screen-9', number: 9, title: 'Progress & Certifications', category: 'Learner' },
  { id: 'screen-10', number: 10, title: 'Business Plan Builder', category: 'Learner' },
  { id: 'screen-11', number: 11, title: 'Funding & Partner Referrals', category: 'Learner' },
  { id: 'screen-12', number: 12, title: 'Graduation', category: 'Learner' },
  { id: 'screen-13', number: 13, title: 'Mentor & Navigator Support', category: 'Learner' },
  { id: 'screen-14', number: 14, title: 'Salon Workspace', category: 'Salon' },
  { id: 'screen-15', number: 15, title: 'Salon Clients & Pets', category: 'Salon' },
  { id: 'screen-16', number: 16, title: 'Payments & Financials', category: 'Salon' },
  { id: 'screen-17', number: 17, title: 'Marketing & Growth', category: 'Salon' },
  { id: 'screen-18', number: 18, title: 'Reports & Analytics', category: 'Salon' },
  { id: 'screen-19', number: 19, title: 'Partner Agency Portal', category: 'Agency & Admin' },
  { id: 'screen-20', number: 20, title: 'Program Admin Portal', category: 'Agency & Admin' },
];
