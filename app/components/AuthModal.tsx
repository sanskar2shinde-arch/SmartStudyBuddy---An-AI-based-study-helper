"use client";

import { useState } from 'react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [view, setView] = useState<'login' | 'forgot'>('login');
  const [role, setRole] = useState<'student' | 'pro'>('student');
  const [formData, setFormData] = useState({ email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');

  if (!isOpen) return null;

  // Validations
  const validate = () => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!emailRegex.test(formData.email)) return "Please use a valid @gmail.com address.";
    if (!passRegex.test(formData.password)) return "Password must have: 8+ chars, 1 Upper, 1 Lower, 1 Number, 1 Special Char.";
    if (view === 'forgot' && formData.password !== formData.confirmPassword) return "Passwords do not match.";
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationError = validate();
    if (validationError) return setError(validationError);
    setError('');

    try {
      const endpoint = view === 'login' ? '/api/login' : '/api/forgot-password';
      const response = await fetch(endpoint, {
        method: 'POST',
        body: JSON.stringify({ ...formData, role }),
      });
      const data = await response.json();

      if (response.ok) {
        // Redirect based on role
        window.location.href = role === 'pro' ? '/dashboard/pro' : '/dashboard/student';
      } else {
        setError(data.message || "Something went wrong");
      }
    } catch (err) {
      setError("Failed to connect to server.");
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="glass-card w-full max-w-md p-8 rounded-3xl border border-white/20 relative animate-in zoom-in duration-300">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white text-xl">✕</button>

        <h2 className="text-3xl font-black italic mb-6 text-center">
          {view === 'login' ? 'WELCOME BACK' : 'RESET PASSWORD'}
        </h2>

        {/* Role Selector */}
        {view === 'login' && (
          <div className="flex gap-2 p-1 bg-white/5 rounded-xl mb-6">
            <button 
              onClick={() => setRole('student')}
              className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${role === 'student' ? 'bg-indigo-600 shadow-lg' : 'text-gray-400'}`}
            >Student</button>
            <button 
              onClick={() => setRole('pro')}
              className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${role === 'pro' ? 'bg-indigo-600 shadow-lg' : 'text-gray-400'}`}
            >Professional</button>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-x-0 space-y-4">
          <input 
            type="email" placeholder="Gmail Address" className="input-field" required
            onChange={(e) => setFormData({...formData, email: e.target.value})}
          />
          <input 
            type="password" placeholder={view === 'login' ? "Password" : "New Password"} className="input-field" required
            onChange={(e) => setFormData({...formData, password: e.target.value})}
          />
          {view === 'forgot' && (
            <input 
              type="password" placeholder="Re-enter New Password" className="input-field" required
              onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
            />
          )}

          {error && <p className="text-red-400 text-xs mt-2">{error}</p>}

          <button type="submit" className="btn-primary w-full justify-center py-4 mt-4 shadow-xl shadow-indigo-500/20">
            {view === 'login' ? 'Login Now' : 'Update Password'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm">
          {view === 'login' ? (
            <button onClick={() => setView('forgot')} className="text-indigo-400 hover:underline">Forgot Password?</button>
          ) : (
            <button onClick={() => setView('login')} className="text-gray-400 hover:text-white">Back to Login</button>
          )}
        </div>
      </div>
    </div>
  );
}