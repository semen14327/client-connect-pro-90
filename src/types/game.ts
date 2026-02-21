export type Difficulty = 'easy' | 'normal' | 'hard';
export type CharacterType = 'student' | 'family' | 'single' | 'debtor';
export type GamePhase = 'character-select' | 'daily' | 'event' | 'month-end' | 'game-over' | 'victory';
export type CreditHistory = 'good' | 'average' | 'bad';
export type DailyAction = 'work' | 'side-job' | 'rest' | 'skip';

export interface Job {
  title: string;
  salary: number;
  energyCost: number; // per day
}

export interface SideJob {
  id: string;
  title: string;
  emoji: string;
  income: number; // per day
  energyCost: number;
  description: string;
}

export interface Debt {
  id: string;
  name: string;
  amount: number;
  rate: number; // monthly %
  minPayment: number;
  monthsLeft: number;
  overdue: boolean;
}

export interface MonthlyExpenses {
  rent: number;
  food: number;
  transport: number;
  phone: number;
  other: number;
}

export interface EventChoice {
  text: string;
  effects: Partial<EventEffects>;
}

export interface EventEffects {
  balance: number;
  energy: number;
  creditHistory: CreditHistory;
  newDebt: Omit<Debt, 'id' | 'overdue'> | null;
  message: string;
}

export interface GameEvent {
  id: string;
  title: string;
  emoji: string;
  description: string;
  choices: EventChoice[];
  minDay: number;
  probability: number; // 0-1
  condition?: (state: GameState) => boolean;
}

export interface CharacterPreset {
  type: CharacterType;
  title: string;
  emoji: string;
  description: string;
  startBalance: number;
  job: Job;
  expenses: MonthlyExpenses;
  startDebts: Omit<Debt, 'id' | 'overdue'>[];
  difficulty: string;
}

export interface GameStats {
  totalEarned: number;
  totalSpent: number;
  loansТaken: number;
  loansPaid: number;
  eventsHandled: number;
  sideJobsDone: number;
  monthsSurvived: number;
}

export interface GameLog {
  day: number;
  month: number;
  text: string;
  type: 'income' | 'expense' | 'event' | 'info' | 'warning' | 'danger';
}

export interface GameState {
  phase: GamePhase;
  day: number;
  month: number;
  balance: number;
  energy: number;
  maxEnergy: number;
  job: Job;
  sideJobToday: SideJob | null;
  debts: Debt[];
  expenses: MonthlyExpenses;
  creditHistory: CreditHistory;
  savings: number;
  character: CharacterType;
  difficulty: Difficulty;
  stats: GameStats;
  log: GameLog[];
  currentEvent: GameEvent | null;
  monthSummary: MonthSummary | null;
  goalMonths: number;
  maxDebt: number;
}

export interface MonthSummary {
  salary: number;
  totalExpenses: number;
  debtPayments: number;
  interestCharged: number;
  netChange: number;
  newBalance: number;
}

export interface LoanOption {
  name: string;
  amount: number;
  rate: number;
  months: number;
  minPayment: number;
}
