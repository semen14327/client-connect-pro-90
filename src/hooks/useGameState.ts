import { useState, useCallback } from 'react';
import {
  GameState, GamePhase, CharacterType, Difficulty, Debt, GameEvent,
  EventChoice, SideJob, DailyAction, MonthSummary, GameLog, LoanOption,
} from '@/types/game';
import {
  CHARACTER_PRESETS, DAYS_IN_MONTH, WIN_MONTHS, MAX_DEBT_LIMIT,
  DIFFICULTY_MULTIPLIERS, SIDE_JOBS,
} from '@/data/gameConfig';
import { GAME_EVENTS } from '@/data/gameEvents';

const makeId = () => Math.random().toString(36).slice(2, 9);

const createInitialState = (character: CharacterType, difficulty: Difficulty): GameState => {
  const preset = CHARACTER_PRESETS.find(c => c.type === character)!;
  const mul = DIFFICULTY_MULTIPLIERS[difficulty];

  return {
    phase: 'daily',
    day: 1,
    month: 1,
    balance: preset.startBalance,
    energy: 100,
    maxEnergy: 100,
    job: { ...preset.job, salary: Math.round(preset.job.salary * mul.income) },
    sideJobToday: null,
    debts: preset.startDebts.map(d => ({ ...d, id: makeId(), overdue: false })),
    expenses: {
      rent: Math.round(preset.expenses.rent * mul.expenses),
      food: Math.round(preset.expenses.food * mul.expenses),
      transport: Math.round(preset.expenses.transport * mul.expenses),
      phone: Math.round(preset.expenses.phone * mul.expenses),
      other: Math.round(preset.expenses.other * mul.expenses),
    },
    creditHistory: character === 'debtor' ? 'bad' : 'good',
    savings: 0,
    character,
    difficulty,
    stats: {
      totalEarned: 0,
      totalSpent: 0,
      loansТaken: 0,
      loansPaid: 0,
      eventsHandled: 0,
      sideJobsDone: 0,
      monthsSurvived: 0,
    },
    log: [{ day: 1, month: 1, text: 'Новый месяц начался. Удачи!', type: 'info' }],
    currentEvent: null,
    monthSummary: null,
    goalMonths: WIN_MONTHS,
    maxDebt: MAX_DEBT_LIMIT,
  };
};

export const useGameState = () => {
  const [state, setState] = useState<GameState | null>(null);

  const addLog = useCallback((s: GameState, text: string, type: GameLog['type'] = 'info'): GameLog => {
    return { day: s.day, month: s.month, text, type };
  }, []);

  const startGame = useCallback((character: CharacterType, difficulty: Difficulty) => {
    setState(createInitialState(character, difficulty));
  }, []);

  const tryTriggerEvent = useCallback((s: GameState): GameEvent | null => {
    const mul = DIFFICULTY_MULTIPLIERS[s.difficulty];
    const available = GAME_EVENTS.filter(e => {
      if (s.day < e.minDay) return false;
      if (e.condition && !e.condition(s)) return false;
      return Math.random() < e.probability * mul.events;
    });
    if (available.length === 0) return null;
    return available[Math.floor(Math.random() * available.length)];
  }, []);

  const advanceDay = useCallback((action: DailyAction, sideJob?: SideJob) => {
    setState(prev => {
      if (!prev || prev.phase !== 'daily') return prev;
      let s = { ...prev, log: [...prev.log], stats: { ...prev.stats }, debts: [...prev.debts] };

      // Apply daily action
      if (action === 'work') {
        s.energy = Math.max(0, s.energy - s.job.energyCost);
      } else if (action === 'side-job' && sideJob) {
        const totalEnergy = s.job.energyCost + sideJob.energyCost;
        s.energy = Math.max(0, s.energy - totalEnergy);
        s.balance += sideJob.income;
        s.stats.totalEarned += sideJob.income;
        s.stats.sideJobsDone += 1;
        s.log.push(addLog(s, `Подработка: ${sideJob.title} (+${sideJob.income} ₽)`, 'income'));
      } else if (action === 'rest') {
        s.energy = Math.min(s.maxEnergy, s.energy + 30);
        s.log.push(addLog(s, 'Отдыхаешь. Энергия восстанавливается.', 'info'));
      }

      // Daily food cost
      const dailyFood = Math.round(s.expenses.food / DAYS_IN_MONTH);
      s.balance -= dailyFood;
      s.stats.totalSpent += dailyFood;

      // Natural energy recovery
      s.energy = Math.min(s.maxEnergy, s.energy + 5);

      // Check for random event
      const event = tryTriggerEvent(s);
      if (event) {
        s.currentEvent = event;
        s.phase = 'event';
        return s;
      }

      // Advance day
      s.day += 1;
      if (s.day > DAYS_IN_MONTH) {
        return processMonthEnd(s);
      }

      return s;
    });
  }, [addLog, tryTriggerEvent]);

  const processMonthEnd = (s: GameState): GameState => {
    const totalExpenses = s.expenses.rent + s.expenses.transport + s.expenses.phone + s.expenses.other;
    let debtPayments = 0;
    let interestCharged = 0;

    // Process debts
    s.debts = s.debts.map(d => {
      const interest = Math.round(d.amount * d.rate / 100);
      interestCharged += interest;
      const payment = d.minPayment;
      debtPayments += payment;

      const newAmount = d.amount + interest - payment;
      return {
        ...d,
        amount: Math.max(0, newAmount),
        monthsLeft: d.monthsLeft - 1,
        overdue: newAmount > 0 && d.monthsLeft <= 1,
      };
    }).filter(d => d.amount > 0);

    const salary = s.job.salary;
    const net = salary - totalExpenses - debtPayments;

    s.balance += net;
    s.stats.totalEarned += salary;
    s.stats.totalSpent += totalExpenses + debtPayments;
    s.stats.monthsSurvived += 1;

    const summary: MonthSummary = {
      salary,
      totalExpenses,
      debtPayments,
      interestCharged,
      netChange: net,
      newBalance: s.balance,
    };

    s.monthSummary = summary;
    s.log.push(addLog(s, `Конец месяца. Зарплата: ${salary} ₽, расходы: ${totalExpenses + debtPayments} ₽`, 'info'));

    // Check win/lose
    const totalDebt = s.debts.reduce((sum, d) => sum + d.amount, 0);
    if (totalDebt > s.maxDebt) {
      s.phase = 'game-over';
      s.log.push(addLog(s, 'Долги превысили критический порог!', 'danger'));
      return s;
    }
    if (s.balance < -50000) {
      s.phase = 'game-over';
      s.log.push(addLog(s, 'Баланс ушёл в глубокий минус!', 'danger'));
      return s;
    }
    if (s.stats.monthsSurvived >= s.goalMonths) {
      s.phase = 'victory';
      return s;
    }

    s.phase = 'month-end';
    return s;
  };

  const resolveEvent = useCallback((choice: EventChoice) => {
    setState(prev => {
      if (!prev || prev.phase !== 'event') return prev;
      let s = { ...prev, log: [...prev.log], stats: { ...prev.stats }, debts: [...prev.debts] };

      const fx = choice.effects;
      if (fx.balance) {
        s.balance += fx.balance;
        if (fx.balance < 0) s.stats.totalSpent += Math.abs(fx.balance);
        else s.stats.totalEarned += fx.balance;
      }
      if (fx.energy) s.energy = Math.max(0, Math.min(s.maxEnergy, s.energy + fx.energy));
      if (fx.creditHistory) s.creditHistory = fx.creditHistory;
      if (fx.newDebt) {
        s.debts.push({ ...fx.newDebt, id: makeId(), overdue: false });
        s.stats.loansТaken += 1;
      }
      if (fx.message) s.log.push(addLog(s, fx.message, 'event'));

      s.stats.eventsHandled += 1;
      s.currentEvent = null;

      // Continue day advancement
      s.day += 1;
      if (s.day > DAYS_IN_MONTH) {
        return processMonthEnd(s);
      }

      s.phase = 'daily';
      return s;
    });
  }, [addLog]);

  const startNextMonth = useCallback(() => {
    setState(prev => {
      if (!prev) return prev;
      return { ...prev, day: 1, month: prev.month + 1, monthSummary: null, phase: 'daily' as GamePhase,
        log: [...prev.log, { day: 1, month: prev.month + 1, text: 'Новый месяц!', type: 'info' as const }] };
    });
  }, []);

  const takeLoan = useCallback((option: LoanOption) => {
    setState(prev => {
      if (!prev) return prev;
      const newDebt: Debt = {
        id: makeId(),
        name: option.name,
        amount: option.amount,
        rate: option.rate,
        minPayment: option.minPayment,
        monthsLeft: option.months,
        overdue: false,
      };
      return {
        ...prev,
        balance: prev.balance + option.amount,
        debts: [...prev.debts, newDebt],
        stats: { ...prev.stats, loansТaken: prev.stats.loansТaken + 1 },
        log: [...prev.log, { day: prev.day, month: prev.month, text: `Взял займ: ${option.name} (${option.amount} ₽)`, type: 'warning' as const }],
      };
    });
  }, []);

  const payDebt = useCallback((debtId: string, amount: number) => {
    setState(prev => {
      if (!prev) return prev;
      const debts = prev.debts.map(d => {
        if (d.id !== debtId) return d;
        const newAmount = Math.max(0, d.amount - amount);
        return { ...d, amount: newAmount };
      }).filter(d => d.amount > 0);

      return {
        ...prev,
        balance: prev.balance - amount,
        debts,
        stats: { ...prev.stats, totalSpent: prev.stats.totalSpent + amount },
        log: [...prev.log, { day: prev.day, month: prev.month, text: `Погасил ${amount} ₽ долга`, type: 'expense' as const }],
      };
    });
  }, []);

  const resetGame = useCallback(() => {
    setState(null);
  }, []);

  return {
    state,
    startGame,
    advanceDay,
    resolveEvent,
    startNextMonth,
    takeLoan,
    payDebt,
    resetGame,
    sideJobs: SIDE_JOBS,
  };
};
