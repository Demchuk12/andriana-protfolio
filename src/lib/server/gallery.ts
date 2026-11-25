import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { imageSize } from 'image-size';
import { destinations } from '#lib/data/destinations.ts';
import type { Photo } from '#lib/data/gallery.ts';

/** Пропорції рахуємо з самого файлу під час збірки. null = файлу немає або він зламаний */
function ratioOf(src: string): number | null {
	try {
		const { width, height, orientation = 1 } = imageSize(readFileSync(join('static', decodeURI(src))));
		// EXIF 5–8: фото повернуте на 90°
		return orientation >= 5 ? height / width : width / height;
	} catch {
		console.warn(`Пропускаємо фото, файл не знайдено: ${src}`);
		return null;
	}
}

/** Фото всіх напрямків упереміш: по одному з кожного, потім по другому і т.д. */
export function buildGallery(): Photo[] {
	const perDest = destinations.map((d) =>
		d.photos.flatMap((p) =>
			p.images.flatMap((src): Photo[] => {
				const ratio = ratioOf(src);
				if (ratio === null) return [];
				const caption = p.caption.uk ? p.caption : d.city;
				return [{ src, alt: caption, caption, destinationId: d.id, ratio }];
			})
		)
	);
	const rounds = Math.max(0, ...perDest.map((l) => l.length));
	return Array.from({ length: rounds }, (_, i) => perDest.flatMap((l) => l[i] ?? [])).flat();
}
