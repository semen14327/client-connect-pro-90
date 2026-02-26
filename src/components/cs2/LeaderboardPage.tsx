import { useState } from 'react';
import { LEADERBOARD } from '@/data/cs2Data';
import { Trophy, Star } from 'lucide-react';

const RANK_MEDALS = ['', '🥇', '🥈', '🥉'];

export const LeaderboardPage = () => {
  const [tab, setTab] = useState<'paid' | 'free'>('paid');

  return (
    <div className="p-4 animate-fade-in">
      {/* Tabs */}
      <div className="flex bg-secondary rounded-lg p-0.5 mb-4">
        {(['paid', 'free'] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex-1 py-2 text-xs font-semibold rounded-md transition-all
              ${tab === t ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'}`}
          >
            {t === 'paid' ? '💰 Платные' : '🆓 Бесплатные'}
          </button>
        ))}
      </div>

      {/* Tournament leaderboard */}
      <div className="bg-card border border-border rounded-xl p-4 mb-4">
        <p className="font-display text-[13px] font-semibold tracking-widest uppercase text-muted-foreground mb-3">
          🏆 ESL Pro League S23 Finals · Топ-10
        </p>

        <div className="divide-y divide-border">
          {LEADERBOARD.map(entry => (
            <div key={entry.rank} className="flex items-center gap-2.5 py-2.5">
              <span className={`font-display text-lg font-bold w-8 text-center shrink-0
                ${entry.rank === 1 ? 'text-gold' : entry.rank === 2 ? 'text-silver' : entry.rank === 3 ? 'text-bronze' : 'text-muted-foreground'}`}>
                {RANK_MEDALS[entry.rank] || entry.rank}
              </span>
              <div className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center text-base shrink-0">
                {entry.emoji}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm truncate">{entry.name}</p>
                <p className="text-[11px] text-muted-foreground truncate">{entry.sub}</p>
              </div>
              <div className="text-right shrink-0">
                <p className="font-display text-lg font-bold text-primary">{entry.points}</p>
                <p className="text-[10px] text-muted-foreground">очков</p>
              </div>
            </div>
          ))}

          {/* Current user */}
          <div className="flex items-center gap-2.5 py-2.5 bg-primary/5 rounded-lg px-2 mt-1">
            <span className="font-display text-lg font-bold w-8 text-center text-primary shrink-0">—</span>
            <div className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center text-base shrink-0">⭐</div>
            <div className="flex-1">
              <p className="font-semibold text-sm text-primary">Вы</p>
              <p className="text-[11px] text-muted-foreground">Состав не собран</p>
            </div>
            <div className="text-right">
              <p className="font-display text-lg font-bold text-muted-foreground">0</p>
              <p className="text-[10px] text-muted-foreground">очков</p>
            </div>
          </div>
        </div>
      </div>

      {/* All-time */}
      <div className="bg-card border border-border rounded-xl p-4">
        <p className="font-display text-[13px] font-semibold tracking-widest uppercase text-muted-foreground mb-3">
          ⭐ Все времена · Заработано Stars
        </p>
        <div className="divide-y divide-border">
          {LEADERBOARD.slice(0, 2).map(entry => (
            <div key={entry.rank} className="flex items-center gap-2.5 py-2.5">
              <span className={`font-display text-lg font-bold w-8 text-center shrink-0
                ${entry.rank === 1 ? 'text-gold' : 'text-silver'}`}>
                {RANK_MEDALS[entry.rank]}
              </span>
              <div className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center text-base shrink-0">💎</div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm truncate">{entry.name}</p>
                <p className="text-[11px] text-muted-foreground">12 турниров · 4 победы</p>
              </div>
              <div className="text-right shrink-0">
                <p className="font-display text-lg font-bold text-primary">8 400</p>
                <p className="text-[10px] text-muted-foreground">⭐ заработано</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
