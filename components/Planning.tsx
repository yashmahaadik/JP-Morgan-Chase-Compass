import React, { useState } from 'react';
import SetGoal from './SetGoal';
import Insights from './Insights';
import { ViewState } from '../types';

interface PlanningProps {
  setViewState: (view: ViewState) => void;
}

const Planning: React.FC<PlanningProps> = ({ setViewState }) => {
  const [activeTab, setActiveTab] = useState<'goals' | 'insights'>('insights');

  return (
    <div className="h-full bg-compass-bg animate-fade-in flex flex-col">
       {/* Mobile Tab Header - Sticky - Removed Border */}
       <div className="p-4 pt-6 bg-compass-bg sticky top-[60px] z-10">
          <h1 className="text-xl font-bold text-compass-text mb-4">Planning</h1>
          <div className="flex bg-compass-secondary/50 p-1 rounded-xl">
              <button 
                onClick={() => setActiveTab('insights')}
                className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${activeTab === 'insights' ? 'bg-compass-primary text-white shadow-lg' : 'text-compass-muted'}`}
              >
                  Insights
              </button>
              <button 
                onClick={() => setActiveTab('goals')}
                className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${activeTab === 'goals' ? 'bg-compass-primary text-white shadow-lg' : 'text-compass-muted'}`}
              >
                  Goals
              </button>
          </div>
       </div>

       <div className="flex-1 overflow-y-auto">
           {activeTab === 'insights' ? (
               <Insights setViewState={setViewState} isMobileTab={true} />
           ) : (
               <SetGoal setViewState={setViewState} isMobileTab={true} />
           )}
       </div>
    </div>
  );
};

export default Planning;