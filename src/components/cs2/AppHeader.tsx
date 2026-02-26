import { Star } from 'lucide-react';

interface Props {
  balance: number;
}

export const AppHeader = ({ balance }: Props) => (
  <header className="sticky top-0 z-50 bg-background/92 backdrop-blur-xl border-b border-border px-4 py-3 flex items-center justify-between">
    <div className="font-display text-xl font-bold tracking-widest">
      <span className="text-gradient-primary">CS2</span>
      <span className="text-muted-foreground font-normal ml-1">FANTASY</span>
    </div>
    <div className="flex items-center gap-1.5 bg-secondary border border-border rounded-full px-3 py-1.5 text-sm font-semibold">
      <Star className="w-4 h-4 text-primary fill-primary" />
      <span>{balance}</span>
    </div>
  </header>
);
