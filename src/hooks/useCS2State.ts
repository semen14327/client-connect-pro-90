import { useState, useCallback } from 'react';
import { SelectedPlayer, PlayerRole, PageName } from '@/types/cs2';
import { MAX_BUDGET, MAX_PLAYERS } from '@/data/cs2Data';
import { toast } from 'sonner';

export const useCS2State = () => {
  const [page, setPage] = useState<PageName>('home');
  const [balance, setBalance] = useState(0);
  const [selectedPlayers, setSelectedPlayers] = useState<SelectedPlayer[]>([]);
  const [captainId, setCaptainId] = useState<number | null>(null);
  const [budget, setBudget] = useState(MAX_BUDGET);
  const [mode, setMode] = useState<'paid' | 'free'>('paid');
  const [roleFilter, setRoleFilter] = useState<PlayerRole | 'all'>('all');

  const togglePlayer = useCallback((player: SelectedPlayer) => {
    setSelectedPlayers(prev => {
      const idx = prev.findIndex(p => p.id === player.id);
      if (idx >= 0) {
        setBudget(b => b + player.price);
        if (captainId === player.id) setCaptainId(null);
        return prev.filter(p => p.id !== player.id);
      }
      if (prev.length >= MAX_PLAYERS) {
        toast.error('Уже выбрано 5 игроков!');
        return prev;
      }
      if (budget < player.price) {
        toast.error('Не хватает бюджета!');
        return prev;
      }
      if (player.role === 'AWP' && prev.some(p => p.role === 'AWP')) {
        toast.error('Максимум 1 AWP!');
        return prev;
      }
      setBudget(b => b - player.price);
      if (prev.length === 0) setCaptainId(player.id);
      return [...prev, player];
    });
  }, [budget, captainId]);

  const resetTeam = useCallback(() => {
    setSelectedPlayers([]);
    setBudget(MAX_BUDGET);
    setCaptainId(null);
  }, []);

  const switchMode = useCallback((newMode: 'paid' | 'free') => {
    setMode(newMode);
    resetTeam();
  }, [resetTeam]);

  const confirmTeam = useCallback(() => {
    if (selectedPlayers.length !== MAX_PLAYERS) {
      toast.error('Нужно выбрать 5 игроков!');
      return;
    }
    if (!captainId) {
      toast.error('Выберите капитана!');
      return;
    }
    toast.success('✅ Состав зафиксирован!');
  }, [selectedPlayers, captainId]);

  return {
    page, setPage,
    balance, setBalance,
    selectedPlayers, togglePlayer,
    captainId, setCaptainId,
    budget, mode, switchMode,
    roleFilter, setRoleFilter,
    resetTeam, confirmTeam,
  };
};
