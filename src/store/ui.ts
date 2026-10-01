import { atom } from 'nanostores';

export type Language = 'ES' | 'EN';

export const $lang = atom<Language>('ES');

// Inicialización y sincronización en el cliente
if (typeof window !== 'undefined') {
  try {
    const stored = localStorage.getItem('lang');
    if (stored === 'EN' || stored === 'ES') {
      $lang.set(stored);
      document.documentElement.lang = stored.toLowerCase();
    } else {
      document.documentElement.lang = 'es';
    }
  } catch {}

  $lang.listen((lang) => {
    try {
      localStorage.setItem('lang', lang);
    } catch {}
    if (typeof document !== 'undefined') {
      document.documentElement.lang = lang.toLowerCase();
    }
  });
}

// Estado global para controlar si hay algún modal abierto
export const $isModalOpen = atom<boolean>(false);
