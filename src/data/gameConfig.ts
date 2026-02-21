import { CharacterPreset, SideJob, LoanOption } from '@/types/game';

export const DAYS_IN_MONTH = 30;
export const WIN_MONTHS = 12;
export const MAX_DEBT_LIMIT = 500000;

export const DIFFICULTY_MULTIPLIERS = {
  easy: { events: 0.6, expenses: 0.8, income: 1.2 },
  normal: { events: 1.0, expenses: 1.0, income: 1.0 },
  hard: { events: 1.4, expenses: 1.3, income: 0.85 },
};

export const CHARACTER_PRESETS: CharacterPreset[] = [
  {
    type: 'student',
    title: 'Студент',
    emoji: '🎓',
    description: 'Стипендия + подработки. Мало расходов, но и доход низкий.',
    difficulty: 'Легко',
    startBalance: 8000,
    job: { title: 'Стажёр', salary: 25000, energyCost: 15 },
    expenses: { rent: 5000, food: 6000, transport: 2000, phone: 500, other: 1500 },
    startDebts: [],
  },
  {
    type: 'single',
    title: 'Одинокий специалист',
    emoji: '💼',
    description: 'Средний доход, нормальные расходы. Классика.',
    difficulty: 'Средне',
    startBalance: 15000,
    job: { title: 'Менеджер', salary: 45000, energyCost: 20 },
    expenses: { rent: 15000, food: 10000, transport: 3000, phone: 800, other: 3000 },
    startDebts: [],
  },
  {
    type: 'family',
    title: 'Семьянин',
    emoji: '👨‍👩‍👧',
    description: 'Хороший доход, но жена, ребёнок и ипотека.',
    difficulty: 'Сложно',
    startBalance: 20000,
    job: { title: 'Инженер', salary: 65000, energyCost: 25 },
    expenses: { rent: 25000, food: 18000, transport: 5000, phone: 1200, other: 5000 },
    startDebts: [
      { name: 'Ипотека', amount: 180000, rate: 1.2, monthsLeft: 24, minPayment: 8500 },
    ],
  },
  {
    type: 'debtor',
    title: 'После кредитной ямы',
    emoji: '🕳️',
    description: 'Средний доход, но куча долгов. Выберись!',
    difficulty: 'Хардкор',
    startBalance: 3000,
    job: { title: 'Оператор', salary: 35000, energyCost: 20 },
    expenses: { rent: 12000, food: 8000, transport: 2500, phone: 600, other: 2000 },
    startDebts: [
      { name: 'Микрозайм', amount: 25000, rate: 3.0, monthsLeft: 6, minPayment: 5000 },
      { name: 'Кредитка', amount: 45000, rate: 2.5, monthsLeft: 12, minPayment: 5500 },
    ],
  },
];

export const SIDE_JOBS: SideJob[] = [
  { id: 'courier', title: 'Курьер', emoji: '🚴', income: 1200, energyCost: 25, description: 'Развозить заказы' },
  { id: 'taxi', title: 'Такси', emoji: '🚕', income: 1800, energyCost: 30, description: 'Крутить руль полдня' },
  { id: 'freelance', title: 'Фриланс', emoji: '💻', income: 2000, energyCost: 20, description: 'Сделать проект на заказ' },
  { id: 'tutor', title: 'Репетитор', emoji: '📚', income: 1500, energyCost: 15, description: 'Подтянуть школьника' },
  { id: 'grey', title: 'Серая схема', emoji: '🤫', income: 3000, energyCost: 35, description: 'Рискованно, но прибыльно' },
];

export const LOAN_OPTIONS: LoanOption[] = [
  { name: 'Микрозайм (5 000)', amount: 5000, rate: 5.0, months: 1, minPayment: 5250 },
  { name: 'Микрозайм (15 000)', amount: 15000, rate: 4.0, months: 3, minPayment: 5600 },
  { name: 'Займ (30 000)', amount: 30000, rate: 3.0, months: 6, minPayment: 5900 },
  { name: 'Кредит (50 000)', amount: 50000, rate: 2.0, months: 12, minPayment: 5000 },
  { name: 'Кредит (100 000)', amount: 100000, rate: 1.8, months: 24, minPayment: 5300 },
];

export const formatMoney = (n: number): string => {
  const sign = n < 0 ? '−' : '';
  return sign + Math.abs(Math.round(n)).toLocaleString('ru-RU') + ' ₽';
};

export const getMonthName = (m: number): string => {
  const months = ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'];
  return months[(m - 1) % 12];
};
