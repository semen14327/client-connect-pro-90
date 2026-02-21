import { GameState, SideJob, DailyAction } from '@/types/game';
import { SIDE_JOBS, formatMoney, getMonthName, DAYS_IN_MONTH } from '@/data/gameConfig';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useState } from 'react';
import { LoanDialog } from './LoanDialog';
import { DebtPanel } from './DebtPanel';
import { GameLogPanel } from './GameLogPanel';
import { LoanOption } from '@/types/game';

interface Props {
  state: GameState;
  onAction: (action: DailyAction, sideJob?: SideJob) => void;
  onTakeLoan: (option: LoanOption) => void;
  onPayDebt: (debtId: string, amount: number) => void;
}

export const GameDashboard = ({ state, onAction, onTakeLoan, onPayDebt }: Props) => {
  const [showSideJobs, setShowSideJobs] = useState(false);
  const [showLoan, setShowLoan] = useState(false);
  const [showDebts, setShowDebts] = useState(false);
  const [showLog, setShowLog] = useState(false);

  const totalDebt = state.debts.reduce((s, d) => s + d.amount, 0);
  const canWork = state.energy >= state.job.energyCost;

  return (
    <div className="min-h-screen px-4 py-4 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-xs text-muted-foreground">{getMonthName(state.month)}, день {state.day}/{DAYS_IN_MONTH}</p>
          <p className="text-sm text-muted-foreground">{state.job.title}</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-muted-foreground">Месяц {state.month}/{state.goalMonths}</p>
        </div>
      </div>

      {/* Balance Card */}
      <Card className="mb-3 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
        <CardContent className="p-4">
          <p className="text-xs text-muted-foreground">Баланс</p>
          <p className={`text-2xl font-bold ${state.balance < 0 ? 'text-destructive' : 'text-foreground'}`}>
            {formatMoney(state.balance)}
          </p>
          {totalDebt > 0 && (
            <p className="text-xs text-destructive mt-1">Долги: {formatMoney(totalDebt)}</p>
          )}
        </CardContent>
      </Card>

      {/* Energy */}
      <div className="mb-4">
        <div className="flex justify-between text-xs mb-1">
          <span className="text-muted-foreground">Энергия</span>
          <span className="text-foreground font-medium">{state.energy}/{state.maxEnergy}</span>
        </div>
        <Progress value={state.energy} className="h-2" />
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        <div className="bg-card rounded-lg p-2 text-center border">
          <p className="text-xs text-muted-foreground">ЗП</p>
          <p className="text-sm font-semibold text-foreground">{formatMoney(state.job.salary)}</p>
        </div>
        <div className="bg-card rounded-lg p-2 text-center border cursor-pointer hover:bg-accent/30" onClick={() => state.debts.length > 0 && setShowDebts(true)}>
          <p className="text-xs text-muted-foreground">Долги</p>
          <p className={`text-sm font-semibold ${totalDebt > 0 ? 'text-destructive' : 'text-foreground'}`}>
            {state.debts.length > 0 ? formatMoney(totalDebt) : '—'}
          </p>
        </div>
        <div className="bg-card rounded-lg p-2 text-center border cursor-pointer hover:bg-accent/30" onClick={() => setShowLog(true)}>
          <p className="text-xs text-muted-foreground">Журнал</p>
          <p className="text-sm font-semibold text-primary">📋</p>
        </div>
      </div>

      {/* Side Jobs List */}
      {showSideJobs && (
        <div className="mb-4 space-y-2 animate-slide-up">
          <p className="text-sm font-medium text-foreground">Подработки:</p>
          {SIDE_JOBS.map(sj => {
            const canDo = state.energy >= (state.job.energyCost + sj.energyCost);
            return (
              <Card key={sj.id} className={`${canDo ? 'cursor-pointer hover:bg-accent/30' : 'opacity-50'}`}
                onClick={() => canDo && onAction('side-job', sj)}>
                <CardContent className="p-3 flex items-center gap-3">
                  <span className="text-xl">{sj.emoji}</span>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{sj.title}</p>
                    <p className="text-xs text-muted-foreground">{sj.description}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-primary">+{formatMoney(sj.income)}</p>
                    <p className="text-xs text-muted-foreground">−{sj.energyCost} ⚡</p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
          <Button variant="ghost" size="sm" className="w-full" onClick={() => setShowSideJobs(false)}>Скрыть</Button>
        </div>
      )}

      {/* Actions */}
      {!showSideJobs && (
        <div className="space-y-2 mb-4">
          <Button onClick={() => onAction('work')} disabled={!canWork} className="w-full h-11 rounded-xl">
            💼 Работать (−{state.job.energyCost} ⚡)
          </Button>
          <Button onClick={() => setShowSideJobs(true)} variant="outline" className="w-full h-11 rounded-xl">
            🔧 Подработка
          </Button>
          <div className="grid grid-cols-2 gap-2">
            <Button onClick={() => onAction('rest')} variant="secondary" className="h-11 rounded-xl">
              😴 Отдохнуть
            </Button>
            <Button onClick={() => setShowLoan(true)} variant="outline" className="h-11 rounded-xl border-destructive/50 text-destructive hover:bg-destructive/10">
              💳 Взять займ
            </Button>
          </div>
        </div>
      )}

      {/* Dialogs */}
      <LoanDialog open={showLoan} onClose={() => setShowLoan(false)} onTakeLoan={onTakeLoan} creditHistory={state.creditHistory} />
      <DebtPanel open={showDebts} onClose={() => setShowDebts(false)} debts={state.debts} balance={state.balance} onPayDebt={onPayDebt} />
      <GameLogPanel open={showLog} onClose={() => setShowLog(false)} log={state.log} />
    </div>
  );
};
