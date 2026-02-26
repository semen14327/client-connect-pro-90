import { Home, Trophy, Crosshair, BarChart3, User, Settings } from 'lucide-react';
import { PageName } from '@/types/cs2';

interface Props {
  active: PageName;
  onNavigate: (page: PageName) => void;
}

const NAV_ITEMS: { id: PageName; icon: React.ElementType; label: string }[] = [
  { id: 'home', icon: Home, label: 'Главная' },
  { id: 'tournaments', icon: Trophy, label: 'Турниры' },
  { id: 'team', icon: Crosshair, label: 'Состав' },
  { id: 'leaderboard', icon: BarChart3, label: 'Рейтинг' },
  { id: 'profile', icon: User, label: 'Профиль' },
  { id: 'admin', icon: Settings, label: 'Админ' },
];

export const BottomNav = ({ active, onNavigate }: Props) => (
  <nav className="sticky top-[53px] z-40 flex bg-card border-b border-border overflow-x-auto scrollbar-hide">
    {NAV_ITEMS.map(item => {
      const Icon = item.icon;
      const isActive = active === item.id;
      return (
        <button
          key={item.id}
          onClick={() => onNavigate(item.id)}
          className={`flex-1 min-w-[70px] py-2.5 px-1 flex flex-col items-center gap-0.5 text-[11px] font-medium transition-colors relative
            ${isActive ? 'text-primary' : 'text-muted-foreground/60 hover:text-muted-foreground'}`}
        >
          <Icon className="w-5 h-5" />
          {item.label}
          {isActive && (
            <span className="absolute bottom-0 left-[20%] right-[20%] h-0.5 bg-primary rounded-t" />
          )}
          {item.id === 'admin' && (
            <span className="absolute top-2 right-3.5 w-1.5 h-1.5 bg-destructive rounded-full" />
          )}
        </button>
      );
    })}
  </nav>
);
