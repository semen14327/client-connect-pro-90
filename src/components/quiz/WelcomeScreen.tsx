import { Button } from '@/components/ui/button';
import { Shield, TrendingUp, Clock } from 'lucide-react';

interface WelcomeScreenProps {
  onStart: () => void;
}

export const WelcomeScreen = ({ onStart }: WelcomeScreenProps) => (
  <div className="flex flex-col items-center justify-center min-h-[80vh] px-6 animate-fade-in">
    <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
      <TrendingUp className="w-8 h-8 text-primary" />
    </div>
    
    <h1 className="text-2xl font-bold text-foreground text-center mb-3">
      Подбор финансового решения под вашу ситуацию
    </h1>
    
    <p className="text-muted-foreground text-center mb-8 max-w-xs">
      Ответьте на несколько вопросов — это займёт не больше 1 минуты
    </p>

    <div className="w-full max-w-xs space-y-3 mb-8">
      {[
        { icon: Clock, text: 'Быстрый подбор за 1 минуту' },
        { icon: Shield, text: 'Безопасно и конфиденциально' },
        { icon: TrendingUp, text: 'Персональные предложения' },
      ].map(({ icon: Icon, text }) => (
        <div key={text} className="flex items-center gap-3 text-sm text-muted-foreground">
          <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center shrink-0">
            <Icon className="w-4 h-4 text-accent-foreground" />
          </div>
          {text}
        </div>
      ))}
    </div>

    <Button onClick={onStart} size="lg" className="w-full max-w-xs h-12 text-base rounded-xl shadow-soft-md">
      Начать
    </Button>
  </div>
);
