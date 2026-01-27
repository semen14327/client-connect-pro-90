export interface Client {
  id: string;
  name: string;
  phone: string;
  telegramUsername?: string;
  notes?: string;
  createdAt: Date;
}

export interface Appointment {
  id: string;
  clientId: string;
  clientName: string;
  date: Date;
  time: string;
  service: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  notificationSent: boolean;
  createdAt: Date;
}
