import { useEffect, useState } from 'react';

const steps = [
  'Анализируем доступные варианты…',
  'Проверяем условия партнёров…',
  'Подбираем лучшие предложения…',
];

interface AnalyzingScreenProps {
  onComplete: () => void;
}

export const AnalyzingScreen = ({ onComplete }: AnalyzingScreenProps) => {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= steps.length - 1) {
          clearInterval(interval);
          setTimeout(onComplete, 1200);
          return prev;
        }
        return prev + 1;
      });
    }, 2000);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-6 animate-fade-in">
      {/* Spinner */}
      <div className="relative w-20 h-20 mb-8">
        <div className="absolute inset-0 rounded-full border-4 border-muted" />
        <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin" />
      </div>

      <div className="space-y-3 text-center">
        {steps.map((step, i) => (
          <p
            key={step}
            className={`text-sm transition-all duration-500 ${
              i <= currentStep ? 'text-foreground opacity-100' : 'text-muted-foreground opacity-40'
            }`}
          >
            {i < currentStep ? '✓' : i === currentStep ? '⏳' : '○'} {step}
          </p>
        ))}
      </div>
    </div>
  );
};
