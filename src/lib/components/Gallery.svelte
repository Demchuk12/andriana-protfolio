<script lang="ts">
	import { gallery } from '#lib/data/gallery.ts';
	import { destinations } from '#lib/data/destinations.ts';
	import { useI18n } from '#lib/i18n/context.ts';
	import { reveal } from '#lib/reveal.ts';
	import Lightbox from './Lightbox.svelte';

	const i18n = useI18n();
	const t = $derived(i18n.t);

	let filter = $state<string | null>(null);
	let openIndex = $state<number | null>(null);

	const filters = destinations.filter((d) => gallery.some((p) => p.destinationId === d.id));
	const photos = $derived(filter ? gallery.filter((p) => p.destinationId === filter) : gallery);
</script>

<section class="section" id="gallery">
	<div class="container">
		<div class="section-head" use:reveal>
			<p class="kicker">{t.gallery.kicker}</p>
			<h2 class="section-title">{t.gallery.title}</h2>
			<p class="lead">{t.gallery.intro}</p>
		</div>

		<div class="filters" role="toolbar" aria-label={t.gallery.title}>
			<button class="chip" aria-pressed={filter === null} onclick={() => (filter = null)}>{t.gallery.all}</button>
			{#each filters as d (d.id)}
				<button class="chip" aria-pressed={filter === d.id} onclick={() => (filter = d.id)}>
					{d.city[i18n.lang]}
				</button>
			{/each}
		</div>

		<ul class="grid">
			{#each photos as p, i (p.src + p.caption.en)}
				<li style="--r:{[-1.5, 1, -0.5, 1.5][i % 4]}deg">
					<button class="photo" onclick={() => (openIndex = i)} aria-label="{t.gallery.open}: {p.caption[i18n.lang]}">
						<img src={p.src} alt={p.alt[i18n.lang]} loading="lazy" style="aspect-ratio:{p.ratio}" />
						<span class="caption">{p.caption[i18n.lang]}</span>
					</button>
				</li>
			{/each}
		</ul>
	</div>
</section>

{#if openIndex !== null}
	<Lightbox {photos} bind:index={openIndex} onclose={() => (openIndex = null)} />
{/if}

<style>
	.filters {
		display: flex;
		gap: 8px;
		overflow-x: auto;
		padding-bottom: 8px;
		margin-bottom: 24px;
		scrollbar-width: none;
	}
	.filters .chip {
		flex: none;
	}
	@media (max-width: 640px) {
		.filters {
			margin-inline: calc(var(--gutter) * -1);
			padding-inline: var(--gutter);
			mask-image: linear-gradient(90deg, #000 85%, transparent);
		}
	}
	.grid {
		list-style: none;
		margin: 0;
		padding: 0;
		columns: 2;
		column-gap: 12px;
	}
	@media (min-width: 768px) {
		.grid {
			columns: 3;
			column-gap: 20px;
		}
	}
	@media (min-width: 1100px) {
		.grid {
			columns: 4;
		}
	}
	li {
		break-inside: avoid;
		margin-bottom: 12px;
	}
	@media (min-width: 768px) {
		li {
			margin-bottom: 20px;
		}
	}
	/* фото як полароїд */
	.photo {
		display: block;
		width: 100%;
		padding: 8px 8px 0;
		border: 0;
		background: var(--surface);
		border-radius: 6px;
		box-shadow: var(--shadow);
		cursor: zoom-in;
		transform: rotate(var(--r));
		transition:
			transform 0.3s var(--ease),
			box-shadow 0.3s;
		text-align: left;
	}
	@media (hover: hover) {
		.photo:hover {
			transform: rotate(0) scale(1.02);
			box-shadow: var(--shadow-lg);
		}
	}
	.photo:active {
		transform: rotate(0) scale(0.98);
	}
	img {
		width: 100%;
		height: auto;
		object-fit: cover;
		border-radius: 3px;
	}
	.caption {
		display: block;
		font-family: var(--font-hand);
		font-size: 1.25rem;
		line-height: 1.1;
		padding: 8px 4px 10px;
		color: var(--ink-soft);
	}
</style>
