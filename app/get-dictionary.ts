import 'server-only';
import { type Dictionary } from '@/dictionaries/es';
import { es } from '@/dictionaries/es';

// Sitio solo en español (el inglés se sacó en octubre de 2026).
export const getDictionary = async (): Promise<Dictionary> => es;
