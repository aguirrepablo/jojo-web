import 'server-only';
import { type Dictionary } from '@/dictionaries/es';
import { en } from '@/dictionaries/en';
import { es } from '@/dictionaries/es';

const dictionaries = {
  en: () => Promise.resolve(en),
  es: () => Promise.resolve(es),
};

export const getDictionary = async (locale: string): Promise<Dictionary> => {
  return dictionaries[locale as keyof typeof dictionaries]?.() ?? dictionaries.es();
};
