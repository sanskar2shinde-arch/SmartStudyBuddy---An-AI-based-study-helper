"use client";

import { useState, useEffect } from 'react';

const TOPICS = [
  { id: 1, title: "TypeScript", category: "Languages", level: "Intermediate", icon: "TS" },
  { id: 2, title: "Python", category: "Languages", level: "Beginner", icon: "PY" },
  { id: 3, title: "System Design", category: "Technical Concepts", level: "Advanced", icon: "🏗️" },
  { id: 4, title: "Data Structures", category: "Technical Concepts", level: "Intermediate", icon: "📊" },
  { id: 5, title: "Rust", category: "Languages", level: "Advanced", icon: "RS" },
  { id: 6, title: "Microservices", category: "Technical Concepts", level: "Advanced", icon: "☁️" },
];

export default function LearningPage() {
  const [filter, setFilter] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'forgot'>('login');
  const [userRole, setUserRole] = useState<'student' | 'pro'>('student');
  
  // Form State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [captchaInput, setCaptchaInput] = useState('');
  const [error, setError] = useState('');

  // CAPTCHA State
  const [captcha, setCaptcha] = useState({ num1: 0, num2: 0 });

  // Generate new captcha when modal opens or view changes
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

  const filteredTopics = filter === "All" 
    ? TOPICS 
    : TOPICS.filter(t => t.category === filter);

  // Validation Logic
  const validateForm = () => {
    const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    // At least 8 characters, 1 upper, 1 lower, 1 number, 1 special char
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

    // Simulate Backend API Call
    console.log(`Verifying ${authMode} for ${userRole}: ${email}`);
    
    if (authMode === 'login') {
      // Logic for backend login call would go here
      window.location.href = userRole === 'pro' ? '/pro-dashboard' : '/student-dashboard';
    } else {
      // Simulate Forgot Password Success
      alert("Password updated successfully! Redirecting to login.");
      setAuthMode('login');
      generateCaptcha();
    }
  };

  return (
    <main className="min-h-screen pt-32 pb-20 px-6 md:px-12 bg-[#0f172a] text-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl font-black italic tracking-tighter mb-4 uppercase">
            Master the <span className="text-indigo-500">Concepts</span>
          </h1>
          <p className="text-gray-400 max-w-2xl text-lg">
            Unlock professional-grade knowledge. Select a topic to start your journey.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-4 mb-10 overflow-x-auto pb-2">
          {["All", "Languages", "Technical Concepts"].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-6 py-2 rounded-full text-sm font-bold transition-all whitespace-nowrap
                ${filter === tab ? "bg-indigo-600 shadow-lg shadow-indigo-500/40" : "bg-white/5 text-gray-400 hover:bg-white/10"}`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTopics.map((topic) => (
            <div key={topic.id} className="glass-card group p-8 relative overflow-hidden rounded-2xl border border-white/10 transition-all hover:scale-[1.02]">
              <div className="absolute -right-4 -top-4 w-24 h-24 bg-indigo-600/10 rounded-full blur-3xl group-hover:bg-indigo-600/20" />
              <div className="flex justify-between mb-6">
                <div className="w-12 h-12 bg-indigo-600/20 rounded-lg flex items-center justify-center text-indigo-400 font-bold border border-indigo-500/30">
                  {topic.icon}
                </div>
                <span className="text-[10px] uppercase tracking-widest bg-white/10 px-2 py-1 rounded font-bold text-gray-300">
                  {topic.level}
                </span>
              </div>
              <h3 className="text-2xl font-bold mb-2 group-hover:text-indigo-400 transition-colors">{topic.title}</h3>
              <p className="text-gray-400 text-sm mb-6">Access curated modules for {topic.title} mastery.</p>
              
              <button 
                onClick={() => setIsModalOpen(true)}
                className="w-full py-3 rounded-xl border border-white/10 bg-white/5 hover:bg-indigo-600 hover:border-indigo-600 transition-all font-bold text-sm shadow-inner"
              >
                Start Learning
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* AUTH MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-in fade-in duration-300">
          <div className="glass-card w-full max-w-md p-8 rounded-3xl border border-white/20 relative shadow-[0_0_50px_rgba(0,0,0,0.5)] animate-in zoom-in duration-200">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-5 right-5 text-gray-400 hover:text-white transition-colors">✕</button>

            <h2 className="text-3xl font-black italic mb-6 text-center tracking-tighter">
              {authMode === 'login' ? 'MEMBERS LOGIN' : 'RECOVER ACCOUNT'}
            </h2>

            {/* Role Toggle */}
            {authMode === 'login' && (
              <div className="flex gap-2 p-1 bg-white/5 rounded-xl mb-6">
                <button 
                  onClick={() => setUserRole('student')}
                  className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${userRole === 'student' ? 'bg-indigo-600 text-white shadow-md' : 'text-gray-500 hover:text-gray-300'}`}
                >STUDENT</button>
                <button 
                  onClick={() => setUserRole('pro')}
                  className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${userRole === 'pro' ? 'bg-indigo-600 text-white shadow-md' : 'text-gray-500 hover:text-gray-300'}`}
                >PROFESSIONAL</button>
              </div>
            )}

            <form onSubmit={handleAuthSubmit} className="space-y-4">
              <input 
                type="email" placeholder="Gmail Address" required
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

              {/* CAPTCHA Section */}
              <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                <p className="text-xs text-gray-400 mb-2 uppercase font-bold tracking-widest">Human Verification</p>
                <div className="flex items-center gap-4">
                  <div className="bg-indigo-600/20 px-4 py-2 rounded-lg font-mono font-bold text-indigo-400 border border-indigo-500/30 italic">
                    {captcha.num1} + {captcha.num2} = ?
                  </div>
                  <input 
                    type="number" placeholder="Ans" required
                    className="flex-1 bg-white/5 border border-white/10 rounded-lg p-2 outline-none focus:border-indigo-500 text-center font-bold"
                    value={captchaInput} onChange={(e) => setCaptchaInput(e.target.value)}
                  />
                </div>
              </div>

              {error && <p className="text-red-400 text-xs font-semibold animate-pulse">{error}</p>}

              <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-500 py-4 rounded-xl font-black text-sm uppercase tracking-widest shadow-lg shadow-indigo-500/30 transition-all active:scale-95">
                {authMode === 'login' ? `Enter ${userRole} Portal` : 'Update Credentials'}
              </button>
            </form>

            <div className="mt-6 text-center text-xs">
              {authMode === 'login' ? (
                <button onClick={() => setAuthMode('forgot')} className="text-indigo-400 hover:text-indigo-300 transition-colors">Forgot your password?</button>
              ) : (
                <button onClick={() => setAuthMode('login')} className="text-gray-400 hover:text-white transition-colors">Return to login</button>
              )}
            </div>
          </div>
        </div>
        
      )}
      <footer className="mt-20 py-8 border-t border-slate-200 text-center">
        <p className="text-sm text-slate-400">
          © {new Date().getFullYear()} <span className="font-bold text-slate-600">Smart Study Buddy</span>. All rights reserved.
        </p>
      </footer>
      
    </main>
  );
}