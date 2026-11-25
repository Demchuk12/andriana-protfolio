import type { L } from '#lib/i18n/index.ts';

/** Двомовний текст з адмінки: англійська необов'язкова */
export type RawL = { uk?: string; en?: string } | null | undefined;

/** Якщо переклад не заповнили, показуємо українську (і навпаки) */
export const loc = (v: RawL): L => {
	const uk = v?.uk?.trim() ?? '';
	const en = v?.en?.trim() ?? '';
	return { uk: uk || en, en: en || uk };
};
export const locList = (v: RawL[] | null | undefined): L[] => (v ?? []).map(loc).filter((l) => l.uk);
