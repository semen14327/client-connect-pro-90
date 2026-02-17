import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { ShieldCheck } from 'lucide-react';

interface ConfirmScreenProps {
  onConfirm: () => void;
  onBack: () => void;
}

export const ConfirmScreen = ({ onConfirm, onBack }: ConfirmScreenProps) => {
  const [checks, setChecks] = useState({ intent: false, redirect: false, terms: false });

  const allChecked = checks.intent && checks.redirect && checks.terms;

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-6 animate-fade-in">
      <div className="w-14 h-14 rounded-2xl bg-accent flex items-center justify-center mb-6">
        <ShieldCheck className="w-7 h-7 text-accent-foreground" />
      </div>

      <h2 className="text-xl font-semibold text-foreground text-center mb-2">
        Подтвердите намерение
      </h2>
      <p className="text-sm text-muted-foreground text-center mb-6">
        Чтобы показать конкретные предложения
      </p>

      <div className="w-full max-w-xs space-y-4 mb-8">
        {[
          { key: 'intent' as const, label: 'Я действительно рассматриваю займ' },
          { key: 'redirect' as const, label: 'Готов перейти на сайт партнёра' },
          { key: 'terms' as const, label: 'Понимаю, что условия устанавливает МФО' },
        ].map(({ key, label }) => (
          <label key={key} className="flex items-start gap-3 cursor-pointer">
            <Checkbox
              checked={checks[key]}
              onCheckedChange={(checked) => setChecks((prev) => ({ ...prev, [key]: checked === true }))}
              className="mt-0.5"
            />
            <span className="text-sm text-foreground leading-snug">{label}</span>
          </label>
        ))}
      </div>

      <div className="w-full max-w-xs space-y-3">
        <Button
          onClick={onConfirm}
          disabled={!allChecked}
          size="lg"
          className="w-full h-12 text-base rounded-xl"
        >
          Показать предложения
        </Button>
        <Button variant="ghost" onClick={onBack} className="w-full">
          Назад
        </Button>
      </div>
    </div>
  );
};
