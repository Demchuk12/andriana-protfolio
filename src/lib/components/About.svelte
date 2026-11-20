<script lang="ts">
	import { useI18n } from '#lib/i18n/context.ts';
	import { profile, languages } from '#lib/data/profile.ts';
	import { destinations } from '#lib/data/destinations.ts';
	import { reveal } from '#lib/reveal.ts';
	import { plural } from '#lib/i18n/index.ts';

	const i18n = useI18n();
	const t = $derived(i18n.t);

	const counts = [
		{ key: 'countries', value: new Set(destinations.map((d) => d.countryCode)).size },
		{ key: 'places', value: destinations.length },
		{ key: 'languages', value: languages.length }
	] as const;
	const stats = $derived(
		counts.map((c) => ({ value: c.value, label: plural(i18n.lang, c.value, t.about.stats[c.key]) }))
	);
</script>

<section class="section" id="about">
	<div class="container grid">
		<div class="section-head" use:reveal>
			<p class="kicker">{t.about.kicker}</p>
			<h2 class="section-title">{t.about.title}</h2>
		</div>
		<div class="body" use:reveal={100}>
			<p class="lead">{profile.summary[i18n.lang]}</p>
			<ul class="stats">
				{#each stats as s (s.label)}
					<li>
						<strong>{s.value}</strong>
						<span>{s.label}</span>
					</li>
				{/each}
			</ul>
		</div>
	</div>
</section>

<style>
	.grid {
		display: grid;
		grid-template-columns: minmax(0, 1fr);
		gap: 8px;
	}
	@media (min-width: 900px) {
		.grid {
			grid-template-columns: minmax(0, 1fr) minmax(0, 1.2fr);
			gap: 64px;
			align-items: start;
		}
	}
	.lead {
		font-size: clamp(1.05rem, 2vw, 1.2rem);
	}
	.stats {
		list-style: none;
		padding: 0;
		margin: 40px 0 0;
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: clamp(6px, 2vw, 12px);
	}
	.stats li {
		display: grid;
		justify-items: center;
		text-align: center;
		padding: 8px 4px;
		border: 2px dashed var(--line);
		border-radius: 50%;
		aspect-ratio: 1;
		align-content: center;
		max-width: 160px;
		width: 100%;
		justify-self: center;
		transform: rotate(var(--r, -4deg));
	}
	.stats li:nth-child(2) {
		--r: 3deg;
		border-color: color-mix(in srgb, var(--accent) 50%, var(--line));
	}
	.stats li:nth-child(3) {
		--r: -2deg;
	}
	.stats strong {
		font-family: var(--font-display);
		font-size: clamp(2rem, 6vw, 2.8rem);
		line-height: 1;
		color: var(--primary);
	}
	.stats span {
		font-size: clamp(0.62rem, 2.6vw, 0.75rem);
		letter-spacing: clamp(0.02em, 0.6vw, 0.12em);
		hyphens: manual;
		text-transform: uppercase;
		font-weight: 700;
		color: var(--ink-faint);
	}
</style>
