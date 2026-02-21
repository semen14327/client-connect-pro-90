import { Debt } from '@/types/game';
import { formatMoney } from '@/data/gameConfig';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface Props {
  open: boolean;
  onClose: () => void;
  debts: Debt[];
  balance: number;
  onPayDebt: (debtId: string, amount: number) => void;
}

export const DebtPanel = ({ open, onClose, debts, balance, onPayDebt }: Props) => (
  <Dialog open={open} onOpenChange={onClose}>
    <DialogContent className="max-w-sm">
      <DialogHeader>
        <DialogTitle className="text-base">📋 Долги</DialogTitle>
      </DialogHeader>
      {debts.length === 0 ? (
        <p className="text-sm text-muted-foreground text-center py-4">Нет активных долгов 🎉</p>
      ) : (
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {debts.map(debt => (
            <Card key={debt.id} className={debt.overdue ? 'border-destructive' : ''}>
              <CardContent className="p-3">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-foreground">{debt.name} {debt.overdue ? '⚠️' : ''}</p>
                    <p className="text-xs text-muted-foreground">{debt.rate}%/мес, ещё {debt.monthsLeft} мес.</p>
                  </div>
                  <p className="text-sm font-semibold text-destructive">{formatMoney(debt.amount)}</p>
                </div>
                {balance >= debt.minPayment && (
                  <Button
                    size="sm"
                    variant="outline"
                    className="mt-2 w-full text-xs"
                    onClick={() => onPayDebt(debt.id, debt.minPayment)}
                  >
                    Погасить {formatMoney(debt.minPayment)}
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </DialogContent>
  </Dialog>
);
