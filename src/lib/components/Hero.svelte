<script lang="ts">
	import { useI18n } from '#lib/i18n/context.ts';
	import { profile } from '#lib/data/profile.ts';
	import { destinations } from '#lib/data/destinations.ts';

	const i18n = useI18n();
	const t = $derived(i18n.t);
	const name = $derived(profile.name[i18n.lang].split(' '));
</script>

<section class="hero" id="top">
	<!-- декоративний маршрут на фоні -->
	<svg class="route" viewBox="0 0 1200 600" preserveAspectRatio="none" aria-hidden="true">
		<path d="M-20 520 C 200 420, 320 560, 520 430 S 860 160, 1220 120" />
	</svg>

	<div class="container grid">
		<div class="intro">
			<p class="kicker">{t.hero.role}</p>
			<h1>
				<span>{name[0]}</span>
				<em>{name[1]}</em>
			</h1>
			<p class="tagline">{t.hero.tagline}</p>
			<div class="cta">
				<a class="btn" href="#destinations">{t.hero.ctaRoutes}</a>
				<a class="btn ghost" href="#contact">{t.hero.ctaContact}</a>
			</div>
		</div>

		<article class="pass" aria-label={t.hero.ticket}>
			<div class="pass-main">
				<header>
					<span class="pass-label">{t.hero.ticket}</span>
					<span class="pass-code">ADT · {profile.sinceYear}</span>
				</header>

				<div class="route-row">
					<div>
						<span class="lbl">{t.hero.from}</span>
						<strong class="iata">LWO</strong>
						<span class="city">{t.hero.fromCity}</span>
					</div>
					<div class="bus" aria-hidden="true">
						<svg viewBox="0 0 64 24" width="64" height="24">
							<line x1="0" y1="12" x2="64" y2="12" stroke="currentColor" stroke-width="2" stroke-dasharray="4 4" />
							<g transform="translate(20 2)">
								<rect x="0" y="0" width="24" height="16" rx="4" fill="currentColor" />
								<rect x="3" y="3" width="6" height="5" rx="1" fill="var(--surface)" />
								<rect x="11" y="3" width="6" height="5" rx="1" fill="var(--surface)" />
								<circle cx="6" cy="18" r="3" fill="currentColor" stroke="var(--surface)" stroke-width="1.5" />
								<circle cx="18" cy="18" r="3" fill="currentColor" stroke="var(--surface)" stroke-width="1.5" />
							</g>
						</svg>
					</div>
					<div class="right">
						<span class="lbl">{t.hero.to}</span>
						<strong class="iata">EU</strong>
						<span class="city">{t.hero.toCity}</span>
					</div>
				</div>

				<dl class="details">
					<div>
						<dt>{t.hero.passenger}</dt>
						<dd>{profile.name[i18n.lang]}</dd>
					</div>
					<div>
						<dt>{t.hero.seat}</dt>
						<dd>{t.hero.seatValue}</dd>
					</div>
					<div>
						<dt>{t.hero.gate}</dt>
						<dd>{new Set(destinations.map((d) => d.countryCode)).size}</dd>
					</div>
				</dl>
			</div>

			<div class="pass-stub">
				<span class="lbl">{t.hero.since}</span>
				<strong>{profile.sinceYear}</strong>
				<div class="barcode" aria-hidden="true"></div>
			</div>
		</article>
	</div>
</section>

<style>
	.hero {
		position: relative;
		padding-block: clamp(40px, 8vw, 96px) clamp(64px, 10vw, 120px);
		overflow: hidden;
	}
	.route {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		pointer-events: none;
	}
	.route path {
		fill: none;
		stroke: var(--accent);
		stroke-width: 2;
		stroke-dasharray: 8 10;
		opacity: 0.35;
		vector-effect: non-scaling-stroke;
		animation: dash 40s linear infinite;
	}
	@media (max-width: 960px) {
		/* на вузьких екранах лінія йде за талоном, а не через текст */
		.route {
			top: auto;
			height: 45%;
		}
		.route path {
			opacity: 0.25;
		}
	}
	@keyframes dash {
		to {
			stroke-dashoffset: -400;
		}
	}

	.grid {
		position: relative;
		display: grid;
		gap: clamp(40px, 6vw, 64px);
		align-items: center;
	}
	@media (min-width: 960px) {
		.grid {
			grid-template-columns: 1.1fr 1fr;
		}
	}

	h1 {
		font-size: clamp(3rem, 11vw, 6.2rem);
		line-height: 0.95;
		margin-block: 16px 24px;
		letter-spacing: -0.01em;
	}
	h1 span,
	h1 em {
		display: block;
	}
	h1 em {
		color: var(--accent);
		font-style: italic;
	}
	.tagline {
		font-size: clamp(1.02rem, 2.2vw, 1.25rem);
		color: var(--ink-soft);
		max-width: 34ch;
	}
	.cta {
		display: flex;
		flex-wrap: wrap;
		gap: 12px;
		margin-top: 32px;
	}
	@media (max-width: 520px) {
		/* дві однакові кнопки в ряд на всю ширину */
		.cta {
			display: grid;
			grid-template-columns: 1fr 1fr;
			gap: 10px;
			margin-top: 28px;
		}
		.cta .btn {
			padding: 0 12px;
			font-size: 0.95rem;
		}
	}

	/* ── посадковий талон ── */
	.pass {
		--notch: 14px;
		display: grid;
		grid-template-columns: 1fr auto;
		background: var(--surface);
		border-radius: var(--radius);
		box-shadow: var(--shadow-lg);
		transform: rotate(2deg);
		transition: transform 0.5s var(--ease);
		max-width: 540px;
		justify-self: center;
		width: 100%;
	}
	@media (hover: hover) {
		.pass:hover {
			transform: rotate(0deg) translateY(-4px);
		}
	}
	.pass-main {
		padding: 24px;
		display: grid;
		gap: 20px;
		min-width: 0;
	}
	.pass header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 12px;
		padding-bottom: 14px;
		border-bottom: 1.5px dashed var(--line);
	}
	.pass-label {
		font-family: var(--font-hand);
		font-size: 1.5rem;
		color: var(--accent);
		line-height: 1;
	}
	.pass-code,
	.lbl,
	dt {
		font-size: 0.7rem;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: var(--ink-faint);
		font-weight: 700;
	}
	.route-row {
		display: grid;
		grid-template-columns: auto 1fr auto;
		align-items: center;
		gap: 12px;
	}
	.route-row > div:not(.bus) {
		display: grid;
	}
	.route-row .right {
		text-align: right;
	}
	.iata {
		font-family: var(--font-display);
		font-size: clamp(2rem, 7vw, 2.8rem);
		line-height: 1.05;
		color: var(--primary);
	}
	.city {
		color: var(--ink-soft);
		font-weight: 600;
	}
	.bus {
		color: var(--accent);
		display: grid;
		justify-items: center;
	}
	.bus svg {
		width: 100%;
		max-width: 120px;
	}
	.details {
		display: grid;
		grid-template-columns: repeat(3, auto);
		justify-content: space-between;
		gap: 12px;
		margin: 0;
	}
	dd {
		margin: 2px 0 0;
		font-weight: 700;
	}

	.pass-stub {
		position: relative;
		display: grid;
		align-content: center;
		justify-items: center;
		gap: 4px;
		padding: 24px 20px;
		border-left: 2px dashed var(--line);
		background: var(--surface-2);
		border-radius: 0 var(--radius) var(--radius) 0;
		text-align: center;
	}
	/* виїмки перфорації */
	.pass-stub::before,
	.pass-stub::after {
		content: '';
		position: absolute;
		left: calc(var(--notch) * -1 - 1px);
		width: calc(var(--notch) * 2);
		height: calc(var(--notch) * 2);
		border-radius: 50%;
		background: var(--bg);
	}
	.pass-stub::before {
		top: calc(var(--notch) * -1);
	}
	.pass-stub::after {
		bottom: calc(var(--notch) * -1);
	}
	.pass-stub strong {
		font-family: var(--font-display);
		font-size: 1.8rem;
		color: var(--primary);
	}
	.barcode {
		width: 64px;
		height: 72px;
		margin-top: 8px;
		background: repeating-linear-gradient(
			90deg,
			var(--ink) 0 2px,
			transparent 2px 4px,
			var(--ink) 4px 5px,
			transparent 5px 8px,
			var(--ink) 8px 11px,
			transparent 11px 12px
		);
		opacity: 0.8;
	}

	@media (max-width: 520px) {
		.pass {
			grid-template-columns: 1fr;
			transform: rotate(0);
		}
		.pass-main {
			padding: 20px;
		}
		.pass-stub {
			border-left: 0;
			border-top: 2px dashed var(--line);
			border-radius: 0 0 var(--radius) var(--radius);
			grid-template-columns: auto auto 1fr;
			justify-items: start;
			align-items: center;
			gap: 12px;
			padding: 16px 20px;
		}
		.pass-stub::before,
		.pass-stub::after {
			top: calc(var(--notch) * -1 - 1px);
			bottom: auto;
		}
		.pass-stub::before {
			left: calc(var(--notch) * -1);
		}
		.pass-stub::after {
			left: auto;
			right: calc(var(--notch) * -1);
		}
		.barcode {
			justify-self: end;
			width: 100%;
			max-width: 140px;
			height: 36px;
			margin: 0;
		}
	}
</style>
