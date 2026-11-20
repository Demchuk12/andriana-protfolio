import { getContext, setContext } from 'svelte';
import type { Dict, Lang } from './index.ts';

export type I18n = { readonly lang: Lang; readonly t: Dict };
const KEY = Symbol('i18n');

export const setI18n = (v: I18n) => setContext(KEY, v);
export const useI18n = () => getContext<I18n>(KEY);
