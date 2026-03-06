import { atom } from 'nanostores';

// Por defecto iniciamos en Español
export const $lang = atom<'ES' | 'EN'>('ES');