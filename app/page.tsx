"use client";

import { useState, useEffect } from 'react';
import Navbar from './components/navbar';

export default function Home() {
  const [userType, setUserType] = useState<'student' | 'professional'>('student');
  
  // --- AUTH MODAL STATE ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'forgot'>('login');
  const [userRole, setUserRole] = useState<'student' | 'pro'>('student');
  
  // Form State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [captchaInput, setCaptchaInput] = useState('');
  const [error, setError] = useState('');
  const [captcha, setCaptcha] = useState({ num1: 0, num2: 0 });

  // CAPTCHA Logic
  const generateCaptcha = () => {
    setCaptcha({
      num1: Math.floor(Math.random() * 10) + 1,
      num2: Math.floor(Math.random() * 10) + 1
    });
    setCaptchaInput('');
  };

  useEffect(() => {
    if (isModalOpen) generateCaptcha();
  }, [isModalOpen, authMode]);

  const validateForm = () => {
    const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!gmailRegex.test(email)) {
      setError("Only @gmail.com addresses are permitted.");
      return false;
    }
    if (!passwordRegex.test(password)) {
      setError("Password requires: 8+ chars, Uppercase, Lowercase, Number, and Special Char.");
      return false;
    }
    if (authMode === 'forgot' && password !== confirmPassword) {
      setError("Passwords do not match.");
      return false;
    }
    if (parseInt(captchaInput) !== captcha.num1 + captcha.num2) {
      setError("Incorrect CAPTCHA answer.");
      generateCaptcha();
      return false;
    }
    return true;
  };

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!validateForm()) return;

    if (authMode === 'login') {
      window.location.href = userRole === 'pro' ? '/pro-dashboard' : '/student-dashboard';
    } else {
      alert("Password updated successfully! Redirecting to login.");
      setAuthMode('login');
      generateCaptcha();
    }
  };

  return (
    <main className={`min-h-screen pt-24 pb-12 px-6 lg:px-24 bg-[#0f172a] text-white ${isModalOpen ? 'overflow-hidden' : ''}`}>
      <Navbar />

      {/* Hero Section */}
      <section className="text-center py-20">
        <h1 className="text-7xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
          AI-Powered Growth Engine
        </h1>
        <p className="text-slate-400 text-xl max-w-2xl mx-auto mb-10">
          Upload materials, let AI summarize your path, and find daily-scraped jobs 
          matching your specific IT skill set.
        </p>
        <div className="flex justify-center gap-4">
          {/* TRIGGER MODAL HERE */}
          <button 
            onClick={() => { setAuthMode('login'); setIsModalOpen(true); }}
            className="btn-primary shadow-lg shadow-indigo-500/20 px-8 py-3 rounded-xl font-bold transition-transform active:scale-95"
          >
            Get Started Free
          </button>
          <button 
            onClick={() => { setAuthMode('login'); setIsModalOpen(true); }}
            className="glass-card px-8 py-3 rounded-xl font-bold border border-white/10 hover:bg-white/10 transition-all"
          >
            Explore Jobs
          </button>
        </div>
      </section>

      {/* Feature Section */}
      <section id="features" className="grid md:grid-cols-3 gap-8 mb-24">
        <div className="glass-card p-8 rounded-2xl border border-white/5">
          <div className="text-3xl mb-4">🧠</div>
          <h3 className="text-xl font-bold mb-2">AI Tutoring</h3>
          <p className="text-slate-400">Upload PDFs and get instant AI-generated flashcards and summaries.</p>
        </div>
        <div className="glass-card p-8 rounded-2xl border border-white/5">
          <div className="text-3xl mb-4">💼</div>
          <h3 className="text-xl font-bold mb-2">Daily Job Scraper</h3>
          <p className="text-slate-400">AI finds the latest IT postings across the web tailored to your profile.</p>
        </div>
        <div className="glass-card p-8 rounded-2xl border border-white/5">
          <div className="text-3xl mb-4">📂</div>
          <h3 className="text-xl font-bold mb-2">Material Hub</h3>
          <p className="text-slate-400">Centralized storage for all your UG/PG study resources.</p>
        </div>
      </section>

      {/* Registration Form */}
      <section className="max-w-4xl mx-auto glass-card p-10 rounded-3xl border border-indigo-500/30 shadow-2xl shadow-indigo-500/10">
        <div className="flex flex-col items-center mb-10">
          <h2 className="text-3xl font-bold mb-4">Create Your Smart Account</h2>
          <div className="bg-slate-800 p-1 rounded-xl flex">
            <button 
              onClick={() => setUserType('student')}
              className={`px-6 py-2 rounded-lg transition font-bold text-sm ${userType === 'student' ? 'bg-indigo-600 text-white' : 'text-slate-400'}`}
            >Student</button>
            <button 
              onClick={() => setUserType('professional')}
              className={`px-6 py-2 rounded-lg transition font-bold text-sm ${userType === 'professional' ? 'bg-indigo-600 text-white' : 'text-slate-400'}`}
            >Professional</button>
          </div>
        </div>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={(e) => e.preventDefault()}>
          <div className="space-y-2">
            <label className="text-sm text-slate-400">Full Name</label>
            <input type="text" className="input-field bg-white/5 border-white/10 rounded-xl p-3 w-full outline-none focus:border-indigo-500" placeholder="John Doe" />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-slate-400">Age</label>
            <input type="number" className="input-field bg-white/5 border-white/10 rounded-xl p-3 w-full outline-none focus:border-indigo-500" placeholder="21" />
          </div>

          {userType === 'student' ? (
            <>
              <div className="space-y-2">
                <label className="text-sm text-slate-400">Current Class/Level</label>
                <select className="input-field bg-slate-900 border-white/10 rounded-xl p-3 w-full outline-none focus:border-indigo-500">
                  <option>10th Grade</option>
                  <option>12th Grade</option>
                  <option>Undergraduate (BCA/B.Tech)</option>
                  <option>Postgraduate (MCA/M.Tech)</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm text-slate-400">IT Course Interest</label>
                <select className="input-field bg-slate-900 border-white/10 rounded-xl p-3 w-full outline-none focus:border-indigo-500">
                  <option>Full Stack Development</option>
                  <option>Data Science & AI</option>
                  <option>Cyber Security</option>
                  <option>Cloud Computing</option>
                </select>
              </div>
            </>
          ) : (
            <>
              <div className="space-y-2">
                <label className="text-sm text-slate-400">Company Name</label>
                <input type="text" className="input-field bg-white/5 border-white/10 rounded-xl p-3 w-full outline-none focus:border-indigo-500" placeholder="Google / Freelance" />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-slate-400">IT Professional Profile</label>
                <select className="input-field bg-slate-900 border-white/10 rounded-xl p-3 w-full outline-none focus:border-indigo-500">
                  <option>Software Engineer</option>
                  <option>DevOps Architect</option>
                  <option>Data Scientist</option>
                  <option>UI/UX Designer</option>
                </select>
              </div>
            </>
          )}

          <div className="md:col-span-2 space-y-2">
            <label className="text-sm text-slate-400">Email Address</label>
            <input type="email" className="input-field bg-white/5 border-white/10 rounded-xl p-3 w-full outline-none focus:border-indigo-500" placeholder="name@domain.com" />
          </div>

          <div className="md:col-span-2 flex gap-4 pt-6">
            <button type="submit" className="btn-primary w-full justify-center bg-indigo-600 hover:bg-indigo-500 py-3 rounded-xl font-bold transition-all">Create Smart Account</button>
            <button type="button" className="glass-card px-8 py-3 rounded-xl text-slate-400 border border-white/10 hover:bg-white/5">Cancel</button>
          </div>
        </form>
      </section>

      {/* AUTH MODAL OVERLAY */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <div className="glass-card w-full max-w-md p-8 rounded-3xl border border-white/20 relative shadow-2xl animate-in zoom-in duration-200">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-5 right-5 text-gray-400 hover:text-white transition-colors">✕</button>

            <h2 className="text-3xl font-black italic mb-6 text-center tracking-tighter uppercase">
              {authMode === 'login' ? 'MEMBERS LOGIN' : 'RECOVER ACCOUNT'}
            </h2>

            {authMode === 'login' && (
              <div className="flex gap-2 p-1 bg-white/5 rounded-xl mb-6 border border-white/5">
                <button 
                  onClick={() => setUserRole('student')}
                  className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${userRole === 'student' ? 'bg-indigo-600 text-white' : 'text-gray-500'}`}
                >STUDENT</button>
                <button 
                  onClick={() => setUserRole('pro')}
                  className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${userRole === 'pro' ? 'bg-indigo-600 text-white' : 'text-gray-500'}`}
                >PROFESSIONAL</button>
              </div>
            )}

            <form onSubmit={handleAuthSubmit} className="space-y-4">
              <input 
                type="email" placeholder="Gmail Address (@gmail.com)" required
                className="w-full bg-white/5 border border-white/10 rounded-xl p-3 outline-none focus:border-indigo-500 transition-all text-sm"
                value={email} onChange={(e) => setEmail(e.target.value)}
              />
              <input 
                type="password" placeholder={authMode === 'login' ? "Password" : "New Password"} required
                className="w-full bg-white/5 border border-white/10 rounded-xl p-3 outline-none focus:border-indigo-500 transition-all text-sm"
                value={password} onChange={(e) => setPassword(e.target.value)}
              />
              {authMode === 'forgot' && (
                <input 
                  type="password" placeholder="Confirm New Password" required
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-3 outline-none focus:border-indigo-500 transition-all text-sm"
                  value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                />
              )}

              {/* CAPTCHA */}
              <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                <p className="text-[10px] text-gray-500 mb-2 uppercase font-black tracking-widest">Verification</p>
                <div className="flex items-center gap-4">
                  <div className="bg-indigo-600/20 px-4 py-2 rounded-lg font-mono font-bold text-indigo-400 border border-indigo-500/30">
                    {captcha.num1} + {captcha.num2}
                  </div>
                  <input 
                    type="number" placeholder="Ans" required
                    className="flex-1 bg-white/5 border border-white/10 rounded-lg p-2 outline-none focus:border-indigo-500 text-center font-bold"
                    value={captchaInput} onChange={(e) => setCaptchaInput(e.target.value)}
                  />
                </div>
              </div>

              {error && <p className="text-red-400 text-xs font-bold text-center bg-red-500/10 py-2 rounded-lg border border-red-500/20">{error}</p>}

              <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-500 py-4 rounded-xl font-black text-xs uppercase tracking-widest shadow-lg shadow-indigo-600/20 transition-all active:scale-95">
                {authMode === 'login' ? `Enter Portal` : 'Update Credentials'}
              </button>
            </form>

            <div className="mt-6 text-center">
              {authMode === 'login' ? (
                <button onClick={() => setAuthMode('forgot')} className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider hover:text-indigo-300">Forgot password?</button>
              ) : (
                <button onClick={() => setAuthMode('login')} className="text-[10px] font-bold text-gray-500 uppercase tracking-wider hover:text-white">Back to login</button>
              )}
            </div>
          </div>
        </div>
      )}

      <footer className="mt-20 py-8 border-t border-white/5 text-center">
        <p className="text-sm text-slate-500 font-medium">
          © {new Date().getFullYear()} <span className="text-indigo-400 italic">Smart Study Buddy</span>. Crafted for Excellence.
        </p>
      </footer>
    </main>
  );
}