import { Trophy, Swords, Crosshair } from 'lucide-react';
import { MATCHES } from '@/data/cs2Data';
import heroImage from '@/assets/cs2-hero.jpg';

interface Props {
  onNavigate: (page: 'team' | 'tournaments') => void;
}

export const HomePage = ({ onNavigate }: Props) => (
  <div className="p-4 animate-fade-in space-y-4">
    {/* Hero Banner */}
    <div
      className="relative rounded-xl overflow-hidden cursor-pointer"
      onClick={() => onNavigate('tournaments')}
    >
      <img src={heroImage} alt="CS2 Fantasy" className="w-full h-40 object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <p className="text-[11px] text-muted-foreground font-semibold tracking-widest uppercase mb-1">
          🔥 Текущий призовой фонд
        </p>
        <p className="font-display text-3xl font-bold text-gradient-gold">2 840 ⭐</p>
        <p className="text-xs text-muted-foreground mt-1">
          ESL Pro League S23 Finals · 47 участников
        </p>
      </div>
    </div>

    {/* Prize distribution */}
    <div className="flex gap-2">
      {[
        { medal: '🥇', pct: '50%', amt: '1420 ⭐' },
        { medal: '🥈', pct: '30%', amt: '852 ⭐' },
        { medal: '🥉', pct: '20%', amt: '568 ⭐' },
      ].map(p => (
        <div key={p.medal} className="flex-1 bg-secondary rounded-lg p-3 text-center border border-border">
          <span className="text-lg">{p.medal}</span>
          <p className="font-display text-sm font-bold mt-1">{p.pct}</p>
          <p className="text-[10px] text-muted-foreground">{p.amt}</p>
        </div>
      ))}
    </div>

    {/* Quick Stats */}
    <div className="grid grid-cols-2 gap-2.5">
      {[
        { label: 'МОИ ОЧКИ', value: '0' },
        { label: 'МОЁ МЕСТО', value: '—' },
        { label: 'ПОБЕД', value: '0' },
        { label: 'ЗАРАБОТАНО ⭐', value: '0' },
      ].map(s => (
        <div key={s.label} className="bg-secondary border border-border rounded-xl p-3.5 text-center">
          <p className="font-display text-2xl font-bold text-gradient-primary">{s.value}</p>
          <p className="text-[11px] text-muted-foreground font-medium tracking-wider mt-1">{s.label}</p>
        </div>
      ))}
    </div>

    {/* Upcoming Matches */}
    <div>
      <div className="flex items-center gap-2 mb-3">
        <Swords className="w-4 h-4 text-primary" />
        <h2 className="font-display text-lg font-bold tracking-wide">Ближайшие матчи</h2>
      </div>
      <div className="space-y-2">
        {MATCHES.map((m, i) => (
          <div key={i} className="bg-secondary rounded-xl p-3 flex items-center gap-3 border border-border">
            <div className="text-2xl">🎮</div>
            <div className="flex-1 text-center">
              <p className="font-display text-[15px] font-bold tracking-wide">{m.team1}</p>
              <p className="text-[11px] text-muted-foreground/60 font-semibold">VS</p>
              <p className="font-display text-[15px] font-bold tracking-wide">{m.team2}</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-bold text-primary">{m.time}</p>
              <p className="text-[11px] text-muted-foreground">{m.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* CTA */}
    <button
      onClick={() => onNavigate('team')}
      className="w-full bg-gradient-primary text-primary-foreground font-display text-[15px] font-bold tracking-wider uppercase py-3.5 rounded-xl flex items-center justify-center gap-2 active:scale-[0.97] transition-transform"
    >
      <Crosshair className="w-5 h-5" />
      Собрать состав
    </button>
  </div>
);
