import { useGameState } from '@/hooks/useGameState';
import { CharacterSelectScreen } from '@/components/game/CharacterSelectScreen';
import { GameDashboard } from '@/components/game/GameDashboard';
import { EventScreen } from '@/components/game/EventScreen';
import { MonthEndScreen } from '@/components/game/MonthEndScreen';
import { GameOverScreen } from '@/components/game/GameOverScreen';

const Index = () => {
  const {
    state,
    startGame,
    advanceDay,
    resolveEvent,
    startNextMonth,
    takeLoan,
    payDebt,
    resetGame,
  } = useGameState();

  if (!state) {
    return (
      <div className="min-h-screen bg-background max-w-lg mx-auto">
        <CharacterSelectScreen onStart={startGame} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background max-w-lg mx-auto">
      {state.phase === 'daily' && (
        <GameDashboard
          state={state}
          onAction={advanceDay}
          onTakeLoan={takeLoan}
          onPayDebt={payDebt}
        />
      )}
      {state.phase === 'event' && state.currentEvent && (
        <EventScreen event={state.currentEvent} onChoice={resolveEvent} />
      )}
      {state.phase === 'month-end' && state.monthSummary && (
        <MonthEndScreen state={state} summary={state.monthSummary} onContinue={startNextMonth} />
      )}
      {(state.phase === 'game-over' || state.phase === 'victory') && (
        <GameOverScreen state={state} onRestart={resetGame} />
      )}
    </div>
  );
};

export default Index;
