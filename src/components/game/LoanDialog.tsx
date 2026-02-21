import { LoanOption } from '@/types/game';
import { CreditHistory } from '@/types/game';
import { LOAN_OPTIONS, formatMoney } from '@/data/gameConfig';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface Props {
  open: boolean;
  onClose: () => void;
  onTakeLoan: (option: LoanOption) => void;
  creditHistory: CreditHistory;
}

export const LoanDialog = ({ open, onClose, onTakeLoan, creditHistory }: Props) => {
  const availableLoans = LOAN_OPTIONS.filter(l => {
    if (creditHistory === 'bad' && l.amount > 30000) return false;
    if (creditHistory === 'average' && l.amount > 50000) return false;
    return true;
  });

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle className="text-base">💳 Взять займ</DialogTitle>
        </DialogHeader>
        <p className="text-xs text-muted-foreground">
          КИ: {creditHistory === 'good' ? '✅ Хорошая' : creditHistory === 'average' ? '⚠️ Средняя' : '❌ Плохая'}
        </p>
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {availableLoans.map((loan, i) => (
            <Card key={i} className="cursor-pointer hover:bg-accent/30" onClick={() => { onTakeLoan(loan); onClose(); }}>
              <CardContent className="p-3">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium text-foreground">{loan.name}</p>
                    <p className="text-xs text-muted-foreground">{loan.rate}%/мес, {loan.months} мес.</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-primary">{formatMoney(loan.amount)}</p>
                    <p className="text-xs text-muted-foreground">от {formatMoney(loan.minPayment)}/мес</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};
