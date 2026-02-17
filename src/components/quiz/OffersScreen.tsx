import { MfoOffer } from '@/types/quiz';
import { Button } from '@/components/ui/button';
import { ExternalLink, Building2 } from 'lucide-react';

interface OffersScreenProps {
  offers: MfoOffer[];
  onSelectOffer: (offer: MfoOffer) => void;
}

const approvalLabel: Record<string, { text: string; className: string }> = {
  high: { text: 'Высокая', className: 'text-success' },
  medium: { text: 'Средняя', className: 'text-warning' },
  low: { text: 'Низкая', className: 'text-destructive' },
};

export const OffersScreen = ({ offers, onSelectOffer }: OffersScreenProps) => (
  <div className="flex flex-col min-h-[80vh] px-6 pt-6 animate-fade-in">
    <h2 className="text-xl font-semibold text-foreground mb-1">
      Подобранные предложения
    </h2>
    <p className="text-sm text-muted-foreground mb-6">
      Лучшие варианты на основе ваших ответов
    </p>

    <div className="space-y-4 flex-1">
      {offers.map((offer) => {
        const approval = approvalLabel[offer.approval_rate] || approvalLabel.medium;
        return (
          <div
            key={offer.id}
            className="bg-card rounded-xl border border-border p-5 shadow-soft-sm hover:shadow-soft-md transition-shadow"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center">
                <Building2 className="w-5 h-5 text-accent-foreground" />
              </div>
              <span className="font-semibold text-foreground">{offer.name}</span>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
              <div>
                <span className="text-muted-foreground">Сумма</span>
                <p className="font-medium text-foreground">
                  {offer.amount_min.toLocaleString('ru')} – {offer.amount_max.toLocaleString('ru')} ₽
                </p>
              </div>
              <div>
                <span className="text-muted-foreground">Срок</span>
                <p className="font-medium text-foreground">
                  {offer.term_min_days} – {offer.term_max_days} дней
                </p>
              </div>
              <div className="col-span-2">
                <span className="text-muted-foreground">Одобрение</span>
                <p className={`font-medium ${approval.className}`}>{approval.text}</p>
              </div>
            </div>

            <Button
              onClick={() => onSelectOffer(offer)}
              className="w-full rounded-xl h-11"
            >
              Перейти
              <ExternalLink className="w-4 h-4 ml-1" />
            </Button>
          </div>
        );
      })}
    </div>

    <p className="text-xs text-muted-foreground text-center mt-6 mb-4">
      Сервис не является кредитной организацией. 18+
    </p>
  </div>
);
