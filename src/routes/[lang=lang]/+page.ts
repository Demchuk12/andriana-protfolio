import { langs } from '#lib/i18n/index.ts';
import type { EntryGenerator } from './$types';

export const entries: EntryGenerator = () => langs.map((lang) => ({ lang }));
