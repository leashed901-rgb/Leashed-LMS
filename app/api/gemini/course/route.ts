import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

export async function POST(req: NextRequest) {
  try {
    const { idea, targetAudience = "Corporate Employees", category = "Professional Development" } = await req.json();

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
      return NextResponse.json(generateFallbackCourse(idea, targetAudience, category));
    }

    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });

    const prompt = `You are an expert AI Instructional Designer building a modern corporate training course.
Course Idea: "${idea}"
Target Audience: "${targetAudience}"
Category: "${category}"

Generate a complete, structured course in JSON format:
- Title and 2-sentence description
- 2 distinct Chapters
- Each Chapter has 2 Lessons (with summary, estimated minutes, rich instructional content text, and a multiple-choice quiz question with options, correctIndex, and explanation).
- Total estimated hours.

Valid JSON format:
{
  "id": "course-${Date.now()}",
  "title": "Title",
  "description": "Description",
  "category": "${category}",
  "targetAudience": "${targetAudience}",
  "estimatedHours": 2.5,
  "enrolledCount": 0,
  "completionRate": 0,
  "status": "Published",
  "chapters": [
    {
      "id": "ch-1",
      "title": "Chapter 1 Title",
      "description": "Chapter 1 overview",
      "lessons": [
        {
          "id": "les-1",
          "title": "Lesson Title",
          "summary": "Quick summary",
          "durationMinutes": 15,
          "hasVoiceover": true,
          "content": "Rich lesson body paragraph explaining best practices...",
          "quiz": [
            {
              "id": "q1",
              "question": "Realistic scenario-based question?",
              "options": ["Option A", "Option B", "Option C"],
              "correctIndex": 1,
              "explanation": "Why Option B is the right practice"
            }
          ]
        }
      ]
    }
  ]
}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      }
    });

    const text = response.text || "";
    const parsed = JSON.parse(text);
    return NextResponse.json(parsed);
  } catch (err) {
    console.error("Course Generation Error:", err);
    return NextResponse.json(generateFallbackCourse("AI-Powered Modern Workplace Mastery", "Corporate Staff", "Productivity"));
  }
}

function generateFallbackCourse(idea: string, targetAudience: string, category: string) {
  const ts = Date.now();
  return {
    id: `course-${ts}`,
    title: idea || "Enterprise Leadership & Strategic Execution",
    description: `A comprehensive masterclass designed for ${targetAudience} to build high-velocity decision making and organizational resilience.`,
    category,
    targetAudience,
    estimatedHours: 3.5,
    enrolledCount: 1,
    completionRate: 0,
    status: "Published",
    chapters: [
      {
        id: `ch-${ts}-1`,
        title: "Foundations & Cognitive Frameworks",
        description: "Core principles, stakeholder mapping, and risk-mitigated decision architecture.",
        lessons: [
          {
            id: `les-${ts}-1`,
            title: "Strategic Alignment in Volatile Environments",
            summary: "Navigating ambiguous directives and aligning cross-functional teams.",
            durationMinutes: 20,
            hasVoiceover: true,
            content: "Modern organizations succeed through distributed autonomy paired with extreme clarity of strategic intent. When objectives are transparently communicated, individual contributors make aligned judgments without micromanagement.",
            quiz: [
              {
                id: "q-1",
                question: "What produces the highest retention in fast-changing operational environments?",
                options: [
                  "Strict sequential checklists with no deviation allowed",
                  "Clear intent paired with situational decision-making autonomy",
                  "Daily approval loops with senior leadership"
                ],
                correctIndex: 1,
                explanation: "Autonomous situational judgment guided by explicit strategic intent outperforms rigid checklists."
              }
            ]
          },
          {
            id: `les-${ts}-2`,
            title: "Feedback Loops & Adaptive Retrospectives",
            summary: "Converting friction into actionable organizational refinement.",
            durationMinutes: 18,
            hasVoiceover: true,
            content: "Rapid retrospectives enable teams to detect subtle drift before critical failure. Effective blameless post-mortems separate individual intention from systemic incentives."
          }
        ]
      },
      {
        id: `ch-${ts}-2`,
        title: "Execution, Scenarios & Practical Application",
        description: "Hands-on application and interactive simulations.",
        lessons: [
          {
            id: `les-${ts}-3`,
            title: "Simulated Conflict Resolution",
            summary: "De-escalating friction and negotiating win-win outcomes.",
            durationMinutes: 25,
            hasVoiceover: true,
            content: "Practice active listening by mirroring the counterpart's core constraints before presenting counter-proposals."
          }
        ]
      }
    ]
  };
}
