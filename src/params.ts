import { defineParams } from '@sveltejs/kit/params';
import { isLang } from '#lib/i18n/index.ts';

export const params = defineParams({
	lang: (param) => (isLang(param) ? param : undefined)
});
