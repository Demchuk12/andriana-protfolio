<script lang="ts">
	import type { Destination } from '#lib/data/destinations.ts';
	import { useI18n } from '#lib/i18n/context.ts';
	import { plural } from '#lib/i18n/index.ts';

	let { d, active = false, onhover }: { d: Destination; active?: boolean; onhover?: () => void } = $props();
	const i18n = useI18n();
	const t = $derived(i18n.t);
</script>

<article class="card" class:active id="dest-{d.id}" onpointerenter={onhover} onfocusin={onhover}>
	<div class="photo">
		<img src={d.cover} alt="" loading="lazy" width="400" height="300" />
		{#if d.demo}<span class="demo">{t.destinations.demo}</span>{/if}
		<span class="postmark" aria-hidden="true">{d.countryCode}</span>
	</div>
	<div class="body">
		<p class="country">{d.country[i18n.lang]}{d.years ? ` · ${d.years}` : ''}</p>
		<h3>{d.city[i18n.lang]}</h3>
		<p class="desc">{d.description[i18n.lang]}</p>
		{#if d.trips}
			<p class="trips">{d.trips} {plural(i18n.lang, d.trips, t.destinations.trips)}</p>
		{/if}
	</div>
</article>

<style>
	.card {
		background: var(--surface);
		border-radius: var(--radius);
		box-shadow: var(--shadow);
		padding: 10px 10px 0;
		display: grid;
		grid-template-rows: auto 1fr;
		transition:
			transform 0.3s var(--ease),
			box-shadow 0.3s;
		height: 100%;
	}
	.card.active {
		transform: translateY(-6px) rotate(-0.6deg);
		box-shadow: var(--shadow-lg);
		outline: 2px solid var(--accent);
	}
	.photo {
		position: relative;
		border-radius: 8px;
		overflow: hidden;
		aspect-ratio: 4 / 3;
	}
	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: transform 0.6s var(--ease);
	}
	@media (hover: hover) {
		.card:hover img {
			transform: scale(1.05);
		}
	}
	.demo {
		position: absolute;
		left: 10px;
		top: 10px;
		padding: 2px 10px;
		border-radius: 999px;
		background: rgb(0 0 0 / 0.55);
		color: #fff;
		font-size: 0.72rem;
		font-weight: 700;
		letter-spacing: 0.08em;
		text-transform: uppercase;
	}
	.postmark {
		position: absolute;
		right: 10px;
		bottom: -18px;
		width: 56px;
		height: 56px;
		display: grid;
		place-items: center;
		border-radius: 50%;
		background: var(--surface);
		border: 2px dashed var(--accent);
		color: var(--accent);
		font-family: var(--font-display);
		font-weight: 700;
		transform: rotate(-12deg);
	}
	.body {
		padding: 16px 8px 18px;
		display: grid;
		gap: 4px;
		align-content: start;
	}
	.country {
		font-size: 0.72rem;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		font-weight: 700;
		color: var(--ink-faint);
	}
	h3 {
		font-size: 1.5rem;
	}
	.desc {
		color: var(--ink-soft);
		font-size: 0.95rem;
	}
	.trips {
		font-family: var(--font-hand);
		font-size: 1.3rem;
		color: var(--accent);
		margin-top: 4px;
	}
</style>
