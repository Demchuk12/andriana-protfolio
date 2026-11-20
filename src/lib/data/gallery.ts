import type { L } from '#lib/i18n/index.ts';

/**
 * Фото з турів. Покладіть файли в static/photos/ і додайте запис.
 * destinationId прив'язує фото до напрямку (для фільтра галереї).
 * ratio = ширина / висота (для красивої masonry-сітки без стрибків).
 */
export type Photo = {
	src: string;
	alt: L;
	caption: L;
	destinationId: string;
	ratio: number;
};

const demo = (n: number, destinationId: string, ratio: number, uk: string, en: string): Photo => ({
	src: `/photos/placeholder-${n}.svg`,
	alt: { uk: `Демо-фото: ${uk}`, en: `Sample photo: ${en}` },
	caption: { uk, en },
	destinationId,
	ratio
});

export const gallery: Photo[] = [
	demo(1, 'istanbul', 4 / 5, 'Група біля Айя-Софії', 'The group by Hagia Sophia'),
	demo(2, 'rome', 3 / 2, 'Ранок біля Колізею', 'Morning at the Colosseum'),
	demo(3, 'florence', 1, 'Вид на Дуомо', 'View of the Duomo'),
	demo(4, 'venice', 3 / 4, 'Вечірня Венеція', 'Venice at dusk'),
	demo(5, 'transylvania', 3 / 2, 'Дорога Карпатами', 'Through the Carpathians'),
	demo(1, 'istanbul', 1, 'На березі Босфору', 'On the Bosphorus'),
	demo(2, 'rome', 4 / 5, 'Фото на пам’ять біля фонтану', 'Souvenir photo at the fountain'),
	demo(4, 'venice', 3 / 2, 'Гондоли на каналі', 'Gondolas on the canal'),
	demo(6, 'vienna', 4 / 5, 'Сади Шенбрунна', 'Schönbrunn gardens'),
	demo(2, 'prague', 3 / 2, 'Ранок на Карловому мосту', 'Morning on Charles Bridge'),
	demo(4, 'budapest', 1, 'Вечірній Дунай', 'The Danube at night'),
	demo(3, 'brist', 3 / 2, 'Відпочинок на Адріатиці', 'Resting by the Adriatic'),
	demo(1, 'medjugorje', 4 / 5, 'Група біля церкви святого Якова', 'The group by St James’ Church')
];
