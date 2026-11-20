<script lang="ts">
	import type { MapData } from '#lib/server/map.ts';
	import { destinations } from '#lib/data/destinations.ts';
	import { useI18n } from '#lib/i18n/context.ts';
	import { reveal } from '#lib/reveal.ts';
	import DestinationMap from './DestinationMap.svelte';
	import DestinationCard from './DestinationCard.svelte';

	let { map }: { map: MapData } = $props();
	const i18n = useI18n();
	const t = $derived(i18n.t);

	let selected = $state<string | null>(destinations[0]?.id ?? null);
	let list: HTMLUListElement;

	/** на телефоні картки — горизонтальна стрічка */
	const isCarousel = () => list && list.scrollWidth > list.clientWidth + 4;

	function pick(id: string) {
		selected = id;
		const card = document.getElementById(`dest-${id}`)?.parentElement;
		if (!card) return;
		if (isCarousel()) {
			// прокручуємо лише стрічку, сторінка лишається на карті
			list.scrollTo({ left: card.offsetLeft - (list.clientWidth - card.clientWidth) / 2, behavior: 'smooth' });
		} else {
			card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
		}
	}

	// свайп листівки → підсвічуємо місто на карті
	$effect(() => {
		let frame = 0;
		const onScroll = () => {
			cancelAnimationFrame(frame);
			frame = requestAnimationFrame(() => {
				if (!isCarousel()) return;
				const mid = list.scrollLeft + list.clientWidth / 2;
				let best: string | null = null,
					dist = Infinity;
				for (const li of list.children as HTMLCollectionOf<HTMLElement>) {
					const dd = Math.abs(li.offsetLeft + li.clientWidth / 2 - mid);
					if (dd < dist) (dist = dd), (best = li.dataset.id ?? null);
				}
				if (best) selected = best;
			});
		};
		list.addEventListener('scroll', onScroll, { passive: true });
		return () => list.removeEventListener('scroll', onScroll);
	});
</script>

<section class="section" id="destinations">
	<div class="container">
		<div class="section-head" use:reveal>
			<p class="kicker">{t.destinations.kicker}</p>
			<h2 class="section-title">{t.destinations.title}</h2>
			<p class="lead">{t.destinations.intro}</p>
		</div>

		<div use:reveal={100}>
			<DestinationMap {map} bind:selected onpick={pick} />
		</div>

		<ul class="cards" aria-label={t.destinations.title} bind:this={list}>
			{#each destinations as d (d.id)}
				<li data-id={d.id}>
					<DestinationCard {d} active={selected === d.id} onhover={() => (selected = d.id)} />
				</li>
			{/each}
		</ul>

		<div class="dots" aria-hidden="true">
			{#each destinations as d (d.id)}
				<button class:on={selected === d.id} tabindex="-1" onclick={() => pick(d.id)} aria-label={d.city[i18n.lang]}></button>
			{/each}
		</div>
	</div>
</section>

<style>
	.cards {
		list-style: none;
		margin: 32px 0 0;
		padding: 8px 0 24px;
		display: grid;
		gap: 20px;
		grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
	}
	/* на телефоні — горизонтальна стрічка листівок */
	@media (max-width: 640px) {
		.cards {
			grid-auto-flow: column;
			grid-template-columns: none;
			grid-auto-columns: 78%;
			overflow-x: auto;
			scroll-snap-type: x mandatory;
			margin-inline: calc(var(--gutter) * -1);
			padding-inline: var(--gutter);
			scroll-padding-inline: var(--gutter);
			scrollbar-width: none;
		}
		.cards::-webkit-scrollbar {
			display: none;
		}
		.cards li {
			scroll-snap-align: center;
		}
	}
	.dots {
		display: none;
	}
	@media (max-width: 640px) {
		.cards {
			margin-top: 20px;
			padding-bottom: 12px;
		}
		.dots {
			display: flex;
			justify-content: center;
			gap: 2px;
		}
		.dots button {
			width: 24px;
			height: 24px;
			border: 0;
			padding: 0;
			background: none;
			display: grid;
			place-items: center;
			cursor: pointer;
		}
		.dots button::before {
			content: '';
			width: 8px;
			height: 8px;
			border-radius: 999px;
			background: var(--line);
			transition:
				width 0.3s var(--ease),
				background-color 0.3s;
		}
		.dots button.on::before {
			width: 20px;
			background: var(--accent);
		}
	}
</style>
