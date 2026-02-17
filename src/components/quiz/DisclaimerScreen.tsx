import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Shield } from 'lucide-react';

interface DisclaimerScreenProps {
  onContinue: () => void;
  onBack: () => void;
}

export const DisclaimerScreen = ({ onContinue, onBack }: DisclaimerScreenProps) => {
  const [isAdult, setIsAdult] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-6 animate-fade-in">
      <div className="w-14 h-14 rounded-2xl bg-accent flex items-center justify-center mb-6">
        <Shield className="w-7 h-7 text-accent-foreground" />
      </div>

      <h2 className="text-xl font-semibold text-foreground text-center mb-6">
        Перед тем как начать
      </h2>

      <div className="bg-card rounded-xl border border-border p-5 mb-6 w-full max-w-xs shadow-soft-sm">
        <p className="text-sm text-muted-foreground leading-relaxed">
          Сервис не выдаёт займы, а подбирает доступные предложения от лицензированных финансовых организаций.
        </p>
      </div>

      <label className="flex items-center gap-3 mb-8 cursor-pointer w-full max-w-xs">
        <Checkbox
          checked={isAdult}
          onCheckedChange={(checked) => setIsAdult(checked === true)}
        />
        <span className="text-sm text-foreground">Мне больше 18 лет</span>
      </label>

      <div className="w-full max-w-xs space-y-3">
        <Button
          onClick={onContinue}
          disabled={!isAdult}
          size="lg"
          className="w-full h-12 text-base rounded-xl"
        >
          Продолжить
        </Button>
        <Button variant="ghost" onClick={onBack} className="w-full">
          Назад
        </Button>
      </div>
    </div>
  );
};
