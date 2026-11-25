import type { L } from '#lib/i18n/index.ts';

/** Фото галереї. Збирається з напрямків у #lib/server/gallery.ts. */
export type Photo = {
	src: string;
	alt: L;
	caption: L;
	destinationId: string;
	/** ширина / висота (щоб masonry-сітка не стрибала) */
	ratio: number;
};
