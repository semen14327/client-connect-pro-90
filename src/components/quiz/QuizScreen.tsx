import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { QuizQuestion, QuizAnswers } from '@/types/quiz';
import { ChevronLeft } from 'lucide-react';

interface QuizScreenProps {
  question: QuizQuestion;
  currentIndex: number;
  totalQuestions: number;
  selectedValue: string | undefined;
  onSelect: (key: keyof QuizAnswers, value: string) => void;
  onBack: () => void;
}

export const QuizScreen = ({
  question,
  currentIndex,
  totalQuestions,
  selectedValue,
  onSelect,
  onBack,
}: QuizScreenProps) => {
  const progress = ((currentIndex + 1) / totalQuestions) * 100;

  return (
    <div className="flex flex-col min-h-[80vh] px-6 pt-4 animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button onClick={onBack} className="p-1 -ml-1 text-muted-foreground hover:text-foreground transition-colors">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div className="flex-1">
          <Progress value={progress} className="h-1.5" />
        </div>
        <span className="text-xs text-muted-foreground whitespace-nowrap">
          {currentIndex + 1}/{totalQuestions}
        </span>
      </div>

      {/* Question */}
      <h2 className="text-xl font-semibold text-foreground mb-6">
        {question.title}
      </h2>

      {/* Options */}
      <div className="space-y-3 flex-1">
        {question.options.map((option) => (
          <button
            key={option.value}
            onClick={() => onSelect(question.key, option.value)}
            className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-all text-left ${
              selectedValue === option.value
                ? 'border-primary bg-accent shadow-soft-sm'
                : 'border-border bg-card hover:border-primary/30 hover:shadow-soft-sm'
            }`}
          >
            <span className="text-xl">{option.icon}</span>
            <span className="text-sm font-medium text-foreground">{option.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
