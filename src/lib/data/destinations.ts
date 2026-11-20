import type { L } from '#lib/i18n/index.ts';

/**
 * Напрямки, куди Андріана їздила з групами.
 * Щоб додати новий: скопіюйте об'єкт, змініть id, координати [довгота, широта],
 * тексти та шлях до обкладинки (покладіть фото в static/photos/<id>/).
 * Приберіть `demo: true`, коли дані реальні.
 */
export type Destination = {
	id: string;
	city: L;
	country: L;
	countryCode: string; // ISO alpha-2, підсвічує країну на карті
	coords: [number, number]; // [довгота, широта]
	description: L;
	cover: string;
	/** Скільки разів їздила з групами (необов'язково, без нього рядок не показується) */
	trips?: number;
	/** Роки поїздок, напр. '2026' (необов'язково) */
	years?: string;
	/** true = приклад, показує позначку «Приклад» */
	demo?: boolean;
	/** з якого боку від точки підпис на карті (коли міста поруч) */
	label?: 'left' | 'right';
};

export const home = { city: { uk: 'Львів', en: 'Lviv' } satisfies L, coords: [24.03, 49.84] as [number, number] };

export const destinations: Destination[] = [
	{
		id: 'istanbul',
		city: { uk: 'Стамбул', en: 'Istanbul' },
		country: { uk: 'Туреччина', en: 'Türkiye' },
		countryCode: 'TR',
		coords: [28.98, 41.01],
		description: { uk: 'Айя-Софія, Блакитна мечеть і прогулянка Босфором.', en: 'Hagia Sophia, the Blue Mosque and a Bosphorus cruise.' },
		cover: '/photos/placeholder-1.svg'
	},
	{
		id: 'rome',
		city: { uk: 'Рим', en: 'Rome' },
		country: { uk: 'Італія', en: 'Italy' },
		countryCode: 'IT',
		coords: [12.5, 41.9],
		description: { uk: 'Колізей, Ватикан і фонтан Треві.', en: 'The Colosseum, the Vatican and the Trevi Fountain.' },
		cover: '/photos/placeholder-2.svg'
	},
	{
		id: 'florence',
		city: { uk: 'Флоренція', en: 'Florence' },
		country: { uk: 'Італія', en: 'Italy' },
		countryCode: 'IT',
		coords: [11.26, 43.77],
		description: { uk: 'Дуомо, Понте-Веккьо та галерея Уффіці.', en: 'The Duomo, Ponte Vecchio and the Uffizi Gallery.' },
		cover: '/photos/placeholder-3.svg'
	},
	{
		id: 'venice',
		city: { uk: 'Венеція', en: 'Venice' },
		country: { uk: 'Італія', en: 'Italy' },
		countryCode: 'IT',
		coords: [12.33, 45.44],
		description: { uk: 'Гранд-канал, площа Сан-Марко і гондоли.', en: 'The Grand Canal, St Mark’s Square and gondolas.' },
		cover: '/photos/placeholder-4.svg'
	},
	{
		id: 'transylvania',
		city: { uk: 'Трансильванія', en: 'Transylvania' },
		country: { uk: 'Румунія', en: 'Romania' },
		countryCode: 'RO',
		coords: [24.79, 46.22], // приблизний центр регіону (Сігішоара)
		description: { uk: 'Середньовічні містечка, замки й Карпати.', en: 'Medieval towns, castles and the Carpathians.' },
		cover: '/photos/placeholder-5.svg'
	},
	{
		id: 'vienna',
		city: { uk: 'Відень', en: 'Vienna' },
		country: { uk: 'Австрія', en: 'Austria' },
		countryCode: 'AT',
		coords: [16.37, 48.21],
		description: { uk: 'Шенбрунн, кава зі штруделем і Рінгштрассе.', en: 'Schönbrunn, coffee with strudel and the Ringstrasse.' },
		cover: '/photos/placeholder-6.svg'
	},
	{
		id: 'prague',
		city: { uk: 'Прага', en: 'Prague' },
		country: { uk: 'Чехія', en: 'Czechia' },
		countryCode: 'CZ',
		coords: [14.42, 50.08],
		description: { uk: 'Карлів міст, Градчани та астрономічний годинник.', en: 'Charles Bridge, Hradčany and the astronomical clock.' },
		cover: '/photos/placeholder-2.svg'
	},
	{
		id: 'budapest',
		city: { uk: 'Будапешт', en: 'Budapest' },
		country: { uk: 'Угорщина', en: 'Hungary' },
		countryCode: 'HU',
		coords: [19.04, 47.5],
		description: { uk: 'Парламент на Дунаї, купальні та Рибальський бастіон.', en: 'Parliament on the Danube, thermal baths and Fisherman’s Bastion.' },
		cover: '/photos/placeholder-4.svg'
	},
	{
		id: 'brist',
		city: { uk: 'Бріст', en: 'Brist' },
		country: { uk: 'Хорватія', en: 'Croatia' },
		countryCode: 'HR',
		coords: [17.29, 43.14],
		description: { uk: 'Тиха Макарська рив’єра, галькові пляжі й Адріатика.', en: 'The quiet Makarska Riviera, pebble beaches and the Adriatic.' },
		cover: '/photos/placeholder-3.svg',
		label: 'left'
	},
	{
		id: 'medjugorje',
		city: { uk: 'Меджугор’є', en: 'Medjugorje' },
		country: { uk: 'Боснія і Герцеговина', en: 'Bosnia and Herzegovina' },
		countryCode: 'BA',
		coords: [17.68, 43.19],
		description: { uk: 'Паломницьке містечко: церква святого Якова й гора Підбрдо.', en: 'A pilgrimage town: St James’ Church and Apparition Hill.' },
		cover: '/photos/placeholder-1.svg',
		label: 'right'
	}
];
