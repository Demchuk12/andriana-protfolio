import { texts } from './texts.ts';
import type { Dict } from './index.ts';

export const en: Dict = {
	meta: {
		title: 'Andriana Datsko: Tour Group Leader',
		description:
			'Portfolio of Andriana Datsko: escorting coach tours across Europe, client and partner communication, travel sales.'
	},
	nav: {
		about: 'About',
		experience: 'Experience',
		destinations: 'Destinations',
		gallery: 'Gallery',
		skills: 'Skills',
		contact: 'Contact',
		menu: 'Menu',
		close: 'Close'
	},
	theme: { toLight: 'Switch to light theme', toDark: 'Switch to dark theme' },
	lang: { switchTo: 'Перейти на українську', label: 'UA' },
	hero: {
		ticket: 'Boarding pass',
		passenger: 'Passenger',
		role: texts.role.en,
		from: 'From',
		to: 'To',
		fromCity: 'Lviv',
		toCity: 'Europe',
		seat: 'Seat',
		seatValue: '1A · guide',
		gate: 'Countries',
		since: 'On the road since',
		tagline: texts.tagline.en,
		ctaRoutes: 'My routes',
		ctaContact: 'Get in touch'
	},
	about: {
		kicker: 'About me',
		title: texts.aboutTitle.en,
		stats: {
			countries: { one: 'country', few: 'countries', many: 'countries', other: 'countries' },
			places: { one: 'destination', few: 'destinations', many: 'destinations', other: 'destinations' },
			languages: { one: 'language', few: 'languages', many: 'languages', other: 'languages' }
		}
	},
	experience: { kicker: 'The route', title: 'Experience', now: 'present' },
	destinations: {
		kicker: 'Travel map',
		title: 'Destinations',
		intro: texts.destinationsIntro.en,
		all: 'All',
		trips: { one: 'trip', few: 'trips', many: 'trips', other: 'trips' },
		home: 'Lviv: start'
	},
	gallery: {
		kicker: 'Postcards from the road',
		title: 'Gallery',
		intro: texts.galleryIntro.en,
		all: 'All',
		open: 'Open photo',
		prev: 'Previous photo',
		next: 'Next photo',
		close: 'Close'
	},
	skills: {
		kicker: 'Skills suitcase',
		title: 'Skills & education',
		tools: 'Tools',
		clients: 'Clients',
		partners: 'Partners',
		organization: 'Organisation',
		personal: 'Personal qualities',
		languages: 'Languages',
		education: 'Education',
		certificate: 'Certificate'
	},
	contact: {
		kicker: 'Mailbox',
		title: texts.contactTitle.en,
		text: texts.contactText.en,
		greeting: 'Greetings from the road!',
		phone: 'Phone',
		email: 'Email',
		telegram: 'Telegram',
		stamp: 'Post'
	},
	footer: { made: 'Made with a love of travel' }
};
