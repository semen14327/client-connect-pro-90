import { Copy, Star, ExternalLink } from 'lucide-react';
import { toast } from 'sonner';

interface Props {
  balance: number;
}

export const ProfilePage = ({ balance }: Props) => {
  const copyRef = () => {
    navigator.clipboard?.writeText('https://t.me/CS2tournaments_bot?start=ref_...')
      .then(() => toast.success('🔗 Ссылка скопирована!'));
  };

  return (
    <div className="p-4 animate-fade-in">
      {/* Profile header */}
      <div className="flex items-center gap-3.5 mb-5">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 border-2 border-primary flex items-center justify-center text-3xl shrink-0">
          🎮
        </div>
        <div>
          <h2 className="font-display text-xl font-bold tracking-wide">@username</h2>
          <p className="text-xs text-muted-foreground mt-0.5">С нами с 26.02.2026</p>
          <span className="inline-block mt-1 text-xs bg-primary/15 text-primary px-2 py-0.5 rounded font-semibold">
            ИГРОК
          </span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-2.5 mb-4">
        {[
          { label: 'ТУРНИРОВ', value: '0' },
          { label: 'ПОБЕД', value: '0' },
          { label: 'БАЛАНС ⭐', value: String(balance) },
          { label: 'РЕФЕРАЛОВ', value: '0' },
        ].map(s => (
          <div key={s.label} className="bg-secondary border border-border rounded-xl p-3.5 text-center">
            <p className="font-display text-2xl font-bold text-gradient-primary">{s.value}</p>
            <p className="text-[11px] text-muted-foreground font-medium tracking-wider mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Referral */}
      <div className="bg-card border border-border rounded-xl p-4 mb-4">
        <p className="font-display text-[13px] font-semibold tracking-widest uppercase text-muted-foreground mb-3">
          🔗 Реферальная ссылка
        </p>
        <div
          onClick={copyRef}
          className="bg-secondary border border-dashed border-border rounded-xl p-3 flex items-center gap-2.5 cursor-pointer mb-3 hover:border-primary/30 transition-colors"
        >
          <span className="flex-1 text-xs text-accent break-all leading-relaxed">
            https://t.me/CS2tournaments_bot?start=ref_...
          </span>
          <Copy className="w-5 h-5 text-muted-foreground shrink-0" />
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed">
          Приглашайте друзей и получайте <strong className="text-primary">5%</strong> от каждого их взноса в турнир автоматически!
        </p>
      </div>

      {/* Top up */}
      <button className="w-full bg-gradient-primary text-primary-foreground font-display text-[15px] font-bold tracking-wider uppercase py-3.5 rounded-xl flex items-center justify-center gap-2 active:scale-[0.97] transition-transform">
        <Star className="w-5 h-5 fill-current" />
        Пополнить баланс
      </button>

      {/* History */}
      <div className="bg-card border border-border rounded-xl p-4 mt-4">
        <p className="font-display text-[13px] font-semibold tracking-widest uppercase text-muted-foreground mb-3">
          📜 Последние операции
        </p>
        <div className="text-center text-muted-foreground/60 py-5 text-[13px]">
          Операций пока нет.<br />Пополните баланс и участвуйте!
        </div>
      </div>
    </div>
  );
};
