import { buildGallery } from '#lib/server/gallery.ts';
import { buildMap } from '#lib/server/map.ts';
import type { PageServerLoad } from './$types';

// Карта й галерея рахуються під час збірки, у браузер ідуть лише готові дані
export const load: PageServerLoad = () => ({ map: buildMap(), gallery: buildGallery() });
