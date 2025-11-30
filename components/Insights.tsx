import React, { useEffect, useState } from 'react';
import { MOCK_INSIGHTS, MOCK_ACCOUNTS, MOCK_GOALS, Icons } from '../constants';
import { ViewState } from '../types';
import { generateFinancialInsight } from '../services/geminiService';

interface InsightsProps {
  setViewState: (view: ViewState) => void;
  isMobileTab?: boolean;
}

const Insights: React.FC<InsightsProps> = ({ setViewState, isMobileTab = false }) => {
  const [aiTip, setAiTip] = useState<string>('Analyzing portfolio...');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInsight = async () => {
        try {
            const tip = await generateFinancialInsight(MOCK_ACCOUNTS, MOCK_GOALS);
            setAiTip(tip);
        } catch (e) {
            setAiTip("Could not load AI insight.");
        } finally {
            setLoading(false);
        }
    };
    fetchInsight();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={`p-4 md:p-8 pt-6 h-full bg-compass-bg pb-24 animate-fade-in ${isMobileTab ? 'pt-0' : ''}`}>
        {/* Sticky Header - Removed Border */}
        <div className="sticky top-[60px] md:top-0 z-20 bg-compass-bg/95 backdrop-blur-md -mx-4 px-4 pt-2 md:pt-0 md:mx-0 md:px-0 pb-2">
            {!isMobileTab && (
                <div className="flex items-center mb-4">
                    <button onClick={() => setViewState(ViewState.DASHBOARD)} className="mr-4 text-compass-text md:hidden">
                        <Icons.ArrowLeft />
                    </button>
                    <h1 className="text-xl md:text-3xl font-bold text-compass-text">Insights & Guidance</h1>
                </div>
            )}

            {/* Filters */}
            <div className="flex gap-2 mb-4 overflow-x-auto no-scrollbar pb-2">
                {['All', 'Portfolio', 'Goals', 'Market News'].map((filter, i) => (
                    <button key={filter} className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${i === 0 ? 'bg-compass-primary text-white shadow-lg shadow-blue-900/20' : 'bg-compass-secondary text-compass-muted hover:bg-compass-secondary/80 hover:text-compass-text'}`}>
                        {filter}
                    </button>
                ))}
            </div>
        </div>

        {/* Gemini AI Card - Full Width Highlight - Removed Border */}
        <div className="bg-gradient-to-br from-[#0f172a] to-[#1e293b] rounded-2xl p-6 mb-8 relative overflow-hidden shadow-2xl shadow-blue-900/10">
             <div className="absolute top-0 right-0 p-3 opacity-10 text-compass-primary transform scale-150">
                <Icons.Sparkles />
             </div>
             <div className="flex items-center gap-2 mb-3">
                <div className="p-1.5 bg-compass-primary/20 rounded-lg text-compass-primary">
                    <Icons.Sparkles />
                </div>
                <span className="text-xs font-bold text-compass-primary tracking-widest uppercase">Compass AI</span>
             </div>
             <p className="text-white text-lg md:text-xl leading-relaxed max-w-4xl">
                {loading ? (
                    <span className="animate-pulse">Connecting to Gemini...</span>
                ) : (
                    aiTip
                )}
             </p>
        </div>

        {/* Grid Layout for Insights */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {MOCK_INSIGHTS.map((insight) => {
                let iconBg = 'bg-gray-800';
                let iconColor = 'text-white';
                
                if (insight.type === 'success') {
                    iconBg = 'bg-emerald-900/40'; // Dark emerald
                    iconColor = 'text-emerald-400';
                } else if (insight.type === 'warning') {
                    iconBg = 'bg-yellow-900/40'; // Dark yellow
                    iconColor = 'text-yellow-500';
                } else if (insight.type === 'info') {
                    iconBg = 'bg-blue-900/40'; // Dark blue
                    iconColor = 'text-blue-400';
                } else {
                     iconBg = 'bg-purple-900/40'; // Dark purple
                     iconColor = 'text-purple-400';
                }

                return (
                    // Removed Border
                    <div key={insight.id} className="bg-compass-card rounded-2xl p-6 border-l-4 border-transparent hover:border-l-compass-secondary hover:-translate-y-1 transition-all duration-300 shadow-lg flex flex-col justify-between h-full">
                        <div>
                            <div className="flex justify-between items-start mb-4">
                                <div className={`w-12 h-12 rounded-full ${iconBg} ${iconColor} flex items-center justify-center shrink-0`}>
                                    {insight.type === 'success' && <div className="w-5 h-5 rounded-sm border-2 border-current"></div>}
                                    {insight.type === 'warning' && <span className="font-serif font-bold text-lg">!</span>}
                                    {insight.type === 'info' && <div className="w-0 h-0 border-l-[6px] border-l-transparent border-t-[8px] border-t-current border-r-[6px] border-r-transparent transform -rotate-45"></div>}
                                    {insight.type === 'education' && <div className="w-5 h-1.5 bg-current"></div>}
                                </div>
                                <div className="text-xs text-compass-muted uppercase font-semibold tracking-wider bg-compass-secondary/50 px-2 py-1 rounded">
                                    {insight.type === 'education' ? 'Learn' : insight.type === 'info' ? 'News' : insight.type === 'warning' ? 'Alert' : 'Status'}
                                </div>
                            </div>
                            
                            <h3 className="text-xl font-bold text-compass-text mb-3 leading-tight">{insight.title}</h3>
                            <p className="text-compass-muted text-sm leading-relaxed mb-6">{insight.description}</p>
                        </div>

                        <div className="flex justify-between items-center pt-4 border-t border-compass-secondary/50">
                             <div className="flex gap-4 text-compass-muted">
                                 <button className="hover:text-compass-text transition-colors"><Icons.ThumbsUp /></button>
                                 <button className="hover:text-compass-text transition-colors"><Icons.ThumbsDown /></button>
                             </div>
                             <button className="bg-compass-secondary hover:bg-compass-primary hover:text-white text-compass-muted hover:shadow-lg transition-all font-semibold text-sm px-4 py-2 rounded-lg">
                                {insight.actionLabel}
                             </button>
                        </div>
                    </div>
                );
            })}
        </div>

    </div>
  );
};

export default Insights;