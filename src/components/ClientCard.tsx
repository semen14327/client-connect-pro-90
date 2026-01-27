import { Client } from '@/types/client';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageCircle, Send, User, Phone, MoreVertical, Trash2, Edit } from 'lucide-react';
import { sendQuickWhatsApp, sendQuickTelegram } from '@/utils/messaging';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface ClientCardProps {
  client: Client;
  onEdit: (client: Client) => void;
  onDelete: (id: string) => void;
  onBookAppointment: (client: Client) => void;
}

export const ClientCard = ({ client, onEdit, onDelete, onBookAppointment }: ClientCardProps) => {
  return (
    <Card className="group hover:shadow-soft-lg transition-all duration-300 animate-fade-in border-border/50">
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <User className="w-5 h-5 text-primary" />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="font-semibold text-foreground truncate">{client.name}</h3>
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <Phone className="w-3.5 h-3.5" />
                <span className="truncate">{client.phone}</span>
              </div>
              {client.telegramUsername && (
                <p className="text-xs text-telegram mt-0.5 truncate">
                  @{client.telegramUsername.replace('@', '')}
                </p>
              )}
            </div>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onEdit(client)}>
                <Edit className="w-4 h-4 mr-2" />
                Редактировать
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => onDelete(client.id)}
                className="text-destructive focus:text-destructive"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Удалить
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        <div className="flex items-center gap-2 mt-4">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1 bg-whatsapp/10 border-whatsapp/20 text-whatsapp hover:bg-whatsapp hover:text-whatsapp-foreground transition-colors"
            onClick={() => sendQuickWhatsApp(client.phone)}
          >
            <MessageCircle className="w-4 h-4 mr-1.5" />
            WhatsApp
          </Button>
          
          {client.telegramUsername && (
            <Button 
              variant="outline" 
              size="sm" 
              className="flex-1 bg-telegram/10 border-telegram/20 text-telegram hover:bg-telegram hover:text-telegram-foreground transition-colors"
              onClick={() => sendQuickTelegram(client.telegramUsername!)}
            >
              <Send className="w-4 h-4 mr-1.5" />
              Telegram
            </Button>
          )}
          
          <Button 
            variant="default" 
            size="sm"
            onClick={() => onBookAppointment(client)}
          >
            Записать
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
