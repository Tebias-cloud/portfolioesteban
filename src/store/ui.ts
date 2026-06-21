import { atom } from 'nanostores';

// Por defecto iniciamos en Español
export const $lang = atom<'ES' | 'EN'>('ES');

// Estado global para controlar si hay algún modal abierto
export const $isModalOpen = atom<boolean>(false);