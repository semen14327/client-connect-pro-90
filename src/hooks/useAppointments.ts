import { useState, useEffect } from 'react';
import { Appointment } from '@/types/client';

const STORAGE_KEY = 'booking-app-appointments';

export const useAppointments = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      setAppointments(parsed.map((a: Appointment) => ({
        ...a,
        date: new Date(a.date),
        createdAt: new Date(a.createdAt)
      })));
    }
    setIsLoading(false);
  }, []);

  const saveAppointments = (newAppointments: Appointment[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newAppointments));
    setAppointments(newAppointments);
  };

  const addAppointment = (appointment: Omit<Appointment, 'id' | 'createdAt' | 'status' | 'notificationSent'>) => {
    const newAppointment: Appointment = {
      ...appointment,
      id: crypto.randomUUID(),
      status: 'scheduled',
      notificationSent: false,
      createdAt: new Date(),
    };
    saveAppointments([...appointments, newAppointment]);
    return newAppointment;
  };

  const updateAppointment = (id: string, updates: Partial<Appointment>) => {
    const updated = appointments.map(a => 
      a.id === id ? { ...a, ...updates } : a
    );
    saveAppointments(updated);
  };

  const deleteAppointment = (id: string) => {
    saveAppointments(appointments.filter(a => a.id !== id));
  };

  const getUpcomingAppointments = () => {
    const now = new Date();
    return appointments
      .filter(a => a.status === 'scheduled' && new Date(a.date) >= now)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  };

  const getTodayAppointments = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    return appointments
      .filter(a => {
        const appointmentDate = new Date(a.date);
        return appointmentDate >= today && appointmentDate < tomorrow;
      })
      .sort((a, b) => a.time.localeCompare(b.time));
  };

  return {
    appointments,
    isLoading,
    addAppointment,
    updateAppointment,
    deleteAppointment,
    getUpcomingAppointments,
    getTodayAppointments,
  };
};
