import { useState } from 'react';
import { TOURNAMENTS } from '@/data/cs2Data';
import { Users, Calendar, Coins } from 'lucide-react';

interface Props {
  onOpenTournament: (id: number) => void;
}

const FILTERS = ['Все', 'Открытые', 'Активные', 'Завершённые'];

export const TournamentsPage = ({ onOpenTournament }: Props) => {
  const [filter, setFilter] = useState('Все');

  return (
    <div className="p-4 animate-fade-in">
      {/* Filter chips */}
      <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-3 mb-3">
        {FILTERS.map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap border transition-all
              ${filter === f
                ? 'bg-primary border-primary text-primary-foreground'
                : 'bg-secondary border-border text-muted-foreground hover:text-foreground'
              }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Tournament cards */}
      <div className="space-y-3">
        {TOURNAMENTS.map(t => (
          <div
            key={t.id}
            onClick={() => onOpenTournament(t.id)}
            className={`bg-card border rounded-xl overflow-hidden cursor-pointer active:scale-[0.98] transition-transform relative
              ${t.isPremium ? 'border-primary/40' : 'border-border'}`}
          >
            {/* Status badge */}
            {t.status === 'live' && (
              <span className="absolute top-2.5 right-2.5 text-[10px] font-bold tracking-widest uppercase bg-destructive text-destructive-foreground px-2 py-0.5 rounded animate-pulse-glow">
                LIVE
              </span>
            )}
            {t.status === 'upcoming' && !t.isFree && (
              <span className="absolute top-2.5 right-2.5 text-[10px] font-bold tracking-widest uppercase bg-accent text-accent-foreground px-2 py-0.5 rounded">
                СКОРО
              </span>
            )}

            {/* Top */}
            <div className="bg-gradient-to-br from-secondary to-card p-3.5 flex justify-between items-start">
              <h3 className="font-display text-[17px] font-bold tracking-wide leading-tight flex-1 pr-16">
                {t.name}
              </h3>
              <span className={`font-bold text-[13px] px-2.5 py-1 rounded-full whitespace-nowrap ml-2
                ${t.isFree ? 'bg-gradient-green text-primary-foreground' : 'bg-gradient-primary text-primary-foreground'}`}>
                {t.isFree ? 'БЕСПЛАТНО' : `${t.fee} ⭐`}
              </span>
            </div>

            {/* Bottom stats */}
            <div className="px-3.5 py-3 flex gap-4 flex-wrap">
              {!t.isFree && (
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Users className="w-3.5 h-3.5" />
                  <strong className="text-foreground">{t.paidParticipants}</strong> платных
                </div>
              )}
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Users className="w-3.5 h-3.5" />
                <strong className="text-foreground">{t.freeParticipants}</strong> {t.isFree ? 'участников' : 'бесплатных'}
              </div>
              {t.prizePool > 0 && (
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Coins className="w-3.5 h-3.5" />
                  <strong className="text-foreground">~{t.prizePool} ⭐</strong> фонд
                </div>
              )}
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Calendar className="w-3.5 h-3.5" />
                <strong className="text-foreground">{t.startsAt}</strong>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
