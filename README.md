# Портфоліо Андріани Дацко

SvelteKit 3 + Svelte 5, статичний сайт (adapter-static). Дві мови (`/uk/`, `/en/`), світла та темна теми, мобільна версія.

## Команди

```bash
npm install
npm run dev       # локально: http://localhost:5173/uk/
npm run check     # перевірка типів
npm run build     # статичний сайт у папці build/
npm run preview   # переглянути зібрану версію
```

Папку `build/` можна залити на Vercel, Netlify, GitHub Pages чи будь-який статичний хостинг.

## Як наповнювати

| Що | Де |
|---|---|
| Тексти з CV (профіль, досвід, навички, мови, контакти) | `src/lib/data/profile.ts` |
| Напрямки (карта + картки) | `src/lib/data/destinations.ts` |
| Фото в галереї | `src/lib/data/gallery.ts` + файли в `static/photos/` |
| Тексти інтерфейсу | `src/lib/i18n/uk.ts`, `src/lib/i18n/en.ts` |
| Кольори тем | `src/lib/styles/tokens.css` |
| Домен сайту (для SEO) | `src/lib/site.ts` |

### Додати напрямок
1. Скопіюйте об'єкт у `destinations.ts`, змініть `id`, `city`, `country`, `countryCode` (ISO, напр. `IT`), `coords` як `[довгота, широта]` (у Google Maps вони йдуть у зворотному порядку).
2. Покладіть обкладинку, наприклад, у `static/photos/rome/cover.jpg` і вкажіть `cover: '/photos/rome/cover.jpg'`.
3. Приберіть `demo: true`.

Карта, лічильники країн і турів та фільтр галереї оновляться самі. Країна з карткою автоматично підсвічується на карті.

### Додати фото
Запис у `gallery.ts`: `src`, `alt` і `caption` двома мовами, `destinationId` (той самий `id`, що й у напрямку) та `ratio` (ширина / висота, напр. `4 / 3`).
Фото варто стиснути до ~1600px по довшій стороні (формат WebP або JPG).

## Нотатки щодо SvelteKit 3
- Конфіг лежить у `vite.config.ts` (`sveltekit({ adapter, ... })`), окремого `svelte.config.js` немає.
- Замість `$lib` використовується `#lib/...` (subpath imports у `package.json`) з явним розширенням файлу: `#lib/data/profile.ts`.
- Карта Європи рахується під час збірки (`src/lib/server/map.ts`), тож у браузер іде лише готовий SVG.
