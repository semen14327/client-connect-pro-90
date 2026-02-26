export type PlayerRole = 'AWP' | 'Rifler' | 'Entry' | 'IGL' | 'Support';

export interface CS2Player {
  id: number;
  name: string;
  team: string;
  role: PlayerRole;
  price: number;
  avatar: string; // initials
  rating: number;
}

export interface Tournament {
  id: number;
  name: string;
  fee: number;
  isFree: boolean;
  paidParticipants: number;
  freeParticipants: number;
  prizePool: number;
  startsAt: string;
  status: 'live' | 'upcoming' | 'finished' | 'planned';
  isPremium: boolean;
}

export interface LeaderboardEntry {
  rank: number;
  name: string;
  emoji: string;
  sub: string;
  points: number;
  isMe?: boolean;
}

export interface MatchInfo {
  team1: string;
  team2: string;
  time: string;
  date: string;
  team1Logo?: string;
  team2Logo?: string;
}

export interface SelectedPlayer {
  id: number;
  name: string;
  team: string;
  role: PlayerRole;
  price: number;
}

export type PageName = 'home' | 'tournaments' | 'team' | 'leaderboard' | 'profile' | 'admin';
