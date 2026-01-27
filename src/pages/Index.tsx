import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useClients } from '@/hooks/useClients';
import { useAppointments } from '@/hooks/useAppointments';
import { ClientCard } from '@/components/ClientCard';
import { AppointmentCard } from '@/components/AppointmentCard';
import { AddClientDialog } from '@/components/AddClientDialog';
import { AddAppointmentDialog } from '@/components/AddAppointmentDialog';
import { EmptyState } from '@/components/EmptyState';
import { Client, Appointment } from '@/types/client';
import { 
  Users, 
  Calendar, 
  Plus, 
  Search,
  CalendarDays,
  MessageCircle
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const { clients, addClient, updateClient, deleteClient, getClient } = useClients();
  const { 
    appointments, 
    addAppointment, 
    updateAppointment, 
    getUpcomingAppointments,
    getTodayAppointments 
  } = useAppointments();
  const { toast } = useToast();

  const [activeTab, setActiveTab] = useState('clients');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddClientOpen, setIsAddClientOpen] = useState(false);
  const [isAddAppointmentOpen, setIsAddAppointmentOpen] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [selectedClientForBooking, setSelectedClientForBooking] = useState<Client | null>(null);

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.phone.includes(searchQuery)
  );

  const upcomingAppointments = getUpcomingAppointments();
  const todayAppointments = getTodayAppointments();

  const handleAddClient = (clientData: Omit<Client, 'id' | 'createdAt'>) => {
    if (editingClient) {
      updateClient(editingClient.id, clientData);
      toast({
        title: 'Клиент обновлён',
        description: `Данные ${clientData.name} сохранены`,
      });
    } else {
      addClient(clientData);
      toast({
        title: 'Клиент добавлен',
        description: `${clientData.name} добавлен в базу`,
      });
    }
    setEditingClient(null);
  };

  const handleDeleteClient = (id: string) => {
    const client = getClient(id);
    deleteClient(id);
    toast({
      title: 'Клиент удалён',
      description: client ? `${client.name} удалён из базы` : 'Клиент удалён',
    });
  };

  const handleEditClient = (client: Client) => {
    setEditingClient(client);
    setIsAddClientOpen(true);
  };

  const handleBookAppointment = (client: Client) => {
    setSelectedClientForBooking(client);
    setIsAddAppointmentOpen(true);
  };

  const handleAddAppointment = (data: { clientId: string; clientName: string; date: Date; time: string; service: string }) => {
    addAppointment(data);
    toast({
      title: 'Запись создана',
      description: `${data.clientName} записан на ${data.time}`,
    });
    setSelectedClientForBooking(null);
  };

  const handleMarkComplete = (id: string) => {
    updateAppointment(id, { status: 'completed' });
    toast({
      title: 'Запись завершена',
      description: 'Статус изменён на "Завершено"',
    });
  };

  const handleCancelAppointment = (id: string) => {
    updateAppointment(id, { status: 'cancelled' });
    toast({
      title: 'Запись отменена',
      description: 'Статус изменён на "Отменено"',
    });
  };

  const handleNotify = (appointment: Appointment, client: Client, method: 'whatsapp' | 'telegram') => {
    updateAppointment(appointment.id, { notificationSent: true });
    toast({
      title: 'Напоминание отправлено',
      description: `Сообщение открыто в ${method === 'whatsapp' ? 'WhatsApp' : 'Telegram'}`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-xl border-b border-border/50 shadow-soft-sm">
        <div className="container max-w-2xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-foreground">📅 Записи</h1>
              <p className="text-sm text-muted-foreground">
                {todayAppointments.length > 0 
                  ? `Сегодня: ${todayAppointments.length} ${todayAppointments.length === 1 ? 'запись' : 'записей'}`
                  : 'Нет записей на сегодня'
                }
              </p>
            </div>
            <Button 
              size="icon" 
              onClick={() => {
                if (activeTab === 'clients') {
                  setEditingClient(null);
                  setIsAddClientOpen(true);
                } else {
                  setActiveTab('clients');
                  toast({
                    title: 'Выберите клиента',
                    description: 'Нажмите "Записать" на карточке клиента',
                  });
                }
              }}
              className="rounded-full shadow-soft-md"
            >
              <Plus className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container max-w-2xl mx-auto px-4 py-4 pb-24">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full mb-4 bg-secondary/50 p-1">
            <TabsTrigger value="clients" className="flex-1 gap-2">
              <Users className="w-4 h-4" />
              Клиенты
            </TabsTrigger>
            <TabsTrigger value="appointments" className="flex-1 gap-2">
              <Calendar className="w-4 h-4" />
              Записи
            </TabsTrigger>
          </TabsList>

          <TabsContent value="clients" className="space-y-4 animate-fade-in">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Поиск клиентов..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-11 bg-card"
              />
            </div>

            {/* Client List */}
            {filteredClients.length > 0 ? (
              <div className="space-y-3">
                {filteredClients.map((client) => (
                  <ClientCard
                    key={client.id}
                    client={client}
                    onEdit={handleEditClient}
                    onDelete={handleDeleteClient}
                    onBookAppointment={handleBookAppointment}
                  />
                ))}
              </div>
            ) : (
              <EmptyState
                icon={<Users className="w-8 h-8 text-muted-foreground" />}
                title={searchQuery ? 'Клиенты не найдены' : 'Нет клиентов'}
                description={searchQuery ? 'Попробуйте изменить запрос' : 'Добавьте первого клиента, чтобы начать'}
                action={
                  !searchQuery && (
                    <Button onClick={() => {
                      setEditingClient(null);
                      setIsAddClientOpen(true);
                    }}>
                      <Plus className="w-4 h-4 mr-2" />
                      Добавить клиента
                    </Button>
                  )
                }
              />
            )}
          </TabsContent>

          <TabsContent value="appointments" className="space-y-4 animate-fade-in">
            {/* Today's Appointments */}
            {todayAppointments.length > 0 && (
              <div className="space-y-3">
                <h2 className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <CalendarDays className="w-4 h-4 text-primary" />
                  Сегодня
                </h2>
                {todayAppointments.map((appointment) => (
                  <AppointmentCard
                    key={appointment.id}
                    appointment={appointment}
                    client={getClient(appointment.clientId)}
                    onMarkComplete={handleMarkComplete}
                    onCancel={handleCancelAppointment}
                    onNotify={handleNotify}
                  />
                ))}
              </div>
            )}

            {/* Upcoming Appointments */}
            {upcomingAppointments.length > 0 ? (
              <div className="space-y-3">
                <h2 className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  Предстоящие записи
                </h2>
                {upcomingAppointments.map((appointment) => (
                  <AppointmentCard
                    key={appointment.id}
                    appointment={appointment}
                    client={getClient(appointment.clientId)}
                    onMarkComplete={handleMarkComplete}
                    onCancel={handleCancelAppointment}
                    onNotify={handleNotify}
                  />
                ))}
              </div>
            ) : (
              <EmptyState
                icon={<MessageCircle className="w-8 h-8 text-muted-foreground" />}
                title="Нет предстоящих записей"
                description="Записи появятся здесь после добавления клиентов"
                action={
                  <Button onClick={() => setActiveTab('clients')}>
                    <Users className="w-4 h-4 mr-2" />
                    Перейти к клиентам
                  </Button>
                }
              />
            )}
          </TabsContent>
        </Tabs>
      </main>

      {/* Dialogs */}
      <AddClientDialog
        open={isAddClientOpen}
        onOpenChange={(open) => {
          setIsAddClientOpen(open);
          if (!open) setEditingClient(null);
        }}
        onSave={handleAddClient}
        editingClient={editingClient}
      />

      <AddAppointmentDialog
        open={isAddAppointmentOpen}
        onOpenChange={(open) => {
          setIsAddAppointmentOpen(open);
          if (!open) setSelectedClientForBooking(null);
        }}
        onSave={handleAddAppointment}
        selectedClient={selectedClientForBooking}
      />
    </div>
  );
};

export default Index;
