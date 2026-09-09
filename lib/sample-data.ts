import { Scenario, Course, LearningPath, LearnerReport } from './types';

export const INITIAL_SCENARIOS: Scenario[] = [
  {
    id: 'sc-escalation-01',
    title: 'Enterprise Escalation: Retaining a Churning Account',
    description: 'A key enterprise client experiences a major data integration outage 2 weeks before contract renewal. Navigate high-stakes dialogue to retain the account while maintaining team integrity.',
    category: 'Customer Success',
    difficulty: 'Intermediate',
    estimatedMinutes: 8,
    author: 'AI Curriculum Engine',
    createdAt: '2026-09-08',
    metrics: [
      { name: 'Empathy & Trust', key: 'empathy', color: 'emerald', startingValue: 60 },
      { name: 'Company Policy Compliance', key: 'compliance', color: 'blue', startingValue: 75 },
      { name: 'Resolution Efficiency', key: 'efficiency', color: 'purple', startingValue: 50 },
    ],
    characters: [
      {
        id: 'char-elena',
        name: 'Elena Rostova',
        role: 'VP of Technology at NexusGlobal',
        department: 'Client Leadership',
        avatar: '👩‍💼',
        accentColor: '#f97316',
      },
      {
        id: 'char-marcus',
        name: 'Marcus Vance',
        role: 'Lead Cloud Operations Specialist',
        department: 'Internal Engineering',
        avatar: '👨‍💻',
        accentColor: '#0ea5e9',
      }
    ],
    startSceneId: 'scene-1',
    scenes: {
      'scene-1': {
        id: 'scene-1',
        title: 'Opening Escalation Call',
        characterId: 'char-elena',
        characterEmotion: 'stressed',
        dialogue: "We are losing $40,000 per hour right now! Your batch sync failed at 3 AM and my CEO is on my back. Why shouldn't I terminate our enterprise agreement this afternoon?",
        setting: 'Virtual High-Priority War Room',
        isStartNode: true,
        x: 100,
        y: 180,
        options: [
          {
            id: 'opt-1a',
            text: 'Acknowledge the immediate revenue impact sincerely and lay out the current root-cause status with zero excuses.',
            feedback: 'Elena feels heard. Acknowledging concrete financial pain builds immediate tactical rapport.',
            targetSceneId: 'scene-2a',
            scoreDeltas: { empathy: 20, compliance: 10, efficiency: 15 },
            pedagogicalTip: 'High-stakes empathy requires validating business impact before offering technical details.'
          },
          {
            id: 'opt-1b',
            text: 'Defend your platform: Point out that NexusGlobal changed their webhook firewall rules last night without notifying you.',
            feedback: 'Elena bristles. While factually true, leading with blame escalates confrontation and destroys trust.',
            targetSceneId: 'scene-2b',
            scoreDeltas: { empathy: -30, compliance: 5, efficiency: -20 },
            pedagogicalTip: 'Never blame the client during the heat of an active severity-1 outage.'
          },
          {
            id: 'opt-1c',
            text: 'Promise an immediate $50,000 service credit and guarantee 100% uptime forever.',
            feedback: 'You violated finance governance guidelines and made a legally unverifiable promise without management approval.',
            targetSceneId: 'scene-2c',
            scoreDeltas: { empathy: 5, compliance: -40, efficiency: -10 },
            pedagogicalTip: 'Unauthorized SLA credits breach financial compliance standards.'
          }
        ]
      },
      'scene-2a': {
        id: 'scene-2a',
        title: 'Formulating Action Plan',
        characterId: 'char-elena',
        characterEmotion: 'neutral',
        dialogue: "I appreciate the transparency. But transparency doesn't restore our pipelines. What is the concrete recovery timeline?",
        setting: 'Virtual High-Priority War Room',
        x: 420,
        y: 80,
        options: [
          {
            id: 'opt-2a-1',
            text: 'Introduce Marcus from Cloud Ops to walk through the 3-step hotfix rollout with 15-minute check-ins.',
            feedback: 'Excellent collaboration. Involving direct technical leads calms engineering anxieties.',
            targetSceneId: 'scene-success',
            scoreDeltas: { empathy: 15, compliance: 15, efficiency: 25 },
            pedagogicalTip: 'Time-boxed cadence updates significantly reduce customer anxiety.'
          },
          {
            id: 'opt-2a-2',
            text: 'Ask Elena to wait 4 hours while your engineers try various restarts.',
            feedback: 'Elena feels left in the dark. A 4-hour void is unacceptable in tier-1 outages.',
            targetSceneId: 'scene-fail',
            scoreDeltas: { empathy: -15, compliance: 0, efficiency: -25 },
            pedagogicalTip: 'Never leave long gaps between escalation updates.'
          }
        ]
      },
      'scene-2b': {
        id: 'scene-2b',
        title: 'Customer Pushback on Defensive Stance',
        characterId: 'char-elena',
        characterEmotion: 'frustrated',
        dialogue: "Excuse me? You're blaming our IT security team while our production is down? I am looping in legal right now.",
        setting: 'Virtual High-Priority War Room',
        x: 420,
        y: 280,
        options: [
          {
            id: 'opt-2b-1',
            text: 'De-escalate immediately: apologize for sounding defensive and re-orient completely around getting the pipeline restored.',
            feedback: 'Skillful recovery. You swallowed your pride and saved the dialogue from fatal breakdown.',
            targetSceneId: 'scene-2a',
            scoreDeltas: { empathy: 15, compliance: 10, efficiency: 10 },
            pedagogicalTip: 'Recognize escalating friction early and pivot back to shared outcomes.'
          },
          {
            id: 'opt-2b-2',
            text: 'Quote Section 8.4 of the Master Services Agreement regarding third-party firewall configurations.',
            feedback: 'Elena hangs up and emails your Chief Revenue Officer requesting immediate contract cancellation.',
            targetSceneId: 'scene-fail',
            scoreDeltas: { empathy: -40, compliance: 10, efficiency: -35 },
            pedagogicalTip: 'Litigating contractual clauses during a crisis guarantees customer churn.'
          }
        ]
      },
      'scene-2c': {
        id: 'scene-2c',
        title: 'Compliance Audit Warning',
        characterId: 'char-marcus',
        characterEmotion: 'skeptical',
        dialogue: "Hey, I just saw you promised a $50k credit in the chat. Legal and VP of Sales just flagged your account. We don't have budget clearance for that.",
        setting: 'Internal Slack Huddle',
        x: 420,
        y: 450,
        options: [
          {
            id: 'opt-2c-1',
            text: 'Coordinate with VP of Sales on an official goodwill SLA addendum while engineering executes the fix.',
            feedback: 'You contained internal damage and brought leadership into alignment.',
            targetSceneId: 'scene-2a',
            scoreDeltas: { empathy: 5, compliance: 20, efficiency: 5 },
            pedagogicalTip: 'Always align client concessions with internal governance.'
          },
          {
            id: 'opt-2c-2',
            text: 'Tell Marcus to ignore sales and keep pushing code.',
            feedback: 'Creates toxic internal friction and severe compliance penalties.',
            targetSceneId: 'scene-fail',
            scoreDeltas: { empathy: -20, compliance: -30, efficiency: -20 },
            pedagogicalTip: 'Internal misalignment directly damages external execution.'
          }
        ]
      },
      'scene-success': {
        id: 'scene-success',
        title: 'Resolution & Account Renewal Secured',
        characterId: 'char-elena',
        characterEmotion: 'pleased',
        dialogue: "Pipelines are back online and data integrity is verified. The way your team navigated this crisis proved why we chose you. Let's proceed with our 2-year expansion contract.",
        setting: 'Executive Debrief Call',
        isTerminalNode: true,
        outcomeType: 'success',
        x: 760,
        y: 120,
        debriefNotes: 'Outstanding scenario execution! By prioritizing empathy without compromising compliance, and providing rigorous transparency, you turned a crisis into an account expansion opportunity.',
        options: []
      },
      'scene-fail': {
        id: 'scene-fail',
        title: 'Account Churn & Escalation Review',
        characterId: 'char-elena',
        characterEmotion: 'frustrated',
        dialogue: "NexusGlobal has officially issued a 30-day notice of default. We will be migrating our workloads to your competitor at the end of the month.",
        setting: 'Executive Notice Notice',
        isTerminalNode: true,
        outcomeType: 'failure',
        x: 760,
        y: 350,
        debriefNotes: 'Account lost. The scenario broke down due to defensive communication and lack of disciplined incident updates. Review empathy-first de-escalation protocols.',
        options: []
      }
    }
  },
  {
    id: 'sc-phishing-02',
    title: 'Cybersecurity: Defending Against Executive Spear-Phishing',
    description: 'You receive an urgent Sunday evening wire request purportedly from the CFO requesting a confidential $180,000 vendor payment before markets open.',
    category: 'Cybersecurity',
    difficulty: 'Beginner',
    estimatedMinutes: 5,
    author: 'InfoSec Training Labs',
    createdAt: '2026-09-07',
    metrics: [
      { name: 'Security Vigilance', key: 'compliance', color: 'blue', startingValue: 50 },
      { name: 'Protocol Adherence', key: 'efficiency', color: 'purple', startingValue: 60 },
      { name: 'Professional Composure', key: 'empathy', color: 'emerald', startingValue: 70 },
    ],
    characters: [
      {
        id: 'char-cfo',
        name: 'David Sterling',
        role: 'Chief Financial Officer (Purported)',
        department: 'Executive Finance',
        avatar: '👔',
        accentColor: '#ef4444',
      },
      {
        id: 'char-soc',
        name: 'Aisha Kahn',
        role: 'SOC Incident Commander',
        department: 'Cybersecurity Ops',
        avatar: '🛡️',
        accentColor: '#10b981',
      }
    ],
    startSceneId: 'scene-phish-1',
    scenes: {
      'scene-phish-1': {
        id: 'scene-phish-1',
        title: 'Urgent Weekend Email Alert',
        characterId: 'char-cfo',
        characterEmotion: 'stressed',
        dialogue: "I am boarding an overseas flight for an emergency acquisition. Process the attached wire for $180,000 immediately. Do not call my cell as I have no roaming service.",
        setting: 'Corporate Inbox - Urgent Mark',
        isStartNode: true,
        x: 100,
        y: 180,
        options: [
          {
            id: 'phish-opt-1',
            text: 'Inspect email headers, verify sender domain (@company-holdings-ltd.com vs @company.com), and initiate out-of-band verification via company Slack or corporate directory.',
            feedback: 'Superb vigilance! You caught the subtly spoofed domain and refused unverified wire requests.',
            targetSceneId: 'scene-phish-report',
            scoreDeltas: { compliance: 35, efficiency: 25, empathy: 10 },
            pedagogicalTip: 'Always verify financial transactions through secondary, independent channels.'
          },
          {
            id: 'phish-opt-2',
            text: 'Reply to the email asking for confirmation of invoice numbers.',
            feedback: 'Replying to an attacker within the spoofed thread simply gives them another chance to manipulate you.',
            targetSceneId: 'scene-phish-compromise',
            scoreDeltas: { compliance: -20, efficiency: -15, empathy: 0 },
            pedagogicalTip: 'Never negotiate or ask for confirmation within the suspicious email thread.'
          }
        ]
      },
      'scene-phish-report': {
        id: 'scene-phish-report',
        title: 'Alerting the Security Operations Center',
        characterId: 'char-soc',
        characterEmotion: 'pleased',
        dialogue: "Great catch! That was a live Business Email Compromise (BEC) attack targeting 12 finance employees. Thanks to your rapid alert, we blocked the attacker's IP network-wide.",
        setting: 'SOC Command Center',
        isTerminalNode: true,
        outcomeType: 'success',
        x: 480,
        y: 120,
        debriefNotes: 'Perfect score! You prevented a critical financial loss and helped InfoSec neutralize an active threat campaign.',
        options: []
      },
      'scene-phish-compromise': {
        id: 'scene-phish-compromise',
        title: 'Security Breach Simulation Warning',
        characterId: 'char-soc',
        characterEmotion: 'frustrated',
        dialogue: "You engaged with a phishing actor without alerting security. In a real incident, wire funds would have been irrevocably routed overseas.",
        setting: 'Security Awareness Mandatory Review',
        isTerminalNode: true,
        outcomeType: 'failure',
        x: 480,
        y: 300,
        debriefNotes: 'Failure to follow Dual-Sign-Off Policy. Financial approvals must always use dedicated ERP verification protocols.',
        options: []
      }
    }
  }
];

export const INITIAL_COURSES: Course[] = [
  {
    id: 'course-101',
    title: 'Adaptive Customer Escalations & De-escalation Mastery',
    description: 'Transform high-stakes client friction into long-term trust using emotional intelligence frameworks and real-time interactive branching scenarios.',
    category: 'Customer Success & Support',
    targetAudience: 'Customer Success Managers, Enterprise Account Directors',
    estimatedHours: 4.5,
    enrolledCount: 142,
    completionRate: 88,
    status: 'Published',
    scenarioId: 'sc-escalation-01',
    chapters: [
      {
        id: 'chap-1',
        title: 'Psychology of Escalation: Stress Response & Active Listening',
        description: 'Understand the neurochemistry of agitated enterprise clients and master tactical empathy.',
        lessons: [
          {
            id: 'les-1',
            title: 'De-escalating the Amygdala Hijack in B2B',
            summary: 'How to disarm anger within the first 90 seconds of an outage call.',
            durationMinutes: 15,
            hasVoiceover: true,
            content: 'When an enterprise system fails, executives experience high threat responses. Leading with procedural defenses triggers further escalation. By systematically validating business impact, you activate collaborative problem-solving.',
            quiz: [
              {
                id: 'q1',
                question: 'What is the most effective opening response during a Severity 1 outage?',
                options: [
                  'Quote the contractual SLA uptime percentage',
                  'Acknowledge financial/operational impact before technical explanation',
                  'Place the client on a 10-minute hold while checking server monitors'
                ],
                correctIndex: 1,
                explanation: 'Validating impact first calms psychological tension and establishes aligned incentives.'
              }
            ]
          },
          {
            id: 'les-2',
            title: 'Interactive Simulation: Elena Rostova War Room',
            summary: 'Apply lessons in an interactive branched scenario simulation.',
            durationMinutes: 20,
            hasVoiceover: true,
            content: 'Launch into the scenario engine to test your choices against live character reactions.'
          }
        ]
      }
    ]
  },
  {
    id: 'course-102',
    title: 'Enterprise Cyber Defense: Social Engineering & BEC Resistance',
    description: 'Protect company assets against sophisticated phishing, deepfake voice scams, and CEO wire fraud.',
    category: 'Information Security & Compliance',
    targetAudience: 'Finance, HR, Operations, All Employees',
    estimatedHours: 3.0,
    enrolledCount: 380,
    completionRate: 94,
    status: 'Published',
    scenarioId: 'sc-phishing-02',
    chapters: [
      {
        id: 'chap-sec-1',
        title: 'Anatomy of Modern Spear-Phishing',
        description: 'Analyzing recent attack vectors and fake domain spoofs.',
        lessons: [
          {
            id: 'les-sec-1',
            title: 'Spotting Lookalike Domains & Header Forgery',
            summary: 'Techniques for rapid email authentication verification.',
            durationMinutes: 12,
            hasVoiceover: true,
            content: 'Attackers frequently register lookalike domains with subtle typos or extra hyphenated company prefixes. Learn to read SPF, DKIM, and DMARC status indicators.'
          }
        ]
      }
    ]
  }
];

export const INITIAL_LEARNING_PATHS: LearningPath[] = [
  {
    id: 'path-cs-lead',
    title: 'Enterprise Client Relationship Architect',
    targetRole: 'Senior CSM & Director of CS',
    department: 'Customer Success',
    description: 'End-to-end adaptive pathway preparing leaders for $5M+ enterprise accounts with scenario mastery.',
    courses: ['course-101'],
    estimatedWeeks: 4,
    activeLearners: 28,
    adaptiveRules: [
      'Low empathy scenario score (<60) automatically inserts 2 restorative simulation drill modules.',
      'Passing compliance check at >90% unlocks accelerated contract negotiation elective.'
    ]
  },
  {
    id: 'path-fin-sec',
    title: 'Critical Infrastructure & Financial Operations Safeguards',
    targetRole: 'Finance Analyst & Controller',
    department: 'Finance & Legal',
    description: 'Mandatory certification track for high-risk transactional authorization.',
    courses: ['course-102'],
    estimatedWeeks: 2,
    activeLearners: 64,
    adaptiveRules: [
      'Phishing test failure triggers immediate mandatory scenario simulation retake within 24 hours.'
    ]
  }
];

export const INITIAL_LEARNER_REPORTS: LearnerReport[] = [
  {
    id: 'lr-1',
    name: 'Sarah Jenkins',
    email: 'sarah.j@company.io',
    department: 'Customer Success',
    assignedCourses: 3,
    completedCourses: 3,
    scenarioAverageScore: 94,
    lastActive: 'Today, 2:15 PM',
    status: 'Completed'
  },
  {
    id: 'lr-2',
    name: 'Michael Chang',
    email: 'm.chang@company.io',
    department: 'Engineering Support',
    assignedCourses: 3,
    completedCourses: 1,
    scenarioAverageScore: 58,
    lastActive: '3 days ago',
    status: 'At Risk',
    riskReason: 'Struggling with defensive dialogue in customer escalation scenarios; high friction detected.'
  },
  {
    id: 'lr-3',
    name: 'Amara Okafor',
    email: 'amara.o@company.io',
    department: 'Finance',
    assignedCourses: 2,
    completedCourses: 2,
    scenarioAverageScore: 98,
    lastActive: 'Yesterday',
    status: 'Completed'
  },
  {
    id: 'lr-4',
    name: 'David Miller',
    email: 'd.miller@company.io',
    department: 'Sales & Growth',
    assignedCourses: 4,
    completedCourses: 2,
    scenarioAverageScore: 72,
    lastActive: '5 hours ago',
    status: 'On Track'
  },
  {
    id: 'lr-5',
    name: 'Lisa Ray',
    email: 'l.ray@company.io',
    department: 'Operations',
    assignedCourses: 2,
    completedCourses: 0,
    scenarioAverageScore: 40,
    lastActive: '12 days ago',
    status: 'At Risk',
    riskReason: 'Overdue mandatory compliance deadline by 5 business days.'
  }
];
