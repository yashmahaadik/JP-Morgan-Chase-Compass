import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, AreaChart, Area, Tooltip, XAxis, YAxis, CartesianGrid } from 'recharts';
import { MOCK_ACCOUNTS, Icons } from '../constants';
import { ViewState } from '../types';

interface DashboardProps {
  setViewState: (view: ViewState) => void;
  setActivePaymentTab: (tab: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ setViewState, setActivePaymentTab }) => {
  // Mock Data for Charts
  const pieData = [
    { name: 'Assets', value: 75, color: '#0060F0' }, // Chase Blue
    { name: 'Liabilities', value: 25, color: '#ef4444' }, // Red
  ];

  const areaData = [
    { name: 'Jan', value: 100000 },
    { name: 'Feb', value: 110000 },
    { name: 'Mar', value: 105000 },
    { name: 'Apr', value: 125000 },
    { name: 'May', value: 115000 },
    { name: 'Jun', value: 140000 },
    { name: 'Jul', value: 150000 },
  ];

  const recentTransactions = [
    { id: 1, merchant: 'Whole Foods Market', date: 'Today', amount: -64.20, category: 'Groceries', icon: <Icons.ShoppingBag /> },
    { id: 2, merchant: 'Uber', date: 'Yesterday', amount: -24.50, category: 'Transport', icon: <Icons.Smartphone /> },
    { id: 3, merchant: 'JPMC Salary', date: 'Oct 01', amount: 4250.00, category: 'Income', icon: <Icons.Zap />, isPositive: true },
  ];

  const totalAssets = 200000;
  const totalLiabilities = 50000;
  const netWorth = totalAssets - totalLiabilities;
  const healthScore = 85;

  const navigateToPayments = (tab: string) => {
      setActivePaymentTab(tab);
      setViewState(ViewState.PAYMENTS);
  }

  return (
    <div className="p-4 md:p-8 space-y-6 md:space-y-6 md:grid md:grid-cols-12 md:gap-6 animate-fade-in pb-32 block">
      
      {/* Header - Span Full */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center md:col-span-12 gap-4 md:gap-0">
        <div>
           <div className="text-compass-muted text-sm uppercase tracking-wider font-semibold">Total Net Worth</div>
           <div className="text-3xl md:text-5xl font-bold text-white mt-1 tracking-tight">${netWorth.toLocaleString()}.00</div>
        </div>
        
        {/* Financial Health Score */}
        <div className="flex items-center gap-4 bg-compass-card border border-compass-secondary/50 px-5 py-3 rounded-2xl shadow-lg hover:border-compass-primary/30 transition-colors cursor-pointer group">
             <div className="relative w-14 h-14 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90">
                    <circle cx="28" cy="28" r="22" stroke="#1e293b" strokeWidth="5" fill="transparent" />
                    <circle cx="28" cy="28" r="22" stroke="#10b981" strokeWidth="5" fill="transparent" strokeDasharray="138" strokeDashoffset={138 - (138 * healthScore) / 100} strokeLinecap="round" />
                </svg>
                <div className="absolute font-bold text-sm text-white">{healthScore}</div>
             </div>
             <div>
                <div className="text-white font-bold text-base group-hover:text-emerald-400 transition-colors">Excellent Health</div>
                <div className="text-compass-muted text-xs">Top 10% of users</div>
             </div>
        </div>
      </div>

      {/* Donut Chart Card - Mobile: Full, Desktop: 4 cols */}
      <div className="bg-compass-card rounded-3xl p-6 shadow-xl relative overflow-hidden md:col-span-4 lg:col-span-4 flex flex-col justify-between border border-compass-secondary/30">
        <h3 className="text-lg font-bold text-white mb-4">Asset Allocation</h3>
        <div className="h-64 relative z-10">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={65}
                outerRadius={85}
                paddingAngle={6}
                dataKey="value"
                startAngle={90}
                endAngle={-270}
                stroke="none"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          {/* Center Text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-4xl font-bold text-white tracking-tighter">75%</span>
            <span className="text-xs text-compass-muted uppercase tracking-wider font-medium">Assets</span>
          </div>
        </div>
        
        {/* Legend */}
        <div className="flex justify-center gap-8 mt-2">
            <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-[#0060F0] shadow-[0_0_10px_#0060F0]"></div>
                <div className="flex flex-col">
                    <span className="text-compass-muted text-xs font-medium">Assets</span>
                    <span className="text-white font-bold text-sm">${totalAssets.toLocaleString()}</span>
                </div>
            </div>
            <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-[#ef4444] shadow-[0_0_10px_#ef4444]"></div>
                <div className="flex flex-col">
                    <span className="text-compass-muted text-xs font-medium">Liabilities</span>
                    <span className="text-white font-bold text-sm">${totalLiabilities.toLocaleString()}</span>
                </div>
            </div>
        </div>
      </div>

      {/* Investment Performance - Mobile: Full, Desktop: 8 cols */}
      <div className="bg-compass-card rounded-3xl p-6 border border-compass-secondary/30 md:col-span-8 lg:col-span-8 flex flex-col shadow-xl">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-white">Investment Performance</h3>
            <div className="flex gap-1 bg-compass-bg p-1 rounded-xl">
                {['1M', '6M', '1Y', 'All'].map((period, i) => (
                    <button key={period} className={`px-4 py-1.5 text-xs font-medium rounded-lg transition-all ${i === 0 ? 'bg-compass-primary text-white shadow-md' : 'text-compass-muted hover:text-white hover:bg-compass-secondary'}`}>
                        {period}
                    </button>
                ))}
            </div>
          </div>

          <div className="flex-1 min-h-[240px] w-full">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={areaData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                    <defs>
                        <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#0060F0" stopOpacity={0.4}/>
                        <stop offset="95%" stopColor="#0060F0" stopOpacity={0}/>
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" opacity={0.5} />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                    <Tooltip 
                        contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#f1f5f9', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.5)' }}
                        itemStyle={{ color: '#fff', fontWeight: 'bold' }}
                        cursor={{ stroke: '#0060F0', strokeWidth: 1, strokeDasharray: '4 4' }}
                    />
                    <Area type="monotone" dataKey="value" stroke="#0060F0" strokeWidth={4} fillOpacity={1} fill="url(#colorVal)" />
                </AreaChart>
            </ResponsiveContainer>
          </div>
      </div>

      {/* Linked Accounts - Mobile: Full, Desktop: 6 cols */}
      <div className="md:col-span-6 lg:col-span-6 flex flex-col gap-5">
        <div className="flex justify-between items-center px-1">
            <h2 className="text-lg font-bold text-white">Linked Accounts</h2>
            <button onClick={() => setViewState(ViewState.LINKED_ACCOUNTS)} className="text-sm text-compass-primary hover:text-compass-primaryDark font-medium flex items-center gap-1 transition-colors">
                View All <Icons.ArrowRight />
            </button>
        </div>

        <div className="space-y-3">
            {MOCK_ACCOUNTS.slice(0, 3).map((account) => (
                <div key={account.id} className="bg-compass-card p-4 rounded-2xl flex justify-between items-center hover:bg-compass-secondary/80 transition-all border border-transparent hover:border-compass-secondary cursor-pointer group shadow-md">
                    <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-transform group-hover:scale-110 ${account.balance < 0 ? 'bg-white text-black' : 'bg-gradient-to-br from-gray-700 to-gray-900 text-white'}`}>
                            <span className="font-bold text-xs">{account.name.substring(0,2).toUpperCase()}</span>
                        </div>
                        <div>
                            <div className="font-semibold text-white group-hover:text-compass-primary transition-colors">{account.name}</div>
                            <div className="text-xs text-compass-muted font-medium">{account.type} •••• {account.accountNumber}</div>
                        </div>
                    </div>
                    <div className={`font-bold text-base ${account.balance < 0 ? 'text-[#ef4444]' : 'text-white'}`}>
                        {account.balance < 0 ? `($${Math.abs(account.balance).toLocaleString()})` : `$${account.balance.toLocaleString()}`}
                    </div>
                </div>
            ))}
        </div>
        
        {/* Add Funds Button for Desktop */}
        <button 
          onClick={() => setViewState(ViewState.CREATE_GOAL)}
          className="hidden md:flex w-full bg-compass-bg hover:bg-compass-secondary border border-dashed border-compass-secondary hover:border-compass-primary text-compass-muted hover:text-white font-semibold py-4 rounded-2xl items-center justify-center gap-2 transition-all"
        >
            <Icons.Plus />
            Link Another Account
        </button>
      </div>

      {/* Debt Summary - Mobile: Full, Desktop: 6 cols */}
      <div className="bg-compass-card rounded-3xl p-6 md:col-span-6 lg:col-span-6 border border-compass-secondary/30 flex flex-col justify-center shadow-xl">
          <div className="flex justify-between items-start mb-8">
             <div>
                <h3 className="text-lg font-bold text-white">Debt Summary</h3>
                <div className="text-4xl font-bold text-[#ef4444] mt-2 tracking-tight">$50,000.00</div>
             </div>
             <button className="bg-[#ef4444]/10 text-[#ef4444] hover:bg-[#ef4444] hover:text-white transition-all px-4 py-2 rounded-xl text-xs font-bold">
                View Suggestions
             </button>
          </div>

          <div className="space-y-8">
             <div>
                <div className="flex justify-between text-sm mb-2 font-medium">
                    <span className="text-compass-muted">Credit Cards</span>
                    <span className="text-white">$5,000</span>
                </div>
                <div className="h-3 bg-compass-bg rounded-full overflow-hidden">
                    <div className="h-full bg-[#ef4444] w-[10%] rounded-full shadow-[0_0_15px_rgba(239,68,68,0.5)]"></div>
                </div>
             </div>
             <div>
                <div className="flex justify-between text-sm mb-2 font-medium">
                    <span className="text-compass-muted">Student Loans</span>
                    <span className="text-white">$45,000</span>
                </div>
                <div className="h-3 bg-compass-bg rounded-full overflow-hidden">
                    <div className="h-full bg-[#ef4444] w-[90%] rounded-full shadow-[0_0_15px_rgba(239,68,68,0.5)]"></div>
                </div>
             </div>
          </div>
      </div>

      {/* NEW FEATURE: My Wallet / Cards - Mobile: Full, Desktop: 6 cols */}
      <div className="bg-compass-card rounded-3xl p-6 md:col-span-6 lg:col-span-6 border border-compass-secondary/30 flex flex-col shadow-xl">
          <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Icons.CreditCard /> My Wallet
              </h3>
              <button 
                onClick={() => navigateToPayments('wallet')}
                className="text-xs text-compass-primary font-bold hover:text-white transition-colors"
              >
                  Manage Cards
              </button>
          </div>
          
          <div 
             onClick={() => navigateToPayments('wallet')}
             className="flex flex-col sm:flex-row gap-6 cursor-pointer"
          >
              {/* Card Visual - Sapphire Reserve Style */}
              <div className="w-full sm:w-1/2 aspect-[1.586/1] bg-gradient-to-br from-[#0c1e4c] via-[#003087] to-[#001b4d] rounded-2xl p-5 flex flex-col justify-between shadow-2xl relative overflow-hidden group hover:scale-[1.02] transition-transform border border-white/10">
                  {/* Metallic sheen effect */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
                  
                  <div className="flex justify-between items-start z-10">
                      <span className="text-[10px] font-bold text-white/90 tracking-widest uppercase font-sans">Chase</span>
                      <Icons.Zap />
                  </div>
                  <div className="z-10">
                      <div className="flex gap-2 mb-2">
                          <div className="w-8 h-5 bg-yellow-500/80 rounded"></div>
                      </div>
                      <div className="text-white font-mono text-sm tracking-widest mb-1 shadow-black drop-shadow-md">•••• 3456</div>
                      <div className="flex justify-between items-end">
                        <div className="text-[9px] text-white/70 uppercase tracking-wider font-semibold">Sapphire Preferred</div>
                        <div className="text-[10px] text-white/90 font-bold">VISA</div>
                      </div>
                  </div>
              </div>

              {/* Points Stats */}
              <div className="w-full sm:w-1/2 flex flex-col justify-center space-y-5">
                  <div>
                      <div className="text-xs text-compass-muted mb-1 font-medium uppercase tracking-wide">Ultimate Rewards®</div>
                      <div className="text-3xl font-bold text-white">54,320</div>
                      <div className="text-xs text-emerald-400 font-bold mt-1 inline-block bg-emerald-400/10 px-2 py-0.5 rounded-full">+$210.00 value</div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-[10px] text-compass-muted font-medium">
                        <span>Progress to bonus</span>
                        <span>$2,800 / $4,000</span>
                    </div>
                    <div className="w-full bg-compass-bg h-2 rounded-full overflow-hidden border border-compass-secondary/50">
                        <div className="bg-gradient-to-r from-compass-primary to-cyan-400 h-full w-[70%] rounded-full shadow-[0_0_10px_rgba(56,189,248,0.5)]"></div>
                    </div>
                  </div>
              </div>
          </div>
      </div>

      {/* NEW FEATURE: Quick Pay / Pay Friends - Mobile: Full, Desktop: 6 cols */}
      <div className="bg-compass-card rounded-3xl p-6 md:col-span-6 lg:col-span-6 border border-compass-secondary/30 flex flex-col shadow-xl">
           <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Icons.Users /> Quick Pay with Zelle®
              </h3>
              <button 
                onClick={() => navigateToPayments('transfer')}
                className="bg-compass-secondary/50 p-2 rounded-xl text-compass-muted hover:text-white transition-colors hover:bg-compass-primary"
              >
                  <Icons.MoreVertical />
              </button>
          </div>

          <div className="flex flex-col justify-between flex-1 gap-6">
               {/* Contact Avatars */}
               <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2 mask-linear-fade">
                    <div 
                        onClick={() => navigateToPayments('transfer')}
                        className="flex flex-col items-center gap-2 cursor-pointer group min-w-[60px]"
                    >
                        <div className="w-14 h-14 rounded-full bg-compass-bg border-2 border-dashed border-compass-muted/50 flex items-center justify-center text-compass-muted group-hover:text-white group-hover:border-compass-primary transition-all">
                            <Icons.Plus />
                        </div>
                        <span className="text-xs text-compass-muted font-medium">Add New</span>
                    </div>
                    
                    {['Alex', 'Sarah', 'Mike', 'Jen', 'David'].map((name, i) => (
                        <div 
                            key={name} 
                            onClick={() => navigateToPayments('transfer')}
                            className="flex flex-col items-center gap-2 cursor-pointer group min-w-[60px]"
                        >
                             <div className={`w-14 h-14 rounded-full flex items-center justify-center text-sm font-bold shadow-lg border-2 border-transparent group-hover:border-compass-primary group-hover:scale-105 transition-all ${
                                 i === 0 ? 'bg-gradient-to-br from-purple-600 to-indigo-700 text-white' : 
                                 i === 1 ? 'bg-gradient-to-br from-pink-500 to-rose-600 text-white' :
                                 i === 2 ? 'bg-gradient-to-br from-teal-500 to-emerald-600 text-white' :
                                 'bg-gradient-to-br from-blue-600 to-cyan-600 text-white'
                             }`}>
                                 {name[0]}
                             </div>
                             <span className="text-xs text-compass-muted group-hover:text-white font-medium">{name}</span>
                        </div>
                    ))}
               </div>

                <div className="flex gap-3">
                    <button 
                        onClick={() => navigateToPayments('transfer')}
                        className="flex-1 bg-compass-secondary hover:bg-compass-secondary/80 text-compass-primary hover:text-white py-3 rounded-xl text-sm font-bold transition-all border border-compass-primary/20 hover:border-compass-primary/50"
                    >
                        Request
                    </button>
                    <button 
                        onClick={() => navigateToPayments('transfer')}
                        className="flex-1 bg-compass-primary hover:bg-compass-primaryDark text-white py-3 rounded-xl text-sm font-bold transition-all shadow-[0_4px_14px_0_rgba(0,96,240,0.39)] hover:shadow-[0_6px_20px_rgba(0,96,240,0.23)] hover:-translate-y-0.5 transform"
                    >
                        Send Money
                    </button>
                </div>
          </div>
      </div>

       {/* NEW FEATURE: Recent Transactions (Span 8) */}
       <div className="bg-compass-card rounded-3xl p-6 md:col-span-8 border border-compass-secondary/30 shadow-xl">
          <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Icons.Activity /> Recent Transactions
              </h3>
              <button 
                onClick={() => navigateToPayments('wallet')}
                className="text-sm text-compass-primary hover:text-white font-medium transition-colors"
              >
                  See All
              </button>
          </div>

          <div className="space-y-4">
              {recentTransactions.map((tx) => (
                  <div key={tx.id} className="flex items-center justify-between group cursor-pointer">
                      <div className="flex items-center gap-4">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-lg transition-transform group-hover:scale-110 ${tx.isPositive ? 'bg-emerald-500/20 text-emerald-500' : 'bg-compass-secondary text-compass-muted'}`}>
                              {tx.icon}
                          </div>
                          <div>
                              <div className="text-sm font-bold text-white group-hover:text-compass-primary transition-colors">{tx.merchant}</div>
                              <div className="text-xs text-compass-muted">{tx.category} • {tx.date}</div>
                          </div>
                      </div>
                      <div className={`font-bold ${tx.isPositive ? 'text-emerald-400' : 'text-white'}`}>
                          {tx.isPositive ? '+' : ''}{tx.amount.toFixed(2)}
                      </div>
                  </div>
              ))}
          </div>
       </div>

       {/* NEW FEATURE: Recurring Expenses / Bills (Span 4) */}
       <div className="bg-compass-card rounded-3xl p-6 md:col-span-4 border border-compass-secondary/30 shadow-xl flex flex-col">
          <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Icons.Repeat /> Upcoming
              </h3>
              <button 
                onClick={() => navigateToPayments('bills')}
                className="text-xs text-compass-muted hover:text-white"
              >
                  Calendar
              </button>
          </div>
          
          <div className="flex flex-col gap-3 flex-1">
              {[
                { name: 'Spotify Premium', amount: 15.99, date: 'Tomorrow', icon: <Icons.ShoppingBag /> },
                { name: 'Equinox Gym', amount: 180.00, date: 'Oct 05', icon: <Icons.Activity /> }, 
                { name: 'Netflix', amount: 22.50, date: 'Oct 12', icon: <Icons.Smartphone /> },
              ].map((bill, i) => (
                  <div 
                    key={i} 
                    onClick={() => navigateToPayments('bills')}
                    className="bg-compass-bg/50 rounded-xl p-3 flex items-center justify-between group hover:bg-compass-secondary transition-all cursor-pointer border border-transparent hover:border-compass-primary/20"
                  >
                       <div className="flex items-center gap-3">
                           <div className="w-8 h-8 rounded-lg bg-compass-secondary group-hover:bg-compass-card flex items-center justify-center text-compass-muted group-hover:text-white transition-colors text-xs">
                               {bill.icon}
                           </div>
                           <div>
                               <div className="font-semibold text-white text-xs">{bill.name}</div>
                               <div className="text-[10px] text-compass-muted">Due {bill.date}</div>
                           </div>
                       </div>
                       <div className="font-bold text-white text-sm">
                           ${bill.amount}
                       </div>
                  </div>
              ))}
              <button 
                onClick={() => navigateToPayments('bills')}
                className="mt-auto pt-4 w-full text-xs text-compass-muted hover:text-compass-primary font-medium text-center"
              >
                  View all 12 subscriptions
              </button>
          </div>
       </div>

    </div>
  );
};

export default Dashboard;