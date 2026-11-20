import type { L } from '#lib/i18n/index.ts';

/** Дані з CV. Тексти двомовні: { uk, en }. */
export const profile = {
	name: { uk: 'Андріана Дацко', en: 'Andriana Datsko' } satisfies L,
	phone: '+380 93 022 12 81',
	phoneHref: 'tel:+380930221281',
	email: 'andrianadatsko@gmail.com',
	telegram: 'andrianadatsko',
	sinceYear: 2025,
	summary: {
		uk: 'Контакт-менеджерка з досвідом у продажу туристичних послуг, комунікації з клієнтами та координації партнерів. Працювала менеджеркою з продажу, а нині супроводжую групи клієнтів у міжнародних автобусних турах компанії «Іхтіс». Працюю з CRM, Excel / Google Sheets та IP-телефонією Binotel. Вільно володію польською (C1), спілкуюсь англійською (B1). Для мене головне — якісний сервіс і чітка організація.',
		en: 'Contact manager with experience in selling travel services, client communication and partner coordination. I started in sales and now lead client groups on international coach tours for Ichthys. I work with CRM, Excel / Google Sheets and Binotel IP telephony. Fluent in Polish (C1), conversational English (B1). Quality service and clear organisation come first for me.'
	} satisfies L
};

export type Job = {
	title: L;
	company: string;
	start: L;
	end: L | null; // null = зараз
	points: L[];
};

export const experience: Job[] = [
	{
		title: { uk: 'Керівниця туристичних груп', en: 'Tour Group Leader' },
		company: 'Іхтіс / Ichthys',
		start: { uk: 'квітень 2026', en: 'April 2026' },
		end: null,
		points: [
			{ uk: 'Супроводжую групи клієнтів у міжнародних автобусних турах і відповідаю за комунікацію з ними від початку до завершення', en: 'Escort client groups on international coach tours and own communication with them from start to finish' },
			{ uk: 'Координую взаємодію з партнерами: перевізниками, готелями, екскурсоводами та представниками компанії', en: 'Coordinate partners: carriers, hotels, local guides and company representatives' },
			{ uk: 'Контролюю виконання плану та терміни; організовую трансфери, поселення та екскурсії', en: 'Keep the itinerary on schedule; arrange transfers, check-ins and excursions' },
			{ uk: 'Інформую клієнтів про умови, правила та організаційні моменти', en: 'Brief travellers on terms, rules and logistics' },
			{ uk: 'Оперативно вирішую запити та нестандартні ситуації', en: 'Resolve requests and unexpected situations on the spot' },
			{ uk: 'Представляю інтереси компанії та забезпечую якісний сервіс', en: 'Represent the company and ensure high-quality service' }
		]
	},
	{
		title: { uk: 'Менеджерка з продажу', en: 'Sales Manager' },
		company: 'Іхтіс / Ichthys',
		start: { uk: 'грудень 2025', en: 'December 2025' },
		end: { uk: 'серпень 2026', en: 'August 2026' },
		points: [
			{ uk: 'Продаж послуг компанії та комунікація з клієнтами', en: 'Selling the company’s services and communicating with clients' },
			{ uk: 'Участь у внутрішніх процесах компанії та взаємодія з туроператором', en: 'Taking part in internal processes and working with the tour operator' }
		]
	}
];

export const education = [
	{
		title: { uk: 'Бакалавр, туризм (подвійний диплом)', en: 'BA in Tourism (double degree)' } satisfies L,
		place: {
			uk: 'Національний університет «Львівська політехніка» · Uniwersytet Pomorski w Słupsku',
			en: 'Lviv Polytechnic National University · Uniwersytet Pomorski w Słupsku'
		} satisfies L,
		years: '2021 – 2025'
	}
];

export const certificate = {
	title: { uk: 'Гід супроводу туристичних груп', en: 'Tour group escort guide' } satisfies L,
	detail: { uk: 'Автобусні тури європейського напряму', en: 'European coach tours' } satisfies L,
	year: '2026'
};

export const skills: { key: 'tools' | 'clients' | 'partners' | 'organization' | 'personal'; items: L[] }[] = [
	{ key: 'tools', items: [{ uk: 'CRM', en: 'CRM' }, { uk: 'Excel / Google Sheets', en: 'Excel / Google Sheets' }, { uk: 'IP-телефонія Binotel', en: 'Binotel IP telephony' }] },
	{ key: 'clients', items: [{ uk: 'комунікація', en: 'communication' }, { uk: 'продаж послуг', en: 'service sales' }, { uk: 'робота із запитами та зверненнями', en: 'handling requests' }] },
	{ key: 'partners', items: [{ uk: 'перевізники', en: 'carriers' }, { uk: 'готелі', en: 'hotels' }, { uk: 'екскурсоводи', en: 'local guides' }, { uk: 'туроператори', en: 'tour operators' }] },
	{ key: 'organization', items: [{ uk: 'планування', en: 'planning' }, { uk: 'контроль термінів', en: 'deadline control' }, { uk: 'логістика', en: 'logistics' }] },
	{ key: 'personal', items: [{ uk: 'стресостійкість', en: 'stress resilience' }, { uk: 'вирішення конфліктів', en: 'conflict resolution' }, { uk: 'уважність до деталей', en: 'attention to detail' }, { uk: 'відповідальність', en: 'responsibility' }, { uk: 'командна робота', en: 'teamwork' }] }
];

export const languages: { name: L; level: L; code: string }[] = [
	{ name: { uk: 'Українська', en: 'Ukrainian' }, level: { uk: 'рідна', en: 'native' }, code: 'UA' },
	{ name: { uk: 'Польська', en: 'Polish' }, level: { uk: 'C1', en: 'C1' }, code: 'PL' },
	{ name: { uk: 'Англійська', en: 'English' }, level: { uk: 'B1', en: 'B1' }, code: 'EN' }
];
