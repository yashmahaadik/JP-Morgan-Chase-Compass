import React, { useState, useEffect } from 'react';
import Dashboard from './components/Dashboard';
import LinkedAccounts from './components/LinkedAccounts';
import SetGoal from './components/SetGoal';
import Insights from './components/Insights';
import ChatWidget from './components/ChatWidget';
import Payments from './components/Payments';
import Profile from './components/Profile';
import Planning from './components/Planning';
import { ViewState } from './types';
import { Icons } from './constants';

const App: React.FC = () => {
  const [viewState, setViewState] = useState<ViewState>(ViewState.DASHBOARD);
  const [activePaymentTab, setActivePaymentTab] = useState('transfer');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  // Apply theme to document
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const renderView = () => {
    switch (viewState) {
      case ViewState.DASHBOARD:
        return <Dashboard setViewState={setViewState} setActivePaymentTab={setActivePaymentTab} />;
      case ViewState.PAYMENTS:
        return <Payments setViewState={setViewState} initialTab={activePaymentTab} />;
      case ViewState.LINKED_ACCOUNTS:
        return <LinkedAccounts setViewState={setViewState} />;
      case ViewState.CREATE_GOAL:
        return <SetGoal setViewState={setViewState} />;
      case ViewState.INSIGHTS:
        return <Insights setViewState={setViewState} />;
      case ViewState.PROFILE:
        return <Profile setViewState={setViewState} theme={theme} toggleTheme={toggleTheme} />;
      case ViewState.PLANNING:
        return <Planning setViewState={setViewState} />;
      default:
        return <Dashboard setViewState={setViewState} setActivePaymentTab={setActivePaymentTab} />;
    }
  };

  const NavItem = ({ view, icon: Icon, label }: { view: ViewState; icon: any; label: string }) => (
    <button
      onClick={() => {
          if(view === ViewState.PAYMENTS) setActivePaymentTab('transfer'); // Reset payment tab when clicking nav
          setViewState(view);
      }}
      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all w-full text-left group
        ${viewState === view 
          ? 'bg-compass-primary text-white font-semibold shadow-[0_0_15px_rgba(0,96,240,0.3)]' 
          : 'text-compass-muted hover:bg-compass-secondary hover:text-compass-text'}`}
    >
      <div className={`${viewState === view ? 'text-white' : 'text-compass-muted group-hover:text-compass-text'}`}>
        <Icon />
      </div>
      <span>{label}</span>
    </button>
  );

  return (
    <div className="bg-compass-bg min-h-screen text-compass-text font-sans flex flex-col md:flex-row transition-colors duration-300">
      
      {/* Desktop Sidebar - Removed Border Right */}
      <aside className="hidden md:flex flex-col w-72 bg-compass-bg p-6 fixed h-full z-20">
        <div className="mb-10 px-2 flex items-center gap-3">
            <div className="w-8 h-8 bg-compass-primary rounded-lg flex items-center justify-center shadow-[0_0_10px_rgba(0,96,240,0.5)]">
              <Icons.Target /> 
            </div>
            <h1 className="text-xl font-bold text-compass-text tracking-tight">Chase Compass</h1>
        </div>

        <nav className="space-y-2 flex-1">
            <NavItem view={ViewState.DASHBOARD} icon={Icons.Home} label="Dashboard" />
            <NavItem view={ViewState.PAYMENTS} icon={Icons.Transfer} label="Payments" />
            <NavItem view={ViewState.LINKED_ACCOUNTS} icon={Icons.Wallet} label="Linked Accounts" />
            <NavItem view={ViewState.CREATE_GOAL} icon={Icons.Target} label="Goals" />
            <NavItem view={ViewState.INSIGHTS} icon={Icons.Lightbulb} label="Insights" />
            <NavItem view={ViewState.PROFILE} icon={Icons.User} label="Profile" />
        </nav>

        {/* Desktop Sidebar Footer / Net Worth Summary */}
        <div className="p-5 bg-compass-card/50 rounded-2xl backdrop-blur-sm shadow-sm">
            <div className="text-xs text-compass-muted mb-2 uppercase font-bold tracking-wider">Total Net Worth</div>
            <div className="text-2xl font-bold text-compass-text mb-1">$150,000</div>
            <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full">+2.5%</span>
                <span className="text-xs text-compass-muted">vs last month</span>
            </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 md:ml-72 relative min-h-screen overflow-x-hidden">
        {/* Mobile Header - Sticky - Removed Border Bottom */}
        <header className="md:hidden sticky top-0 z-30 bg-compass-bg p-4 flex items-center gap-3 shadow-md">
            <div className="w-8 h-8 bg-compass-primary rounded-lg flex items-center justify-center shadow-[0_0_10px_rgba(0,96,240,0.5)]">
                <Icons.Target /> 
            </div>
            <h1 className="text-lg font-bold text-compass-text tracking-tight">Chase Compass</h1>
        </header>

        <div className="max-w-7xl mx-auto w-full h-full min-h-screen">
            {renderView()}
        </div>

        {/* Floating Chat Widget */}
        <ChatWidget />

        {/* Mobile Bottom Navigation - Opaque Background, No Border */}
        <div className="fixed bottom-0 left-0 right-0 md:hidden p-4 bg-compass-bg z-50 shadow-[0_-5px_20px_rgba(0,0,0,0.2)]">
            {/* Floating Add Funds Button only on dashboard */}
            {viewState === ViewState.DASHBOARD && (
                <button 
                  onClick={() => setViewState(ViewState.CREATE_GOAL)} 
                  className="w-full bg-compass-primary hover:bg-compass-primaryDark text-white font-bold py-3.5 rounded-xl shadow-[0_0_15px_rgba(0,96,240,0.3)] transition-all mb-4"
                >
                    Add Funds
                </button>
            )}

            {/* Tab Bar */}
            <div className="flex justify-between items-center px-4 pb-2">
                <button onClick={() => setViewState(ViewState.DASHBOARD)} className={`flex flex-col items-center gap-1 ${viewState === ViewState.DASHBOARD ? 'text-compass-primary' : 'text-compass-muted hover:text-compass-text'}`}>
                    <Icons.Home />
                    <span className="text-[10px] font-medium">Home</span>
                </button>
                <button onClick={() => { setActivePaymentTab('transfer'); setViewState(ViewState.PAYMENTS); }} className={`flex flex-col items-center gap-1 ${viewState === ViewState.PAYMENTS ? 'text-compass-primary' : 'text-compass-muted hover:text-compass-text'}`}>
                    <Icons.Transfer />
                    <span className="text-[10px] font-medium">Pay</span>
                </button>
                <button onClick={() => setViewState(ViewState.LINKED_ACCOUNTS)} className={`flex flex-col items-center gap-1 ${viewState === ViewState.LINKED_ACCOUNTS ? 'text-compass-primary' : 'text-compass-muted hover:text-compass-text'}`}>
                    <Icons.Wallet />
                    <span className="text-[10px] font-medium">Accounts</span>
                </button>
                <button onClick={() => setViewState(ViewState.PLANNING)} className={`flex flex-col items-center gap-1 ${viewState === ViewState.PLANNING ? 'text-compass-primary' : 'text-compass-muted hover:text-compass-text'}`}>
                    <Icons.Target />
                    <span className="text-[10px] font-medium">Plan</span>
                </button>
                <button onClick={() => setViewState(ViewState.PROFILE)} className={`flex flex-col items-center gap-1 ${viewState === ViewState.PROFILE ? 'text-compass-primary' : 'text-compass-muted hover:text-compass-text'}`}>
                    <Icons.User />
                    <span className="text-[10px] font-medium">Me</span>
                </button>
            </div>
        </div>
        
        {/* Mobile Bottom Nav Spacer */}
        <div className="h-32 md:hidden"></div>
      </main>
    </div>
  );
};

export default App;