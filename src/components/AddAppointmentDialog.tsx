import { useState, useEffect } from 'react';
import { Client } from '@/types/client';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { CalendarIcon, Clock, Briefcase } from 'lucide-react';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { cn } from '@/lib/utils';

interface AddAppointmentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (appointment: { clientId: string; clientName: string; date: Date; time: string; service: string }) => void;
  selectedClient?: Client | null;
}

const timeSlots = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
  '15:00', '15:30', '16:00', '16:30', '17:00', '17:30',
  '18:00', '18:30', '19:00', '19:30', '20:00'
];

export const AddAppointmentDialog = ({ 
  open, 
  onOpenChange, 
  onSave, 
  selectedClient 
}: AddAppointmentDialogProps) => {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [time, setTime] = useState('');
  const [service, setService] = useState('');
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  useEffect(() => {
    if (open) {
      setDate(undefined);
      setTime('');
      setService('');
    }
  }, [open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedClient || !date || !time || !service.trim()) return;
    
    onSave({
      clientId: selectedClient.id,
      clientName: selectedClient.name,
      date,
      time,
      service: service.trim(),
    });
    onOpenChange(false);
  };

  const isValid = selectedClient && date && time && service.trim();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Новая запись</DialogTitle>
        </DialogHeader>
        
        {selectedClient && (
          <div className="bg-secondary/50 rounded-lg p-3 mb-2">
            <p className="text-sm text-muted-foreground">Клиент</p>
            <p className="font-semibold text-foreground">{selectedClient.name}</p>
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <CalendarIcon className="w-4 h-4 text-muted-foreground" />
              Дата
            </Label>
            <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal h-11",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, 'd MMMM yyyy', { locale: ru }) : 'Выберите дату'}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(newDate) => {
                    setDate(newDate);
                    setIsCalendarOpen(false);
                  }}
                  disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-muted-foreground" />
              Время
            </Label>
            <div className="grid grid-cols-4 gap-2 max-h-32 overflow-y-auto p-1">
              {timeSlots.map((slot) => (
                <Button
                  key={slot}
                  type="button"
                  variant={time === slot ? "default" : "outline"}
                  size="sm"
                  onClick={() => setTime(slot)}
                  className="text-sm"
                >
                  {slot}
                </Button>
              ))}
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="service" className="flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-muted-foreground" />
              Услуга
            </Label>
            <Input
              id="service"
              value={service}
              onChange={(e) => setService(e.target.value)}
              placeholder="Стрижка, маникюр, консультация..."
              className="h-11"
            />
          </div>
          
          <div className="flex gap-3 pt-2">
            <Button 
              type="button" 
              variant="outline" 
              className="flex-1"
              onClick={() => onOpenChange(false)}
            >
              Отмена
            </Button>
            <Button 
              type="submit" 
              className="flex-1"
              disabled={!isValid}
            >
              Записать
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
