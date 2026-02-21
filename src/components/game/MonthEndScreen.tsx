import { MonthSummary, GameState } from '@/types/game';
import { formatMoney, getMonthName } from '@/data/gameConfig';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface Props {
  state: GameState;
  summary: MonthSummary;
  onContinue: () => void;
}

export const MonthEndScreen = ({ state, summary, onContinue }: Props) => (
  <div className="min-h-screen px-4 py-6 animate-fade-in">
    <div className="text-center mb-6">
      <span className="text-3xl">📊</span>
      <h2 className="text-lg font-bold text-foreground mt-2">Итоги: {getMonthName(state.month)}</h2>
      <p className="text-sm text-muted-foreground">Месяц {state.month} из {state.goalMonths}</p>
    </div>

    <Card className="mb-4">
      <CardContent className="p-4 space-y-3">
        <Row label="Зарплата" value={summary.salary} positive />
        <div className="border-t border-border pt-2">
          <Row label="Расходы" value={-summary.totalExpenses} />
          <Row label="Платежи по долгам" value={-summary.debtPayments} />
          {summary.interestCharged > 0 && <Row label="Проценты по долгам" value={-summary.interestCharged} />}
        </div>
        <div className="border-t border-border pt-2">
          <Row label="Итого за месяц" value={summary.netChange} bold />
        </div>
        <div className="border-t border-border pt-2">
          <Row label="Баланс" value={summary.newBalance} bold />
        </div>
      </CardContent>
    </Card>

    {state.stats.monthsSurvived > 0 && (
      <p className="text-center text-sm text-muted-foreground mb-4">
        Выжил {state.stats.monthsSurvived} из {state.goalMonths} месяцев 💪
      </p>
    )}

    <Button onClick={onContinue} size="lg" className="w-full h-12 rounded-xl">
      Следующий месяц →
    </Button>
  </div>
);

const Row = ({ label, value, positive, bold }: { label: string; value: number; positive?: boolean; bold?: boolean }) => (
  <div className={`flex justify-between text-sm ${bold ? 'font-bold' : ''}`}>
    <span className="text-muted-foreground">{label}</span>
    <span className={value >= 0 ? 'text-primary' : 'text-destructive'}>
      {value >= 0 ? '+' : ''}{formatMoney(value)}
    </span>
  </div>
);
