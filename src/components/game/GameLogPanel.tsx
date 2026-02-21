import { GameLog } from '@/types/game';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Props {
  open: boolean;
  onClose: () => void;
  log: GameLog[];
}

const typeStyles: Record<GameLog['type'], string> = {
  income: 'text-primary',
  expense: 'text-destructive',
  event: 'text-accent-foreground',
  info: 'text-muted-foreground',
  warning: 'text-yellow-600',
  danger: 'text-destructive font-bold',
};

const typeEmoji: Record<GameLog['type'], string> = {
  income: '💰',
  expense: '💸',
  event: '⚡',
  info: 'ℹ️',
  warning: '⚠️',
  danger: '🚨',
};

export const GameLogPanel = ({ open, onClose, log }: Props) => (
  <Dialog open={open} onOpenChange={onClose}>
    <DialogContent className="max-w-sm">
      <DialogHeader>
        <DialogTitle className="text-base">📋 Журнал событий</DialogTitle>
      </DialogHeader>
      <ScrollArea className="h-64">
        <div className="space-y-2">
          {[...log].reverse().map((entry, i) => (
            <div key={i} className="flex gap-2 text-xs">
              <span className="text-muted-foreground shrink-0">М{entry.month} Д{entry.day}</span>
              <span>{typeEmoji[entry.type]}</span>
              <span className={typeStyles[entry.type]}>{entry.text}</span>
            </div>
          ))}
        </div>
      </ScrollArea>
    </DialogContent>
  </Dialog>
);
