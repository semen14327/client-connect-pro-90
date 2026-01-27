import { useState, useEffect } from 'react';
import { Client } from '@/types/client';

const STORAGE_KEY = 'booking-app-clients';

export const useClients = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      setClients(parsed.map((c: Client) => ({
        ...c,
        createdAt: new Date(c.createdAt)
      })));
    }
    setIsLoading(false);
  }, []);

  const saveClients = (newClients: Client[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newClients));
    setClients(newClients);
  };

  const addClient = (client: Omit<Client, 'id' | 'createdAt'>) => {
    const newClient: Client = {
      ...client,
      id: crypto.randomUUID(),
      createdAt: new Date(),
    };
    saveClients([...clients, newClient]);
    return newClient;
  };

  const updateClient = (id: string, updates: Partial<Client>) => {
    const updated = clients.map(c => 
      c.id === id ? { ...c, ...updates } : c
    );
    saveClients(updated);
  };

  const deleteClient = (id: string) => {
    saveClients(clients.filter(c => c.id !== id));
  };

  const getClient = (id: string) => {
    return clients.find(c => c.id === id);
  };

  return {
    clients,
    isLoading,
    addClient,
    updateClient,
    deleteClient,
    getClient,
  };
};
