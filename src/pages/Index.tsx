import { useCS2State } from '@/hooks/useCS2State';
import { AppHeader } from '@/components/cs2/AppHeader';
import { BottomNav } from '@/components/cs2/BottomNav';
import { HomePage } from '@/components/cs2/HomePage';
import { TournamentsPage } from '@/components/cs2/TournamentsPage';
import { TeamBuilderPage } from '@/components/cs2/TeamBuilderPage';
import { LeaderboardPage } from '@/components/cs2/LeaderboardPage';
import { ProfilePage } from '@/components/cs2/ProfilePage';
import { AdminPage } from '@/components/cs2/AdminPage';

const Index = () => {
  const {
    page, setPage,
    balance,
    selectedPlayers, togglePlayer,
    captainId, setCaptainId,
    budget, mode, switchMode,
    roleFilter, setRoleFilter,
    confirmTeam,
  } = useCS2State();

  return (
    <div className="min-h-screen bg-background max-w-lg mx-auto relative z-[1]">
      <AppHeader balance={balance} />
      <BottomNav active={page} onNavigate={setPage} />

      {page === 'home' && <HomePage onNavigate={setPage} />}
      {page === 'tournaments' && (
        <TournamentsPage onOpenTournament={() => setPage('team')} />
      )}
      {page === 'team' && (
        <TeamBuilderPage
          selectedPlayers={selectedPlayers}
          captainId={captainId}
          budget={budget}
          mode={mode}
          roleFilter={roleFilter}
          onTogglePlayer={togglePlayer}
          onSetCaptain={setCaptainId}
          onSwitchMode={switchMode}
          onSetRoleFilter={setRoleFilter}
          onConfirm={confirmTeam}
        />
      )}
      {page === 'leaderboard' && <LeaderboardPage />}
      {page === 'profile' && <ProfilePage balance={balance} />}
      {page === 'admin' && <AdminPage />}
    </div>
  );
};

export default Index;
