import { Appointment, Client } from '@/types/client';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, Send, Calendar, Clock, CheckCircle, X } from 'lucide-react';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { openWhatsApp, openTelegram, generateAppointmentMessage } from '@/utils/messaging';

interface AppointmentCardProps {
  appointment: Appointment;
  client?: Client;
  onMarkComplete: (id: string) => void;
  onCancel: (id: string) => void;
  onNotify: (appointment: Appointment, client: Client, method: 'whatsapp' | 'telegram') => void;
}

export const AppointmentCard = ({ 
  appointment, 
  client, 
  onMarkComplete, 
  onCancel,
  onNotify 
}: AppointmentCardProps) => {
  const statusColors = {
    scheduled: 'bg-primary/10 text-primary border-primary/20',
    completed: 'bg-success/10 text-success border-success/20',
    cancelled: 'bg-muted text-muted-foreground border-muted',
  };

  const statusLabels = {
    scheduled: 'Запланировано',
    completed: 'Завершено',
    cancelled: 'Отменено',
  };

  const handleNotify = (method: 'whatsapp' | 'telegram') => {
    if (!client) return;
    
    const message = generateAppointmentMessage(
      client.name,
      appointment.date,
      appointment.time,
      appointment.service
    );

    if (method === 'whatsapp') {
      openWhatsApp(client.phone, message);
    } else if (client.telegramUsername) {
      openTelegram(client.telegramUsername, message);
    }
    
    onNotify(appointment, client, method);
  };

  return (
    <Card className="group hover:shadow-soft-lg transition-all duration-300 animate-slide-up border-border/50">
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-semibold text-foreground">{appointment.clientName}</h3>
              <Badge variant="outline" className={statusColors[appointment.status]}>
                {statusLabels[appointment.status]}
              </Badge>
            </div>
            
            <div className="space-y-1 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{format(appointment.date, 'd MMMM yyyy', { locale: ru })}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{appointment.time}</span>
              </div>
              <p className="text-foreground font-medium mt-1">{appointment.service}</p>
            </div>
          </div>
        </div>
        
        {appointment.status === 'scheduled' && (
          <div className="flex flex-wrap items-center gap-2 mt-4 pt-3 border-t border-border/50">
            <Button 
              variant="outline" 
              size="sm" 
              className="bg-whatsapp/10 border-whatsapp/20 text-whatsapp hover:bg-whatsapp hover:text-whatsapp-foreground"
              onClick={() => handleNotify('whatsapp')}
            >
              <MessageCircle className="w-4 h-4 mr-1.5" />
              Напомнить
            </Button>
            
            {client?.telegramUsername && (
              <Button 
                variant="outline" 
                size="sm" 
                className="bg-telegram/10 border-telegram/20 text-telegram hover:bg-telegram hover:text-telegram-foreground"
                onClick={() => handleNotify('telegram')}
              >
                <Send className="w-4 h-4 mr-1.5" />
                Telegram
              </Button>
            )}
            
            <div className="flex-1" />
            
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => onCancel(appointment.id)}
              className="text-muted-foreground hover:text-destructive"
            >
              <X className="w-4 h-4 mr-1" />
              Отменить
            </Button>
            
            <Button 
              variant="default" 
              size="sm"
              onClick={() => onMarkComplete(appointment.id)}
            >
              <CheckCircle className="w-4 h-4 mr-1.5" />
              Завершить
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
