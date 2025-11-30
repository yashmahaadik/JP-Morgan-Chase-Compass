import React from 'react';
import { Icons } from '../constants';
import { ViewState } from '../types';

interface ProfileProps {
  setViewState: (view: ViewState) => void;
}

const Profile: React.FC<ProfileProps> = ({ setViewState }) => {
  return (
    <div className="p-4 md:p-8 pt-6 h-full bg-compass-bg pb-32 animate-fade-in">
        <div className="flex items-center mb-6">
            <button onClick={() => setViewState(ViewState.DASHBOARD)} className="mr-4 text-white md:hidden">
                <Icons.ArrowLeft />
            </button>
            <h1 className="text-xl md:text-3xl font-bold text-white">My Profile</h1>
        </div>

        {/* User Card */}
        <div className="bg-compass-card rounded-3xl p-6 border border-compass-secondary/30 shadow-xl mb-6">
             <div className="flex flex-col items-center">
                 <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-3xl font-bold text-white mb-4 border-4 border-compass-bg shadow-lg">
                     AJ
                 </div>
                 <h2 className="text-2xl font-bold text-white">Alex Johnson</h2>
                 <p className="text-compass-muted text-sm mb-6">Chase Private Client</p>
                 
                 <div className="w-full space-y-3">
                     <div className="flex items-center gap-3 p-3 bg-compass-bg/50 rounded-xl border border-transparent hover:border-compass-primary/20 transition-all">
                         <div className="text-compass-primary"><Icons.Smartphone /></div>
                         <div className="flex-1">
                             <div className="text-xs text-compass-muted uppercase font-bold tracking-wider">Mobile</div>
                             <div className="text-white font-medium">(555) 123-4567</div>
                         </div>
                     </div>
                     <div className="flex items-center gap-3 p-3 bg-compass-bg/50 rounded-xl border border-transparent hover:border-compass-primary/20 transition-all">
                         <div className="text-compass-primary"><Icons.MessageCircle /></div>
                         <div className="flex-1">
                             <div className="text-xs text-compass-muted uppercase font-bold tracking-wider">Email</div>
                             <div className="text-white font-medium">alex.j@example.com</div>
                         </div>
                     </div>
                 </div>
             </div>
        </div>

        {/* Settings Links */}
        <div className="space-y-3">
            {[
                { label: 'Notifications', icon: <Icons.Sparkles /> },
                { label: 'Security & Privacy', icon: <Icons.ShieldCheck /> },
                { label: 'App Appearance', icon: <Icons.Settings /> },
                { label: 'Help & Support', icon: <Icons.MessageCircle /> }
            ].map((item, i) => (
                <button key={i} className="w-full bg-compass-card hover:bg-compass-secondary p-4 rounded-xl flex items-center justify-between group transition-all border border-transparent hover:border-compass-secondary">
                    <div className="flex items-center gap-3">
                        <div className="text-compass-muted group-hover:text-white transition-colors">
                            {item.icon}
                        </div>
                        <span className="font-semibold text-white">{item.label}</span>
                    </div>
                    <div className="text-compass-muted group-hover:translate-x-1 transition-transform">
                        <Icons.ArrowRight />
                    </div>
                </button>
            ))}
        </div>
        
        <button className="w-full mt-8 py-3 text-red-400 font-bold hover:bg-red-400/10 rounded-xl transition-colors">
            Log Out
        </button>
    </div>
  );
};

export default Profile;