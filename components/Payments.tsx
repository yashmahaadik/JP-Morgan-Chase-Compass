import React, { useState } from 'react';
import { Icons } from '../constants';
import { ViewState } from '../types';

interface PaymentsProps {
  setViewState: (view: ViewState) => void;
  initialTab?: string;
}

const Payments: React.FC<PaymentsProps> = ({ setViewState, initialTab = 'transfer' }) => {
  const activeTab = initialTab;
  const [currentTab, setCurrentTab] = useState(initialTab);
  const [selectedContact, setSelectedContact] = useState<number | null>(null);

  // Sync internal state if prop changes, though normally controlled by parent or simple state
  // simplified for this prototype to use internal state initialized by prop
  const handleTabChange = (tab: string) => {
      setCurrentTab(tab);
  };
  
  // Use currentTab for rendering logic
  const renderTab = currentTab;

  const contacts = ['Alex', 'Sarah', 'Mike', 'Jen', 'David', 'Mom', 'Landlord'];
  
  const transactions = [
    { id: 1, name: 'Alex Smith', date: 'Today, 2:30 PM', amount: -25.00, type: 'sent' },
    { id: 2, name: 'Sarah Jones', date: 'Yesterday', amount: 15.50, type: 'received' },
    { id: 3, name: 'Uber Eats', date: 'Oct 02', amount: -42.80, type: 'payment' },
  ];

  const subscriptions = [
    { name: 'Spotify Premium', amount: 15.99, date: 'Tomorrow', icon: <Icons.ShoppingBag /> },
    { name: 'Equinox Gym', amount: 180.00, date: 'Oct 05', icon: <Icons.Activity /> },
    { name: 'Netflix', amount: 22.50, date: 'Oct 12', icon: <Icons.Smartphone /> },
    { name: 'iCloud Storage', amount: 2.99, date: 'Oct 15', icon: <Icons.Zap /> },
    { name: 'Hulu', amount: 14.99, date: 'Oct 18', icon: <Icons.ShoppingBag /> },
  ];

  return (
    <div className="p-4 md:p-8 pt-6 h-full bg-compass-bg pb-32 animate-fade-in">
        {/* Sticky Header Container */}
        <div className="sticky top-[60px] md:top-0 z-20 bg-compass-bg/95 backdrop-blur-md -mx-4 px-4 pt-2 md:pt-0 md:mx-0 md:px-0">
            <div className="flex items-center mb-4">
                <button onClick={() => setViewState(ViewState.DASHBOARD)} className="mr-4 text-compass-text md:hidden">
                    <Icons.ArrowLeft />
                </button>
                <h1 className="text-xl md:text-3xl font-bold text-compass-text">Payments & Transfers</h1>
            </div>

            {/* Custom Tabs */}
            <div className="flex p-1 bg-compass-secondary/50 rounded-xl mb-8 overflow-x-auto no-scrollbar">
                {[
                    { id: 'transfer', label: 'Transfer', icon: Icons.Transfer },
                    { id: 'bills', label: 'Bills', icon: Icons.Repeat },
                    { id: 'rewards', label: 'Rewards', icon: Icons.Gift },
                    { id: 'wallet', label: 'Cards', icon: Icons.CreditCard },
                ].map((tab) => {
                    const Icon = tab.icon;
                    const isActive = renderTab === tab.id;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => handleTabChange(tab.id)}
                            className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-sm font-medium transition-all whitespace-nowrap min-w-[100px] ${
                                isActive 
                                ? 'bg-compass-primary text-white shadow-lg' 
                                : 'text-compass-muted hover:text-compass-text'
                            }`}
                        >
                            <Icon />
                            <span className="hidden sm:inline">{tab.label}</span>
                            <span className="sm:hidden">{tab.label}</span>
                        </button>
                    );
                })}
            </div>
        </div>

        {/* QUICK MOVE / TRANSFER TAB */}
        {renderTab === 'transfer' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                     
                     {/* TAP TO PAY (Replacing Scan & Pay) */}
                     <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-6 shadow-xl relative overflow-hidden group cursor-pointer border border-white/10 hover:scale-[1.01] transition-transform">
                         <div className="absolute right-0 top-0 h-full w-1/2 bg-white/5 skew-x-12 transform translate-x-12"></div>
                         <div className="relative z-10 flex flex-col items-center py-4">
                              <div className="bg-white p-3 rounded-2xl mb-3 shadow-lg">
                                  {/* Using Wifi icon rotated 90deg to simulate NFC/Contactless */}
                                  <div className="text-black transform rotate-90"><Icons.Wifi /></div>
                              </div>
                              <h2 className="text-xl font-bold text-white">Tap to Pay</h2>
                              <p className="text-blue-200 text-sm">Pay securely with your phone in stores</p>
                         </div>
                     </div>

                     {/* QUICK ACTIONS GRID */}
                     <div className="grid grid-cols-4 gap-4">
                          {[
                              { label: 'Send with Zelle®', icon: <Icons.Phone />, color: 'text-blue-400' },
                              { label: 'Wire / ACH', icon: <Icons.Bank />, color: 'text-emerald-400' },
                              { label: 'Transfer to Self', icon: <Icons.Users />, color: 'text-purple-400' },
                              { label: 'Check Balance', icon: <Icons.ShieldCheck />, color: 'text-orange-400' },
                          ].map((action, i) => (
                              <div key={i} className="flex flex-col items-center gap-2 cursor-pointer group">
                                   <div className="w-14 h-14 rounded-full bg-compass-card border border-compass-secondary flex items-center justify-center text-xl group-hover:border-compass-primary group-hover:scale-110 transition-all shadow-lg">
                                       <span className={action.color}>{action.icon}</span>
                                   </div>
                                   <span className="text-[10px] text-center font-medium text-compass-muted group-hover:text-compass-text leading-tight max-w-[70px]">{action.label}</span>
                              </div>
                          ))}
                     </div>

                     {/* PEOPLE */}
                     <div>
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-sm font-bold text-compass-text uppercase tracking-wider">People</h3>
                            <button className="text-compass-primary text-xs font-bold">Search</button>
                        </div>
                        <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-y-6 gap-x-2">
                             <div className="flex flex-col items-center gap-2 cursor-pointer group">
                                <div className="w-14 h-14 rounded-full bg-compass-bg border-2 border-dashed border-compass-muted/50 flex items-center justify-center text-compass-muted hover:border-compass-primary hover:text-compass-text transition-all">
                                    <Icons.Plus />
                                </div>
                                <span className="text-xs text-compass-muted">New</span>
                            </div>
                            {contacts.map((name, i) => (
                                <div 
                                    key={name} 
                                    onClick={() => setSelectedContact(i)}
                                    className="flex flex-col items-center gap-2 cursor-pointer group"
                                >
                                    <div className={`w-14 h-14 rounded-full flex items-center justify-center text-lg font-bold shadow-lg transition-all border-2 border-transparent group-hover:border-compass-primary ${
                                         i % 4 === 0 ? 'bg-gradient-to-br from-purple-600 to-indigo-700 text-white' : 
                                         i % 4 === 1 ? 'bg-gradient-to-br from-pink-500 to-rose-600 text-white' :
                                         i % 4 === 2 ? 'bg-gradient-to-br from-teal-500 to-emerald-600 text-white' :
                                         'bg-gradient-to-br from-blue-600 to-cyan-600 text-white'
                                    }`}>
                                        {name[0]}
                                    </div>
                                    <span className="text-xs text-compass-muted group-hover:text-compass-text truncate w-14 text-center">{name}</span>
                                </div>
                            ))}
                        </div>
                     </div>
                </div>

                <div className="space-y-6">
                     {/* SPLIT BILL WIDGET */}
                     <div className="bg-compass-card rounded-3xl p-6 border border-compass-secondary/30 shadow-xl">
                          <div className="flex justify-between items-center mb-4">
                              <h3 className="text-lg font-bold text-compass-text flex items-center gap-2"><Icons.Split /> Split Expense</h3>
                              <span className="bg-compass-secondary text-xs px-2 py-1 rounded text-compass-muted">Beta</span>
                          </div>
                          <div className="bg-compass-bg/50 rounded-xl p-4 mb-4">
                              <div className="flex justify-between items-center mb-2">
                                  <span className="text-sm text-compass-text font-medium">Dinner at Nobu</span>
                                  <span className="text-sm text-compass-muted">Yesterday</span>
                              </div>
                              <div className="text-2xl font-bold text-compass-text mb-4">$342.80</div>
                              <div className="flex -space-x-2 mb-4">
                                  {['A','S','M','J'].map((initial, idx) => (
                                      <div key={idx} className="w-8 h-8 rounded-full bg-gray-700 border-2 border-compass-card flex items-center justify-center text-xs font-bold text-white">
                                          {initial}
                                      </div>
                                  ))}
                                  <div className="w-8 h-8 rounded-full bg-compass-primary border-2 border-compass-card flex items-center justify-center text-xs font-bold text-white">+2</div>
                              </div>
                              <button className="w-full bg-compass-secondary hover:bg-compass-primary hover:text-white text-compass-muted py-2 rounded-lg text-sm font-bold transition-all">
                                  Request $57.13 each
                              </button>
                          </div>
                     </div>

                    {/* RECENT ACTIVITY */}
                    <div className="bg-compass-card rounded-3xl p-6 border border-compass-secondary/30 shadow-xl h-fit">
                        <h3 className="text-lg font-bold text-compass-text mb-6">Recent Activity</h3>
                        <div className="space-y-4">
                            {transactions.map((tx) => (
                                <div key={tx.id} className="flex items-center justify-between p-3 hover:bg-compass-secondary/30 rounded-xl transition-colors cursor-pointer">
                                    <div className="flex items-center gap-4">
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${
                                            tx.type === 'sent' ? 'bg-compass-secondary text-white' : 
                                            tx.type === 'received' ? 'bg-emerald-500/20 text-emerald-500' : 'bg-blue-500/20 text-blue-500'
                                        }`}>
                                            {tx.type === 'sent' ? <Icons.ArrowRight /> : tx.type === 'received' ? <Icons.ArrowLeft /> : <Icons.ShoppingBag />}
                                        </div>
                                        <div>
                                            <div className="text-sm font-bold text-compass-text">{tx.name}</div>
                                            <div className="text-xs text-compass-muted">{tx.date}</div>
                                        </div>
                                    </div>
                                    <div className={`font-bold ${tx.amount > 0 ? 'text-emerald-400' : 'text-compass-text'}`}>
                                        {tx.amount > 0 ? '+' : ''}{tx.amount.toFixed(2)}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        )}

        {/* BILLS TAB */}
        {renderTab === 'bills' && (
             <div className="space-y-8 max-w-4xl mx-auto">
                 {/* PAY BILLS GRID */}
                 <div>
                     <h3 className="text-lg font-bold text-compass-text mb-4">Pay Bills</h3>
                     <div className="grid grid-cols-4 md:grid-cols-4 gap-4">
                         {[
                             { label: 'Phone Bill', icon: <Icons.Smartphone />, color: 'text-blue-400' },
                             { label: 'Cable / TV', icon: <Icons.Tv />, color: 'text-purple-400' },
                             { label: 'Electric', icon: <Icons.Zap />, color: 'text-yellow-400' },
                             { label: 'Tolls', icon: <Icons.Car />, color: 'text-indigo-400' },
                             { label: 'Utilities', icon: <Icons.Drop />, color: 'text-cyan-400' },
                             { label: 'Internet', icon: <Icons.Wifi />, color: 'text-emerald-400' },
                             { label: 'Insurance', icon: <Icons.ShieldCheck />, color: 'text-rose-400' },
                             { label: 'More', icon: <Icons.MoreVertical />, color: 'text-gray-400' },
                         ].map((item, i) => (
                              <div key={i} className="flex flex-col items-center gap-2 cursor-pointer group p-2 rounded-xl hover:bg-compass-secondary/30 transition-all">
                                   <div className={`w-12 h-12 rounded-2xl bg-compass-card border border-compass-secondary flex items-center justify-center text-xl group-hover:scale-110 transition-transform shadow-lg ${item.color}`}>
                                       {item.icon}
                                   </div>
                                   <span className="text-[10px] text-compass-muted group-hover:text-compass-text font-medium">{item.label}</span>
                              </div>
                         ))}
                     </div>
                 </div>

                 <div className="bg-compass-card rounded-3xl p-6 border border-compass-secondary/30 shadow-xl">
                      <h3 className="text-lg font-bold text-compass-text mb-6">Upcoming Subscriptions</h3>
                      <div className="space-y-2">
                           {subscriptions.map((bill, i) => (
                               <div key={i} className="bg-compass-bg/50 rounded-xl p-4 flex items-center justify-between group hover:bg-compass-secondary transition-all cursor-pointer border border-transparent hover:border-compass-primary/20">
                                   <div className="flex items-center gap-4">
                                       <div className="w-10 h-10 rounded-lg bg-compass-secondary group-hover:bg-compass-card flex items-center justify-center text-compass-muted group-hover:text-compass-text transition-colors">
                                           {bill.icon}
                                       </div>
                                       <div>
                                           <div className="font-bold text-compass-text">{bill.name}</div>
                                           <div className="text-xs text-compass-muted font-medium">Auto-pay on {bill.date}</div>
                                       </div>
                                   </div>
                                   <div className="text-right">
                                       <div className="font-bold text-compass-text text-lg">${bill.amount}</div>
                                       <button className="text-[10px] bg-compass-secondary hover:bg-white hover:text-black px-2 py-1 rounded transition-colors mt-1">Manage</button>
                                   </div>
                               </div>
                           ))}
                      </div>
                 </div>
             </div>
        )}

        {/* REWARDS TAB */}
        {renderTab === 'rewards' && (
            <div className="max-w-4xl mx-auto">
                <div className="bg-gradient-to-r from-yellow-600 to-amber-700 rounded-3xl p-8 mb-8 text-center relative overflow-hidden shadow-2xl border border-white/10">
                     <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                     <h2 className="text-sm font-bold text-yellow-100 uppercase tracking-widest mb-2 relative z-10">Total Rewards Earned</h2>
                     <div className="text-5xl font-bold text-white mb-2 drop-shadow-md relative z-10">$482</div>
                     <p className="text-yellow-200 text-sm relative z-10">You're a savings superstar! 🌟</p>
                </div>

                <h3 className="text-lg font-bold text-compass-text mb-4">Your Scratch Cards</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                     {/* Unscratched */}
                     {[1, 2].map((i) => (
                         <div key={`locked-${i}`} className="aspect-square bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex flex-col items-center justify-center p-4 relative overflow-hidden group cursor-pointer hover:scale-105 transition-transform shadow-lg border-2 border-indigo-400/50">
                             <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/20 to-transparent animate-pulse"></div>
                             <Icons.Gift />
                             <span className="text-white font-bold mt-2">Tap to Scratch</span>
                         </div>
                     ))}
                     
                     {/* Scratched/Revealed */}
                     {[
                         { amount: '$12', label: 'Cashback' },
                         { amount: '$5', label: 'Coffee Reward' },
                         { amount: '$25', label: 'Referral Bonus' },
                         { amount: '10%', label: 'Off Nike' }
                     ].map((reward, i) => (
                         <div key={i} className="aspect-square bg-compass-card rounded-2xl flex flex-col items-center justify-center p-4 border border-compass-secondary/50 relative overflow-hidden opacity-80 hover:opacity-100 transition-opacity">
                             <div className="text-3xl font-bold text-emerald-400 mb-1">{reward.amount}</div>
                             <div className="text-xs text-compass-muted font-medium text-center">{reward.label}</div>
                             <div className="absolute bottom-2 text-[10px] text-compass-muted/50">Won Oct {10-i}</div>
                         </div>
                     ))}
                </div>
            </div>
        )}

        {/* WALLET & CARDS TAB */}
        {renderTab === 'wallet' && (
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                 <div className="space-y-6">
                    <div className="bg-gradient-to-br from-[#0c1e4c] via-[#003087] to-[#001b4d] rounded-2xl p-8 aspect-[1.586/1] shadow-2xl relative overflow-hidden group border border-white/10">
                        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
                        
                        <div className="flex justify-between items-start z-10 relative">
                            <span className="text-xs font-bold text-white/90 tracking-[0.2em] uppercase">Chase</span>
                            <Icons.Zap />
                        </div>
                        <div className="mt-12 z-10 relative">
                            <div className="flex gap-3 mb-4">
                                <div className="w-12 h-8 bg-yellow-500/80 rounded flex items-center justify-center">
                                    <div className="w-8 h-5 border border-white/30 rounded-sm"></div>
                                </div>
                                <Icons.Transfer />
                            </div>
                            <div className="text-white font-mono text-xl md:text-2xl tracking-widest mb-2 shadow-black drop-shadow-md">
                                4000 1234 5678 9010
                            </div>
                            <div className="flex justify-between items-end mt-6">
                                <div>
                                    <div className="text-[10px] text-white/60 uppercase tracking-widest mb-1">Cardholder</div>
                                    <div className="text-sm text-white font-medium uppercase tracking-wider">Alex Johnson</div>
                                </div>
                                <div className="text-sm text-white/90 font-bold italic">VISA SIGNATURE</div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <button className="bg-compass-card hover:bg-compass-secondary border border-compass-secondary p-4 rounded-xl flex flex-col items-center gap-2 transition-all">
                            <div className="p-2 bg-compass-primary/20 rounded-full text-compass-primary"><Icons.ShieldCheck /></div>
                            <span className="text-sm font-bold text-compass-text">Lock Card</span>
                        </button>
                        <button className="bg-compass-card hover:bg-compass-secondary border border-compass-secondary p-4 rounded-xl flex flex-col items-center gap-2 transition-all">
                            <div className="p-2 bg-compass-primary/20 rounded-full text-compass-primary"><Icons.Repeat /></div>
                            <span className="text-sm font-bold text-compass-text">Replace</span>
                        </button>
                    </div>
                 </div>

                 <div className="bg-compass-card rounded-3xl p-6 border border-compass-secondary/30 shadow-xl">
                      <div className="flex justify-between items-center mb-6">
                          <h3 className="text-lg font-bold text-compass-text">Ultimate Rewards®</h3>
                          <span className="text-compass-primary text-sm font-bold cursor-pointer hover:underline">Redeem</span>
                      </div>
                      <div className="bg-compass-bg rounded-2xl p-6 mb-6 border border-compass-secondary/50">
                           <div className="text-sm text-compass-muted font-medium uppercase tracking-wide mb-1">Current Balance</div>
                           <div className="text-4xl font-bold text-compass-text mb-2">54,320 <span className="text-lg text-compass-muted">pts</span></div>
                           <div className="text-sm text-emerald-400 font-bold bg-emerald-400/10 inline-block px-3 py-1 rounded-full">
                               Approx. $543.20 cash back
                           </div>
                      </div>
                      
                      <div className="space-y-4">
                          <h4 className="text-sm font-bold text-compass-muted uppercase tracking-wider">Recent Points Activity</h4>
                          {[
                              { desc: 'Travel - 3x Points', pts: '+420 pts', date: 'Oct 02' },
                              { desc: 'Dining - 2x Points', pts: '+180 pts', date: 'Oct 01' },
                              { desc: 'Lyft - 5x Points', pts: '+125 pts', date: 'Sep 29' },
                          ].map((item, i) => (
                              <div key={i} className="flex justify-between items-center py-2 border-b border-compass-secondary/30 last:border-0">
                                  <div>
                                      <div className="text-sm font-medium text-compass-text">{item.desc}</div>
                                      <div className="text-xs text-compass-muted">{item.date}</div>
                                  </div>
                                  <div className="font-bold text-emerald-400 text-sm">{item.pts}</div>
                              </div>
                          ))}
                      </div>
                 </div>
             </div>
        )}

    </div>
  );
};

export default Payments;