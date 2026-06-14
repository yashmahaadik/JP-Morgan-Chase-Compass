import React from 'react';
import { Icons } from '../constants';
import { ViewState } from '../types';

interface ProfileProps {
  setViewState: (view: ViewState) => void;
  theme?: 'dark' | 'light';
  toggleTheme?: () => void;
  region?: 'US' | 'IN';
  setRegion?: (region: 'US' | 'IN') => void;
}

const Profile: React.FC<ProfileProps> = ({ setViewState, theme, toggleTheme, region = 'US', setRegion }) => {
  return (
    <div className="p-4 md:p-8 pt-6 h-full bg-compass-bg pb-32 animate-fade-in">
        <div className="flex items-center mb-6">
            <button onClick={() => setViewState(ViewState.DASHBOARD)} className="mr-4 text-compass-text md:hidden p-2 -ml-2">
                <Icons.ArrowLeft />
            </button>
            <h1 className="text-xl md:text-3xl font-bold text-compass-text">My Profile</h1>
        </div>

        {/* User Card */}
        <div className="bg-compass-card rounded-3xl p-6 shadow-xl mb-6">
             <div className="flex flex-col items-center">
                 <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-3xl font-bold text-white mb-4 border-4 border-compass-bg shadow-lg">
                     YM
                 </div>
                 <h2 className="text-2xl font-bold text-compass-text">Yash Mahadik</h2>
                 <p className="text-compass-muted text-sm mb-6">Chase Private Client</p>
                 
                 <div className="w-full space-y-3">
                     <div className="flex items-center gap-3 p-3 bg-compass-bg/50 rounded-xl transition-all">
                         <div className="text-compass-primary"><Icons.Smartphone /></div>
                         <div className="flex-1">
                             <div className="text-xs text-compass-muted uppercase font-bold tracking-wider">Mobile</div>
                             <a href="tel:+917977922735" className="text-compass-text font-medium text-sm hover:text-compass-primary transition-all hover:underline block font-mono">+91 7977922735</a>
                         </div>
                     </div>
                     <div className="flex items-center gap-3 p-3 bg-compass-bg/50 rounded-xl transition-all">
                         <div className="text-compass-primary"><Icons.MessageCircle /></div>
                         <div className="flex-1">
                             <div className="text-xs text-compass-muted uppercase font-bold tracking-wider">Email</div>
                             <a href="mailto:yashmahadik2005@gmail.com" className="text-compass-text font-medium text-sm hover:text-compass-primary transition-all hover:underline block">yashmahadik2005@gmail.com</a>
                         </div>
                     </div>
                 </div>
             </div>

             {/* Premium Portfolio CTA Button */}
             <div className="w-full mt-6">
                 <a 
                     href="https://yashmahadik.vercel.app" 
                     target="_blank" 
                     rel="noopener noreferrer" 
                     className="w-full py-4 px-4 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-500 hover:to-indigo-600 text-white rounded-2xl flex items-center justify-center gap-2 text-sm font-bold shadow-lg transition-all active:scale-[0.98] group"
                 >
                     <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                     Please visit my portfolio at yashmahadik.vercel.app
                 </a>
             </div>
        </div>

        {/* Settings Links */}
        <div className="space-y-3">
             {/* Appearance Toggle */}
            {toggleTheme && (
                <button 
                    onClick={toggleTheme}
                    className="w-full bg-compass-card hover:bg-compass-secondary p-5 rounded-xl flex items-center justify-between group transition-all active:scale-[0.99]"
                >
                    <div className="flex items-center gap-3">
                        <div className="text-compass-muted group-hover:text-compass-text transition-colors">
                            {theme === 'dark' ? <Icons.Moon /> : <Icons.Sun />}
                        </div>
                        <span className="font-semibold text-compass-text text-base">Dark Mode</span>
                    </div>
                    <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-compass-secondary border border-compass-primary/30 transition-colors">
                        <span className="sr-only">Toggle theme</span>
                        <span
                            className={`${
                            theme === 'dark' ? 'translate-x-6 bg-compass-primary' : 'translate-x-1 bg-compass-muted'
                            } inline-block h-4 w-4 transform rounded-full transition`}
                        />
                    </div>
                </button>
            )}

            {/* Region Select */}
            {setRegion && (
                <div className="w-full bg-compass-card p-5 rounded-xl flex flex-col gap-4 shadow-xl">
                    <div className="flex items-start gap-3">
                        <div className="text-compass-muted mt-0.5">
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
                        </div>
                        <div className="flex-1">
                            <span className="font-semibold text-compass-text text-base block leading-tight">Operating Region</span>
                            <span className="text-xs text-compass-muted mt-1 block">Adjusts payment methods (UPI/Rupees), localized banking systems, and dynamic currencies globally.</span>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 p-1 bg-compass-bg/60 rounded-xl">
                         <button 
                             onClick={() => setRegion('US')}
                             className={`py-2.5 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1 sm:gap-2 ${region === 'US' ? 'bg-compass-primary text-white shadow-md' : 'text-compass-muted hover:text-compass-text hover:bg-compass-secondary/30'}`}
                         >
                             <span>🇺🇸</span> United States (USD)
                         </button>
                         <button 
                             onClick={() => setRegion('IN')}
                             className={`py-2.5 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1 sm:gap-2 ${region === 'IN' ? 'bg-compass-primary text-white shadow-md' : 'text-compass-muted hover:text-compass-text hover:bg-compass-secondary/30'}`}
                         >
                             <span>🇮🇳</span> India (INR / UPI)
                         </button>
                    </div>
                </div>
            )}

            {[
                { label: 'Notifications', icon: <Icons.Sparkles /> },
                { label: 'Security & Privacy', icon: <Icons.ShieldCheck /> },
                { label: 'Help & Support', icon: <Icons.MessageCircle /> }
            ].map((item, i) => (
                <button key={i} className="w-full bg-compass-card hover:bg-compass-secondary p-5 rounded-xl flex items-center justify-between group transition-all active:scale-[0.99]">
                    <div className="flex items-center gap-3">
                        <div className="text-compass-muted group-hover:text-compass-text transition-colors">
                            {item.icon}
                        </div>
                        <span className="font-semibold text-compass-text text-base">{item.label}</span>
                    </div>
                    <div className="text-compass-muted group-hover:translate-x-1 transition-transform">
                        <Icons.ArrowRight />
                    </div>
                </button>
            ))}
        </div>

        {/* Contact/Credits Section */}
        <div className="mt-8 bg-compass-card p-6 rounded-3xl shadow-xl border border-compass-primary/10">
            <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 bg-compass-primary/10 text-compass-primary rounded-xl">
                    <Icons.Sparkles />
                </div>
                <div>
                    <div className="text-[10px] text-compass-muted uppercase tracking-widest font-extrabold mb-0.5">Project Credits</div>
                    <h3 className="text-lg font-extrabold text-compass-text">MVP Created By Yash Mahadik</h3>
                </div>
            </div>
            
            <p className="text-xs text-compass-muted leading-relaxed mb-6">
                This high-fidelity banking system showcases multi-region payment support, real-time UPI and card authorization engines, localized bank data transformations, and customized financial planners.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {/* LinkedIn link */}
                <a 
                    href="https://www.linkedin.com/in/yashmahadik2" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="py-3 px-4 bg-compass-bg hover:bg-compass-secondary hover:text-[#0077b5] border border-compass-primary/10 hover:border-[#0077b5]/30 rounded-xl text-center text-xs font-bold text-compass-text transition-all flex items-center justify-center gap-2 active:scale-95"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
                    LinkedIn
                </a>

                {/* Portfolio Link */}
                <a 
                    href="https://yashmahadik.vercel.app" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="py-3 px-4 bg-compass-bg hover:bg-compass-secondary hover:text-emerald-400 border border-compass-primary/10 hover:border-emerald-500/30 rounded-xl text-center text-xs font-bold text-compass-text transition-all flex items-center justify-center gap-2 active:scale-95"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
                    Portfolio
                </a>

                {/* Contact standard redirect link */}
                <a 
                    href="mailto:yashmahadik2005@gmail.com"
                    className="py-3 px-4 bg-compass-bg hover:bg-compass-secondary hover:text-purple-400 border border-compass-primary/10 hover:border-purple-500/30 rounded-xl text-center text-xs font-bold text-compass-text transition-all flex items-center justify-center gap-2 active:scale-95"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                    Email Me
                </a>
            </div>
        </div>
        
        <button className="w-full mt-8 py-4 text-red-400 font-bold hover:bg-red-400/10 rounded-xl transition-colors active:scale-[0.99] text-base">
            Log Out
        </button>
    </div>
  );
};

export default Profile;