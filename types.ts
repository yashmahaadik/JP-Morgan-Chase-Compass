export interface Account {
  id: string;
  name: string;
  type: string;
  balance: number;
  lastUpdated: string;
  status: 'active' | 'warning' | 'error' | 'syncing';
  accountNumber: string;
}

export interface Goal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  targetDate: string;
  style: 'Conservative' | 'Moderate' | 'Aggressive';
}

export interface Insight {
  id: string;
  title: string;
  description: string;
  type: 'success' | 'warning' | 'info' | 'education';
  actionLabel: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  timestamp: Date;
}

export enum ViewState {
  DASHBOARD = 'DASHBOARD',
  PAYMENTS = 'PAYMENTS',
  LINKED_ACCOUNTS = 'LINKED_ACCOUNTS',
  CREATE_GOAL = 'CREATE_GOAL',
  INSIGHTS = 'INSIGHTS',
  PROFILE = 'PROFILE',
  PLANNING = 'PLANNING',
}