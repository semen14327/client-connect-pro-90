import { PLAYERS, ROLE_COLORS, MAX_BUDGET } from '@/data/cs2Data';
import { PlayerRole, SelectedPlayer } from '@/types/cs2';
import { Check, Star, Lock } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface Props {
  selectedPlayers: SelectedPlayer[];
  captainId: number | null;
  budget: number;
  mode: 'paid' | 'free';
  roleFilter: PlayerRole | 'all';
  onTogglePlayer: (player: SelectedPlayer) => void;
  onSetCaptain: (id: number) => void;
  onSwitchMode: (mode: 'paid' | 'free') => void;
  onSetRoleFilter: (role: PlayerRole | 'all') => void;
  onConfirm: () => void;
}

const ROLES: { value: PlayerRole | 'all'; label: string; emoji: string }[] = [
  { value: 'all', label: 'Все', emoji: '' },
  { value: 'AWP', label: 'AWP', emoji: '🔵' },
  { value: 'Entry', label: 'Entry', emoji: '⚔️' },
  { value: 'Rifler', label: 'Rifler', emoji: '🎯' },
  { value: 'IGL', label: 'IGL', emoji: '🧠' },
  { value: 'Support', label: 'Support', emoji: '🛡️' },
];

export const TeamBuilderPage = ({
  selectedPlayers, captainId, budget, mode, roleFilter,
  onTogglePlayer, onSetCaptain, onSwitchMode, onSetRoleFilter, onConfirm,
}: Props) => {
  const filteredPlayers = PLAYERS.filter(p => roleFilter === 'all' || p.role === roleFilter);
  const budgetPct = (budget / MAX_BUDGET) * 100;
  const isSelected = (id: number) => selectedPlayers.some(p => p.id === id);

  return (
    <div className="p-4 animate-fade-in">
      {/* Tournament & Mode */}
      <div className="bg-card border border-border rounded-xl p-4 mb-4">
        <p className="font-display text-[13px] font-semibold tracking-widest uppercase text-muted-foreground mb-3">
          🏆 ESL Pro League S23 Finals
        </p>

        {/* Mode tabs */}
        <div className="flex bg-secondary rounded-lg p-0.5 mb-4">
          {(['paid', 'free'] as const).map(m => (
            <button
              key={m}
              onClick={() => onSwitchMode(m)}
              className={`flex-1 py-2 text-xs font-semibold rounded-md transition-all tracking-wide
                ${mode === m ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'}`}
            >
              {m === 'paid' ? '💰 Платный' : '🆓 Бесплатный'}
            </button>
          ))}
        </div>

        {/* Budget bar */}
        <div className="flex items-center gap-3 mb-4">
          <span className="text-xs text-muted-foreground font-semibold">💰 БЮДЖЕТ</span>
          <div className="flex-1">
            <Progress value={budgetPct} className={`h-1.5 ${budget < 20 ? '[&>div]:bg-destructive' : ''}`} />
          </div>
          <span className="font-display text-sm font-bold">
            {budget}/{MAX_BUDGET}
          </span>
        </div>

        {/* Team slots */}
        <div className="flex gap-1.5">
          {Array.from({ length: 5 }).map((_, i) => {
            const player = selectedPlayers[i];
            const isCaptain = player && captainId === player.id;
            return (
              <div
                key={i}
                onClick={() => player && onSetCaptain(player.id)}
                className={`flex-1 h-12 rounded-lg flex flex-col items-center justify-center transition-all text-[10px]
                  ${player
                    ? 'border border-primary bg-primary/5 cursor-pointer font-display font-bold text-foreground'
                    : 'border-[1.5px] border-dashed border-border text-muted-foreground/40 font-semibold'
                  }`}
              >
                {player ? (
                  <>
                    {isCaptain && <Star className="w-3 h-3 text-primary fill-primary" />}
                    <span className="text-[11px] truncate px-1">{player.name}</span>
                    <span className="text-[9px] text-muted-foreground">{player.role}</span>
                  </>
                ) : 'ПУСТО'}
              </div>
            );
          })}
        </div>
      </div>

      {/* Role filter */}
      <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-3">
        {ROLES.map(r => (
          <button
            key={r.value}
            onClick={() => onSetRoleFilter(r.value)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap border transition-all
              ${roleFilter === r.value
                ? 'bg-primary border-primary text-primary-foreground'
                : 'bg-secondary border-border text-muted-foreground'
              }`}
          >
            {r.emoji} {r.label}
          </button>
        ))}
      </div>

      {/* Player list */}
      <div className="space-y-2 mb-4">
        {filteredPlayers.map(player => {
          const selected = isSelected(player.id);
          const isCaptain = captainId === player.id;
          const disabled = !selected && (selectedPlayers.length >= 5 || budget < player.price);
          return (
            <div
              key={player.id}
              onClick={() => !disabled && onTogglePlayer(player)}
              className={`relative bg-secondary border rounded-xl p-3 flex items-center gap-3 transition-all cursor-pointer
                ${selected ? 'border-primary bg-primary/5' : 'border-border'}
                ${disabled && !selected ? 'opacity-40 cursor-not-allowed' : 'active:scale-[0.98]'}`}
            >
              {isCaptain && (
                <span className="absolute -top-1.5 right-2.5 bg-gold text-background text-[10px] font-bold px-2 py-0.5 rounded font-display tracking-wide">
                  CAPTAIN
                </span>
              )}

              {/* Avatar */}
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-display text-sm font-bold border-2 shrink-0
                ${selected ? 'border-primary bg-primary/15' : 'border-border bg-card'}`}>
                {player.avatar}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="font-display text-[15px] font-bold tracking-wide">{player.name}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-xs text-muted-foreground">{player.team}</span>
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider ${ROLE_COLORS[player.role]}`}>
                    {player.role}
                  </span>
                </div>
              </div>

              {/* Price */}
              <span className="font-display text-base font-bold text-primary shrink-0">
                {player.price}кр
              </span>

              {/* Check */}
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all shrink-0
                ${selected ? 'bg-primary border-primary' : 'border-border'}`}>
                {selected && <Check className="w-3 h-3 text-primary-foreground" />}
              </div>
            </div>
          );
        })}
      </div>

      {/* Confirm */}
      {selectedPlayers.length === 5 && (
        <div className="animate-slide-up space-y-2">
          <p className="text-xs text-muted-foreground text-center">
            Выберите капитана — нажмите на слот в составе
          </p>
          <button
            onClick={onConfirm}
            className="w-full bg-gradient-primary text-primary-foreground font-display text-[15px] font-bold tracking-wider uppercase py-3.5 rounded-xl flex items-center justify-center gap-2 active:scale-[0.97] transition-transform"
          >
            <Lock className="w-4 h-4" />
            Зафиксировать состав
          </button>
        </div>
      )}
    </div>
  );
};
