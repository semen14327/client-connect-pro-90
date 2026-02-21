import { GameState } from '@/types/game';
import { formatMoney } from '@/data/gameConfig';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface Props {
  state: GameState;
  onRestart: () => void;
}

export const GameOverScreen = ({ state, onRestart }: Props) => {
  const isVictory = state.phase === 'victory';

  return (
    <div className="min-h-screen px-4 py-6 flex flex-col justify-center animate-fade-in">
      <div className="text-center mb-6">
        <span className="text-5xl">{isVictory ? '🎉' : '💸'}</span>
        <h1 className="text-2xl font-bold text-foreground mt-4">
          {isVictory ? 'Ты выжил!' : 'Игра окончена'}
        </h1>
        <p className="text-muted-foreground mt-2">
          {isVictory
            ? `Продержался ${state.goalMonths} месяцев! Настоящий боец!`
            : 'Долги или минус на счёте оказались сильнее…'}
        </p>
      </div>

      <Card className="mb-6">
        <CardContent className="p-4 space-y-2">
          <StatRow label="Месяцев выжил" value={`${state.stats.monthsSurvived}`} />
          <StatRow label="Всего заработано" value={formatMoney(state.stats.totalEarned)} />
          <StatRow label="Всего потрачено" value={formatMoney(state.stats.totalSpent)} />
          <StatRow label="Подработок выполнено" value={`${state.stats.sideJobsDone}`} />
          <StatRow label="Займов взято" value={`${state.stats.loansТaken}`} />
          <StatRow label="Событий пережито" value={`${state.stats.eventsHandled}`} />
          <div className="border-t border-border pt-2">
            <StatRow label="Финальный баланс" value={formatMoney(state.balance)} bold />
          </div>
        </CardContent>
      </Card>

      <Button onClick={onRestart} size="lg" className="w-full h-12 rounded-xl">
        {isVictory ? 'Играть снова' : 'Попробовать ещё раз'}
      </Button>
    </div>
  );
};

const StatRow = ({ label, value, bold }: { label: string; value: string; bold?: boolean }) => (
  <div className={`flex justify-between text-sm ${bold ? 'font-bold' : ''}`}>
    <span className="text-muted-foreground">{label}</span>
    <span className="text-foreground">{value}</span>
  </div>
);
