import { buildMap } from '#lib/server/map.ts';
import type { PageServerLoad } from './$types';

// Карта рахується один раз під час збірки, у браузер іде лише готовий SVG
export const load: PageServerLoad = () => ({ map: buildMap() });
