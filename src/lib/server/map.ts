import { geoAzimuthalEqualArea, geoPath } from 'd3-geo';
import { feature } from 'topojson-client';
import type { Topology, GeometryCollection } from 'topojson-specification';
import type { FeatureCollection, Geometry } from 'geojson';
import world from 'world-atlas/countries-50m.json' with { type: 'json' };
import { destinations, home } from '#lib/data/destinations.ts';

/** ISO alpha-2 → ISO numeric (як у world-atlas) для європейських країн */
const ISO: Record<string, string> = {
	AL: '008', AD: '020', AT: '040', BY: '112', BE: '056', BA: '070', BG: '100', HR: '191',
	CY: '196', CZ: '203', DK: '208', EE: '233', FI: '246', FR: '250', DE: '276', GR: '300',
	HU: '348', IS: '352', IE: '372', IT: '380', LV: '428', LI: '438', LT: '440', LU: '442',
	MT: '470', MD: '498', MC: '492', ME: '499', NL: '528', MK: '807', NO: '578', PL: '616',
	PT: '620', RO: '642', SM: '674', RS: '688', SK: '703', SI: '705', ES: '724', SE: '752',
	CH: '756', TR: '792', UA: '804', GB: '826', VA: '336', GE: '268', MA: '504', DZ: '012',
	TN: '788', XK: '-99'
};

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
	const visited = new Set(destinations.map((d) => ISO[d.countryCode]).filter(Boolean));

	const countries = all.features
		.map((f, i) => ({
			// у деяких територій немає ISO-коду, тому додаємо індекс для унікальності
			id: `${f.id ?? 'x'}-${i}`,
			d: path(f) ?? '',
			visited: f.id != null && visited.has(String(f.id)),
			home: String(f.id) === ISO.UA
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
		points: destinations.map((d) => ({ id: d.id, ...proj(d.coords) }))
	};
	return cache;
}
