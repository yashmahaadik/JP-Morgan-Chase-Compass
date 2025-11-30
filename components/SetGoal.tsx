import React, { useState } from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { Icons, MOCK_ACCOUNTS } from '../constants';
import { ViewState } from '../types';

interface SetGoalProps {
  setViewState: (view: ViewState) => void;
  isMobileTab?: boolean;
}

const SetGoal: React.FC<SetGoalProps> = ({ setViewState, isMobileTab = false }) => {
  const [goalName, setGoalName] = useState('House Down Payment');
  const [amount, setAmount] = useState('50000');
  const [targetDate, setTargetDate] = useState('');
  const [style, setStyle] = useState<'Conservative' | 'Moderate' | 'Aggressive'>('Conservative');
  const [selectedAccountId, setSelectedAccountId] = useState<string>(MOCK_ACCOUNTS[0]?.id || '');

  // Generate fake projection data based on style
  const generateData = () => {
    const volatility = style === 'Conservative' ? 2000 : style === 'Moderate' ? 5000 : 9000;
    const growth = style === 'Conservative' ? 1.02 : style === 'Moderate' ? 1.05 : 1.08;
    
    let current = 40000;
    const data = [];
    for(let i = 0; i < 12; i++) {
        const randomFluctuation = (Math.random() - 0.5) * volatility;
        current = (current * Math.pow(growth, 1/12)) + randomFluctuation;
        data.push({ name: i, value: current });
    }
    return data;
  };

  const data = generateData();

  const handleCreateGoal = () => {
    const goalData = {
      name: goalName,
      targetAmount: parseFloat(amount),
      targetDate: targetDate,
      style: style,
      linkedAccountId: selectedAccountId,
      createdAt: new Date().toISOString()
    };
    
    console.log("Creating New Goal:", goalData);
    // In a real app, we would dispatch an action or call an API here.
    
    setViewState(ViewState.DASHBOARD);
  };

  return (
    <div className={`p-4 md:p-8 pt-6 h-full min-h-screen bg-compass-bg pb-32 animate-fade-in ${isMobileTab ? 'pt-0' : ''}`}>
      {!isMobileTab && (
        <div className="sticky top-[60px] md:top-0 z-20 bg-compass-bg/95 backdrop-blur-md -mx-4 px-4 pt-2 md:pt-0 md:mx-0 md:px-0 flex items-center mb-6 justify-between pb-4 md:border-none">
            <button onClick={() => setViewState(ViewState.DASHBOARD)} className="text-compass-text md:hidden">
                <Icons.ArrowLeft />
            </button>
            <div className="hidden md:block"></div> {/* Spacer */}
            <h1 className="text-lg md:text-2xl font-bold text-compass-text">Set a New Goal</h1>
            <button className="text-compass-text opacity-0"><Icons.MoreVertical /></button> {/* Spacer */}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
        {/* Left Column: Form */}
        <div className="space-y-6">
            <div className="space-y-1 mb-2">
                <h2 className="text-3xl font-bold text-compass-text">What are you saving for?</h2>
                <p className="text-compass-muted">Let's plan your future, together.</p>
            </div>

            {/* Progress Bar (Mobile only essentially, or modified for desktop) */}
            <div className="flex gap-2 mb-8">
                <div className="h-1 flex-1 bg-compass-primary rounded-full"></div>
                <div className="h-1 flex-1 bg-compass-secondary rounded-full"></div>
                <div className="h-1 flex-1 bg-compass-secondary rounded-full"></div>
            </div>

            {/* Goal Name */}
            <div>
                <label className="block text-compass-text mb-2 text-sm font-medium">Goal Name</label>
                <input 
                    type="text" 
                    value={goalName}
                    onChange={(e) => setGoalName(e.target.value)}
                    placeholder="e.g., House Down Payment"
                    className="w-full bg-compass-secondary border border-compass-secondary text-compass-text rounded-xl p-4 focus:outline-none focus:border-compass-primary transition-colors"
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-compass-text mb-2 text-sm font-medium">Amount</label>
                    <div className="relative">
                        <span className="absolute left-4 top-4 text-compass-muted">$</span>
                        <input 
                            type="text" 
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="w-full bg-compass-secondary border border-compass-secondary text-compass-text rounded-xl p-4 pl-8 focus:outline-none focus:border-compass-primary transition-colors"
                        />
                    </div>
                </div>
                <div>
                    <label className="block text-compass-text mb-2 text-sm font-medium">Target Date</label>
                    <div className="relative">
                        <input 
                            type="text" 
                            value={targetDate}
                            onChange={(e) => setTargetDate(e.target.value)}
                            placeholder="Dec 2028"
                            className="w-full bg-compass-secondary border border-compass-secondary text-compass-text rounded-xl p-4 pr-10 focus:outline-none focus:border-compass-primary transition-colors"
                        />
                        <div className="absolute right-4 top-4 text-compass-muted pointer-events-none">
                            <Icons.Calendar />
                        </div>
                    </div>
                </div>
            </div>

            {/* Link Account */}
            <div>
                <label className="block text-compass-text mb-2 text-sm font-medium">Link Account</label>
                <div className="relative">
                    <select
                        value={selectedAccountId}
                        onChange={(e) => setSelectedAccountId(e.target.value)}
                        className="w-full bg-compass-secondary border border-compass-secondary text-compass-text rounded-xl p-4 pr-10 appearance-none focus:outline-none focus:border-compass-primary transition-colors cursor-pointer"
                    >
                        <option value="" disabled>Select an account</option>
                        {MOCK_ACCOUNTS.map((account) => (
                            <option key={account.id} value={account.id}>
                                {account.name} ({account.type}) - ${account.balance.toLocaleString()}
                            </option>
                        ))}
                    </select>
                    <div className="absolute right-4 top-4 text-compass-muted pointer-events-none transform rotate-90">
                        <Icons.ArrowLeft /> {/* Using rotate arrow as chevron */}
                    </div>
                </div>
                <p className="text-xs text-compass-muted mt-2">Funds for this goal will be tracked from this account.</p>
            </div>

            {/* Investment Style */}
            <div>
                <label className="block text-compass-text mb-3 text-sm font-medium">Choose Your Investment Style</label>
                <div className="grid grid-cols-1 gap-3">
                    {['Conservative', 'Moderate', 'Aggressive'].map((s) => (
                        <div 
                            key={s}
                            onClick={() => setStyle(s as any)}
                            className={`p-4 rounded-xl border cursor-pointer transition-all ${style === s ? 'bg-compass-secondary border-compass-primary shadow-[0_0_15px_rgba(0,96,240,0.15)]' : 'bg-compass-card border-transparent hover:bg-compass-secondary'}`}
                        >
                            <div className="flex items-center gap-3">
                                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${style === s ? 'border-compass-primary' : 'border-compass-muted'}`}>
                                    {style === s && <div className="w-2.5 h-2.5 bg-compass-text rounded-full"></div>}
                                </div>
                                <div>
                                    <div className="text-compass-text font-semibold">{s}</div>
                                    <div className="text-compass-muted text-xs">
                                        {s === 'Conservative' ? 'Focuses on capital preservation.' : 
                                         s === 'Moderate' ? 'Balanced approach to growth.' : 
                                         'Aims for maximum growth.'}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>

        {/* Right Column: Preview & Action (Desktop) */}
        <div className="flex flex-col gap-6">
             {/* Projection Card - Removed Border */}
             <div className="bg-compass-card p-6 rounded-2xl shadow-xl h-full flex flex-col">
                <div className="flex justify-between items-end mb-6">
                    <div>
                        <div className="text-sm text-compass-muted uppercase tracking-wider mb-1">Projected Growth</div>
                        <div className={`text-4xl font-bold ${style === 'Aggressive' ? 'text-compass-primary' : 'text-compass-text'}`}>
                            {style === 'Conservative' ? '+3.5%' : style === 'Moderate' ? '+6.2%' : '+9.8%'}
                        </div>
                        <div className="text-sm text-compass-muted mt-1">Estimated annual return</div>
                    </div>
                    <div className="text-right">
                         <div className="text-sm text-compass-muted">Target</div>
                         <div className="text-xl font-bold text-compass-text">${parseInt(amount).toLocaleString()}</div>
                    </div>
                </div>

                <div className="flex-1 w-full min-h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={data} margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
                             <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-secondary)" />
                             <XAxis dataKey="name" hide />
                             <YAxis hide />
                             <Tooltip 
                                contentStyle={{ backgroundColor: 'var(--color-card)', borderColor: 'var(--color-secondary)', color: 'var(--color-text)' }}
                             />
                             <Line 
                                type="monotone" 
                                dataKey="value" 
                                stroke="#0060F0" 
                                strokeWidth={4} 
                                dot={{ r: 4, fill: '#0060F0', strokeWidth: 2, stroke: '#fff' }}
                                activeDot={{ r: 8 }}
                             />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
             </div>

             {/* Desktop Action Button (Instead of sticky bottom) */}
             <button 
                onClick={handleCreateGoal}
                className="hidden lg:block w-full bg-compass-primary hover:bg-compass-primaryDark text-white font-bold py-5 rounded-xl shadow-[0_0_20px_rgba(0,96,240,0.4)] transition-all text-lg"
              >
                  Create Goal
              </button>
        </div>
      </div>
        
      {/* Mobile Sticky Button */}
      {!isMobileTab && (
          <div className="lg:hidden fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-compass-bg via-compass-bg to-transparent z-10">
              <button 
                onClick={handleCreateGoal}
                className="w-full bg-compass-primary hover:bg-compass-primaryDark text-white font-bold py-4 rounded-xl shadow-[0_0_20px_rgba(0,96,240,0.4)] transition-all"
              >
                  Create Goal
              </button>
          </div>
      )}
      {isMobileTab && (
           <div className="lg:hidden p-4">
              <button 
                onClick={handleCreateGoal}
                className="w-full bg-compass-primary hover:bg-compass-primaryDark text-white font-bold py-4 rounded-xl shadow-[0_0_20px_rgba(0,96,240,0.4)] transition-all"
              >
                  Create Goal
              </button>
          </div>
      )}

    </div>
  );
};

export default SetGoal;