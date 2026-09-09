import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

export async function POST(req: NextRequest) {
  try {
    const { topic, difficulty = "Intermediate", department = "Customer Success", charactersCount = 2 } = await req.json();

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
      // Fallback deterministic generated scenario
      return NextResponse.json(generateFallbackScenario(topic || "Workplace Conflict Resolution", difficulty, department));
    }

    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });

    const prompt = `You are a world-class instructional designer specializing in branching scenario-based simulation learning (similar to Cathy Moore's Action Mapping and Articulate Rise Scenario blocks).
Create a complete, realistic, interactive branched scenario about: "${topic}".
Difficulty: ${difficulty}.
Department/Domain: ${department}.

Requirements:
- 2 to 3 characters with distinct personas, avatars (an emoji like 👩‍💼, 👨‍💻, 👨‍⚕️, 🛡️, 🧑‍⚖️), roles, and accent colors.
- Exactly 4 to 6 scene nodes forming a branched Directed Acyclic Graph (DAG):
  - scene-1: starting scene with an immediate realistic crisis or dilemma
  - At least 2 intermediate branching scenes (e.g. scene-2a, scene-2b)
  - Exactly 2 terminal scenes: scene-success (positive outcome) and scene-fail (realistic consequence)
- Each non-terminal scene must have 2 to 3 distinct response choices:
  - 1 optimal choice (demonstrating empathy/best practice)
  - 1 or 2 plausible suboptimal or mistake choices (with realistic negative consequences)
  - Explicit pedagogical feedback explaining WHY the choice succeeds or fails
  - scoreDeltas for empathy (-30 to +30), compliance (-30 to +30), and efficiency (-30 to +30)
- TargetSceneId must point to one of the other scene node IDs.
- Valid JSON schema only:
{
  "id": "sc-${Date.now()}",
  "title": "Short punchy title",
  "description": "Engaging 2-sentence scenario premise",
  "category": "${department}",
  "difficulty": "${difficulty}",
  "estimatedMinutes": 6,
  "characters": [
    { "id": "char-1", "name": "Name", "role": "Role", "department": "Dept", "avatar": "👩‍💼", "accentColor": "#f97316" }
  ],
  "startSceneId": "scene-1",
  "metrics": [
    { "name": "Empathy & Trust", "key": "empathy", "color": "emerald", "startingValue": 60 },
    { "name": "Policy & Compliance", "key": "compliance", "color": "blue", "startingValue": 70 },
    { "name": "Operational Efficiency", "key": "efficiency", "color": "purple", "startingValue": 55 }
  ],
  "scenes": {
    "scene-1": {
      "id": "scene-1",
      "title": "Scene title",
      "characterId": "char-1",
      "characterEmotion": "stressed",
      "dialogue": "Spoken dialogue here...",
      "setting": "Setting description",
      "isStartNode": true,
      "x": 100,
      "y": 180,
      "options": [
        {
          "id": "opt-1",
          "text": "Response option text",
          "feedback": "Why this works or fails",
          "targetSceneId": "scene-2a",
          "scoreDeltas": { "empathy": 15, "compliance": 10, "efficiency": 10 },
          "pedagogicalTip": "Actionable takeaway"
        }
      ]
    },
    "scene-success": {
      "id": "scene-success",
      "title": "Successful Resolution",
      "characterId": "char-1",
      "characterEmotion": "pleased",
      "dialogue": "Resolution dialogue",
      "setting": "Setting",
      "isTerminalNode": true,
      "outcomeType": "success",
      "debriefNotes": "Key learning takeaways",
      "x": 750,
      "y": 120,
      "options": []
    },
    "scene-fail": {
      "id": "scene-fail",
      "title": "Unfavorable Outcome",
      "characterId": "char-1",
      "characterEmotion": "frustrated",
      "dialogue": "Failure consequence dialogue",
      "setting": "Setting",
      "isTerminalNode": true,
      "outcomeType": "failure",
      "debriefNotes": "What went wrong and how to improve",
      "x": 750,
      "y": 320,
      "options": []
    }
  }
}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const text = response.text || "";
    const parsed = JSON.parse(text);
    return NextResponse.json(parsed);
  } catch (err) {
    console.error("Gemini Scenario Gen Error:", err);
    return NextResponse.json(generateFallbackScenario("Adaptive Dilemma Simulation", "Intermediate", "Management"));
  }
}

function generateFallbackScenario(topic: string, difficulty: string, department: string) {
  const timestamp = Date.now();
  return {
    id: `sc-ai-${timestamp}`,
    title: `Simulation: ${topic}`,
    description: `An adaptive branching training simulation designed to build critical judgment and tactical decision-making in ${department}.`,
    category: department,
    difficulty,
    estimatedMinutes: 6,
    author: "AI Curriculum Generator",
    createdAt: new Date().toISOString().split("T")[0],
    metrics: [
      { name: "Empathy & Communication", key: "empathy", color: "emerald", startingValue: 65 },
      { name: "Compliance & Protocols", key: "compliance", color: "blue", startingValue: 70 },
      { name: "Resolution Efficiency", key: "efficiency", color: "purple", startingValue: 60 },
    ],
    characters: [
      {
        id: "char-mentor",
        name: "Jordan Rivera",
        role: "Senior Operations Director",
        department,
        avatar: "🧑‍💼",
        accentColor: "#3b82f6",
      },
      {
        id: "char-counterpart",
        name: "Morgan Lee",
        role: "Department Lead",
        department,
        avatar: "👩‍💼",
        accentColor: "#f59e0b",
      }
    ],
    startSceneId: "scene-1",
    scenes: {
      "scene-1": {
        id: "scene-1",
        title: "Immediate Situation Appraisal",
        characterId: "char-counterpart",
        characterEmotion: "stressed",
        dialogue: `We have an urgent issue regarding ${topic}. The previous procedure failed and our stakeholders are demanding an explanation within 15 minutes. How should we proceed?`,
        setting: "Virtual Command Center",
        isStartNode: true,
        x: 100,
        y: 180,
        options: [
          {
            id: "opt-1-a",
            text: "Request an immediate 10-minute briefing on the core facts, validate Morgan's stress, and assign a single verified point of contact.",
            feedback: "Excellent composure under pressure. You grounded the discussion in facts rather than panic.",
            targetSceneId: "scene-2a",
            scoreDeltas: { empathy: 20, compliance: 15, efficiency: 15 },
            pedagogicalTip: "In crisis management, establish a single source of truth before communicating outward."
          },
          {
            id: "opt-1-b",
            text: "Send a mass email to all stakeholders claiming the issue is minor and will be resolved shortly without checking root cause.",
            feedback: "Premature commitments erode institutional credibility when root issues aren't understood.",
            targetSceneId: "scene-2b",
            scoreDeltas: { empathy: -15, compliance: -30, efficiency: -10 },
            pedagogicalTip: "Never publish unverified assurances to stakeholders during an active escalation."
          }
        ]
      },
      "scene-2a": {
        id: "scene-2a",
        title: "Coordinating Root Cause Remediation",
        characterId: "char-mentor",
        characterEmotion: "pleased",
        dialogue: "Good choice taking command of the facts. We identified the root bottleneck. Do we execute the failover plan or continue monitoring?",
        setting: "War Room Audio Huddle",
        x: 420,
        y: 100,
        options: [
          {
            id: "opt-2a-1",
            text: "Execute the approved failover procedure with automated rollbacks and notify stakeholders with timestamped checkpoints.",
            feedback: "Standard operating procedure executed flawlessly with transparent oversight.",
            targetSceneId: "scene-success",
            scoreDeltas: { empathy: 15, compliance: 25, efficiency: 25 },
            pedagogicalTip: "Follow documented failover runbooks rather than ad-hoc improvised solutions."
          },
          {
            id: "opt-2a-2",
            text: "Bypass review gates to push an untested quick patch directly into production.",
            feedback: "Bypassing safety controls risks severe secondary outages.",
            targetSceneId: "scene-fail",
            scoreDeltas: { empathy: -10, compliance: -40, efficiency: -25 },
            pedagogicalTip: "Change management protocols exist specifically to prevent secondary cascade failures."
          }
        ]
      },
      "scene-2b": {
        id: "scene-2b",
        title: "Stakeholder Backlash",
        characterId: "char-counterpart",
        characterEmotion: "frustrated",
        dialogue: "The mass email backfired. Executives are calling asking why we downplayed a critical disruption.",
        setting: "Leadership Escalation Channel",
        x: 420,
        y: 300,
        options: [
          {
            id: "opt-2b-1",
            text: "Issue an immediate correction clarifying verified impact and outline concrete milestones.",
            feedback: "A difficult but necessary course correction that limits further reputational damage.",
            targetSceneId: "scene-2a",
            scoreDeltas: { empathy: 15, compliance: 10, efficiency: 10 },
            pedagogicalTip: "When misinformation is shared, prompt transparent correction is vital."
          },
          {
            id: "opt-2b-2",
            text: "Defend the email and turn off notifications to focus on the work.",
            feedback: "Severe loss of stakeholder trust.",
            targetSceneId: "scene-fail",
            scoreDeltas: { empathy: -30, compliance: -30, efficiency: -30 },
            pedagogicalTip: "Ghosting stakeholders during an emergency is an unforgivable failure of governance."
          }
        ]
      },
      "scene-success": {
        id: "scene-success",
        title: "Resolution Complete & Retrospective Scheduled",
        characterId: "char-mentor",
        characterEmotion: "pleased",
        dialogue: "Outstanding execution. The situation is fully normalized, stakeholders sent commendations for our transparency, and no compliance boundaries were breached.",
        setting: "Post-Mortem Review Lounge",
        isTerminalNode: true,
        outcomeType: "success",
        debriefNotes: "You demonstrated disciplined crisis communication, verified diagnostics before action, and followed compliance protocols without panic.",
        options: []
      },
      "scene-fail": {
        id: "scene-fail",
        title: "Severe Compliance & Reputational Penalty",
        characterId: "char-counterpart",
        characterEmotion: "frustrated",
        dialogue: "The intervention collapsed. Executive review has opened a formal inquiry into the operational breakdowns.",
        setting: "Executive Audit Panel",
        isTerminalNode: true,
        outcomeType: "failure",
        debriefNotes: "Review protocols for transparent communication and incident management standard operating procedures.",
        options: []
      }
    }
  };
}
