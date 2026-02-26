import { CS2Player, Tournament, LeaderboardEntry, MatchInfo } from '@/types/cs2';

export const PLAYERS: CS2Player[] = [
  { id: 1, name: 's1mple', team: 'NAVI', role: 'AWP', price: 20, avatar: 'S1', rating: 1.32 },
  { id: 2, name: 'NiKo', team: 'G2', role: 'Rifler', price: 18, avatar: 'NK', rating: 1.24 },
  { id: 3, name: 'ZywOo', team: 'Vitality', role: 'AWP', price: 19, avatar: 'ZW', rating: 1.29 },
  { id: 4, name: 'device', team: 'Astralis', role: 'AWP', price: 17, avatar: 'DV', rating: 1.18 },
  { id: 5, name: 'electronic', team: 'NAVI', role: 'Entry', price: 16, avatar: 'EL', rating: 1.15 },
  { id: 6, name: 'karrigan', team: 'FaZe', role: 'IGL', price: 14, avatar: 'KR', rating: 1.02 },
  { id: 7, name: 'ropz', team: 'FaZe', role: 'Rifler', price: 15, avatar: 'RP', rating: 1.14 },
  { id: 8, name: 'blameF', team: 'Astralis', role: 'IGL', price: 13, avatar: 'BL', rating: 1.06 },
  { id: 9, name: 'rain', team: 'FaZe', role: 'Entry', price: 14, avatar: 'RN', rating: 1.10 },
  { id: 10, name: 'YEKINDAR', team: 'Liquid', role: 'Entry', price: 15, avatar: 'YK', rating: 1.12 },
  { id: 11, name: 'Perfecto', team: 'NAVI', role: 'Support', price: 12, avatar: 'PF', rating: 1.04 },
  { id: 12, name: 'Ax1Le', team: 'Cloud9', role: 'Rifler', price: 16, avatar: 'AX', rating: 1.16 },
];

export const TOURNAMENTS: Tournament[] = [
  {
    id: 1,
    name: 'ESL Pro League Season 23 Finals',
    fee: 100,
    isFree: false,
    paidParticipants: 47,
    freeParticipants: 128,
    prizePool: 4000,
    startsAt: '01.03 18:00',
    status: 'live',
    isPremium: true,
  },
  {
    id: 2,
    name: 'IEM Katowice 2025 Play-offs',
    fee: 50,
    isFree: false,
    paidParticipants: 12,
    freeParticipants: 34,
    prizePool: 500,
    startsAt: '05.03 16:00',
    status: 'upcoming',
    isPremium: false,
  },
  {
    id: 3,
    name: 'Тренировочный турнир',
    fee: 0,
    isFree: true,
    paidParticipants: 0,
    freeParticipants: 89,
    prizePool: 0,
    startsAt: 'Ежедневно',
    status: 'upcoming',
    isPremium: false,
  },
];

export const LEADERBOARD: LeaderboardEntry[] = [
  { rank: 1, name: '@p1onerrr', emoji: '😎', sub: 'NAVI + G2 · 5 игроков', points: 247.5 },
  { rank: 2, name: '@csmaster', emoji: '🎯', sub: 'FaZe + Vitality', points: 231.0 },
  { rank: 3, name: '@analyst_pro', emoji: '🔥', sub: 'NAVI + FaZe', points: 218.3 },
  { rank: 4, name: '@gamer777', emoji: '👾', sub: 'Vitality + G2', points: 201.1 },
];

export const MATCHES: MatchInfo[] = [
  { team1: 'NAVI', team2: 'Vitality', time: '18:00', date: '01.03' },
  { team1: 'G2', team2: 'FaZe', time: '20:30', date: '01.03' },
  { team1: 'Cloud9', team2: 'Liquid', time: '15:00', date: '02.03' },
];

export const ROLE_COLORS: Record<string, string> = {
  AWP: 'bg-destructive/20 text-destructive',
  Rifler: 'bg-accent/20 text-accent',
  Entry: 'bg-primary/20 text-primary',
  IGL: 'bg-gold/20 text-gold',
  Support: 'bg-success/20 text-success',
};

export const MAX_BUDGET = 100;
export const MAX_PLAYERS = 5;
