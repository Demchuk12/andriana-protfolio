import { uk } from './uk.ts';
import { en } from './en.ts';

export const langs = ['uk', 'en'] as const;
export type Lang = (typeof langs)[number];
export type Dict = typeof uk;

/** Двомовний текст для даних (напрямки, фото, досвід) */
export type L = Record<Lang, string>;

const dicts: Record<Lang, Dict> = { uk, en };

export const isLang = (v: string): v is Lang => (langs as readonly string[]).includes(v);
/** Множина: plural('uk', 3, { one, few, many, other }) → 'поїздки' */
export const plural = (lang: Lang, n: number, forms: Record<'one' | 'few' | 'many' | 'other', string>) =>
	forms[new Intl.PluralRules(lang).select(n) as keyof typeof forms] ?? forms.other;

export const getDict = (lang: Lang): Dict => dicts[lang];
