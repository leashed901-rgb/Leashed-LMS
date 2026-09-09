'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { 
  GraduationCap, 
  Video, 
  MessageSquare, 
  Calendar as CalendarIcon, 
  FolderGit2, 
  FileText, 
  Presentation, 
  CheckSquare, 
  ExternalLink, 
  Plus, 
  RefreshCw, 
  Send, 
  Trash2, 
  LogOut, 
  Search, 
  AlertCircle, 
  Sparkles,
  Layers
} from 'lucide-react';
import { googleSignIn, logout, initAuth } from '@/lib/google-auth';
import { openGooglePicker } from '@/lib/workspace-client';
import { WorkspaceConfirmDialog } from './WorkspaceConfirmDialog';
import { Scenario, Course } from '@/lib/types';
import type { User } from 'firebase/auth';

type WorkspaceTab = 
  | 'classroom' 
  | 'meet' 
  | 'chat' 
  | 'calendar' 
  | 'drive' 
  | 'docs' 
  | 'slides' 
  | 'forms';

interface WorkspaceHubViewProps {
  scenarios?: Scenario[];
  courses?: Course[];
}

export const WorkspaceHubView: React.FC<WorkspaceHubViewProps> = ({
  scenarios = [],
}) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [activeSubTab, setActiveSubTab] = useState<WorkspaceTab>('classroom');
  const [isLoadingAuth, setIsLoadingAuth] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  // Classroom state
  const [classroomCourses, setClassroomCourses] = useState<Array<any>>([]);
  const [selectedClassroomId, setSelectedClassroomId] = useState<string>('');
  const [classroomCoursework, setClassroomCoursework] = useState<Array<any>>([]);
  const [isLoadingClassroom, setIsLoadingClassroom] = useState(false);

  // Meet state
  const [meetSpaces, setMeetSpaces] = useState<Array<any>>([]);
  const [isCreatingMeet, setIsCreatingMeet] = useState(false);

  // Chat state
  const [chatSpaces, setChatSpaces] = useState<Array<any>>([]);
  const [selectedChatSpace, setSelectedChatSpace] = useState<string>('');
  const [chatMessageText, setChatMessageText] = useState('');
  const [isLoadingChat, setIsLoadingChat] = useState(false);

  // Calendar state
  const [calendarEvents, setCalendarEvents] = useState<Array<any>>([]);
  const [isLoadingCalendar, setIsLoadingCalendar] = useState(false);

  // Drive state
  const [driveFiles, setDriveFiles] = useState<Array<any>>([]);
  const [driveQuery, setDriveQuery] = useState('');
  const [isLoadingDrive, setIsLoadingDrive] = useState(false);

  // Docs state
  const [docIdInput, setDocIdInput] = useState('');
  const [docContent, setDocContent] = useState<any>(null);
  const [isLoadingDoc, setIsLoadingDoc] = useState(false);

  // Slides state
  const [slideIdInput, setSlideIdInput] = useState('');
  const [slideContent, setSlideContent] = useState<any>(null);
  const [isLoadingSlide, setIsLoadingSlide] = useState(false);

  // Forms state
  const [formIdInput, setFormIdInput] = useState('');
  const [formData, setFormData] = useState<any>(null);
  const [isLoadingForm, setIsLoadingForm] = useState(false);

  // Confirmation modal state
  const [confirmDialog, setConfirmDialog] = useState<{
    isOpen: boolean;
    title: string;
    description: string;
    impactDetails?: string[];
    confirmLabel?: string;
    isDestructive?: boolean;
    action?: () => Promise<void>;
  }>({
    isOpen: false,
    title: '',
    description: '',
  });
  const [isProcessingAction, setIsProcessingAction] = useState(false);

  // Classroom fetchers
  const fetchClassroomCoursework = useCallback(async (courseId: string) => {
    if (!token) return;
    try {
      const res = await fetch(`/api/workspace/classroom?courseId=${courseId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setClassroomCoursework(data.courseWork || []);
    } catch (e) {
      console.error(e);
    }
  }, [token]);

  const fetchClassroomCourses = useCallback(async () => {
    if (!token) return;
    setIsLoadingClassroom(true);
    try {
      const res = await fetch('/api/workspace/classroom', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.courses) {
        setClassroomCourses(data.courses);
        if (data.courses[0]) {
          setSelectedClassroomId(data.courses[0].id);
          fetchClassroomCoursework(data.courses[0].id);
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoadingClassroom(false);
    }
  }, [token, fetchClassroomCoursework]);

  // Chat fetchers
  const fetchChatSpaces = useCallback(async () => {
    if (!token) return;
    setIsLoadingChat(true);
    try {
      const res = await fetch('/api/workspace/chat', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.spaces) {
        setChatSpaces(data.spaces);
        if (data.spaces[0]) {
          setSelectedChatSpace(data.spaces[0].name);
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoadingChat(false);
    }
  }, [token]);

  // Calendar fetchers
  const fetchCalendarEvents = useCallback(async () => {
    if (!token) return;
    setIsLoadingCalendar(true);
    try {
      const res = await fetch('/api/workspace/calendar', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setCalendarEvents(data.items || []);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoadingCalendar(false);
    }
  }, [token]);

  // Drive fetchers
  const fetchDriveFiles = useCallback(async () => {
    if (!token) return;
    setIsLoadingDrive(true);
    try {
      let url = '/api/workspace/drive?pageSize=15';
      if (driveQuery) {
        url += `&q=name contains '${driveQuery}' and trashed=false`;
      }
      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setDriveFiles(data.files || []);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoadingDrive(false);
    }
  }, [token, driveQuery]);

  // Docs fetcher
  const fetchDocDetails = useCallback(async (idToFetch?: string) => {
    const id = idToFetch || docIdInput;
    if (!id || !token) return;
    setIsLoadingDoc(true);
    try {
      const res = await fetch(`/api/workspace/docs?documentId=${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setDocContent(data);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoadingDoc(false);
    }
  }, [token, docIdInput]);

  // Slides fetcher
  const fetchSlideDetails = useCallback(async (idToFetch?: string) => {
    const id = idToFetch || slideIdInput;
    if (!id || !token) return;
    setIsLoadingSlide(true);
    try {
      const res = await fetch(`/api/workspace/slides?presentationId=${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setSlideContent(data);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoadingSlide(false);
    }
  }, [token, slideIdInput]);

  // Forms fetcher
  const fetchFormDetails = useCallback(async (idToFetch?: string) => {
    const id = idToFetch || formIdInput;
    if (!id || !token) return;
    setIsLoadingForm(true);
    try {
      const res = await fetch(`/api/workspace/forms?formId=${id}&includeResponses=true`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setFormData(data);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoadingForm(false);
    }
  }, [token, formIdInput]);

  // Initialize auth listener
  useEffect(() => {
    const unsubscribe = initAuth(
      (user, cachedToken) => {
        setCurrentUser(user);
        setToken(cachedToken);
      },
      () => {
        setCurrentUser(null);
        setToken(null);
      }
    );
    return () => unsubscribe();
  }, []);

  // Fetch active tab data when token is available
  useEffect(() => {
    if (!token) return;
    const timer = setTimeout(() => {
      if (activeSubTab === 'classroom') fetchClassroomCourses();
      if (activeSubTab === 'chat') fetchChatSpaces();
      if (activeSubTab === 'calendar') fetchCalendarEvents();
      if (activeSubTab === 'drive') fetchDriveFiles();
    }, 0);
    return () => clearTimeout(timer);
  }, [token, activeSubTab, fetchClassroomCourses, fetchChatSpaces, fetchCalendarEvents, fetchDriveFiles]);

  const handleSignIn = async () => {
    setIsLoadingAuth(true);
    setAuthError(null);
    try {
      const res = await googleSignIn();
      if (res) {
        setCurrentUser(res.user);
        setToken(res.accessToken);
      }
    } catch (err: any) {
      console.error('Sign-in error:', err);
      setAuthError(err?.message || 'Failed to authenticate with Google Workspace');
    } finally {
      setIsLoadingAuth(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    setCurrentUser(null);
    setToken(null);
  };

  // Google Meet Space Creator
  const handleCreateMeetSpace = () => {
    setConfirmDialog({
      isOpen: true,
      title: 'Create Google Meet Session Room',
      description: 'You are about to provision a live Google Meet conference room for your learners and trainers.',
      impactDetails: [
        'A new Google Meet space will be generated on your Google account',
        'Meeting room URI will be created and accessible to all invited attendees'
      ],
      confirmLabel: 'Create Meeting Space',
      action: async () => {
        setIsCreatingMeet(true);
        try {
          const res = await fetch('/api/workspace/meet', {
            method: 'POST',
            headers: { Authorization: `Bearer ${token}` },
            body: JSON.stringify({}),
          });
          const data = await res.json();
          if (data.name) {
            setMeetSpaces(prev => [data, ...prev]);
          }
        } catch (e) {
          console.error(e);
        } finally {
          setIsCreatingMeet(false);
          setConfirmDialog(prev => ({ ...prev, isOpen: false }));
        }
      }
    });
  };

  const handleSendChatMessage = () => {
    if (!selectedChatSpace || !chatMessageText.trim()) return;

    setConfirmDialog({
      isOpen: true,
      title: 'Post Announcement to Google Chat',
      description: `Publish this simulation update to Google Chat space "${selectedChatSpace}"?`,
      impactDetails: [
        `Target Space: ${selectedChatSpace}`,
        `Message Content: "${chatMessageText}"`,
        'All space members will receive this real-time notification'
      ],
      confirmLabel: 'Send Message',
      action: async () => {
        try {
          await fetch('/api/workspace/chat', {
            method: 'POST',
            headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
            body: JSON.stringify({
              spaceName: selectedChatSpace,
              text: chatMessageText,
            }),
          });
          setChatMessageText('');
          alert('Message posted to Google Chat successfully!');
        } catch (e) {
          console.error(e);
        } finally {
          setConfirmDialog(prev => ({ ...prev, isOpen: false }));
        }
      }
    });
  };

  const handleScheduleScenarioReview = (scenarioTitle: string) => {
    setConfirmDialog({
      isOpen: true,
      title: 'Schedule LMS Scenario Review in Google Calendar',
      description: `Add an event for "${scenarioTitle}" to your primary Google Calendar?`,
      impactDetails: [
        `Summary: CogniFlow Review - ${scenarioTitle}`,
        'Calendar: Primary Google Calendar',
        'Time: Scheduled for tomorrow at 10:00 AM'
      ],
      confirmLabel: 'Add to Calendar',
      action: async () => {
        try {
          const startTime = new Date();
          startTime.setDate(startTime.getDate() + 1);
          startTime.setHours(10, 0, 0, 0);

          const endTime = new Date(startTime);
          endTime.setHours(11, 0, 0, 0);

          const res = await fetch('/api/workspace/calendar', {
            method: 'POST',
            headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
            body: JSON.stringify({
              summary: `CogniFlow LMS: ${scenarioTitle} Review Session`,
              description: `Adaptive simulation review session powered by CogniFlow LMS.`,
              startDateTime: startTime.toISOString(),
              endDateTime: endTime.toISOString(),
            }),
          });
          if (res.ok) {
            fetchCalendarEvents();
          }
        } catch (e) {
          console.error(e);
        } finally {
          setConfirmDialog(prev => ({ ...prev, isOpen: false }));
        }
      }
    });
  };

  const handleLaunchPicker = async (viewType: 'DOCS' | 'PRESENTATIONS' | 'FORMS' = 'DOCS') => {
    if (!token) return;
    try {
      await openGooglePicker(token, (pickedDoc) => {
        if (viewType === 'DOCS') {
          setDocIdInput(pickedDoc.id);
          fetchDocDetails(pickedDoc.id);
          setActiveSubTab('docs');
        } else if (viewType === 'PRESENTATIONS') {
          setSlideIdInput(pickedDoc.id);
          fetchSlideDetails(pickedDoc.id);
          setActiveSubTab('slides');
        } else {
          setFormIdInput(pickedDoc.id);
          fetchFormDetails(pickedDoc.id);
          setActiveSubTab('forms');
        }
      }, viewType);
    } catch (err: any) {
      alert(err?.message || 'Could not launch Google Picker. Please ensure popup blocker is disabled.');
    }
  };

  const handleDeleteDriveFile = (fileId: string, fileName: string) => {
    setConfirmDialog({
      isOpen: true,
      title: 'Delete Google Drive File',
      description: `Are you sure you want to permanently delete "${fileName}" from your Google Drive?`,
      impactDetails: [
        `File Name: ${fileName}`,
        `File ID: ${fileId}`,
        'This action is destructive and cannot be easily undone.'
      ],
      confirmLabel: 'Delete Permanently',
      isDestructive: true,
      action: async () => {
        try {
          const res = await fetch(`/api/workspace/drive?fileId=${fileId}`, {
            method: 'DELETE',
            headers: { Authorization: `Bearer ${token}` },
          });
          if (res.ok) {
            setDriveFiles(prev => prev.filter(f => f.id !== fileId));
          }
        } catch (e) {
          console.error(e);
        } finally {
          setConfirmDialog(prev => ({ ...prev, isOpen: false }));
        }
      }
    });
  };

  const handleExecuteConfirmedAction = async () => {
    if (!confirmDialog.action) return;
    setIsProcessingAction(true);
    try {
      await confirmDialog.action();
    } finally {
      setIsProcessingAction(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="rounded-2xl bg-white border border-slate-200/80 p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 via-indigo-600 to-sky-500 text-white shadow-md shadow-indigo-100">
              <Layers className="h-6 w-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-slate-900 tracking-tight">
                  Google Workspace Integration Hub
                </h1>
                <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 border border-emerald-200">
                  9 Services Active
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1 max-w-2xl">
                Seamlessly orchestrate Google Classroom courses, live Google Meet conference spaces, Chat announcements, Calendar schedules, Google Drive storage with Google Picker, Docs, Slides, and Forms for adaptive learning.
              </p>
            </div>
          </div>

          {/* Official Google Sign-in Button or User Profile */}
          <div className="flex items-center gap-3">
            {!currentUser ? (
              <button
                type="button"
                id="btn-google-signin"
                onClick={handleSignIn}
                disabled={isLoadingAuth}
                className="flex items-center gap-3 rounded-lg border border-[#dadce0] bg-white px-4 py-2 text-xs font-medium text-[#3c4043] shadow-sm hover:bg-[#f8f9fa] hover:border-[#d2d5d9] transition-all disabled:opacity-60 cursor-pointer"
              >
                {isLoadingAuth ? (
                  <span className="h-4 w-4 border-2 border-slate-300 border-t-indigo-600 rounded-full animate-spin" />
                ) : (
                  <svg className="h-4 w-4" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    />
                  </svg>
                )}
                <span>Sign in with Google Workspace</span>
              </button>
            ) : (
              <div className="flex items-center gap-2.5 rounded-xl bg-slate-50 border border-slate-200 p-1.5 pl-3">
                <div className="text-right">
                  <div className="text-xs font-semibold text-slate-800 leading-tight">
                    {currentUser.displayName || currentUser.email}
                  </div>
                  <div className="text-[10px] text-emerald-600 font-medium">
                    Google OAuth Connected
                  </div>
                </div>
                {currentUser.photoURL ? (
                  <Image
                    src={currentUser.photoURL}
                    alt="User"
                    width={32}
                    height={32}
                    referrerPolicy="no-referrer"
                    className="h-8 w-8 rounded-full border border-slate-200"
                  />
                ) : (
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-700">
                    {currentUser.email?.[0]?.toUpperCase() || 'U'}
                  </div>
                )}
                <button
                  type="button"
                  id="btn-google-logout"
                  onClick={handleLogout}
                  title="Disconnect Google Account"
                  className="rounded-lg p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors cursor-pointer"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
        </div>

        {authError && (
          <div className="mt-4 flex items-center gap-2 rounded-lg bg-rose-50 p-3 text-xs text-rose-700 border border-rose-200">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{authError}</span>
          </div>
        )}

        {/* Workspace Service Tabs */}
        <div className="mt-6 flex flex-wrap gap-1.5 border-t border-slate-100 pt-4">
          <button
            id="tab-classroom"
            onClick={() => setActiveSubTab('classroom')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeSubTab === 'classroom'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'bg-slate-100/70 text-slate-600 hover:bg-slate-200/60'
            }`}
          >
            <GraduationCap className="h-3.5 w-3.5" />
            Google Classroom
          </button>

          <button
            id="tab-meet"
            onClick={() => setActiveSubTab('meet')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeSubTab === 'meet'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'bg-slate-100/70 text-slate-600 hover:bg-slate-200/60'
            }`}
          >
            <Video className="h-3.5 w-3.5" />
            Google Meet
          </button>

          <button
            id="tab-chat"
            onClick={() => setActiveSubTab('chat')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeSubTab === 'chat'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'bg-slate-100/70 text-slate-600 hover:bg-slate-200/60'
            }`}
          >
            <MessageSquare className="h-3.5 w-3.5" />
            Google Chat
          </button>

          <button
            id="tab-calendar"
            onClick={() => setActiveSubTab('calendar')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeSubTab === 'calendar'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'bg-slate-100/70 text-slate-600 hover:bg-slate-200/60'
            }`}
          >
            <CalendarIcon className="h-3.5 w-3.5" />
            Google Calendar
          </button>

          <button
            id="tab-drive"
            onClick={() => setActiveSubTab('drive')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeSubTab === 'drive'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'bg-slate-100/70 text-slate-600 hover:bg-slate-200/60'
            }`}
          >
            <FolderGit2 className="h-3.5 w-3.5" />
            Drive & Picker
          </button>

          <button
            id="tab-docs"
            onClick={() => setActiveSubTab('docs')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeSubTab === 'docs'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'bg-slate-100/70 text-slate-600 hover:bg-slate-200/60'
            }`}
          >
            <FileText className="h-3.5 w-3.5" />
            Google Docs
          </button>

          <button
            id="tab-slides"
            onClick={() => setActiveSubTab('slides')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeSubTab === 'slides'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'bg-slate-100/70 text-slate-600 hover:bg-slate-200/60'
            }`}
          >
            <Presentation className="h-3.5 w-3.5" />
            Google Slides
          </button>

          <button
            id="tab-forms"
            onClick={() => setActiveSubTab('forms')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeSubTab === 'forms'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'bg-slate-100/70 text-slate-600 hover:bg-slate-200/60'
            }`}
          >
            <CheckSquare className="h-3.5 w-3.5" />
            Google Forms
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="space-y-6">
        {/* GOOGLE CLASSROOM TAB */}
        {activeSubTab === 'classroom' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 rounded-2xl bg-white border border-slate-200 p-5 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <GraduationCap className="h-4 w-4 text-indigo-600" />
                  Your Classroom Courses
                </h2>
                <button
                  type="button"
                  onClick={fetchClassroomCourses}
                  className="p-1 rounded text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
                  title="Refresh Courses"
                >
                  <RefreshCw className={`h-3.5 w-3.5 ${isLoadingClassroom ? 'animate-spin' : ''}`} />
                </button>
              </div>

              {!token ? (
                <div className="rounded-xl bg-slate-50 p-4 text-center text-xs text-slate-500 border border-dashed border-slate-200">
                  Please sign in with Google to view live Classroom courses.
                </div>
              ) : classroomCourses.length === 0 ? (
                <div className="rounded-xl bg-slate-50 p-4 text-center text-xs text-slate-500 border border-slate-200">
                  {isLoadingClassroom ? 'Loading courses...' : 'No active Classroom courses found. Create one in Google Classroom.'}
                </div>
              ) : (
                <div className="space-y-2">
                  {classroomCourses.map((c) => (
                    <div
                      key={c.id}
                      onClick={() => {
                        setSelectedClassroomId(c.id);
                        fetchClassroomCoursework(c.id);
                      }}
                      className={`cursor-pointer rounded-xl p-3 border transition-all text-xs ${
                        selectedClassroomId === c.id
                          ? 'bg-indigo-50/60 border-indigo-300 shadow-xs'
                          : 'bg-white border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="font-semibold text-slate-900">{c.name}</div>
                      {c.section && <div className="text-[11px] text-slate-500">{c.section}</div>}
                      <div className="mt-2 flex items-center justify-between text-[10px] text-slate-400">
                        <span>Code: {c.enrollmentCode || 'N/A'}</span>
                        <a
                          href={c.alternateLink}
                          target="_blank"
                          rel="noreferrer"
                          className="text-indigo-600 hover:underline flex items-center gap-1"
                          onClick={(e) => e.stopPropagation()}
                        >
                          Open <ExternalLink className="h-2.5 w-2.5" />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="lg:col-span-2 rounded-2xl bg-white border border-slate-200 p-5 space-y-4">
              <div>
                <h2 className="text-sm font-bold text-slate-900">
                  Classroom Coursework & Assignments
                </h2>
                <p className="text-xs text-slate-500">
                  Publish LMS simulations as assignments with graded rubric criteria
                </p>
              </div>

              {/* Coursework list */}
              <div className="space-y-3">
                {classroomCoursework.length === 0 ? (
                  <div className="rounded-xl bg-slate-50 p-6 text-center text-xs text-slate-500 border border-dashed border-slate-200">
                    No coursework created yet for this class. Select a scenario below to export into Google Classroom.
                  </div>
                ) : (
                  classroomCoursework.map((cw) => (
                    <div key={cw.id} className="rounded-xl border border-slate-200 p-3.5 bg-slate-50/50 flex items-center justify-between text-xs">
                      <div>
                        <div className="font-semibold text-slate-900">{cw.title}</div>
                        <div className="text-[11px] text-slate-500 line-clamp-1">{cw.description || 'No description'}</div>
                        <div className="mt-1 text-[10px] text-slate-400">Points: {cw.maxPoints || 100} • State: {cw.state}</div>
                      </div>
                      {cw.alternateLink && (
                        <a
                          href={cw.alternateLink}
                          target="_blank"
                          rel="noreferrer"
                          className="px-2.5 py-1 rounded bg-white border border-slate-200 text-indigo-600 hover:bg-slate-50 font-medium text-xs flex items-center gap-1"
                        >
                          View <ExternalLink className="h-3 w-3" />
                        </a>
                      )}
                    </div>
                  ))
                )}
              </div>

              {/* Quick Publish LMS Scenario to Classroom */}
              {scenarios.length > 0 && selectedClassroomId && (
                <div className="mt-6 rounded-xl bg-indigo-50/70 border border-indigo-100 p-4 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-indigo-900">
                    <Sparkles className="h-4 w-4 text-indigo-600" />
                    Push CogniFlow Scenario to Google Classroom
                  </div>
                  <p className="text-xs text-indigo-800/80 leading-relaxed">
                    Auto-create a coursework assignment for students in the selected class with embedded branching simulation links.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {scenarios.map((sc) => (
                      <button
                        key={sc.id}
                        type="button"
                        onClick={() => {
                          setConfirmDialog({
                            isOpen: true,
                            title: 'Publish Assignment to Google Classroom',
                            description: `Create a new graded coursework assignment "${sc.title}" in class "${selectedClassroomId}"?`,
                            impactDetails: [
                              `Course ID: ${selectedClassroomId}`,
                              `Assignment Title: Scenario Practice: ${sc.title}`,
                              'Grading Rubric: 100 Points',
                              'All enrolled students will see this coursework item'
                            ],
                            confirmLabel: 'Publish Assignment',
                            action: async () => {
                              const res = await fetch('/api/workspace/classroom', {
                                method: 'POST',
                                headers: {
                                  Authorization: `Bearer ${token}`,
                                  'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({
                                  courseId: selectedClassroomId,
                                  title: `Scenario Simulation: ${sc.title}`,
                                  description: `${sc.description}\n\nBranching decision paths: ${Object.keys(sc.scenes || {}).length} stages.`,
                                  maxPoints: 100,
                                }),
                              });
                              if (res.ok) {
                                fetchClassroomCoursework(selectedClassroomId);
                              }
                              setConfirmDialog(prev => ({ ...prev, isOpen: false }));
                            }
                          });
                        }}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-indigo-200 text-xs font-medium text-indigo-700 hover:bg-indigo-50 shadow-xs cursor-pointer"
                      >
                        <Plus className="h-3 w-3" />
                        {sc.title}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* GOOGLE MEET TAB */}
        {activeSubTab === 'meet' && (
          <div className="rounded-2xl bg-white border border-slate-200 p-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Video className="h-5 w-5 text-indigo-600" />
                  Google Meet Conferencing & Simulation Rooms
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Create Google Meet conference spaces for live group debriefs, synchronous scenario roleplays, and trainer coaching.
                </p>
              </div>

              <button
                type="button"
                id="btn-create-meet-space"
                onClick={handleCreateMeetSpace}
                disabled={!token || isCreatingMeet}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-700 shadow-sm transition-all disabled:opacity-50 cursor-pointer"
              >
                <Plus className="h-4 w-4" />
                <span>Instant Meet Room</span>
              </button>
            </div>

            {/* Active Spaces List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {meetSpaces.length === 0 ? (
                <div className="col-span-full rounded-xl bg-slate-50 p-8 text-center text-xs text-slate-500 border border-dashed border-slate-200 space-y-2">
                  <Video className="h-8 w-8 text-slate-400 mx-auto" />
                  <p className="font-semibold text-slate-700">No active Meet spaces created in this session</p>
                  <p className="text-slate-500">Click &quot;Instant Meet Room&quot; above to provision a live video conference space via Google Meet API v2.</p>
                </div>
              ) : (
                meetSpaces.map((space, idx) => (
                  <div key={idx} className="rounded-xl border border-slate-200 p-4 bg-slate-50/50 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900">
                        Google Meet Session #{idx + 1}
                      </span>
                      <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                    </div>
                    <div className="text-[11px] text-slate-500 break-all font-mono">
                      {space.meetingUri || space.name}
                    </div>
                    <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
                      <a
                        href={space.meetingUri}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-semibold flex items-center gap-1 hover:bg-emerald-700"
                      >
                        Join Call <ExternalLink className="h-3 w-3" />
                      </a>
                      <button
                        type="button"
                        onClick={() => {
                          navigator.clipboard.writeText(space.meetingUri);
                          alert('Meeting link copied to clipboard!');
                        }}
                        className="text-xs text-slate-600 hover:text-indigo-600 font-medium cursor-pointer"
                      >
                        Copy Link
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* GOOGLE CHAT TAB */}
        {activeSubTab === 'chat' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 rounded-2xl bg-white border border-slate-200 p-5 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <MessageSquare className="h-4 w-4 text-indigo-600" />
                  Google Chat Spaces
                </h2>
                <button
                  type="button"
                  onClick={fetchChatSpaces}
                  className="p-1 rounded text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
                >
                  <RefreshCw className={`h-3.5 w-3.5 ${isLoadingChat ? 'animate-spin' : ''}`} />
                </button>
              </div>

              {!token ? (
                <div className="rounded-xl bg-slate-50 p-4 text-center text-xs text-slate-500 border border-dashed border-slate-200">
                  Sign in with Google to browse and post to your Google Chat spaces.
                </div>
              ) : chatSpaces.length === 0 ? (
                <div className="rounded-xl bg-slate-50 p-4 text-center text-xs text-slate-500 border border-slate-200">
                  {isLoadingChat ? 'Loading spaces...' : 'No Chat spaces found.'}
                </div>
              ) : (
                <div className="space-y-2">
                  {chatSpaces.map((space) => (
                    <div
                      key={space.name}
                      onClick={() => setSelectedChatSpace(space.name)}
                      className={`cursor-pointer rounded-xl p-3 border transition-all text-xs ${
                        selectedChatSpace === space.name
                          ? 'bg-indigo-50/60 border-indigo-300 shadow-xs'
                          : 'bg-white border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="font-semibold text-slate-900">{space.displayName || space.name}</div>
                      <div className="text-[10px] text-slate-400 mt-1">Type: {space.spaceType || 'SPACE'}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="lg:col-span-2 rounded-2xl bg-white border border-slate-200 p-5 space-y-4">
              <h2 className="text-sm font-bold text-slate-900">
                Broadcast Scenario Notifications & Achievements
              </h2>
              <p className="text-xs text-slate-500">
                Send milestone alerts, course invitations, and completion certificates directly into team Google Chat spaces.
              </p>

              <div className="space-y-3">
                <label className="text-xs font-semibold text-slate-700 block">
                  Message Content (Markdown supported)
                </label>
                <textarea
                  id="input-chat-message"
                  value={chatMessageText}
                  onChange={(e) => setChatMessageText(e.target.value)}
                  placeholder="Enter announcement or select a quick template below..."
                  rows={4}
                  className="w-full rounded-xl border border-slate-300 p-3 text-xs text-slate-900 focus:border-indigo-500 focus:outline-hidden focus:ring-1 focus:ring-indigo-500"
                />

                {/* Quick Templates */}
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => setChatMessageText('🎉 Congratulations Team! All trainees completed the Clinical Emergency Simulation scenario with >90% accuracy!')}
                    className="px-2.5 py-1 rounded bg-slate-100 text-[11px] font-medium text-slate-700 hover:bg-slate-200 cursor-pointer"
                  >
                    + Completion Alert
                  </button>
                  <button
                    type="button"
                    onClick={() => setChatMessageText('🚀 New Adaptive Learning Path launched: "Enterprise Leadership 2026". Check your CogniFlow dashboard!')}
                    className="px-2.5 py-1 rounded bg-slate-100 text-[11px] font-medium text-slate-700 hover:bg-slate-200 cursor-pointer"
                  >
                    + New Path Launch
                  </button>
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    type="button"
                    id="btn-send-chat"
                    onClick={handleSendChatMessage}
                    disabled={!token || !selectedChatSpace || !chatMessageText.trim()}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-700 transition-all disabled:opacity-50 shadow-sm cursor-pointer"
                  >
                    <Send className="h-3.5 w-3.5" />
                    <span>Send Announcement</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* GOOGLE CALENDAR TAB */}
        {activeSubTab === 'calendar' && (
          <div className="rounded-2xl bg-white border border-slate-200 p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <CalendarIcon className="h-5 w-5 text-indigo-600" />
                  Google Calendar Synchronizer
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Schedule live simulation exam dates, debrief sessions, and track course milestones.
                </p>
              </div>

              <button
                type="button"
                onClick={fetchCalendarEvents}
                className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-medium flex items-center gap-1.5 cursor-pointer"
              >
                <RefreshCw className={`h-3.5 w-3.5 ${isLoadingCalendar ? 'animate-spin' : ''}`} />
                <span>Sync</span>
              </button>
            </div>

            {/* Quick schedule scenario review */}
            {scenarios.length > 0 && (
              <div className="rounded-xl bg-slate-50 border border-slate-200 p-4">
                <div className="text-xs font-semibold text-slate-800 mb-2">
                  Quick Schedule LMS Scenario Session to Google Calendar:
                </div>
                <div className="flex flex-wrap gap-2">
                  {scenarios.map((sc) => (
                    <button
                      key={sc.id}
                      type="button"
                      onClick={() => handleScheduleScenarioReview(sc.title)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-medium text-slate-700 hover:border-indigo-300 hover:text-indigo-600 shadow-xs cursor-pointer"
                    >
                      <Plus className="h-3 w-3 text-indigo-500" />
                      Schedule &quot;{sc.title}&quot;
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Calendar Events List */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Upcoming Google Calendar Events
              </h3>
              {!token ? (
                <div className="rounded-xl bg-slate-50 p-6 text-center text-xs text-slate-500 border border-dashed border-slate-200">
                  Please sign in with Google to view your primary calendar events.
                </div>
              ) : calendarEvents.length === 0 ? (
                <div className="rounded-xl bg-slate-50 p-6 text-center text-xs text-slate-500 border border-slate-200">
                  {isLoadingCalendar ? 'Loading calendar...' : 'No upcoming events found.'}
                </div>
              ) : (
                calendarEvents.map((evt) => (
                  <div key={evt.id} className="rounded-xl border border-slate-200 p-3.5 bg-white flex items-center justify-between text-xs">
                    <div>
                      <div className="font-semibold text-slate-900">{evt.summary}</div>
                      <div className="text-[11px] text-slate-500">
                        {evt.start?.dateTime ? new Date(evt.start.dateTime).toLocaleString() : evt.start?.date}
                      </div>
                      {evt.location && <div className="text-[10px] text-slate-400">📍 {evt.location}</div>}
                    </div>
                    {evt.htmlLink && (
                      <a
                        href={evt.htmlLink}
                        target="_blank"
                        rel="noreferrer"
                        className="px-2.5 py-1 rounded bg-slate-50 border border-slate-200 text-indigo-600 hover:bg-slate-100 flex items-center gap-1"
                      >
                        Calendar <ExternalLink className="h-3 w-3" />
                      </a>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* GOOGLE DRIVE & PICKER TAB */}
        {activeSubTab === 'drive' && (
          <div className="rounded-2xl bg-white border border-slate-200 p-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <FolderGit2 className="h-5 w-5 text-indigo-600" />
                  Google Drive & Interactive Picker
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Browse Drive files or launch Google Picker to seamlessly attach documents, decks, and forms into CogniFlow.
                </p>
              </div>

              {/* Picker Action Buttons */}
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  id="btn-open-picker-docs"
                  onClick={() => handleLaunchPicker('DOCS')}
                  disabled={!token}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-50 border border-indigo-200 text-xs font-semibold text-indigo-700 hover:bg-indigo-100 disabled:opacity-50 cursor-pointer"
                >
                  <FileText className="h-3.5 w-3.5" />
                  Pick Google Doc
                </button>
                <button
                  type="button"
                  id="btn-open-picker-slides"
                  onClick={() => handleLaunchPicker('PRESENTATIONS')}
                  disabled={!token}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-50 border border-amber-200 text-xs font-semibold text-amber-700 hover:bg-amber-100 disabled:opacity-50 cursor-pointer"
                >
                  <Presentation className="h-3.5 w-3.5" />
                  Pick Slides Deck
                </button>
                <button
                  type="button"
                  id="btn-open-picker-forms"
                  onClick={() => handleLaunchPicker('FORMS')}
                  disabled={!token}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-50 border border-purple-200 text-xs font-semibold text-purple-700 hover:bg-purple-100 disabled:opacity-50 cursor-pointer"
                >
                  <CheckSquare className="h-3.5 w-3.5" />
                  Pick Google Form
                </button>
              </div>
            </div>

            {/* Drive Search Bar */}
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
                <input
                  type="text"
                  id="input-drive-search"
                  value={driveQuery}
                  onChange={(e) => setDriveQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && fetchDriveFiles()}
                  placeholder="Search files in Google Drive..."
                  className="w-full rounded-xl border border-slate-200 pl-9 pr-3 py-2 text-xs text-slate-900 focus:border-indigo-500 focus:outline-hidden"
                />
              </div>
              <button
                type="button"
                onClick={fetchDriveFiles}
                className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-700 cursor-pointer"
              >
                Search
              </button>
            </div>

            {/* Drive File List */}
            <div className="space-y-2">
              {!token ? (
                <div className="rounded-xl bg-slate-50 p-6 text-center text-xs text-slate-500 border border-dashed border-slate-200">
                  Please sign in with Google to view files from Google Drive.
                </div>
              ) : driveFiles.length === 0 ? (
                <div className="rounded-xl bg-slate-50 p-6 text-center text-xs text-slate-500 border border-slate-200">
                  {isLoadingDrive ? 'Searching Drive...' : 'No files found in Google Drive.'}
                </div>
              ) : (
                driveFiles.map((file) => (
                  <div key={file.id} className="rounded-xl border border-slate-200 p-3 bg-white flex items-center justify-between text-xs hover:border-slate-300">
                    <div className="flex items-center gap-3 min-w-0">
                      <FolderGit2 className="h-4 w-4 text-slate-400 shrink-0" />
                      <div className="min-w-0">
                        <div className="font-semibold text-slate-900 truncate">{file.name}</div>
                        <div className="text-[10px] text-slate-400 truncate">
                          {file.mimeType} • {file.modifiedTime ? new Date(file.modifiedTime).toLocaleDateString() : ''}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {file.webViewLink && (
                        <a
                          href={file.webViewLink}
                          target="_blank"
                          rel="noreferrer"
                          className="p-1.5 rounded text-indigo-600 hover:bg-indigo-50"
                          title="Open in Drive"
                        >
                          <ExternalLink className="h-3.5 w-3.5" />
                        </a>
                      )}
                      <button
                        type="button"
                        onClick={() => handleDeleteDriveFile(file.id, file.name)}
                        className="p-1.5 rounded text-rose-500 hover:bg-rose-50 cursor-pointer"
                        title="Delete File (Requires Confirmation)"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* GOOGLE DOCS TAB */}
        {activeSubTab === 'docs' && (
          <div className="rounded-2xl bg-white border border-slate-200 p-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <FileText className="h-5 w-5 text-indigo-600" />
                  Google Docs Viewer & Scenario Protocol Linker
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Import training guides, standard operating procedures (SOPs), or scenario briefing documents from Google Docs.
                </p>
              </div>

              <button
                type="button"
                onClick={() => handleLaunchPicker('DOCS')}
                disabled={!token}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-50 border border-indigo-200 text-xs font-semibold text-indigo-700 hover:bg-indigo-100 disabled:opacity-50 cursor-pointer"
              >
                <FolderGit2 className="h-3.5 w-3.5" />
                Select with Google Picker
              </button>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="text"
                id="input-doc-id"
                value={docIdInput}
                onChange={(e) => setDocIdInput(e.target.value)}
                placeholder="Paste Google Doc ID (or pick via Google Picker)..."
                className="flex-1 rounded-xl border border-slate-200 px-3 py-2 text-xs text-slate-900 focus:border-indigo-500 focus:outline-hidden"
              />
              <button
                type="button"
                id="btn-fetch-doc"
                onClick={() => fetchDocDetails()}
                disabled={!token || !docIdInput.trim() || isLoadingDoc}
                className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-700 disabled:opacity-50 cursor-pointer"
              >
                {isLoadingDoc ? 'Loading...' : 'Load Doc'}
              </button>
            </div>

            {docContent && (
              <div className="rounded-xl border border-slate-200 p-5 bg-slate-50/50 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-slate-900 text-sm">{docContent.title || 'Untitled Document'}</h3>
                  <span className="text-[10px] text-slate-400 font-mono">Revision: {docContent.revisionId}</span>
                </div>
                <div className="text-xs text-slate-600">
                  Contains {docContent.body?.content?.length || 0} structural document elements.
                </div>
              </div>
            )}
          </div>
        )}

        {/* GOOGLE SLIDES TAB */}
        {activeSubTab === 'slides' && (
          <div className="rounded-2xl bg-white border border-slate-200 p-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Presentation className="h-5 w-5 text-indigo-600" />
                  Google Slides Lecture Decks
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Embed lecture presentations into course chapters and simulation branching checkpoints.
                </p>
              </div>

              <button
                type="button"
                onClick={() => handleLaunchPicker('PRESENTATIONS')}
                disabled={!token}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-50 border border-amber-200 text-xs font-semibold text-amber-700 hover:bg-amber-100 disabled:opacity-50 cursor-pointer"
              >
                <FolderGit2 className="h-3.5 w-3.5" />
                Select with Google Picker
              </button>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="text"
                id="input-slide-id"
                value={slideIdInput}
                onChange={(e) => setSlideIdInput(e.target.value)}
                placeholder="Paste Google Slides Presentation ID (or pick via Google Picker)..."
                className="flex-1 rounded-xl border border-slate-200 px-3 py-2 text-xs text-slate-900 focus:border-indigo-500 focus:outline-hidden"
              />
              <button
                type="button"
                id="btn-fetch-slide"
                onClick={() => fetchSlideDetails()}
                disabled={!token || !slideIdInput.trim() || isLoadingSlide}
                className="px-4 py-2 rounded-xl bg-amber-600 text-white text-xs font-semibold hover:bg-amber-700 disabled:opacity-50 cursor-pointer"
              >
                {isLoadingSlide ? 'Loading...' : 'Load Presentation'}
              </button>
            </div>

            {slideContent && (
              <div className="rounded-xl border border-slate-200 p-5 bg-amber-50/30 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-slate-900 text-sm">{slideContent.title || 'Untitled Slides Deck'}</h3>
                  <span className="text-[10px] text-amber-700 font-semibold bg-amber-100 px-2 py-0.5 rounded">
                    {slideContent.slides?.length || 0} Slides
                  </span>
                </div>
                <div className="text-xs text-slate-600">
                  Ready to link with CogniFlow scenario decision trees.
                </div>
              </div>
            )}
          </div>
        )}

        {/* GOOGLE FORMS TAB */}
        {activeSubTab === 'forms' && (
          <div className="rounded-2xl bg-white border border-slate-200 p-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <CheckSquare className="h-5 w-5 text-indigo-600" />
                  Google Forms Assessments & Surveys
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Sync pre-training diagnostics, pulse feedback, and certification exam responses.
                </p>
              </div>

              <button
                type="button"
                onClick={() => handleLaunchPicker('FORMS')}
                disabled={!token}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-50 border border-purple-200 text-xs font-semibold text-purple-700 hover:bg-purple-100 disabled:opacity-50 cursor-pointer"
              >
                <FolderGit2 className="h-3.5 w-3.5" />
                Select with Google Picker
              </button>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="text"
                id="input-form-id"
                value={formIdInput}
                onChange={(e) => setFormIdInput(e.target.value)}
                placeholder="Paste Google Form ID (or pick via Google Picker)..."
                className="flex-1 rounded-xl border border-slate-200 px-3 py-2 text-xs text-slate-900 focus:border-indigo-500 focus:outline-hidden"
              />
              <button
                type="button"
                id="btn-fetch-form"
                onClick={() => fetchFormDetails()}
                disabled={!token || !formIdInput.trim() || isLoadingForm}
                className="px-4 py-2 rounded-xl bg-purple-600 text-white text-xs font-semibold hover:bg-purple-700 disabled:opacity-50 cursor-pointer"
              >
                {isLoadingForm ? 'Loading...' : 'Load Form'}
              </button>
            </div>

            {formData && (
              <div className="rounded-xl border border-slate-200 p-5 bg-purple-50/30 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-slate-900 text-sm">{formData.info?.title || 'Untitled Form'}</h3>
                  {formData.responsesData?.responses && (
                    <span className="text-[10px] text-purple-700 font-semibold bg-purple-100 px-2 py-0.5 rounded">
                      {formData.responsesData.responses.length} Responses Received
                    </span>
                  )}
                </div>
                <div className="text-xs text-slate-600">
                  {formData.items?.length || 0} Questions configured in Google Forms.
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Confirmation Dialog for Destructive / Mutating operations */}
      <WorkspaceConfirmDialog
        isOpen={confirmDialog.isOpen}
        title={confirmDialog.title}
        description={confirmDialog.description}
        impactDetails={confirmDialog.impactDetails}
        confirmLabel={confirmDialog.confirmLabel}
        isDestructive={confirmDialog.isDestructive}
        isProcessing={isProcessingAction}
        onConfirm={handleExecuteConfirmedAction}
        onCancel={() => setConfirmDialog(prev => ({ ...prev, isOpen: false }))}
      />
    </div>
  );
};
