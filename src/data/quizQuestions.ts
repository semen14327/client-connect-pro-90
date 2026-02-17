import { QuizQuestion } from '@/types/quiz';

export const quizQuestions: QuizQuestion[] = [
  {
    key: 'purpose',
    title: 'Какова цель займа?',
    options: [
      { value: 'urgent', label: 'Закрыть срочные расходы', icon: '⚡' },
      { value: 'salary', label: 'До зарплаты', icon: '💼' },
      { value: 'repay', label: 'Погасить другой займ', icon: '🔄' },
      { value: 'browsing', label: 'Не уверен / просто смотрю', icon: '👀' },
    ],
  },
  {
    key: 'amount',
    title: 'Какая сумма вам нужна?',
    options: [
      { value: 'up_to_10k', label: 'До 10 000 ₽', icon: '💰' },
      { value: '10k_30k', label: '10 000 – 30 000 ₽', icon: '💵' },
      { value: '30k_70k', label: '30 000 – 70 000 ₽', icon: '💳' },
      { value: 'over_70k', label: 'Более 70 000 ₽', icon: '🏦' },
    ],
  },
  {
    key: 'term',
    title: 'На какой срок?',
    options: [
      { value: '7_days', label: 'До 7 дней', icon: '📅' },
      { value: '14_days', label: 'До 14 дней', icon: '📆' },
      { value: '30_days', label: 'До 30 дней', icon: '🗓️' },
      { value: 'over_month', label: 'Более месяца', icon: '📋' },
    ],
  },
  {
    key: 'existing_loans',
    title: 'Есть ли действующие займы?',
    options: [
      { value: 'yes', label: 'Да', icon: '📝' },
      { value: 'no', label: 'Нет', icon: '✅' },
    ],
  },
  {
    key: 'credit_history',
    title: 'Какая у вас кредитная история?',
    options: [
      { value: 'good', label: 'Хорошая', icon: '⭐' },
      { value: 'bad', label: 'Были просрочки', icon: '⚠️' },
      { value: 'unknown', label: 'Не знаю', icon: '❓' },
    ],
  },
  {
    key: 'urgency',
    title: 'Когда нужны деньги?',
    options: [
      { value: 'today', label: 'Сегодня', icon: '🔥' },
      { value: 'few_days', label: 'В течение 2–3 дней', icon: '⏰' },
      { value: 'browsing', label: 'Просто изучаю варианты', icon: '🔍' },
    ],
  },
];
