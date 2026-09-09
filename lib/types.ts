export type SceneEmotion = 'neutral' | 'pleased' | 'frustrated' | 'skeptical' | 'stressed' | 'relieved';

export interface Character {
  id: string;
  name: string;
  role: string;
  department: string;
  avatar: string; // emoji or curated SVG/image avatar
  accentColor: string;
}

export interface MetricDelta {
  empathy: number;
  compliance: number;
  efficiency: number;
}

export interface BranchOption {
  id: string;
  text: string;
  feedback: string;
  targetSceneId: string;
  scoreDeltas: MetricDelta;
  pedagogicalTip?: string;
}

export interface SceneNode {
  id: string;
  title: string;
  characterId: string;
  characterEmotion: SceneEmotion;
  dialogue: string;
  setting: string;
  options: BranchOption[];
  isStartNode?: boolean;
  isTerminalNode?: boolean;
  outcomeType?: 'success' | 'failure' | 'neutral';
  debriefNotes?: string;
  x?: number; // visual layout coordinates
  y?: number;
}

export interface Scenario {
  id: string;
  title: string;
  description: string;
  category: 'Customer Success' | 'Compliance & Ethics' | 'Leadership' | 'Healthcare' | 'Cybersecurity';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  estimatedMinutes: number;
  characters: Character[];
  startSceneId: string;
  scenes: Record<string, SceneNode>;
  metrics: {
    name: string;
    key: 'empathy' | 'compliance' | 'efficiency';
    color: string;
    startingValue: number;
  }[];
  createdAt: string;
  author: string;
}

// Course Builder Types
export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface CourseLesson {
  id: string;
  title: string;
  summary: string;
  durationMinutes: number;
  content: string;
  hasVoiceover: boolean;
  quiz?: QuizQuestion[];
}

export interface CourseChapter {
  id: string;
  title: string;
  description: string;
  lessons: CourseLesson[];
}

export interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  targetAudience: string;
  estimatedHours: number;
  chapters: CourseChapter[];
  scenarioId?: string; // Linked interactive scenario
  enrolledCount: number;
  completionRate: number;
  status: 'Published' | 'Draft' | 'Archived';
}

// Learning Path Types
export interface LearningPath {
  id: string;
  title: string;
  targetRole: string;
  department: string;
  description: string;
  courses: string[]; // Course IDs
  estimatedWeeks: number;
  adaptiveRules: string[];
  activeLearners: number;
}

// Analytics Types
export interface LearnerReport {
  id: string;
  name: string;
  email: string;
  department: string;
  assignedCourses: number;
  completedCourses: number;
  scenarioAverageScore: number;
  lastActive: string;
  status: 'On Track' | 'At Risk' | 'Completed';
  riskReason?: string;
}
