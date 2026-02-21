import { GameEvent, EventChoice } from '@/types/game';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface Props {
  event: GameEvent;
  onChoice: (choice: EventChoice) => void;
}

export const EventScreen = ({ event, onChoice }: Props) => (
  <div className="min-h-screen px-4 py-6 flex flex-col justify-center animate-fade-in">
    <Card className="border-2 border-primary/30">
      <CardContent className="p-6 text-center">
        <span className="text-4xl">{event.emoji}</span>
        <h2 className="text-lg font-bold text-foreground mt-3">{event.title}</h2>
        <p className="text-sm text-muted-foreground mt-2">{event.description}</p>

        <div className="mt-6 space-y-2">
          {event.choices.map((choice, i) => (
            <Button
              key={i}
              onClick={() => onChoice(choice)}
              variant={i === 0 ? 'default' : 'outline'}
              className="w-full h-11 rounded-xl text-sm"
            >
              {choice.text}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  </div>
);
