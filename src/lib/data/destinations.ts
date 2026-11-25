import type { L } from '#lib/i18n/index.ts';
import { countries } from './countries.ts';
import { loc, type RawL } from './content.ts';

/**
 * Напрямки, куди Андріана їздила з групами.
 * Дані лежать у src/content/destinations/*.json і редагуються через /admin.
 */
export type Destination = {
	id: string;
	city: L;
	country: L;
	countryCode: string; // ISO alpha-2, підсвічує країну на карті
	coords: [number, number] | null; // [довгота, широта]
	description: L;
	cover: string;
	photos: { images: string[]; caption: L }[];
	/** Скільки разів їздила з групами (необов'язково, без нього рядок не показується) */
	trips?: number;
	/** Роки поїздок, напр. '2026' (необов'язково) */
	years?: string;
	/** з якого боку від точки підпис на карті (коли міста поруч) */
	label?: 'left' | 'right';
};

type RawDestination = {
	city: RawL;
	country: string;
	location?: string | null;
	description?: RawL;
	cover?: string | null;
	photos?: { images?: string[] | string | null; caption?: RawL }[] | null;
	trips?: number | null;
	years?: string | null;
	label?: string | null;
	order?: number | null;
};

const PLACEHOLDER = '/photos/placeholder-1.svg';

/** Поле «карта» в адмінці зберігає GeoJSON-рядок: {"type":"Point","coordinates":[lng,lat]} */
const parseCoords = (v?: string | null): [number, number] | null => {
	try {
		const [lng, lat] = JSON.parse(v ?? '').coordinates.map(Number);
		return Number.isFinite(lng) && Number.isFinite(lat) ? [lng, lat] : null;
	} catch {
		return null;
	}
};

const files = import.meta.glob<RawDestination>('../../content/destinations/*.json', { eager: true, import: 'default' });

export const home = { city: { uk: 'Львів', en: 'Lviv' } satisfies L, coords: [24.03, 49.84] as [number, number] };

export const destinations: Destination[] = Object.entries(files)
	.sort(([, a], [, b]) => (a.order || Infinity) - (b.order || Infinity) || 0)
	.map(([path, d]) => {
		const photos = (d.photos ?? []).map((p) => ({
			images: [p.images ?? []].flat().filter(Boolean),
			caption: loc(p.caption)
		}));
		return {
			id: path.split('/').pop()!.replace(/\.json$/, ''),
			city: loc(d.city),
			country: countries[d.country]?.name ?? { uk: d.country, en: d.country },
			countryCode: d.country,
			coords: parseCoords(d.location),
			description: loc(d.description),
			cover: d.cover || photos.flatMap((p) => p.images)[0] || PLACEHOLDER,
			photos,
			trips: d.trips || undefined,
			years: d.years || undefined,
			label: d.label === 'left' || d.label === 'right' ? d.label : undefined
		};
	});
