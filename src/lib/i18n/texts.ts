import raw from '../../content/texts.json' with { type: 'json' };
import { loc } from '#lib/data/content.ts';

/** Тексти сторінки, які редагуються через /admin */
export const texts = {
	role: loc(raw.role),
	tagline: loc(raw.tagline),
	aboutTitle: loc(raw.aboutTitle),
	destinationsIntro: loc(raw.destinationsIntro),
	galleryIntro: loc(raw.galleryIntro),
	contactTitle: loc(raw.contactTitle),
	contactText: loc(raw.contactText)
};
