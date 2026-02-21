import { CharacterPreset, Difficulty } from '@/types/game';
import { CHARACTER_PRESETS } from '@/data/gameConfig';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useState } from 'react';

interface Props {
  onStart: (character: CharacterPreset['type'], difficulty: Difficulty) => void;
}

export const CharacterSelectScreen = ({ onStart }: Props) => {
  const [selected, setSelected] = useState<CharacterPreset | null>(null);
  const [difficulty, setDifficulty] = useState<Difficulty>('normal');

  const difficulties: { value: Difficulty; label: string; emoji: string }[] = [
    { value: 'easy', label: 'Лайтово', emoji: '😌' },
    { value: 'normal', label: 'Реализм', emoji: '😐' },
    { value: 'hard', label: 'Хардкор', emoji: '💀' },
  ];

  return (
    <div className="min-h-screen px-4 py-6 animate-fade-in">
      <div className="text-center mb-6">
        <h1 className="text-xl font-bold text-foreground">До зарплаты</h1>
        <p className="text-sm text-muted-foreground mt-1">Русский симулятор выживания</p>
      </div>

      <p className="text-sm font-medium text-foreground mb-3">Выбери персонажа:</p>
      <div className="space-y-2 mb-6">
        {CHARACTER_PRESETS.map(preset => (
          <Card
            key={preset.type}
            className={`cursor-pointer transition-all ${
              selected?.type === preset.type
                ? 'ring-2 ring-primary bg-accent/50'
                : 'hover:bg-accent/30'
            }`}
            onClick={() => setSelected(preset)}
          >
            <CardContent className="p-3 flex items-start gap-3">
              <span className="text-2xl">{preset.emoji}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-sm text-foreground">{preset.title}</span>
                  <span className="text-xs text-muted-foreground bg-secondary px-2 py-0.5 rounded-full">{preset.difficulty}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">{preset.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <p className="text-sm font-medium text-foreground mb-3">Сложность:</p>
      <div className="grid grid-cols-3 gap-2 mb-6">
        {difficulties.map(d => (
          <button
            key={d.value}
            onClick={() => setDifficulty(d.value)}
            className={`p-3 rounded-xl text-center transition-all border ${
              difficulty === d.value
                ? 'border-primary bg-primary/10 text-primary'
                : 'border-border bg-card text-muted-foreground hover:bg-accent/30'
            }`}
          >
            <span className="text-lg">{d.emoji}</span>
            <p className="text-xs font-medium mt-1">{d.label}</p>
          </button>
        ))}
      </div>

      <Button
        onClick={() => selected && onStart(selected.type, difficulty)}
        disabled={!selected}
        size="lg"
        className="w-full h-12 text-base rounded-xl"
      >
        Начать выживание
      </Button>
    </div>
  );
};
