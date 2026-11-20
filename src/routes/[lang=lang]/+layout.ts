import { getDict, type Lang } from '#lib/i18n/index.ts';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = ({ params }) => {
	const lang = params.lang as Lang;
	return { lang, t: getDict(lang) };
};
