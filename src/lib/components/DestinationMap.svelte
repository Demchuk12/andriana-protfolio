<script lang="ts">
	import type { MapData } from '#lib/server/map.ts';
	import { destinations, home } from '#lib/data/destinations.ts';
	import { useI18n } from '#lib/i18n/context.ts';

	let {
		map,
		selected = $bindable<string | null>(null),
		onpick
	}: { map: MapData; selected?: string | null; onpick?: (id: string) => void } = $props();

	const i18n = useI18n();

	let width = $state(800);
	const compact = $derived(width < 600);

	// Фокусуємо карту на точках маршрутів (+ відступ), щоб на телефоні все було видно
	const vb = $derived.by(() => {
		const xs = [map.home.x, ...map.points.map((p) => p.x)];
		const ys = [map.home.y, ...map.points.map((p) => p.y)];
		const pad = 110;
		let x0 = Math.min(...xs) - pad,
			x1 = Math.max(...xs) + pad,
			y0 = Math.min(...ys) - pad,
			y1 = Math.max(...ys) + pad;
		const aspect = compact ? 1 : 16 / 10;
		let w = Math.max(x1 - x0, 320),
			h = Math.max(y1 - y0, 240);
		if (w / h < aspect) w = h * aspect;
		else h = w / aspect;
		const cx = (x0 + x1) / 2,
			cy = (y0 + y1) / 2;
		return { x: cx - w / 2, y: cy - h / 2, w, h };
	});

	/** скільки одиниць viewBox припадає на 1 css-піксель */
	const k = $derived(vb.w / Math.max(width, 1));

	const arc = (x: number, y: number) => {
		const mx = (map.home.x + x) / 2;
		const my = (map.home.y + y) / 2;
		const dx = x - map.home.x;
		const dy = y - map.home.y;
		const len = Math.hypot(dx, dy) || 1;
		const bend = len * 0.25;
		// вигин угору від прямої лінії
		const cx = mx + (dy / len) * bend * (dx < 0 ? 1 : -1);
		const cy = my - Math.abs(dx / len) * bend;
		return `M${map.home.x} ${map.home.y} Q${cx} ${cy} ${x} ${y}`;
	};

	const byId = new Map(destinations.map((d) => [d.id, d]));
</script>

<div class="map" bind:clientWidth={width}>
	<svg viewBox="{vb.x} {vb.y} {vb.w} {vb.h}" role="group" aria-label={i18n.t.destinations.title}>
		<rect x={vb.x} y={vb.y} width={vb.w} height={vb.h} class="sea" />
		<g class="countries">
			{#each map.countries as c (c.id)}
				<path d={c.d} class:visited={c.visited} class:home={c.home} />
			{/each}
		</g>

		<g class="arcs">
			{#each map.points as p, i (p.id)}
				<path
					d={arc(p.x, p.y)}
					class:active={selected === p.id}
					style="--i:{i}; stroke-width:{2 * k}px; stroke-dasharray:{6 * k} {6 * k}"
				/>
			{/each}
		</g>

		<!-- Львів -->
		<g class="home-pt" transform="translate({map.home.x} {map.home.y})">
			<circle r={11 * k} class="halo" />
			<circle r={6 * k} />
			<text y={24 * k} font-size={12 * k} text-anchor="middle" style="stroke-width:{4 * k}px">{home.city[i18n.lang]}</text>
		</g>

		{#each map.points as p (p.id)}
			{@const d = byId.get(p.id)!}
			{@const on = selected === p.id}
			{@const flip = d.label ? d.label === 'left' : p.x > vb.x + vb.w * 0.7}
			<g
				class="pt"
				class:on
				transform="translate({p.x} {p.y})"
				role="button"
				tabindex="0"
				aria-label="{d.city[i18n.lang]}, {d.country[i18n.lang]}"
				aria-pressed={on}
				onclick={() => onpick?.(p.id)}
				onkeydown={(e) => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), onpick?.(p.id))}
				onpointerenter={() => (selected = p.id)}
			>
				<!-- велика невидима зона для дотику -->
				<circle r={22 * k} class="hit" />
				<circle r={(on ? 10 : 7) * k} class="dot" style="stroke-width:{2.5 * k}px" />
				{#if !compact || on}
					<text
						x={(flip ? -12 : 12) * k}
						y={4.5 * k}
						text-anchor={flip ? 'end' : 'start'}
						font-size={(on ? 15 : 13) * k}
						style="stroke-width:{4 * k}px"
					>
						{d.city[i18n.lang]}
					</text>
				{/if}
			</g>
		{/each}
	</svg>
</div>

<style>
	.map {
		border-radius: var(--radius);
		overflow: hidden;
		box-shadow: var(--shadow);
		background: var(--map-sea);
		border: 1.5px solid var(--line);
	}
	svg {
		width: 100%;
		height: auto;
	}
	.sea {
		fill: var(--map-sea);
	}
	.countries path {
		fill: var(--map-land);
		stroke: var(--map-stroke);
		stroke-width: 1;
		stroke-linejoin: round;
		transition: fill 0.3s;
	}
	.countries path.visited {
		fill: var(--map-land-active);
	}
	.countries path.home {
		fill: color-mix(in srgb, var(--gold) 35%, var(--map-land));
	}
	.arcs path {
		fill: none;
		stroke: var(--accent);
		opacity: 0.55;
		animation: in 0.8s var(--ease) both;
		animation-delay: calc(var(--i) * 120ms + 200ms);
		transition: opacity 0.2s;
	}
	.arcs path.active {
		opacity: 1;
	}
	@keyframes in {
		from {
			opacity: 0;
		}
	}
	.home-pt circle {
		fill: var(--primary);
	}
	.home-pt .halo {
		fill: none;
		stroke: var(--primary);
		opacity: 0.4;
	}
	text {
		font-family: var(--font-body);
		font-weight: 700;
		fill: var(--ink);
		paint-order: stroke;
		stroke: var(--map-land);
		stroke-linejoin: round;
		pointer-events: none;
	}
	.home-pt text {
		fill: var(--primary);
	}
	.pt {
		cursor: pointer;
		outline: none;
	}
	.hit {
		fill: transparent;
	}
	.dot {
		fill: var(--accent);
		stroke: var(--surface);
		transition: r 0.2s var(--ease);
	}
	.pt:focus-visible .dot {
		stroke: var(--ink);
	}
	.pt.on .dot {
		fill: var(--primary);
	}
</style>
