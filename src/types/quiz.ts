export interface QuizAnswers {
  purpose: string;
  amount: string;
  term: string;
  existing_loans: string;
  credit_history: string;
  urgency: string;
}

export interface MfoOffer {
  id: string;
  name: string;
  logo_url: string | null;
  amount_min: number;
  amount_max: number;
  term_min_days: number;
  term_max_days: number;
  approval_rate: string;
  referral_url: string;
  is_active: boolean;
  sort_order: number;
}

export type QuizStep = 'welcome' | 'disclaimer' | 'quiz' | 'analyzing' | 'result' | 'confirm' | 'offers';

export interface QuizQuestion {
  key: keyof QuizAnswers;
  title: string;
  options: { value: string; label: string; icon: string }[];
}
