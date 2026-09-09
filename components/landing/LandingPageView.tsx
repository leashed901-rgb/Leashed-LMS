'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { NavTab } from '@/components/Navbar';
import { AuthUser } from '@/components/auth/AuthModal';
import { Play, X, Search, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';

interface LandingPageViewProps {
  onNavigateToTab: (tab: NavTab) => void;
  onLaunchScenario?: (scenarioId?: string) => void;
  onOpenAuth?: (mode: 'signin' | 'signup', gateMessage?: string) => void;
  currentUser?: AuthUser | null;
}

export const LandingPageView: React.FC<LandingPageViewProps> = ({
  onNavigateToTab,
  onOpenAuth,
  currentUser,
}) => {
  const [heroImgSrc, setHeroImgSrc] = useState<string>('/assets/hero.png');
  const [isStoryModalOpen, setIsStoryModalOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPathwayModal, setSelectedPathwayModal] = useState<string | null>(null);
  const [isNonprofitsModalOpen, setIsNonprofitsModalOpen] = useState(false);
  const [legalModalContent, setLegalModalContent] = useState<'privacy' | 'terms' | 'contact' | null>(null);

  // Pathways data matching user screen
  const pathways = [
    {
      id: 'pet-grooming',
      title: 'Pet Grooming',
      description: 'Learn professional grooming techniques and animal care.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDTDVNdCXWSP78JHZ8eMawmDHnxkVlox6hxNI754INnuLXSfUmJaPyoTaKI7yTnjJUYSIVgeG_-mA9M3iT9OfXgWGZdeE2YS7BpYjcPccsafA1AE1L3WU9e49AviPBvF0GSqpyCoZZCYYzdKqHlI9ozW2oOoTcYYeiHpscR2bZ2gewY1ZD7-qAhDzpPcsffFKv0W5lnyP0Zd_DqBfhgNyRsqlm0fdYdtGicj0deF2pG_FQIfRfxII1hcA',
      badgeColor: 'bg-blue-500',
      tabTarget: 'courses' as NavTab,
      details: 'Comprehensive 12-week animal anatomy, bathing, blow drying, styling, breed-specific trimming, sanitation, and humane handling.',
    },
    {
      id: 'life-skills',
      title: 'Life Skills',
      description: 'Build confidence, stability, and everyday life skills.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCrX4u7WiDFBDhtoTxOdUwLayYrobNeRg8tXpLVsyvXtJAgw4pRoaZQd5uTmKvD11EYWtcxF0ym_gW-BB327i8BFGHbLmLCr4CwH4v1CWQWPu8DyTp_WzD-sl6W9L99pvBqJfcfXUGx9Vi6fHArQP1hvL15gTXmEB0Qn2FMdxfJxXaQKAA81lcgdUMZiqW49Ks2a2SLgkiJJbUD9LhZHx3b79Imj5P8yG5Kwl3tdgUiXgggcM9JqB8wdg',
      badgeColor: 'bg-emerald-600',
      tabTarget: 'paths' as NavTab,
      details: 'Personal financial literacy, budgeting, goal setting, emotional regulation, professional communication, and digital workplace readiness.',
    },
    {
      id: 'business-leadership',
      title: 'Business & Leadership',
      description: 'Learn to run and lead your own organization.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD9cqjiFdkk5AbX-7O4r-9gvC4fTQDvUnCt7tRJ8PrVrKgNCvQ2uXRoUEgt5ih9h81LjMEtSMWoRrJU4MhUCRFg4ioW7h35e1yZEWr3SkSvqn9x5KJQvWrt0ZXAZ2TLEOrbgkguahN5XYU81w3Rvg-czajKH-jEG0hyLBlDLJHlqSudQ-zZof-UPL4XEiYYtR97vBxXOsf-SmiAbKWN1QmNS7RylVdFtbsoDCsCxKv_jHegyM3xQaySbQ',
      badgeColor: 'bg-purple-600',
      tabTarget: 'scenario-builder' as NavTab,
      details: 'Business entity registration, client scheduling, mobile van conversions, lease negotiations, pricing strategies, and local marketing.',
    },
    {
      id: 'partner-programs',
      title: 'Partner Programs',
      description: 'Work with government and community organizations.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDJPTjk92Q6g1gu6dTVyMqcvhkBMEuVzYCSeNNeTL8PKQIWiyGm7bIRHJtiSSjFMBDngWZ4a-KwzYsqNguufycu7Vo3G9c0S6tq3N1HwtxzGnEedmG2ikbShDe0XhfPLrdLilr7iIGuFLORye2cXx3LRqLe95kSvEXMn8lOsqx3tdMILHe2ZD35we3cct0mxBzTiMhytyywtQ0FnIcBbPoWH7C3BTvf6defFLHN2LMsPcNAVWf4h228ig',
      badgeColor: 'bg-amber-500',
      tabTarget: 'google-workspace' as NavTab,
      details: 'WIOA funding navigation, Department of Labor apprenticeships, USDA rural micro-enterprise grants, and community mentorship matches.',
    },
  ];

  return (
    <div className="w-full min-h-screen bg-[#f8fafc] text-slate-800 antialiased selection:bg-teal-500 selection:text-white flex flex-col">
      {/* ========================================================================= */}
      {/* 1. HERO & TOP NAVIGATION (FULL BLEED) */}
      {/* ========================================================================= */}
      <header className="relative w-full bg-[#0c1626] text-white overflow-hidden">
        {/* Hero Background Image & Gradient Layer */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          {/* User Hero Image with gradient overlay */}
          <div className="relative w-full h-full">
            <Image
              src={heroImgSrc}
              alt="Woman grooming golden retriever dog happily"
              fill
              priority
              referrerPolicy="no-referrer"
              className="object-cover object-right-top opacity-75 filter saturate-105"
              onError={() => {
                // Fallback to high-res remote image if local asset fails to load
                setHeroImgSrc(
                  'https://lh3.googleusercontent.com/aida-public/AB6AXuC6-GD9OVAtmWCUfjHqO4YNkds9ftxmXur8U3gnQ9LBOS0dEIICWondEComV77Gb8kIYVfzuYo0hI8k8r-zwgggqqFDjx1OSKkf2uNrRmGDjbFX3ItxHmhPv1TqGiLbxPTGmj4eKKG--aGP-ZpvIhRGfXB5h1MWG7KFSfL-UwkPIDt1g-iTBoCxut5Q0NB9NxGuDSmGjwL0TxNpkA73EgdVw-amrafKTnpQS_w8-emurQnslKqxiTmFiMUL-hby_TNSGQs'
                );
              }}
            />
          </div>
          {/* Soft darkening overlay */}
          <div className="absolute inset-0 hero-gradient-overlay" />
        </div>

        {/* Content Container */}
        <div className="relative z-10 w-full px-4 sm:px-6 lg:px-12 xl:px-16">
          {/* Navbar Bar */}
          <nav
            aria-label="Main Navigation"
            className="flex items-center justify-between py-5 border-b border-white/10"
          >
            {/* Logo */}
            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => onNavigateToTab('landing')}>
              <div className="w-9 h-9 text-white flex items-center justify-center shrink-0">
                {/* Paw print logo with heart center */}
                <svg className="w-8 h-8 fill-current text-white" viewBox="0 0 24 24">
                  <ellipse cx="6.5" cy="5" rx="2" ry="2.8" />
                  <ellipse cx="11.5" cy="3.5" rx="2" ry="2.8" />
                  <ellipse cx="16.5" cy="5" rx="2" ry="2.8" />
                  <ellipse cx="20.5" cy="9.5" rx="1.8" ry="2.5" />
                  <path d="M12 9.5c-3.5 0-6.2 2.5-6.2 5.8 0 3.3 2.9 6.2 6.2 8.7 3.3-2.5 6.2-5.4 6.2-8.7 0-3.3-2.7-5.8-6.2-5.8zm0 7.8c-.8-.7-2.2-1.9-2.2-3.1 0-.9.7-1.6 1.6-1.6.5 0 1 .2 1.3.6.3-.4.8-.6 1.3-.6.9 0 1.6.7 1.6 1.6 0 1.2-1.4 2.4-2.2 3.1z" />
                </svg>
              </div>
              <div>
                <span className="text-xl font-extrabold tracking-tight block text-white leading-tight">
                  Leashed.io
                </span>
                <span className="text-[10px] text-slate-400 font-medium block leading-none">
                  Skills. Stability. Second Chances.
                </span>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="hidden lg:flex items-center space-x-8 text-sm font-medium text-slate-300">
              <button
                onClick={() => onNavigateToTab('landing')}
                className="text-white font-semibold relative py-1 border-b-2 border-teal-400"
              >
                Home
              </button>
              <button
                onClick={() => {
                  const el = document.getElementById('pillars-section');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="hover:text-white transition-colors duration-150"
              >
                About
              </button>
              <button
                onClick={() => onNavigateToTab('courses')}
                className="hover:text-white transition-colors duration-150"
              >
                Training
              </button>
              <button
                onClick={() => {
                  const el = document.getElementById('pathways-section');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="hover:text-white transition-colors duration-150"
              >
                Pathways
              </button>
              <button
                onClick={() => onNavigateToTab('scenario-builder')}
                className="hover:text-white transition-colors duration-150 flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                Scenario Studio
              </button>
              <button
                onClick={() => onNavigateToTab('google-workspace')}
                className="hover:text-white transition-colors duration-150"
              >
                Google Workspace
              </button>
              <button
                onClick={() => {
                  const el = document.getElementById('impact-section');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="hover:text-white transition-colors duration-150"
              >
                Success Stories
              </button>
            </div>

            {/* Header Actions */}
            <div className="flex items-center space-x-3 sm:space-x-4">
              {/* Search Icon */}
              <button
                onClick={() => setIsSearchModalOpen(true)}
                aria-label="Search"
                className="text-slate-300 hover:text-white p-2 rounded-full transition-colors cursor-pointer hover:bg-white/10"
              >
                <Search className="w-5 h-5" />
              </button>

              {currentUser ? (
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs text-white">
                    <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                    <span className="font-semibold">{currentUser.name}</span>
                    <span className="text-[10px] bg-blue-600 px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">{currentUser.role}</span>
                  </div>
                  <button
                    onClick={() => onNavigateToTab('courses')}
                    className="text-sm font-semibold bg-[#0070f3] hover:bg-[#005ecc] text-white px-4 py-1.5 rounded-full shadow-xs transition-colors duration-150 cursor-pointer"
                  >
                    Portal &rarr;
                  </button>
                </div>
              ) : (
                <>
                  {/* Log In Button */}
                  <button
                    onClick={() => onOpenAuth ? onOpenAuth('signin') : onNavigateToTab('courses')}
                    className="text-sm font-medium text-white px-4 py-1.5 rounded-full border border-slate-500 hover:border-white transition-colors duration-150 cursor-pointer"
                  >
                    Log In
                  </button>

                  {/* Get Started Button */}
                  <button
                    onClick={() => onOpenAuth ? onOpenAuth('signup') : onNavigateToTab('courses')}
                    className="text-sm font-semibold bg-[#0070f3] hover:bg-[#005ecc] text-white px-5 py-2 rounded-full shadow-sm transition-colors duration-150 cursor-pointer"
                  >
                    Get Started
                  </button>
                </>
              )}
            </div>
          </nav>

          {/* Hero Main Content Area */}
          <div className="py-16 md:py-24 lg:py-28 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Hero Column: Value Proposition */}
            <div className="lg:col-span-8 xl:col-span-7 space-y-6">
              <div className="inline-block">
                <span className="text-[#34d399] tracking-wider uppercase text-xs sm:text-sm font-extrabold px-1">
                  MORE THAN A TRAINING PROGRAM
                </span>
              </div>
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[76px] xl:text-[84px] font-black tracking-tight text-white leading-[1.02]">
                Real Skills.
                <br />
                Real Support.
                <br />
                <span className="text-[#34d399]">Real Futures.</span>
              </h1>
              <p className="text-slate-300 text-sm sm:text-base md:text-lg leading-relaxed max-w-xl font-normal">
                Leashed.io is a social impact platform that helps individuals below the poverty line learn life skills, pet grooming, and start their own businesses — with access to real support, certifications, and seed capital through government partnerships.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => onOpenAuth ? onOpenAuth('signup') : onNavigateToTab('courses')}
                  className="inline-flex items-center justify-center px-7 py-3.5 rounded-full text-sm font-bold bg-[#0070f3] hover:bg-blue-600 text-white shadow-md transition-all duration-150 cursor-pointer group"
                >
                  Start Your Journey
                  <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                </button>
                <button
                  onClick={() => setIsStoryModalOpen(true)}
                  className="inline-flex items-center justify-center px-6 py-3.5 rounded-full text-sm font-semibold bg-slate-900/80 hover:bg-slate-900 text-white border border-slate-700/80 backdrop-blur-sm transition-all duration-150 cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5 fill-white mr-2.5" />
                  Watch Our Story
                </button>
              </div>
            </div>

            {/* Right column empty - natural hero image shows handwriting glass text without duplication */}
            <div className="hidden lg:block lg:col-span-4 xl:col-span-5" />
          </div>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* 2. VALUE PILLARS / BENEFITS BAR (WITH VERTICAL DIVIDERS) */}
      {/* ========================================================================= */}
      <section
        id="pillars-section"
        aria-label="Core Pillars"
        className="w-full bg-white border-b border-slate-200 py-6 relative z-20 shadow-xs"
      >
        <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-0 items-center">
            {/* Pillar 1 */}
            <div className="flex items-center space-x-3.5 lg:pr-6 lg:border-r lg:border-slate-200 group">
              <div className="w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M12 14l9-5-9-5-9 5 9 5z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                  <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                </svg>
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 leading-tight">Learn In-Demand Skills</h3>
                <p className="text-xs text-slate-500 mt-1 leading-snug">Life skills, pet grooming, entrepreneurship, and more.</p>
              </div>
            </div>

            {/* Pillar 2 */}
            <div className="flex items-center space-x-3.5 lg:px-6 lg:border-r lg:border-slate-200 group">
              <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 leading-tight">Get Real Support</h3>
                <p className="text-xs text-slate-500 mt-1 leading-snug">Mentorship, coaching, and partner resources.</p>
              </div>
            </div>

            {/* Pillar 3 */}
            <div className="flex items-center space-x-3.5 lg:px-6 lg:border-r lg:border-slate-200 group">
              <div className="w-12 h-12 rounded-full bg-indigo-900 text-white flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M4 10v7h3v-7H4zm6 0v7h3v-7h-3zM2 22h19v-3H2v3zm14-12v7h3v-7h-3zm-4.5-9L2 6v2h19V6l-9.5-5z" />
                </svg>
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 leading-tight">Access Seed Capital</h3>
                <p className="text-xs text-slate-500 mt-1 leading-snug">Through government agencies and nonprofit partners.</p>
              </div>
            </div>

            {/* Pillar 4 */}
            <div className="flex items-center space-x-3.5 lg:px-6 lg:border-r lg:border-slate-200 group">
              <div className="w-12 h-12 rounded-full bg-amber-600 text-white flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 4H4v2h16V4zm1 10v-2l-1-5H4l-1 5v2h1v6h10v-6h4v6h2v-6h1zm-9 4H6v-4h6v4z" />
                </svg>
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 leading-tight">Launch Your Business</h3>
                <p className="text-xs text-slate-500 mt-1 leading-snug">Get your own salon studio or start a mobile business.</p>
              </div>
            </div>

            {/* Pillar 5 */}
            <div className="flex items-center space-x-3.5 lg:pl-6 group">
              <div className="w-12 h-12 rounded-full bg-teal-600 text-white flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
                </svg>
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 leading-tight">Create Lasting Change</h3>
                <p className="text-xs text-slate-500 mt-1 leading-snug">For you, your family, and your community.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. CHOOSE YOUR PATHWAY (INLINE HEADLINE WITH CARDS - TIGHT GROUPING) */}
      {/* ========================================================================= */}
      <section
        id="pathways-section"
        aria-label="Program Pathways"
        className="w-full py-10 sm:py-12 bg-slate-50"
      >
        <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
            {/* Left Inline Header Block */}
            <div className="lg:col-span-4 xl:col-span-3 flex flex-col justify-between py-2">
              <div>
                <span className="text-teal-600 tracking-wider uppercase text-xs font-extrabold block mb-1">
                  6-MONTH PROGRAM
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                  Choose Your Pathway
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 mt-3 leading-relaxed">
                  Our structured 6-month program gives you the skills, confidence, and tools to build a better future.
                </p>
              </div>
              <div className="pt-6">
                <button
                  onClick={() => onNavigateToTab('courses')}
                  className="inline-flex items-center justify-center px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold bg-[#0a1b2a] hover:bg-slate-800 text-white transition duration-150 shadow-sm cursor-pointer group"
                >
                  Explore All Courses
                  <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>

            {/* Right 4 Pathways Cards Grid */}
            <div className="lg:col-span-8 xl:col-span-9 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5">
              {pathways.map(pathway => (
                <div
                  key={pathway.id}
                  className="bg-white rounded-xl overflow-hidden shadow-xs border border-slate-200/80 flex flex-col group hover:shadow-md transition-shadow duration-200"
                >
                  <div className="relative h-40 overflow-hidden">
                    <Image
                      src={pathway.image}
                      alt={pathway.title}
                      fill
                      referrerPolicy="no-referrer"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {/* Badge Icon */}
                    <div
                      className={`absolute -bottom-3.5 left-3.5 w-8 h-8 rounded-full ${pathway.badgeColor} text-white flex items-center justify-center shadow-md border-2 border-white`}
                    >
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <circle cx="4.5" cy="9.5" r="2.5" />
                        <circle cx="9" cy="5.5" r="2.5" />
                        <circle cx="15" cy="5.5" r="2.5" />
                        <circle cx="19.5" cy="9.5" r="2.5" />
                        <path d="M17.34 14.86c-.87-1.02-1.6-1.89-2.48-2.49-.9-.6-1.86-.87-2.86-.87s-1.96.27-2.86.87c-.88.6-1.61 1.47-2.48 2.49C5.46 16.27 4 17.97 4 20c0 1.1.9 2 2 2 2.2 0 4.12-1 6-1s3.8 1 6 1c1.1 0 2-.9 2-2 0-2.03-1.46-3.73-2.66-5.14z" />
                      </svg>
                    </div>
                  </div>
                  <div className="p-4 pt-6 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-bold text-slate-900 text-sm sm:text-base">{pathway.title}</h3>
                      <p className="text-xs text-slate-500 mt-1.5 leading-relaxed line-clamp-2">
                        {pathway.description}
                      </p>
                    </div>
                    <div className="pt-4 flex items-center justify-between border-t border-slate-100 mt-2">
                      <button
                        onClick={() => onNavigateToTab(pathway.tabTarget)}
                        className="inline-flex items-center text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors cursor-pointer"
                      >
                        View Pathway
                        <ArrowRight className="w-3.5 h-3.5 ml-1" />
                      </button>
                      <button
                        onClick={() => setSelectedPathwayModal(pathway.id)}
                        className="text-[11px] text-slate-400 hover:text-slate-600 underline cursor-pointer"
                      >
                        Syllabus
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. FOOTER & IMPACT SECTION (USING ASSET /assets/footer.png) */}
      {/* ========================================================================= */}
      <footer
        id="footer-section"
        aria-label="Impact and Partners Footer"
        className="relative w-full bg-[#07111e] overflow-hidden border-t border-slate-900"
      >
        <div className="relative w-full">
          {/* High resolution footer image asset from user */}
          <Image
            src="/assets/footer.png"
            alt="Leashed.io Community Impact, Trusted Partners, and Footer"
            width={1156}
            height={645}
            className="w-full h-auto object-cover block"
            priority
          />

          {/* Interactive Clickable Hotspot Layer (100% transparent, NO hover boxes/borders) */}
          <div className="absolute inset-0 z-10 pointer-events-auto">
            {/* PARTNER 1: Department of Labor */}
            <a
              href="https://www.dol.gov"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit U.S. Department of Labor (opens in a new tab)"
              className="absolute cursor-pointer border-0 outline-none bg-transparent select-none focus:outline-none focus:ring-0"
              style={{ left: '60.0%', top: '64.5%', width: '10.5%', height: '10.0%' }}
            />

            {/* PARTNER 2: USDA */}
            <a
              href="https://www.usda.gov"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit USDA (opens in a new tab)"
              className="absolute cursor-pointer border-0 outline-none bg-transparent select-none focus:outline-none focus:ring-0"
              style={{ left: '73.0%', top: '64.5%', width: '5.5%', height: '10.0%' }}
            />

            {/* PARTNER 3: Goodwill */}
            <a
              href="https://www.goodwill.org"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit Goodwill Industries (opens in a new tab)"
              className="absolute cursor-pointer border-0 outline-none bg-transparent select-none focus:outline-none focus:ring-0"
              style={{ left: '80.0%', top: '64.5%', width: '5.5%', height: '10.0%' }}
            />

            {/* PARTNER 4: Local Nonprofits */}
            <button
              type="button"
              onClick={() => setIsNonprofitsModalOpen(true)}
              aria-label="Explore Local Nonprofits and Community Partners"
              className="absolute cursor-pointer border-0 outline-none bg-transparent select-none focus:outline-none focus:ring-0"
              style={{ left: '87.0%', top: '64.5%', width: '9.8%', height: '10.0%' }}
            />

            {/* FOOTER: Leashed.io Brand / Logo */}
            <button
              type="button"
              onClick={() => onNavigateToTab('landing')}
              aria-label="Leashed.io Home"
              className="absolute cursor-pointer border-0 outline-none bg-transparent select-none focus:outline-none focus:ring-0"
              style={{ left: '3.5%', top: '87.0%', width: '12.0%', height: '8.0%' }}
            />

            {/* FOOTER: Privacy Policy */}
            <button
              type="button"
              onClick={() => setLegalModalContent('privacy')}
              aria-label="Privacy Policy"
              className="absolute cursor-pointer border-0 outline-none bg-transparent select-none focus:outline-none focus:ring-0"
              style={{ left: '34.5%', top: '89.5%', width: '6.2%', height: '4.0%' }}
            />

            {/* FOOTER: Terms of Service */}
            <button
              type="button"
              onClick={() => setLegalModalContent('terms')}
              aria-label="Terms of Service"
              className="absolute cursor-pointer border-0 outline-none bg-transparent select-none focus:outline-none focus:ring-0"
              style={{ left: '41.2%', top: '89.5%', width: '7.2%', height: '4.0%' }}
            />

            {/* FOOTER: Contact */}
            <button
              type="button"
              onClick={() => setLegalModalContent('contact')}
              aria-label="Contact Us"
              className="absolute cursor-pointer border-0 outline-none bg-transparent select-none focus:outline-none focus:ring-0"
              style={{ left: '49.0%', top: '89.5%', width: '4.5%', height: '4.0%' }}
            />

            {/* FOOTER: Facebook */}
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Leashed.io on Facebook"
              className="absolute cursor-pointer border-0 outline-none bg-transparent select-none focus:outline-none focus:ring-0"
              style={{ left: '63.8%', top: '89.5%', width: '2.0%', height: '4.0%' }}
            />

            {/* FOOTER: Instagram */}
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Leashed.io on Instagram"
              className="absolute cursor-pointer border-0 outline-none bg-transparent select-none focus:outline-none focus:ring-0"
              style={{ left: '66.2%', top: '89.5%', width: '2.0%', height: '4.0%' }}
            />

            {/* FOOTER: YouTube */}
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Leashed.io on YouTube"
              className="absolute cursor-pointer border-0 outline-none bg-transparent select-none focus:outline-none focus:ring-0"
              style={{ left: '68.6%', top: '89.5%', width: '2.0%', height: '4.0%' }}
            />

            {/* FOOTER: LinkedIn */}
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Leashed.io on LinkedIn"
              className="absolute cursor-pointer border-0 outline-none bg-transparent select-none focus:outline-none focus:ring-0"
              style={{ left: '71.0%', top: '89.5%', width: '2.0%', height: '4.0%' }}
            />
          </div>
        </div>
      </footer>

      {/* ========================================================================= */}
      {/* MODAL: WATCH OUR STORY */}
      {/* ========================================================================= */}
      {isStoryModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-700 rounded-2xl overflow-hidden shadow-2xl text-white">
            <div className="flex items-center justify-between p-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <h3 className="font-bold text-base">The Leashed.io Story</h3>
              </div>
              <button
                onClick={() => setIsStoryModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="relative h-64 sm:h-72 w-full rounded-xl overflow-hidden bg-slate-950 border border-slate-800 flex items-center justify-center">
                <Image
                  src={heroImgSrc}
                  alt="Groomer with dog"
                  fill
                  referrerPolicy="no-referrer"
                  className="object-cover opacity-60 filter brightness-90"
                />
                <div className="relative z-10 text-center px-6 max-w-lg space-y-3">
                  <div className="w-14 h-14 mx-auto rounded-full bg-blue-600/90 text-white flex items-center justify-center shadow-lg border border-white/20">
                    <Play className="w-6 h-6 fill-white ml-0.5" />
                  </div>
                  <h4 className="text-xl font-extrabold text-white">From Second Chances to Thriving Small Businesses</h4>
                  <p className="text-xs text-slate-200 leading-relaxed">
                    Watch how our 6-month pet grooming and business incubation curriculum empowers individuals to break barriers and step into independent entrepreneurship.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="p-3 rounded-lg bg-slate-800/60 border border-slate-700/60">
                  <div className="text-lg font-bold text-teal-300">100%</div>
                  <div className="text-[11px] text-slate-400">Tuition Assistance Support</div>
                </div>
                <div className="p-3 rounded-lg bg-slate-800/60 border border-slate-700/60">
                  <div className="text-lg font-bold text-blue-400">1-on-1</div>
                  <div className="text-[11px] text-slate-400">Certified Master Mentorship</div>
                </div>
                <div className="p-3 rounded-lg bg-slate-800/60 border border-slate-700/60">
                  <div className="text-lg font-bold text-amber-400">Grant Aid</div>
                  <div className="text-[11px] text-slate-400">Seed Equipment Packages</div>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  onClick={() => {
                    setIsStoryModalOpen(false);
                    onNavigateToTab('courses');
                  }}
                  className="px-5 py-2.5 rounded-full bg-[#0070f3] hover:bg-blue-600 text-white text-xs font-semibold shadow-sm transition cursor-pointer"
                >
                  Join the Program
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: SYLLABUS DETAIL */}
      {/* ========================================================================= */}
      {selectedPathwayModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="relative w-full max-w-lg bg-white rounded-2xl p-6 shadow-2xl border border-slate-200 text-slate-900">
            <button
              onClick={() => setSelectedPathwayModal(null)}
              className="absolute top-4 right-4 p-1 rounded-lg text-slate-400 hover:text-slate-700 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            {(() => {
              const p = pathways.find(item => item.id === selectedPathwayModal);
              if (!p) return null;
              return (
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full ${p.badgeColor} text-white flex items-center justify-center font-bold text-sm shadow-xs`}>
                      🐾
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900">{p.title}</h3>
                      <p className="text-xs text-teal-600 font-semibold uppercase tracking-wider">Course Syllabus & Curriculum</p>
                    </div>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">{p.details}</p>
                  <div className="space-y-2 pt-2 border-t border-slate-100">
                    <div className="flex items-center gap-2 text-xs text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Certified hands-on training labs</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Interactive AI scenario simulations</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Google Workspace assignment sync</span>
                    </div>
                  </div>
                  <div className="pt-4 flex justify-end gap-2">
                    <button
                      onClick={() => {
                        setSelectedPathwayModal(null);
                        onNavigateToTab(p.tabTarget);
                      }}
                      className="px-4 py-2 rounded-lg bg-[#0070f3] hover:bg-blue-600 text-white text-xs font-semibold cursor-pointer"
                    >
                      Open in LMS Studio
                    </button>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: SEARCH */}
      {/* ========================================================================= */}
      {isSearchModalOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="relative w-full max-w-xl bg-white rounded-2xl p-4 shadow-2xl border border-slate-200 text-slate-900">
            <div className="flex items-center gap-3 border-b border-slate-200 pb-3">
              <Search className="w-5 h-5 text-slate-400" />
              <input
                type="text"
                autoFocus
                placeholder="Search courses, life skills, certifications, partners..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full text-sm outline-hidden text-slate-800 placeholder-slate-400"
              />
              <button
                onClick={() => setIsSearchModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="pt-3 space-y-2 max-h-64 overflow-y-auto">
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-2">
                Popular Pathways
              </div>
              {pathways
                .filter(p => p.title.toLowerCase().includes(searchQuery.toLowerCase()) || p.description.toLowerCase().includes(searchQuery.toLowerCase()))
                .map(p => (
                  <div
                    key={p.id}
                    onClick={() => {
                      setIsSearchModalOpen(false);
                      onNavigateToTab(p.tabTarget);
                    }}
                    className="flex items-center justify-between p-2.5 rounded-lg hover:bg-slate-50 cursor-pointer text-xs transition"
                  >
                    <div className="font-semibold text-slate-800">{p.title}</div>
                    <div className="text-[10px] text-blue-600 font-medium">Explore &rarr;</div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: LOCAL NONPROFITS & COMMUNITY PARTNERS */}
      {/* ========================================================================= */}
      {isNonprofitsModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="relative w-full max-w-xl bg-white rounded-2xl p-6 shadow-2xl border border-slate-200 text-slate-900">
            <button
              onClick={() => setIsNonprofitsModalOpen(false)}
              className="absolute top-4 right-4 p-1 rounded-lg text-slate-400 hover:text-slate-700 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-teal-500 text-white flex items-center justify-center font-bold text-lg shadow-xs">
                🤝
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">Community & Nonprofit Partners</h3>
                <p className="text-xs text-teal-600 font-semibold uppercase tracking-wider">
                  Grassroots Impact Coalition
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              Leashed.io teams up with municipal animal shelters, humane rescue alliances, second-chance rehabilitation programs, and workforce development agencies nationwide to empower learners with tangible vocational skills and sustainable employment.
            </p>

            <div className="space-y-2.5 mb-6">
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-100 flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div className="text-xs">
                  <span className="font-bold text-slate-800">Shelter & Rescue Alliances:</span> Providing low-stress grooming, behavioral care, and adoption preparation for shelter pets.
                </div>
              </div>
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-100 flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div className="text-xs">
                  <span className="font-bold text-slate-800">Second Chances & Re-entry:</span> Vocational apprenticeships, trauma-informed coaching, and guaranteed micro-enterprise grants.
                </div>
              </div>
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-100 flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div className="text-xs">
                  <span className="font-bold text-slate-800">Workforce Boards:</span> Recognized state and federal apprenticeship pathways with subsidized toolkits.
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setIsNonprofitsModalOpen(false)}
                className="px-4 py-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-semibold cursor-pointer"
              >
                Close
              </button>
              <a
                href="mailto:partners@leashed.io?subject=Nonprofit%20Partnership%20Inquiry"
                className="px-4 py-2 rounded-lg bg-[#0070f3] hover:bg-blue-600 text-white text-xs font-semibold shadow-xs cursor-pointer"
              >
                Partner With Us
              </a>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: LEGAL & CONTACT */}
      {/* ========================================================================= */}
      {legalModalContent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="relative w-full max-w-lg bg-white rounded-2xl p-6 shadow-2xl border border-slate-200 text-slate-900">
            <button
              onClick={() => setLegalModalContent(null)}
              className="absolute top-4 right-4 p-1 rounded-lg text-slate-400 hover:text-slate-700 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {legalModalContent === 'privacy' && (
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">Privacy Policy</h3>
                <p className="text-xs text-slate-400 mb-4">Last updated: September 2026</p>
                <div className="text-xs text-slate-600 space-y-3 leading-relaxed">
                  <p>
                    Leashed.io is deeply committed to protecting the confidentiality and privacy of our students, apprentices, and community partners.
                  </p>
                  <p>
                    We collect only the educational and verification data necessary to facilitate tuition grants, master mentor scheduling, and certified skill evaluations. Your information is never sold to third-party marketing brokers.
                  </p>
                  <p>
                    All student portfolios and learning telemetry are encrypted in transit and at rest in compliance with FERPA guidelines.
                  </p>
                </div>
              </div>
            )}

            {legalModalContent === 'terms' && (
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">Terms of Service</h3>
                <p className="text-xs text-slate-400 mb-4">Effective: September 2026</p>
                <div className="text-xs text-slate-600 space-y-3 leading-relaxed">
                  <p>
                    By enrolling in Leashed.io courses or utilizing our mobile salon incubation toolkits, learners agree to uphold compassionate animal welfare practices and respectful studio workplace conduct.
                  </p>
                  <p>
                    Certification credentials require completion of hands-on salon hours and safety sign-offs by a certified master mentor.
                  </p>
                  <p>
                    Equipment grant packages are distributed in accordance with state workforce development partner compliance regulations.
                  </p>
                </div>
              </div>
            )}

            {legalModalContent === 'contact' && (
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">Contact Leashed.io</h3>
                <p className="text-xs text-slate-400 mb-4">We are here to support your journey</p>
                <div className="text-xs text-slate-600 space-y-3 leading-relaxed">
                  <div className="p-3 bg-slate-50 rounded-lg space-y-1.5 border border-slate-100">
                    <p className="font-semibold text-slate-800">Admissions & Apprenticeships:</p>
                    <p className="text-blue-600">admissions@leashed.io</p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-lg space-y-1.5 border border-slate-100">
                    <p className="font-semibold text-slate-800">Workforce & Nonprofit Partnerships:</p>
                    <p className="text-blue-600">partners@leashed.io</p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-lg space-y-1.5 border border-slate-100">
                    <p className="font-semibold text-slate-800">Support Hotline:</p>
                    <p className="text-slate-800 font-mono">(800) 555-LEASH</p>
                  </div>
                </div>
              </div>
            )}

            <div className="pt-5 mt-4 border-t border-slate-100 flex justify-end">
              <button
                type="button"
                onClick={() => setLegalModalContent(null)}
                className="px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
