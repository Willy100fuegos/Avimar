export const WHATSAPP_NUMBER = '5219212183400';

export function openWhatsApp(message?: string) {
  const baseUrl = 'https://wa.me/';
  const encodedMessage = message ? `?text=${encodeURIComponent(message)}` : '';
  window.open(`${baseUrl}${WHATSAPP_NUMBER}${encodedMessage}`, '_blank', 'noopener,noreferrer');
}