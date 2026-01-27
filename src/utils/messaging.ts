import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

export const formatPhoneForWhatsApp = (phone: string): string => {
  // Remove all non-digit characters
  return phone.replace(/\D/g, '');
};

export const generateAppointmentMessage = (
  clientName: string,
  date: Date,
  time: string,
  service: string
): string => {
  const formattedDate = format(date, 'd MMMM', { locale: ru });
  return `Здравствуйте, ${clientName}! 👋

Напоминаем о вашей записи:
📅 Дата: ${formattedDate}
🕐 Время: ${time}
💼 Услуга: ${service}

Ждём вас! Если нужно перенести запись, пожалуйста, сообщите заранее.`;
};

export const openWhatsApp = (phone: string, message: string): void => {
  const formattedPhone = formatPhoneForWhatsApp(phone);
  const encodedMessage = encodeURIComponent(message);
  window.open(`https://wa.me/${formattedPhone}?text=${encodedMessage}`, '_blank');
};

export const openTelegram = (username: string, message: string): void => {
  // Remove @ if present
  const cleanUsername = username.replace('@', '');
  const encodedMessage = encodeURIComponent(message);
  window.open(`https://t.me/${cleanUsername}?text=${encodedMessage}`, '_blank');
};

export const sendQuickWhatsApp = (phone: string): void => {
  const formattedPhone = formatPhoneForWhatsApp(phone);
  window.open(`https://wa.me/${formattedPhone}`, '_blank');
};

export const sendQuickTelegram = (username: string): void => {
  const cleanUsername = username.replace('@', '');
  window.open(`https://t.me/${cleanUsername}`, '_blank');
};
