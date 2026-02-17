import { Button } from '@/components/ui/button';
import { QuizAnswers } from '@/types/quiz';
import { CheckCircle2 } from 'lucide-react';

interface ResultScreenProps {
  answers: Partial<QuizAnswers>;
  onContinue: () => void;
}

const getAmountRange = (amount?: string) => {
  switch (amount) {
    case 'up_to_10k': return { min: '1 000', max: '10 000' };
    case '10k_30k': return { min: '10 000', max: '30 000' };
    case '30k_70k': return { min: '30 000', max: '70 000' };
    case 'over_70k': return { min: '50 000', max: '100 000' };
    default: return { min: '5 000', max: '30 000' };
  }
};

const getApprovalText = (answers: Partial<QuizAnswers>) => {
  if (answers.credit_history === 'good' && answers.existing_loans === 'no') return 'Высокая';
  if (answers.credit_history === 'bad') return 'Средняя';
  return 'Высокая';
};

export const ResultScreen = ({ answers, onContinue }: ResultScreenProps) => {
  const range = getAmountRange(answers.amount);
  const approval = getApprovalText(answers);

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-6 animate-fade-in">
      <div className="w-14 h-14 rounded-full bg-success/10 flex items-center justify-center mb-6">
        <CheckCircle2 className="w-7 h-7 text-success" />
      </div>

      <h2 className="text-xl font-semibold text-foreground text-center mb-2">
        Вам предварительно доступны варианты
      </h2>
      <p className="text-sm text-muted-foreground text-center mb-6">
        На основе ваших ответов
      </p>

      <div className="w-full max-w-xs bg-card rounded-xl border border-border p-5 space-y-4 shadow-soft-md mb-8">
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Сумма</span>
          <span className="text-sm font-semibold text-foreground">{range.min} – {range.max} ₽</span>
        </div>
        <div className="border-t border-border" />
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Вероятность одобрения</span>
          <span className={`text-sm font-semibold ${approval === 'Высокая' ? 'text-success' : 'text-warning'}`}>
            {approval}
          </span>
        </div>
      </div>

      <Button onClick={onContinue} size="lg" className="w-full max-w-xs h-12 text-base rounded-xl">
        Далее
      </Button>
    </div>
  );
};
