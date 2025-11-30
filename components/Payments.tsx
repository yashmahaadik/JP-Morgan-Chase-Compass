import React, { useState } from 'react';
import { Icons } from '../constants';
import { ViewState } from '../types';

interface PaymentsProps {
  setViewState: (view: ViewState) => void;
  initialTab?: string;
}

const Payments: React.FC<PaymentsProps> = ({ setViewState, initialTab = 'transfer' }) => {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [amount, setAmount] = useState('');
  const [selectedContact, setSelectedContact] = useState<number | null>(null);

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
        <div className="flex items-center mb-6">
            <button onClick={() => setViewState(ViewState.DASHBOARD)} className="mr-4 text-white md:hidden">
                <Icons.ArrowLeft />
            </button>
            <h1 className="text-xl md:text-3xl font-bold text-white">Payments & Transfers</h1>
        </div>

        {/* Custom Tabs */}
        <div className="flex p-1 bg-compass-secondary/50 rounded-xl mb-8 max-w-lg">
            {[
                { id: 'transfer', label: 'Send & Request', icon: Icons.Users },
                { id: 'wallet', label: 'Wallet & Cards', icon: Icons.CreditCard },
                { id: 'bills', label: 'Bills', icon: Icons.Repeat }
            ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-medium transition-all ${
                            isActive 
                            ? 'bg-compass-primary text-white shadow-lg' 
                            : 'text-compass-muted hover:text-white'
                        }`}
                    >
                        <Icon />
                        <span className="hidden sm:inline">{tab.label}</span>
                    </button>
                );
            })}
        </div>

        {/* QUICK MOVE / TRANSFER TAB */}
        {activeTab === 'transfer' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                     <div className="bg-compass-card rounded-3xl p-6 border border-compass-secondary/30 shadow-xl">
                        <div className="mb-6">
                            <label className="text-sm text-compass-muted font-medium mb-2 block">Select Contact</label>
                            <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
                                <div className="flex flex-col items-center gap-2 cursor-pointer min-w-[64px]">
                                    <div className="w-16 h-16 rounded-full bg-compass-bg border-2 border-dashed border-compass-muted/50 flex items-center justify-center text-compass-muted hover:border-compass-primary hover:text-white transition-all">
                                        <Icons.Plus />
                                    </div>
                                    <span className="text-xs text-compass-muted">Add New</span>
                                </div>
                                {contacts.map((name, i) => (
                                    <div 
                                        key={name} 
                                        onClick={() => setSelectedContact(i)}
                                        className="flex flex-col items-center gap-2 cursor-pointer min-w-[64px] group"
                                    >
                                        <div className={`w-16 h-16 rounded-full flex items-center justify-center text-lg font-bold shadow-lg transition-all border-4 ${selectedContact === i ? 'border-compass-primary scale-110' : 'border-transparent group-hover:scale-105'} ${
                                             i % 4 === 0 ? 'bg-gradient-to-br from-purple-600 to-indigo-700 text-white' : 
                                             i % 4 === 1 ? 'bg-gradient-to-br from-pink-500 to-rose-600 text-white' :
                                             i % 4 === 2 ? 'bg-gradient-to-br from-teal-500 to-emerald-600 text-white' :
                                             'bg-gradient-to-br from-blue-600 to-cyan-600 text-white'
                                        }`}>
                                            {name[0]}
                                        </div>
                                        <span className={`text-xs font-medium ${selectedContact === i ? 'text-white' : 'text-compass-muted'}`}>{name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="mb-8">
                            <label className="text-sm text-compass-muted font-medium mb-2 block">Amount</label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl font-bold text-compass-muted">$</span>
                                <input 
                                    type="text" 
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    placeholder="0.00"
                                    className="w-full bg-compass-bg border border-compass-secondary text-white text-3xl font-bold rounded-2xl py-6 pl-10 pr-4 focus:outline-none focus:border-compass-primary transition-colors placeholder-compass-secondary"
                                />
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <button className="flex-1 bg-compass-secondary hover:bg-compass-secondary/80 text-compass-primary py-4 rounded-xl font-bold transition-all">
                                Request
                            </button>
                            <button className="flex-1 bg-compass-primary hover:bg-compass-primaryDark text-white py-4 rounded-xl font-bold transition-all shadow-lg shadow-blue-900/30">
                                Send Money
                            </button>
                        </div>
                     </div>
                </div>

                <div className="bg-compass-card rounded-3xl p-6 border border-compass-secondary/30 shadow-xl h-full">
                    <h3 className="text-lg font-bold text-white mb-6">Recent Activity</h3>
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
                                        <div className="text-sm font-bold text-white">{tx.name}</div>
                                        <div className="text-xs text-compass-muted">{tx.date}</div>
                                    </div>
                                </div>
                                <div className={`font-bold ${tx.amount > 0 ? 'text-emerald-400' : 'text-white'}`}>
                                    {tx.amount > 0 ? '+' : ''}{tx.amount.toFixed(2)}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )}

        {/* WALLET & CARDS TAB */}
        {activeTab === 'wallet' && (
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                 <div className="space-y-6">
                    <div className="bg-gradient-to-br from-[#0c1e4c] via-[#003087] to-[#001b4d] rounded-2xl p-8 aspect-[1.586/1] shadow-2xl relative overflow-hidden group border border-white/10">
                        {/* Metallic sheen */}
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
                            <span className="text-sm font-bold text-white">Lock Card</span>
                        </button>
                        <button className="bg-compass-card hover:bg-compass-secondary border border-compass-secondary p-4 rounded-xl flex flex-col items-center gap-2 transition-all">
                            <div className="p-2 bg-compass-primary/20 rounded-full text-compass-primary"><Icons.Repeat /></div>
                            <span className="text-sm font-bold text-white">Replace</span>
                        </button>
                    </div>
                 </div>

                 <div className="bg-compass-card rounded-3xl p-6 border border-compass-secondary/30 shadow-xl">
                      <div className="flex justify-between items-center mb-6">
                          <h3 className="text-lg font-bold text-white">Ultimate Rewards®</h3>
                          <span className="text-compass-primary text-sm font-bold cursor-pointer hover:underline">Redeem</span>
                      </div>
                      <div className="bg-compass-bg rounded-2xl p-6 mb-6 border border-compass-secondary/50">
                           <div className="text-sm text-compass-muted font-medium uppercase tracking-wide mb-1">Current Balance</div>
                           <div className="text-4xl font-bold text-white mb-2">54,320 <span className="text-lg text-compass-muted">pts</span></div>
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
                                      <div className="text-sm font-medium text-white">{item.desc}</div>
                                      <div className="text-xs text-compass-muted">{item.date}</div>
                                  </div>
                                  <div className="font-bold text-emerald-400 text-sm">{item.pts}</div>
                              </div>
                          ))}
                      </div>
                 </div>
             </div>
        )}

        {/* BILLS TAB */}
        {activeTab === 'bills' && (
             <div className="space-y-6 max-w-4xl mx-auto">
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="bg-compass-card p-6 rounded-2xl border border-compass-secondary/30 text-center">
                           <div className="text-sm text-compass-muted mb-1">Total Monthly</div>
                           <div className="text-3xl font-bold text-white">$236.47</div>
                      </div>
                      <div className="bg-compass-card p-6 rounded-2xl border border-compass-secondary/30 text-center">
                           <div className="text-sm text-compass-muted mb-1">Due This Week</div>
                           <div className="text-3xl font-bold text-white">$195.99</div>
                      </div>
                      <div className="bg-compass-card p-6 rounded-2xl border border-compass-secondary/30 text-center">
                           <div className="text-sm text-compass-muted mb-1">Active Subs</div>
                           <div className="text-3xl font-bold text-white">5</div>
                      </div>
                 </div>

                 <div className="bg-compass-card rounded-3xl p-6 border border-compass-secondary/30 shadow-xl">
                      <h3 className="text-lg font-bold text-white mb-6">Upcoming Payments</h3>
                      <div className="space-y-2">
                           {subscriptions.map((bill, i) => (
                               <div key={i} className="bg-compass-bg/50 rounded-xl p-4 flex items-center justify-between group hover:bg-compass-secondary transition-all cursor-pointer border border-transparent hover:border-compass-primary/20">
                                   <div className="flex items-center gap-4">
                                       <div className="w-10 h-10 rounded-lg bg-compass-secondary group-hover:bg-compass-card flex items-center justify-center text-compass-muted group-hover:text-white transition-colors">
                                           {bill.icon}
                                       </div>
                                       <div>
                                           <div className="font-bold text-white">{bill.name}</div>
                                           <div className="text-xs text-compass-muted font-medium">Auto-pay on {bill.date}</div>
                                       </div>
                                   </div>
                                   <div className="text-right">
                                       <div className="font-bold text-white text-lg">${bill.amount}</div>
                                       <button className="text-[10px] bg-compass-secondary hover:bg-white hover:text-black px-2 py-1 rounded transition-colors mt-1">Manage</button>
                                   </div>
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