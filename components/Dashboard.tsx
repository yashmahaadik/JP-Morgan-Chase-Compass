import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, AreaChart, Area, Tooltip, XAxis, YAxis, CartesianGrid } from 'recharts';
import { MOCK_ACCOUNTS, Icons } from '../constants';
import { ViewState } from '../types';

interface DashboardProps {
  setViewState: (view: ViewState) => void;
  setActivePaymentTab: (tab: string) => void;
  region?: 'US' | 'IN';
}

const Dashboard: React.FC<DashboardProps> = ({ setViewState, setActivePaymentTab, region = 'US' }) => {
  const currencySymbol = region === 'IN' ? '₹' : '$';

  // Mock Data for Charts
  const pieData = [
    { name: 'Assets', value: 75, color: '#0060F0' }, // Chase Blue
    { name: 'Liabilities', value: 25, color: '#ef4444' }, // Red
  ];

  const usdAreaData = [
    { name: 'Jan', value: 100000 },
    { name: 'Feb', value: 110000 },
    { name: 'Mar', value: 105000 },
    { name: 'Apr', value: 125000 },
    { name: 'May', value: 115000 },
    { name: 'Jun', value: 140000 },
    { name: 'Jul', value: 150000 },
  ];

  const inrAreaData = [
    { name: 'Jan', value: 8300000 },
    { name: 'Feb', value: 9130000 },
    { name: 'Mar', value: 8715000 },
    { name: 'Apr', value: 10375000 },
    { name: 'May', value: 9545000 },
    { name: 'Jun', value: 11620000 },
    { name: 'Jul', value: 12450000 },
  ];

  const areaData = region === 'IN' ? inrAreaData : usdAreaData;

  const usdRecentTransactions = [
    { id: 1, merchant: 'Whole Foods Market', date: 'Today', amount: -64.20, category: 'Groceries', icon: <Icons.ShoppingBag /> },
    { id: 2, merchant: 'Uber', date: 'Yesterday', amount: -24.50, category: 'Transport', icon: <Icons.Smartphone /> },
    { id: 3, merchant: 'JPMC Salary', date: 'Oct 01', amount: 4250.00, category: 'Income', icon: <Icons.Zap />, isPositive: true },
  ];

  const inrRecentTransactions = [
    { id: 1, merchant: 'Zomato Food Delivery', date: 'Today', amount: -532.00, category: 'Groceries', icon: <Icons.ShoppingBag /> },
    { id: 2, merchant: 'Ola Cabs', date: 'Yesterday', amount: -240.00, category: 'Transport', icon: <Icons.Smartphone /> },
    { id: 3, merchant: 'JPMC India Salary', date: 'Oct 01', amount: 352750.00, category: 'Income', icon: <Icons.Zap />, isPositive: true },
  ];

  const recentTransactions = region === 'IN' ? inrRecentTransactions : usdRecentTransactions;

  const totalAssets = region === 'IN' ? 16600000 : 200000;
  const totalLiabilities = region === 'IN' ? 4150000 : 50000;
  const netWorth = totalAssets - totalLiabilities;
  const healthScore = 85;

  const transformedAccounts = MOCK_ACCOUNTS.map((account) => {
    if (account.name.includes('Chase - Total Checking')) {
      return {
        ...account,
        name: 'HDFC Savings Max',
        balance: Math.round(account.balance * 83),
        accountNumber: '4455'
      };
    } else if (account.name.includes('J.P. Morgan')) {
      return {
        ...account,
        name: 'ICICI Direct Demat',
        balance: Math.round(account.balance * 83),
        accountNumber: '9988'
      };
    } else if (account.name.includes('Bank of America')) {
      return {
        ...account,
        name: 'SBI FD Saver',
        balance: 1500000,
        accountNumber: '3322'
      };
    }
    return { ...account, balance: Math.round(account.balance * 83) };
  });

  const accounts = region === 'IN' ? transformedAccounts : MOCK_ACCOUNTS;

  const navigateToPayments = (tab: string) => {
      setActivePaymentTab(tab);
      setViewState(ViewState.PAYMENTS);
  }

  return (
    <div className="p-4 md:p-8 space-y-6 md:space-y-6 md:grid md:grid-cols-12 md:gap-6 animate-fade-in pb-32 block">
      
      {/* Sticky Header - Optimized for Mobile (Horizontal Layout) */}
      <div className="sticky top-[60px] md:top-0 z-20 bg-compass-bg/95 backdrop-blur-md -mx-4 px-4 pt-2 pb-2 md:pb-4 md:mx-0 md:px-0 md:bg-transparent md:backdrop-blur-none col-span-12 flex flex-row justify-between items-center md:items-center transition-all shadow-sm md:shadow-none">
        <div>
           <div className="text-compass-muted text-[10px] md:text-sm uppercase tracking-wider font-semibold">Total Net Worth</div>
           <div className="text-2xl md:text-5xl font-bold text-compass-text mt-0.5 tracking-tight">{currencySymbol}{netWorth.toLocaleString()}</div>
        </div>
        
        {/* Financial Health Score - Compact on Mobile */}
        <div className="flex items-center gap-2 md:gap-4 bg-compass-card px-3 py-2 md:px-5 md:py-3 rounded-xl md:rounded-2xl shadow-lg cursor-pointer group hover:shadow-xl transition-shadow">
             <div className="relative w-10 h-10 md:w-14 md:h-14 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90">
                    <circle cx="50%" cy="50%" r="45%" stroke="var(--color-secondary)" strokeWidth="10%" fill="transparent" />
                    <circle cx="50%" cy="50%" r="45%" stroke="#10b981" strokeWidth="10%" fill="transparent" strokeDasharray="283" strokeDashoffset={283 - (283 * healthScore) / 100} strokeLinecap="round" />
                </svg>
                <div className="absolute font-bold text-xs md:text-sm text-compass-text">{healthScore}</div>
             </div>
             <div>
                <div className="text-compass-text font-bold text-xs md:text-base group-hover:text-emerald-400 transition-colors">Health</div>
                <div className="text-compass-muted text-[10px] md:text-xs hidden md:block">Top 10%</div>
             </div>
        </div>
      </div>

      {/* Donut Chart Card */}
      <div className="bg-compass-card rounded-3xl p-6 shadow-xl relative overflow-hidden md:col-span-4 lg:col-span-4 flex flex-col justify-between min-h-[300px]">
        <h3 className="text-lg font-bold text-compass-text mb-4">Asset Allocation</h3>
        <div className="flex-1 relative z-10 min-h-[180px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
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
            <span className="text-3xl md:text-4xl font-bold text-compass-text tracking-tighter">75%</span>
            <span className="text-[10px] text-compass-muted uppercase tracking-wider font-medium">Assets</span>
          </div>
        </div>
        
        {/* Legend */}
        <div className="flex justify-center gap-6 md:gap-8 mt-4">
            <div className="flex items-center gap-2 md:gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-[#0060F0] shadow-[0_0_10px_#0060F0]"></div>
                <div className="flex flex-col">
                    <span className="text-compass-muted text-[10px] font-medium">Assets</span>
                    <span className="text-compass-text font-bold text-xs md:text-sm">{currencySymbol}{totalAssets.toLocaleString()}</span>
                </div>
            </div>
            <div className="flex items-center gap-2 md:gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-[#ef4444] shadow-[0_0_10px_#ef4444]"></div>
                <div className="flex flex-col">
                    <span className="text-compass-muted text-[10px] font-medium">Liabilities</span>
                    <span className="text-compass-text font-bold text-xs md:text-sm">{currencySymbol}{totalLiabilities.toLocaleString()}</span>
                </div>
            </div>
        </div>
      </div>

      {/* Investment Performance */}
      <div className="bg-compass-card rounded-3xl p-6 md:col-span-8 lg:col-span-8 flex flex-col shadow-xl min-h-[300px]">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-compass-text">Performance</h3>
            <div className="flex gap-1 bg-compass-bg p-1 rounded-xl">
                {['1M', '6M', '1Y', 'All'].map((period, i) => (
                    <button key={period} className={`px-3 py-1.5 text-[10px] md:text-xs font-medium rounded-lg transition-all ${i === 0 ? 'bg-compass-primary text-white shadow-md' : 'text-compass-muted hover:text-compass-text hover:bg-compass-secondary'}`}>
                        {period}
                    </button>
                ))}
            </div>
          </div>

          <div className="flex-1 w-full">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={areaData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                    <defs>
                        <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#0060F0" stopOpacity={0.4}/>
                        <stop offset="95%" stopColor="#0060F0" stopOpacity={0}/>
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-secondary)" opacity={0.5} />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10}} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10}} />
                    <Tooltip 
                        contentStyle={{ backgroundColor: 'var(--color-card)', borderColor: 'var(--color-secondary)', color: 'var(--color-text)', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.5)' }}
                        itemStyle={{ color: 'var(--color-text)', fontWeight: 'bold' }}
                        cursor={{ stroke: '#0060F0', strokeWidth: 1, strokeDasharray: '4 4' }}
                    />
                    <Area type="monotone" dataKey="value" stroke="#0060F0" strokeWidth={3} fillOpacity={1} fill="url(#colorVal)" />
                </AreaChart>
            </ResponsiveContainer>
          </div>
      </div>

      {/* Linked Accounts */}
      <div className="md:col-span-6 lg:col-span-6 flex flex-col gap-5">
        <div className="flex justify-between items-center px-1">
            <h2 className="text-lg font-bold text-compass-text">Linked Accounts</h2>
            <button onClick={() => setViewState(ViewState.LINKED_ACCOUNTS)} className="text-sm text-compass-primary hover:text-compass-primaryDark font-medium flex items-center gap-1 transition-colors">
                View All <Icons.ArrowRight />
            </button>
        </div>

        <div className="space-y-3">
            {accounts.slice(0, 3).map((account) => (
                <div key={account.id} className="bg-compass-card p-4 rounded-2xl flex justify-between items-center hover:bg-compass-secondary/80 transition-all cursor-pointer group shadow-md active:scale-95 duration-200">
                    <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center shadow-lg transition-transform group-hover:scale-110 ${account.balance < 0 ? 'bg-white text-black' : 'bg-gradient-to-br from-gray-700 to-gray-900 text-white'}`}>
                            <span className="font-bold text-[10px] md:text-xs">{account.name.substring(0,2).toUpperCase()}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="font-semibold text-compass-text group-hover:text-compass-primary transition-colors truncate text-sm md:text-base">{account.name}</div>
                            <div className="text-[10px] md:text-xs text-compass-muted font-medium truncate">{account.type} •••• {account.accountNumber}</div>
                        </div>
                    </div>
                    <div className={`font-bold text-sm md:text-base whitespace-nowrap ml-2 ${account.balance < 0 ? 'text-[#ef4444]' : 'text-compass-text'}`}>
                        {account.balance < 0 ? `(${currencySymbol}${Math.abs(account.balance).toLocaleString()})` : `${currencySymbol}${account.balance.toLocaleString()}`}
                    </div>
                </div>
            ))}
        </div>
        
        <button 
          onClick={() => setViewState(ViewState.CREATE_GOAL)}
          className="hidden md:flex w-full bg-compass-bg hover:bg-compass-secondary text-compass-muted hover:text-compass-text font-semibold py-4 rounded-2xl items-center justify-center gap-2 transition-all shadow-sm"
        >
            <Icons.Plus />
            Link Another Account
        </button>
      </div>

      {/* Debt Summary */}
      <div className="bg-compass-card rounded-3xl p-6 md:col-span-6 lg:col-span-6 flex flex-col justify-center shadow-xl">
          <div className="flex justify-between items-start mb-6 md:mb-8">
             <div>
                <h3 className="text-lg font-bold text-compass-text">Debt Summary</h3>
                <div className="text-3xl md:text-4xl font-bold text-[#ef4444] mt-2 tracking-tight">
                    {region === 'IN' ? '₹41,50,000' : '$50,000'}
                </div>
             </div>
             <button className="bg-[#ef4444]/10 text-[#ef4444] hover:bg-[#ef4444] hover:text-white transition-all px-3 py-1.5 rounded-xl text-xs font-bold">
                Details
             </button>
          </div>

          <div className="space-y-6 md:space-y-8">
             <div>
                <div className="flex justify-between text-sm mb-2 font-medium">
                    <span className="text-compass-muted">Credit Cards</span>
                    <span className="text-compass-text">{region === 'IN' ? '₹4,15,000' : '$5,000'}</span>
                </div>
                <div className="h-2 md:h-3 bg-compass-bg rounded-full overflow-hidden">
                    <div className="h-full bg-[#ef4444] w-[10%] rounded-full shadow-[0_0_15px_rgba(239,68,68,0.5)]"></div>
                </div>
             </div>
             <div>
                <div className="flex justify-between text-sm mb-2 font-medium">
                    <span className="text-compass-muted">Student Loans</span>
                    <span className="text-compass-text">{region === 'IN' ? '₹37,35,000' : '$45,000'}</span>
                </div>
                <div className="h-2 md:h-3 bg-compass-bg rounded-full overflow-hidden">
                    <div className="h-full bg-[#ef4444] w-[90%] rounded-full shadow-[0_0_15px_rgba(239,68,68,0.5)]"></div>
                </div>
             </div>
          </div>
      </div>

      {/* My Wallet / Cards */}
      <div className="bg-compass-card rounded-3xl p-6 md:col-span-6 lg:col-span-6 flex flex-col shadow-xl">
          <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-compass-text flex items-center gap-2">
                  <Icons.CreditCard /> My Wallet
              </h3>
              <button 
                onClick={() => navigateToPayments('wallet')}
                className="text-xs text-compass-primary font-bold hover:text-compass-text transition-colors"
              >
                  Manage
              </button>
          </div>
          
          <div 
             onClick={() => navigateToPayments('wallet')}
             className="flex flex-col sm:flex-row gap-6 cursor-pointer"
          >
              {/* Card Visual */}
              <div className="w-full sm:w-1/2 aspect-[1.586/1] bg-gradient-to-br from-[#0c1e4c] via-[#003087] to-[#001b4d] rounded-2xl p-5 flex flex-col justify-between shadow-2xl relative overflow-hidden group hover:scale-[1.02] transition-transform">
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
                  
                  <div className="flex justify-between items-start z-10">
                      <span className="text-[10px] font-bold text-white/90 tracking-widest uppercase font-sans">
                          {region === 'IN' ? 'HDFC Bank' : 'Chase'}
                      </span>
                      <Icons.Zap />
                  </div>
                  <div className="z-10">
                      <div className="flex gap-2 mb-2">
                          <div className="w-8 h-5 bg-yellow-500/80 rounded"></div>
                      </div>
                      <div className="text-white font-mono text-sm tracking-widest mb-1 shadow-black drop-shadow-md">•••• 3456</div>
                      <div className="flex justify-between items-end">
                        <div className="text-[9px] text-white/70 uppercase tracking-wider font-semibold">
                            {region === 'IN' ? 'Regalia' : 'Sapphire'}
                        </div>
                        <div className="text-[10px] text-white/90 font-bold">VISA</div>
                      </div>
                  </div>
              </div>

              {/* Points Stats */}
              <div className="w-full sm:w-1/2 flex flex-row sm:flex-col justify-between sm:justify-center items-center sm:items-stretch gap-4 sm:gap-5">
                  <div className="flex-1">
                      <div className="text-[10px] text-compass-muted mb-0.5 font-medium uppercase tracking-wide">Rewards</div>
                      <div className="text-2xl md:text-3xl font-bold text-compass-text">54,320</div>
                      <div className="text-[10px] text-emerald-400 font-bold mt-1 inline-block bg-emerald-400/10 px-2 py-0.5 rounded-full">
                          +{region === 'IN' ? '₹17,430' : '$210'} value
                      </div>
                  </div>
                  <div className="space-y-2 flex-1 min-w-[100px]">
                    <div className="flex justify-between text-[10px] text-compass-muted font-medium">
                        <span>Bonus</span>
                        <span>70%</span>
                    </div>
                    <div className="w-full bg-compass-bg h-2 rounded-full overflow-hidden">
                        <div className="bg-gradient-to-r from-compass-primary to-cyan-400 h-full w-[70%] rounded-full shadow-[0_0_10px_rgba(56,189,248,0.5)]"></div>
                    </div>
                  </div>
              </div>
          </div>
      </div>

      {/* Quick Pay */}
      <div className="bg-compass-card rounded-3xl p-6 md:col-span-6 lg:col-span-6 flex flex-col shadow-xl">
           <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-compass-text flex items-center gap-2">
                  <Icons.Users /> Quick Pay
              </h3>
              <button 
                onClick={() => navigateToPayments('transfer')}
                className="bg-compass-secondary/50 p-2 rounded-xl text-compass-muted hover:text-compass-text transition-colors hover:bg-compass-primary"
              >
                  <Icons.MoreVertical />
              </button>
          </div>

          <div className="flex flex-col justify-between flex-1 gap-6">
               {/* Contact Avatars */}
               <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2 mask-linear-fade">
                    <div 
                        onClick={() => navigateToPayments('transfer')}
                        className="flex flex-col items-center gap-2 cursor-pointer group min-w-[56px]"
                    >
                        <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-compass-bg flex items-center justify-center text-compass-muted group-hover:text-compass-text transition-all shadow-md active:scale-95">
                            <Icons.Plus />
                        </div>
                        <span className="text-[10px] text-compass-muted font-medium">New</span>
                    </div>
                    
                    {['Alex', 'Sarah', 'Mike', 'Jen', 'David'].map((name, i) => (
                        <div 
                            key={name} 
                            onClick={() => navigateToPayments('transfer')}
                            className="flex flex-col items-center gap-2 cursor-pointer group min-w-[56px]"
                        >
                             <div className={`w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center text-sm font-bold shadow-lg transition-all transform group-hover:scale-105 active:scale-95 ${
                                 i === 0 ? 'bg-gradient-to-br from-purple-600 to-indigo-700 text-white' : 
                                 i === 1 ? 'bg-gradient-to-br from-pink-500 to-rose-600 text-white' :
                                 i === 2 ? 'bg-gradient-to-br from-teal-500 to-emerald-600 text-white' :
                                 'bg-gradient-to-br from-blue-600 to-cyan-600 text-white'
                             }`}>
                                 {name[0]}
                             </div>
                             <span className="text-[10px] text-compass-muted group-hover:text-compass-text font-medium">{name}</span>
                        </div>
                    ))}
               </div>

                <div className="flex gap-3">
                    <button 
                        onClick={() => navigateToPayments('transfer')}
                        className="flex-1 bg-compass-secondary hover:bg-compass-secondary/80 text-compass-primary hover:text-compass-text py-3 rounded-xl text-sm font-bold transition-all active:scale-[0.98]"
                    >
                        Request
                    </button>
                    <button 
                        onClick={() => navigateToPayments('transfer')}
                        className="flex-1 bg-compass-primary hover:bg-compass-primaryDark text-white py-3 rounded-xl text-sm font-bold transition-all shadow-[0_4px_14px_0_rgba(0,96,240,0.39)] hover:shadow-[0_6px_20px_rgba(0,96,240,0.23)] hover:-translate-y-0.5 active:translate-y-0 transform"
                    >
                        Send Money
                    </button>
                </div>
          </div>
      </div>

       {/* Recent Transactions */}
       <div className="bg-compass-card rounded-3xl p-6 md:col-span-8 shadow-xl">
          <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-compass-text flex items-center gap-2">
                  <Icons.Activity /> Recent
              </h3>
              <button 
                onClick={() => navigateToPayments('wallet')}
                className="text-xs text-compass-primary hover:text-compass-text font-medium transition-colors"
              >
                  See All
              </button>
          </div>

          <div className="space-y-4">
              {recentTransactions.map((tx) => (
                  <div key={tx.id} className="flex items-center justify-between group cursor-pointer active:scale-[0.99] transition-transform">
                      <div className="flex items-center gap-4">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-lg transition-transform group-hover:scale-110 ${tx.isPositive ? 'bg-emerald-500/20 text-emerald-500' : 'bg-compass-secondary text-compass-muted'}`}>
                              {tx.icon}
                          </div>
                          <div>
                              <div className="text-sm font-bold text-compass-text group-hover:text-compass-primary transition-colors">{tx.merchant}</div>
                              <div className="text-[10px] text-compass-muted">{tx.category} • {tx.date}</div>
                          </div>
                      </div>
                      <div className={`font-bold text-sm ${tx.isPositive ? 'text-emerald-400' : 'text-compass-text'}`}>
                          {tx.isPositive ? '+' : '-'}{currencySymbol}{Math.abs(tx.amount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </div>
                  </div>
              ))}
          </div>
       </div>

       {/* Upcoming */}
       <div className="bg-compass-card rounded-3xl p-6 md:col-span-4 shadow-xl flex flex-col">
          <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-compass-text flex items-center gap-2">
                  <Icons.Repeat /> Upcoming
              </h3>
              <button 
                onClick={() => navigateToPayments('bills')}
                className="text-xs text-compass-muted hover:text-compass-text"
              >
                  Calendar
              </button>
          </div>
          
          <div className="flex flex-col gap-3 flex-1">
              {[
                { name: 'Spotify Premium', amount: region === 'IN' ? 119 : 15.99, date: 'Tomorrow', icon: <Icons.ShoppingBag /> },
                { name: region === 'IN' ? "Gold's Gym" : 'Equinox Gym', amount: region === 'IN' ? 2499 : 180.00, date: 'Oct 05', icon: <Icons.Activity /> }, 
                { name: 'Netflix', amount: region === 'IN' ? 649 : 22.50, date: 'Oct 12', icon: <Icons.Smartphone /> },
              ].map((bill, i) => (
                  <div 
                    key={i} 
                    onClick={() => navigateToPayments('bills')}
                    className="bg-compass-bg/50 rounded-xl p-3 flex items-center justify-between group hover:bg-compass-secondary transition-all cursor-pointer active:scale-[0.98]"
                  >
                       <div className="flex items-center gap-3">
                           <div className="w-8 h-8 rounded-lg bg-compass-secondary group-hover:bg-compass-card flex items-center justify-center text-compass-muted group-hover:text-compass-text transition-colors text-xs">
                               {bill.icon}
                           </div>
                           <div>
                               <div className="font-semibold text-compass-text text-xs">{bill.name}</div>
                               <div className="text-[10px] text-compass-muted">Due {bill.date}</div>
                           </div>
                       </div>
                       <div className="font-bold text-compass-text text-sm">
                           {currencySymbol}{bill.amount}
                       </div>
                  </div>
              ))}
              <button 
                onClick={() => navigateToPayments('bills')}
                className="mt-auto pt-4 w-full text-xs text-compass-muted hover:text-compass-primary font-medium text-center"
              >
                  View all 12
              </button>
          </div>
       </div>

    </div>
  );
};

export default Dashboard;