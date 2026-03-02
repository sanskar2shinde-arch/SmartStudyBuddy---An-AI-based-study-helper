"use client";

import React, { useState } from 'react';
import { 
  Mail, Phone, MapPin, Github, Linkedin, 
  Twitter, Instagram, Send, Loader2, Globe, Facebook, MessageCircle
} from 'lucide-react';

export default function ContactPage() {
  // 1. Form & UI State
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState({ loading: false, error: '', success: false });

  // 2. Configuration for your specific links
  const links = {
    personalSite: "https://sanskarshinde2s.web.app/", 
    githubMain: "https://github.com/sanskar1shinde",
    githubArch: "https://github.com/sanskar2shinde-arch",
    linkedin: "https://www.linkedin.com/in/sanskar-s-1b7693208/",
    facebook: "https://www.facebook.com/profile.php?id=61576863825404",
    instagram: "https://www.instagram.com/sanskar.2906",
    twitter: "https://x.com/SanskarShinde18",
    whatsapp: "https://wa.me/919604875972?text=Hi Sanskar, I saw your SMART STUDY BUDDY app and would love to discuss a about it!"
  };

  // 3. Validation & Backend Connection
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ loading: true, error: '', success: false });

    const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    if (!gmailRegex.test(formData.email)) {
      setStatus({ loading: false, error: 'Please use a valid @gmail.com address.', success: false });
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:5000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus({ loading: false, error: '', success: true });
        setFormData({ name: '', email: '', message: '' }); 
      } else {
        throw new Error('Database connection failed.');
      }
    } catch (err) {
      setStatus({ loading: false, error: 'Server connection failed. Data not stored.', success: false });
    }
  };

  return (
    <main className="min-h-screen bg-[#0f172a] text-white pt-32 pb-20 px-6 md:px-12 relative overflow-hidden">
      
      {/* Background Glows */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] bg-purple-600/10 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Page Header */}
        <div className="mb-16">
          <h1 className="text-5xl md:text-6xl font-black italic tracking-tighter mb-4 uppercase">
            Get in <span className="text-indigo-500 underline decoration-indigo-500/30 underline-offset-8">Touch</span>
          </h1>
          <p className="text-gray-400 max-w-2xl text-lg leading-relaxed">
            I'm currently open to new opportunities and collaborations. Whether you have a question or just want to say hi, I’ll try my best to get back to you!
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* LEFT: CONTACT FORM */}
          <div className="flex-[2] glass-card p-10 rounded-3xl border border-white/10 relative group shadow-2xl">
            <h2 className="text-3xl font-bold mb-8 italic tracking-tight text-indigo-400">Send a Message</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-1">Full Name</label>
                  <input 
                    type="text" required value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="Sanskar Shinde" 
                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 outline-none focus:border-indigo-500 transition-all" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-1">Gmail Account</label>
                  <input 
                    type="email" required value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="sanskar1shinde@gmail.com" 
                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 outline-none focus:border-indigo-500 transition-all" 
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-1">Message</label>
                <textarea 
                  rows={6} required value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  placeholder="How can I help you today?" 
                  className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 outline-none focus:border-indigo-500 transition-all resize-none"
                ></textarea>
              </div>

              {status.error && <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-xl font-bold">{status.error}</div>}
              {status.success && <div className="p-4 bg-green-500/10 border border-green-500/20 text-green-400 text-sm rounded-xl font-bold uppercase">Success! Your message has been sent.</div>}

              <button 
                disabled={status.loading}
                className="w-full md:w-auto bg-indigo-600 hover:bg-indigo-500 text-white font-black px-12 py-4 rounded-2xl flex items-center justify-center gap-3 transition-all shadow-xl shadow-indigo-500/20 active:scale-95 disabled:opacity-50"
              >
                {status.loading ? <Loader2 className="animate-spin" /> : 'Send Message'} 
                {!status.loading && <Send size={18} />}
              </button>
            </form>
          </div>

          {/* RIGHT: SIDEBAR INFO */}
          <div className="flex-1 space-y-8">
            
            <div className="glass-card p-8 rounded-3xl border border-white/10">
              <h3 className="text-[10px] font-black tracking-[0.3em] uppercase mb-8 border-b border-white/10 pb-3 text-indigo-400">Information</h3>
              <div className="space-y-6">
                <ContactDetail icon={<Mail size={20}/>} label="Email" value="sanskar1shinde@gmail.com" />
                <ContactDetail icon={<Phone size={20}/>} label="Phone" value="+91 9604875972" />
                <ContactDetail icon={<MapPin size={20}/>} label="Location" value="Pune, Maharashtra" />
              </div>
            </div>

            <div className="glass-card p-8 rounded-3xl border border-white/10 shadow-lg">
              <h3 className="text-[10px] font-black tracking-[0.3em] uppercase mb-6 border-b border-white/10 pb-3 text-indigo-400">Social Connect</h3>
              
              <div className="space-y-4">
                <a 
                  href={links.personalSite} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-3 bg-indigo-600/10 text-indigo-400 border border-indigo-500/30 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-indigo-600 hover:text-white transition-all duration-300 group shadow-inner shadow-indigo-500/5"
                >
                  <Globe size={18} className="group-hover:rotate-[20deg] transition-transform" />
                  Visit Personal Site
                </a>

                <div className="grid grid-cols-3 gap-3">
                  <SocialBtn url={links.githubMain} icon={<Github size={20} />} title="GitHub 1" />
                  <SocialBtn url={links.githubArch} icon={<Github size={20} />} title="GitHub 2" />
                  <SocialBtn url={links.linkedin} icon={<Linkedin size={20} />} title="LinkedIn" />
                  <SocialBtn url={links.facebook} icon={<Facebook size={20} />} title="Facebook" />
                  <SocialBtn url={links.instagram} icon={<Instagram size={20} />} title="Instagram" />
                  <SocialBtn url={links.twitter} icon={<Twitter size={20} />} title="X (Twitter)" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-20 py-8 border-t border-slate-200 text-center">
        <p className="text-sm text-slate-400">
          © {new Date().getFullYear()} <span className="font-bold text-slate-600">Smart Study Buddy</span>. All rights reserved.
        </p>
      </footer>
      </div>

      {/* WHATSAPP FLOATING BUTTON */}
      <a 
        href={links.whatsapp}
        className="fixed bottom-8 right-8 bg-[#25d366] text-white px-6 py-4 rounded-full flex items-center gap-3 font-bold shadow-[0_10px_25px_rgba(37,211,102,0.4)] hover:scale-110 transition-all z-[9999] active:scale-95 group"
        target="_blank"
        rel="noopener noreferrer"
      >
        <MessageCircle size={24} className="fill-white" />
        <span className="hidden md:block">Chat on WhatsApp</span>
      </a>
    </main>
  );
}

// Sub-components
function ContactDetail({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) {
  return (
    <div className="flex items-center gap-4 group cursor-pointer">
      <div className="w-12 h-12 bg-indigo-600/10 text-indigo-400 rounded-xl flex items-center justify-center border border-indigo-500/20 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
        {icon}
      </div>
      <div>
        <p className="text-[9px] font-black uppercase text-gray-600 tracking-widest">{label}</p>
        <p className="text-sm font-bold text-gray-300 group-hover:text-indigo-400 transition-colors">{value}</p>
      </div>
    </div>
  );
}

function SocialBtn({ icon, url, title }: { icon: React.ReactNode; url: string; title: string }) {
  return (
    <a 
      href={url} target="_blank" rel="noopener noreferrer" title={title}
      className="h-14 bg-white/5 text-gray-400 rounded-2xl flex items-center justify-center border border-white/10 hover:border-indigo-500/50 hover:bg-indigo-600/10 hover:text-indigo-400 transition-all duration-300 shadow-inner"
    >
      {icon}
    </a>
  );
}