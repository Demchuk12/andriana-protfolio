import { texts } from './texts.ts';

export const uk = {
	meta: {
		title: 'Андріана Дацко: керівниця туристичних груп',
		description:
			'Портфоліо Андріани Дацко: супровід автобусних турів Європою, робота з клієнтами та партнерами, продаж туристичних послуг.'
	},
	nav: {
		about: 'Про мене',
		experience: 'Досвід',
		destinations: 'Напрямки',
		gallery: 'Галерея',
		skills: 'Навички',
		contact: 'Контакти',
		menu: 'Меню',
		close: 'Закрити'
	},
	theme: { toLight: 'Увімкнути світлу тему', toDark: 'Увімкнути темну тему' },
	lang: { switchTo: 'Switch to English', label: 'EN' },
	hero: {
		ticket: 'Посадковий талон',
		passenger: 'Пасажир',
		role: texts.role.uk,
		from: 'Звідки',
		to: 'Куди',
		fromCity: 'Львів',
		toCity: 'Європа',
		seat: 'Місце',
		seatValue: '1A · гід',
		gate: 'Країн',
		since: 'У дорозі з',
		tagline: texts.tagline.uk,
		ctaRoutes: 'Мої маршрути',
		ctaContact: 'Написати мені'
	},
	about: {
		kicker: 'Про мене',
		title: texts.aboutTitle.uk,
		stats: {
			countries: { one: 'країна', few: 'країни', many: 'країн', other: 'країни' },
			places: { one: 'напрямок', few: 'напрямки', many: 'напрямків', other: 'напрямку' },
			languages: { one: 'мова', few: 'мови', many: 'мов', other: 'мови' }
		}
	},
	experience: { kicker: 'Маршрут', title: 'Досвід роботи', now: 'зараз' },
	destinations: {
		kicker: 'Карта подорожей',
		title: 'Напрямки',
		intro: texts.destinationsIntro.uk,
		all: 'Усі',
		trips: { one: 'поїздка', few: 'поїздки', many: 'поїздок', other: 'поїздки' },
		home: 'Львів: старт'
	},
	gallery: {
		kicker: 'Листівки з дороги',
		title: 'Галерея',
		intro: texts.galleryIntro.uk,
		all: 'Усі',
		open: 'Відкрити фото',
		prev: 'Попереднє фото',
		next: 'Наступне фото',
		close: 'Закрити'
	},
	skills: {
		kicker: 'Валіза навичок',
		title: 'Навички та освіта',
		tools: 'Інструменти',
		clients: 'Клієнти',
		partners: 'Партнери',
		organization: 'Організація',
		personal: 'Особисті якості',
		languages: 'Мови',
		education: 'Освіта',
		certificate: 'Сертифікат'
	},
	contact: {
		kicker: 'Поштова скринька',
		title: texts.contactTitle.uk,
		text: texts.contactText.uk,
		greeting: 'Вітаю з дороги!',
		phone: 'Телефон',
		email: 'Email',
		telegram: 'Telegram',
		stamp: 'Пошта'
	},
	footer: { made: 'Зроблено з любов’ю до подорожей' }
};
