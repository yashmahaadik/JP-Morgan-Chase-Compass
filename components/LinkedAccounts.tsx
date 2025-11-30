import React from 'react';
import { MOCK_ACCOUNTS, Icons } from '../constants';
import { ViewState } from '../types';

interface LinkedAccountsProps {
  setViewState: (view: ViewState) => void;
}

const LinkedAccounts: React.FC<LinkedAccountsProps> = ({ setViewState }) => {
  return (
    <div className="p-4 md:p-8 pt-6 h-full bg-compass-bg animate-fade-in">
        {/* Sticky Header - Removed Border */}
        <div className="sticky top-[60px] md:top-0 z-20 bg-compass-bg/95 backdrop-blur-md -mx-4 px-4 pt-2 md:pt-0 md:mx-0 md:px-0 pb-4 mb-4">
            <div className="flex items-center mb-4">
                <button onClick={() => setViewState(ViewState.DASHBOARD)} className="mr-4 text-compass-text md:hidden">
                    <Icons.ArrowLeft />
                </button>
                <h1 className="text-xl md:text-3xl font-bold text-compass-text">Linked Accounts</h1>
            </div>

            {/* Action Bar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <p className="text-compass-muted text-sm md:max-w-md">
                    Your data is secured with bank-level encryption. Manage your connections and sync status here.
                </p>
                <button className="bg-compass-primary hover:bg-compass-primaryDark text-white font-semibold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-lg shadow-blue-900/20">
                    <Icons.Plus />
                    Link New Account
                </button>
            </div>
        </div>

        <h2 className="text-lg font-bold text-compass-text mb-4">Connected Accounts</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 pb-20">
            {MOCK_ACCOUNTS.map((account) => {
                 let statusColor = 'bg-compass-primary';
                 let statusText = 'text-compass-muted';
                 
                 if (account.status === 'warning') {
                     statusColor = 'bg-yellow-500';
                     statusText = 'text-yellow-500';
                 } else if (account.status === 'error') {
                     statusColor = 'bg-red-500';
                     statusText = 'text-red-500';
                 } else if (account.status === 'syncing') {
                    statusColor = 'bg-gray-500 animate-pulse';
                    statusText = 'text-gray-400';
                 }

                return (
                    /* Removed Border */
                    <div key={account.id} className="bg-compass-card rounded-xl p-6 flex flex-col justify-between transition-all group min-h-[160px] shadow-md hover:shadow-lg">
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex gap-4">
                                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shrink-0 shadow-md">
                                    <span className="text-black font-bold text-xs">{account.name.substring(0,2).toUpperCase()}</span>
                                </div>
                                <div>
                                    <div className="text-compass-text font-medium text-lg group-hover:text-compass-primary transition-colors">{account.name}</div>
                                    <div className="text-compass-muted text-sm">{account.type}</div>
                                </div>
                            </div>
                            <button className="text-compass-muted hover:text-compass-text">
                                <Icons.MoreVertical />
                            </button>
                        </div>
                        
                        <div>
                             <div className="text-compass-muted text-sm flex items-center gap-1 mb-2">
                                <span className="text-xl leading-3 tracking-tighter">••••</span> {account.accountNumber}
                            </div>
                            <div className="flex justify-between items-center border-t border-compass-secondary pt-4">
                                <div className={`text-xs flex items-center gap-2 ${statusText}`}>
                                    <div className={`w-2 h-2 rounded-full ${statusColor}`}></div>
                                    {account.lastUpdated}
                                </div>
                                <div className={`font-bold ${account.balance < 0 ? 'text-[#ef4444]' : 'text-compass-text'}`}>
                                    {account.balance < 0 ? `($${Math.abs(account.balance).toLocaleString()})` : `$${account.balance.toLocaleString()}`}
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    </div>
  );
};

export default LinkedAccounts;