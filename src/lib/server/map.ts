import { geoAzimuthalEqualArea, geoPath } from 'd3-geo';
import { feature } from 'topojson-client';
import type { Topology, GeometryCollection } from 'topojson-specification';
import type { FeatureCollection, Geometry } from 'geojson';
import world from 'world-atlas/countries-50m.json' with { type: 'json' };
import { countries as countryList } from '#lib/data/countries.ts';
import { destinations, home } from '#lib/data/destinations.ts';

export const MAP_W = 1000;
export const MAP_H = 760;

export type MapData = {
	width: number;
	height: number;
	countries: { id: string; d: string; visited: boolean; home: boolean }[];
	home: { x: number; y: number };
	points: { id: string; x: number; y: number }[];
};

let cache: MapData | null = null;

export function buildMap(): MapData {
	if (cache) return cache;

	const topo = world as unknown as Topology<{ countries: GeometryCollection }>;
	const all = feature(topo, topo.objects.countries) as FeatureCollection<Geometry, { name: string }>;

	const projection = geoAzimuthalEqualArea()
		.rotate([-14, -52])
		.fitExtent(
			[
				[0, 0],
				[MAP_W, MAP_H]
			],
			{
				type: 'Feature',
				properties: {},
				geometry: {
					type: 'MultiPoint',
					coordinates: [
						[-9.5, 37],
						[35, 41],
						[30, 62],
						[-6, 58]
					]
				}
			}
		)
		.clipAngle(85)
		// із запасом: на сайті карта фокусується на точках і може виходити за базову рамку
		.clipExtent([
			[-500, -400],
			[MAP_W + 500, MAP_H + 400]
		]);

	const path = geoPath(projection).digits(1);
	const visited = new Set(destinations.map((d) => countryList[d.countryCode]?.numeric).filter(Boolean));

	const countries = all.features
		.map((f, i) => ({
			// у деяких територій немає ISO-коду, тому додаємо індекс для унікальності
			id: `${f.id ?? 'x'}-${i}`,
			d: path(f) ?? '',
			visited: f.id != null && visited.has(String(f.id)),
			home: String(f.id) === countryList.UA.numeric
		}))
		.filter((c) => c.d.length > 0);

	const proj = (c: [number, number]) => {
		const [x, y] = projection(c) ?? [0, 0];
		return { x: Math.round(x * 10) / 10, y: Math.round(y * 10) / 10 };
	};

	cache = {
		width: MAP_W,
		height: MAP_H,
		countries,
		home: proj(home.coords),
		points: destinations.flatMap((d) => (d.coords ? [{ id: d.id, ...proj(d.coords) }] : []))
	};
	return cache;
}
