import type { Handle } from '@sveltejs/kit/hooks';

// Ставимо правильний <html lang> під час пререндеру
export const handle: Handle = ({ event, resolve }) => {
	const lang = event.url.pathname.startsWith('/en') ? 'en' : 'uk';
	return resolve(event, {
		transformPageChunk: ({ html }) => html.replace('%lang%', lang)
	});
};
