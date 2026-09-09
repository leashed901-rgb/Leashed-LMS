'use client';

import React, { useState } from 'react';
import { ScreenId } from './screenTypes';
import { LearnerSidebar } from './LearnerSidebar';
import { 
  Send, 
  Paperclip, 
  Calendar, 
  Video, 
  Phone, 
  CheckCheck,
  ShieldCheck
} from 'lucide-react';

interface Screen13Props {
  onNavigate: (screen: ScreenId) => void;
}

interface Message {
  id: string;
  sender: 'coach' | 'me';
  text: string;
  time: string;
}

export const Screen13MentorNavigatorSupport: React.FC<Screen13Props> = ({ onNavigate }) => {
  const [activeContact, setActiveContact] = useState<'marcus' | 'elena'>('marcus');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'coach',
      text: 'Hey Taylor! I reviewed your Module 2 video submission on high-velocity blowouts. Your control around the golden retriever’s ears was spot on.',
      time: '10:14 AM'
    },
    {
      id: '2',
      sender: 'me',
      text: 'Thanks Marcus! I was a little nervous about keeping the pup calm during the sound ramp-up.',
      time: '10:18 AM'
    },
    {
      id: '3',
      sender: 'coach',
      text: 'You handled it like a pro. Keep your ear protectors handy and you are well on track for Friday’s practical demonstration.',
      time: '10:20 AM'
    }
  ]);
  const [inputVal, setInputVal] = useState('');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;

    const newMsg: Message = {
      id: Date.now().toString(),
      sender: 'me',
      text: inputVal.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, newMsg]);
    setInputVal('');
  };

  return (
    <div className="h-screen font-sans text-slate-800 antialiased flex bg-slate-50 overflow-hidden">
      {/* Sidebar Navigation */}
      <LearnerSidebar currentScreen="screen-13" onNavigate={onNavigate} />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 bg-[#f8fafc] overflow-hidden">
        {/* Top Header */}
        <header className="bg-white border-b border-slate-200/80 px-8 py-5 flex items-center justify-between shrink-0">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Mentor &amp; Navigator Support</h1>
            <p className="text-xs text-slate-500 mt-0.5">Direct messaging and scheduled guidance with your designated case managers.</p>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => onNavigate('screen-11')}
              className="px-3.5 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-semibold rounded-lg transition cursor-pointer"
            >
              Referral Status →
            </button>
          </div>
        </header>

        {/* Messaging Container Split-View */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left Panel: Contacts List */}
          <aside className="w-80 border-r border-slate-200 bg-white flex flex-col shrink-0">
            <div className="p-4 border-b border-slate-100">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Assigned Advisors</span>
            </div>

            <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
              {/* Contact 1: Marcus Vance */}
              <div 
                onClick={() => setActiveContact('marcus')}
                className={`p-4 flex items-center gap-3 cursor-pointer transition ${
                  activeContact === 'marcus' ? 'bg-blue-50/70 border-l-4 border-blue-600' : 'hover:bg-slate-50'
                }`}
              >
                <div className="relative">
                  <div className="w-11 h-11 rounded-full bg-blue-600 text-white font-bold text-sm flex items-center justify-center">
                    MV
                  </div>
                  <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 ring-2 ring-white"></span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-slate-900 truncate">Marcus Vance</h4>
                    <span className="text-[10px] text-slate-400 font-medium">10:20 AM</span>
                  </div>
                  <p className="text-xs text-blue-600 font-medium truncate">Grooming Master Mentor</p>
                  <p className="text-xs text-slate-500 truncate mt-0.5">You handled it like a pro...</p>
                </div>
              </div>

              {/* Contact 2: Elena Ramos */}
              <div 
                onClick={() => setActiveContact('elena')}
                className={`p-4 flex items-center gap-3 cursor-pointer transition ${
                  activeContact === 'elena' ? 'bg-blue-50/70 border-l-4 border-blue-600' : 'hover:bg-slate-50'
                }`}
              >
                <div className="relative">
                  <div className="w-11 h-11 rounded-full bg-indigo-600 text-white font-bold text-sm flex items-center justify-center">
                    ER
                  </div>
                  <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 ring-2 ring-white"></span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-slate-900 truncate">Elena Ramos</h4>
                    <span className="text-[10px] text-slate-400 font-medium">Yesterday</span>
                  </div>
                  <p className="text-xs text-indigo-600 font-medium truncate">Career &amp; Grant Navigator</p>
                  <p className="text-xs text-slate-500 truncate mt-0.5">Grant application form is ready...</p>
                </div>
              </div>
            </div>

            {/* Emergency Hotline Info */}
            <div className="p-4 border-t border-slate-100 bg-slate-50 text-xs text-slate-500 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Navigator office hours: 8am - 6pm EST</span>
            </div>
          </aside>

          {/* Right Panel: Conversation Stream */}
          <section className="flex-1 flex flex-col bg-white">
            {/* Chat Header */}
            <div className="px-6 py-3.5 border-b border-slate-200 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center">
                  {activeContact === 'marcus' ? 'MV' : 'ER'}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    {activeContact === 'marcus' ? 'Marcus Vance' : 'Elena Ramos'}
                  </h3>
                  <span className="text-xs text-emerald-600 font-medium flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    Online &bull; {activeContact === 'marcus' ? 'Master Groomer' : 'Lead Navigator'}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-200/60 rounded-lg transition cursor-pointer">
                  <Phone className="w-4 h-4" />
                </button>
                <button className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-200/60 rounded-lg transition cursor-pointer">
                  <Video className="w-4 h-4" />
                </button>
                <button className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-200/60 rounded-lg transition cursor-pointer">
                  <Calendar className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Chat Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50/30">
              {messages.map((m) => (
                <div 
                  key={m.id} 
                  className={`flex flex-col ${m.sender === 'me' ? 'items-end' : 'items-start'}`}
                >
                  <div className={`max-w-md px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                    m.sender === 'me'
                      ? 'bg-blue-600 text-white rounded-br-none shadow-sm'
                      : 'bg-white border border-slate-200 text-slate-800 rounded-bl-none shadow-xs'
                  }`}>
                    {m.text}
                  </div>
                  <div className="flex items-center gap-1 mt-1 text-[11px] text-slate-400 px-1">
                    <span>{m.time}</span>
                    {m.sender === 'me' && <CheckCheck className="w-3.5 h-3.5 text-blue-600" />}
                  </div>
                </div>
              ))}
            </div>

            {/* Chat Input Footer */}
            <form onSubmit={handleSendMessage} className="p-4 border-t border-slate-200 bg-white flex items-center gap-3">
              <button 
                type="button" 
                className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition cursor-pointer"
              >
                <Paperclip className="w-5 h-5" />
              </button>
              <input 
                type="text" 
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder={`Message ${activeContact === 'marcus' ? 'Marcus Vance' : 'Elena Ramos'}...`}
                className="flex-1 text-sm border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition"
              />
              <button 
                type="submit" 
                className="p-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-sm transition cursor-pointer"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </section>
        </div>
      </main>
    </div>
  );
};
