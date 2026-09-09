'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { X, Eye, EyeOff, Check, AlertCircle } from 'lucide-react';

export type UserRole = 'Learner' | 'Instructor' | 'Partner' | 'Salon Owner';

export interface AuthUser {
  name: string;
  email: string;
  role: UserRole;
}

interface AuthModalProps {
  isOpen: boolean;
  initialMode?: 'signin' | 'signup';
  onClose: () => void;
  onSuccess: (user: AuthUser) => void;
  gateMessage?: string;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  initialMode = 'signup',
  onClose,
  onSuccess,
  gateMessage,
}) => {
  const [mode, setMode] = useState<'signin' | 'signup'>(initialMode);
  const [prevInitialMode, setPrevInitialMode] = useState(initialMode);
  const [selectedRole, setSelectedRole] = useState<UserRole>('Learner');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sync mode if initialMode prop changes externally
  if (prevInitialMode !== initialMode) {
    setPrevInitialMode(initialMode);
    setMode(initialMode);
    setError(null);
  }

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError('Please fill in all required fields.');
      return;
    }

    if (mode === 'signup' && !fullName.trim()) {
      setError('Please provide your full name.');
      return;
    }

    if (mode === 'signup' && !agreeTerms) {
      setError('Please accept the Terms of Service and Privacy Policy.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      const user: AuthUser = {
        name: mode === 'signup' ? fullName : (email.split('@')[0] || 'Member'),
        email,
        role: selectedRole,
      };
      onSuccess(user);
    }, 450);
  };

  const roles: UserRole[] = ['Learner', 'Instructor', 'Partner', 'Salon Owner'];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={mode === 'signup' ? 'Create Your Account' : 'Sign In'}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 lg:p-10 bg-black/75 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-150"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Main card container replicating Screen 2: Sign Up / Create Account */}
      <main className="relative w-full max-w-5xl bg-white shadow-2xl rounded-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[640px] border border-slate-100 my-auto">
        {/* Modal Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute top-4 right-4 z-30 p-2 rounded-full bg-black/20 hover:bg-black/40 text-white lg:text-slate-500 lg:bg-slate-100 lg:hover:bg-slate-200 lg:hover:text-slate-800 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* BEGIN: LeftFormColumn */}
        {/* Left Column: Registration form and role selectors (approx. 58% width on desktop) */}
        <section
          className="lg:col-span-7 p-6 sm:p-10 lg:p-12 flex flex-col justify-between"
          data-purpose="signup-form-section"
        >
          <div>
            {/* BEGIN: BrandLogo */}
            <header className="flex items-center gap-2 mb-6 sm:mb-8">
              <div
                aria-hidden="true"
                className="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center text-white shadow-xs"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
                </svg>
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-900">
                Leashed<span className="text-blue-600">.io</span>
              </span>
            </header>
            {/* END: BrandLogo */}

            {/* Contextual Gate Banner (if triggered by a locked feature) */}
            {gateMessage && (
              <div className="mb-4 p-3 rounded-lg bg-blue-50 border border-blue-200/80 text-blue-800 text-xs flex items-center gap-2">
                <span className="font-semibold text-blue-700">Protected Feature:</span>
                <span>{gateMessage}</span>
              </div>
            )}

            {/* Title and description */}
            <div className="space-y-1.5 mb-6">
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
                {mode === 'signup' ? 'Create Your Account' : 'Welcome Back'}
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 font-normal">
                {mode === 'signup'
                  ? 'Your journey starts here. Choose your role to get started.'
                  : 'Sign in to access your courses, scenario simulations, and certifications.'}
              </p>
            </div>

            {/* BEGIN: RoleSelectorTabs */}
            <div
              aria-label="Account Role Selection"
              className="grid grid-cols-4 gap-1 p-1 bg-slate-100 rounded-lg mb-6"
              role="tablist"
            >
              {roles.map((role) => {
                const isActive = selectedRole === role;
                return (
                  <button
                    key={role}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setSelectedRole(role)}
                    className={`py-2 text-xs font-semibold rounded-md transition-all text-center cursor-pointer ${
                      isActive
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {role}
                  </button>
                );
              })}
            </div>
            {/* END: RoleSelectorTabs */}

            {error && (
              <div className="mb-4 p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* BEGIN: Registration / Sign In Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name Field (Sign Up only) */}
              {mode === 'signup' && (
                <div>
                  <label className="sr-only" htmlFor="full-name">
                    Full Name
                  </label>
                  <input
                    id="full-name"
                    name="full-name"
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Full Name"
                    className="w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition outline-none"
                  />
                </div>
              )}

              {/* Email Address Field */}
              <div>
                <label className="sr-only" htmlFor="email">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email Address"
                  className="w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition outline-none"
                />
              </div>

              {/* Password Field with View/Hide Toggle Icon */}
              <div className="relative">
                <label className="sr-only" htmlFor="password">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 pr-10 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition outline-none"
                />
                <button
                  id="toggle-password"
                  type="button"
                  aria-label="Toggle password visibility"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-400 hover:text-slate-600 focus:outline-none cursor-pointer"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>

              {/* Terms of Service Checkbox (Signup) / Remember me (Signin) */}
              {mode === 'signup' ? (
                <div className="flex items-start gap-2 pt-1">
                  <input
                    id="terms"
                    name="terms"
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    required
                    className="h-4 w-4 mt-0.5 rounded border border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                  />
                  <label
                    htmlFor="terms"
                    className="text-xs text-slate-500 leading-relaxed select-none"
                  >
                    I agree to the{' '}
                    <span className="text-blue-600 hover:underline font-medium cursor-pointer">
                      Terms of Service
                    </span>{' '}
                    and{' '}
                    <span className="text-blue-600 hover:underline font-medium cursor-pointer">
                      Privacy Policy
                    </span>
                  </label>
                </div>
              ) : (
                <div className="flex items-center justify-between pt-1 text-xs">
                  <label className="flex items-center gap-2 text-slate-500 select-none cursor-pointer">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                    />
                    <span>Remember me</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => alert('Password reset link has been dispatched to your email.')}
                    className="text-blue-600 hover:underline font-medium cursor-pointer"
                  >
                    Forgot password?
                  </button>
                </div>
              )}

              {/* Primary Submit Action */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-xs text-sm transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 text-center cursor-pointer disabled:opacity-75 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <span>Processing...</span>
                  ) : mode === 'signup' ? (
                    <span>Create Account</span>
                  ) : (
                    <span>Sign In</span>
                  )}
                </button>
              </div>

              {/* Quick Demo Credentials helper */}
              <div className="pt-1 text-center">
                <button
                  type="button"
                  onClick={() => {
                    onSuccess({
                      name: 'Jordan Lee',
                      email: 'jordan.lee@leashed.io',
                      role: selectedRole,
                    });
                  }}
                  className="text-[11px] text-slate-400 hover:text-blue-600 hover:underline transition-colors cursor-pointer"
                >
                  Or continue instantly with Instant Demo Access &rarr;
                </button>
              </div>
            </form>
            {/* END: RegistrationForm */}
          </div>

          {/* BEGIN: FooterSignInLink */}
          <footer className="mt-6 sm:mt-8 text-center pt-2 border-t border-slate-100">
            {mode === 'signup' ? (
              <p className="text-xs text-slate-500">
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => {
                    setMode('signin');
                    setError(null);
                  }}
                  className="text-blue-600 font-semibold hover:underline cursor-pointer"
                >
                  Sign In
                </button>
              </p>
            ) : (
              <p className="text-xs text-slate-500">
                Don&apos;t have an account?{' '}
                <button
                  type="button"
                  onClick={() => {
                    setMode('signup');
                    setError(null);
                  }}
                  className="text-blue-600 font-semibold hover:underline cursor-pointer"
                >
                  Create Account
                </button>
              </p>
            )}
          </footer>
          {/* END: FooterSignInLink */}
        </section>
        {/* END: LeftFormColumn */}

        {/* BEGIN: RightImageColumn */}
        {/* Right Column: Visual hero photography with script text overlay */}
        <aside
          className="lg:col-span-5 relative bg-slate-900 min-h-[320px] lg:min-h-full overflow-hidden"
          data-purpose="hero-imagery"
        >
          {/* Background Image of woman grooming golden retriever */}
          <Image
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuC5ZkN2wVdUzxwsk4GWDfgUTVRaTEZFKtGK5QKbHb9KUKa-LtRPPLPVF2jG_CexQAKJlh2T5DEp4lXx77kmfejuPccirpu6xxpML3xEYwe1gZnJhdFkqNCfxCsw1AxYQgAVYvfmUpgJst7_vLQcWQitVv2GRZWM2iiu_4NJ4n-qYwcN5V9ZVVpA4GAoWFAuxDumJTX0AzdAQop2LyLPvLsao9HTWdtSFlTyGaZeCkoJMu9PZdTW4Zpt"
            alt="Woman smiling while gently grooming a golden retriever"
            fill
            sizes="(max-width: 1024px) 100vw, 42vw"
            referrerPolicy="no-referrer"
            className="object-cover object-center brightness-95"
            priority
          />

          {/* Gradient overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent pointer-events-none" />

          {/* Inspiring Handwritten Overlay Message */}
          <div className="absolute top-8 sm:top-12 right-6 lg:right-10 text-right text-white z-10 select-none pointer-events-none">
            <p
              style={{ textShadow: '0 2px 8px rgba(0, 0, 0, 0.45)' }}
              className="font-script text-3xl sm:text-4xl lg:text-5xl leading-tight tracking-wide text-white/95"
            >
              Same Dreams.
              <br />
              New Opportunities.
            </p>
          </div>
        </aside>
        {/* END: RightImageColumn */}
      </main>
    </div>
  );
};
