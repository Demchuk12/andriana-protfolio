import type { L } from '#lib/i18n/index.ts';
import rawProfile from '../../content/profile.json' with { type: 'json' };
import rawExperience from '../../content/experience.json' with { type: 'json' };
import rawSkills from '../../content/skills.json' with { type: 'json' };
import { loc, locList, type RawL } from './content.ts';

/** Дані з CV. Редагуються через /admin, файли лежать у src/content/. */
export const profile = {
	name: loc(rawProfile.name),
	phone: rawProfile.phone,
	phoneHref: 'tel:' + rawProfile.phone.replace(/[^+\d]/g, ''),
	email: rawProfile.email,
	telegram: rawProfile.telegram.replace(/^@|^https?:\/\/t\.me\//, ''),
	sinceYear: rawProfile.sinceYear,
	summary: loc(rawProfile.summary)
};

export type Job = {
	title: L;
	company: string;
	start: L;
	end: L | null; // null = зараз
	points: L[];
};

type RawJob = { title: RawL; company?: string; start: RawL; end?: RawL; points?: RawL[] };

export const experience: Job[] = ((rawExperience.jobs ?? []) as RawJob[]).map((j) => {
	const end = loc(j.end);
	return {
		title: loc(j.title),
		company: j.company ?? '',
		start: loc(j.start),
		end: end.uk ? end : null,
		points: locList(j.points)
	};
});

export const education = (rawSkills.education ?? []).map((e) => ({ title: loc(e.title), place: loc(e.place), years: e.years }));

export const certificates = (rawSkills.certificates ?? []).map((c) => ({
	title: loc(c.title),
	detail: loc(c.detail),
	year: c.year
}));

const groups = ['tools', 'clients', 'partners', 'organization', 'personal'] as const;
export const skills = groups
	.map((key) => ({ key, items: locList(rawSkills[key]) }))
	.filter((g) => g.items.length);

export const languages = (rawSkills.languages ?? []).map((l) => ({ name: loc(l.name), level: loc(l.level), code: l.code }));
