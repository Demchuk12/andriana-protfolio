<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import { useI18n } from '#lib/i18n/context.ts';
	import { theme } from '#lib/theme.svelte.ts';

	const i18n = useI18n();
	const t = $derived(i18n.t);

	const sections = ['about', 'experience', 'destinations', 'gallery', 'skills', 'contact'] as const;

	let open = $state(false);
	let scrolled = $state(false);

	const otherLang = $derived(i18n.lang === 'uk' ? 'en' : 'uk');
	const otherHref = $derived(resolve('/[lang=lang]', { lang: otherLang }) + page.url.hash);

	$effect(() => {
		document.body.style.overflow = open ? 'hidden' : '';
	});
</script>

<svelte:window
	onscroll={() => (scrolled = window.scrollY > 12)}
	onkeydown={(e) => e.key === 'Escape' && (open = false)}
/>

<header class:scrolled class:open>
	<div class="container bar">
		<a class="logo" href="#top" aria-label={i18n.lang === 'uk' ? 'На початок' : 'Back to top'} onclick={() => (open = false)}>
			<span class="stamp">AD</span>
			<span class="logo-text">{i18n.lang === 'uk' ? 'Андріана Дацко' : 'Andriana Datsko'}</span>
		</a>

		<nav id="site-nav" aria-label="Main">
			<ul>
				{#each sections as s, i (s)}
					<li style="--i:{i}">
						<a href="#{s}" onclick={() => (open = false)}>{t.nav[s]}</a>
					</li>
				{/each}
			</ul>
		</nav>

		<div class="tools">
			<a class="icon-btn lang" href={otherHref} hreflang={otherLang} aria-label={t.lang.switchTo} data-sveltekit-noscroll>
				{t.lang.label}
			</a>
			<button
				class="icon-btn"
				onclick={() => theme.toggle()}
				aria-label={theme.current === 'dark' ? t.theme.toLight : t.theme.toDark}
				title={theme.current === 'dark' ? t.theme.toLight : t.theme.toDark}
			>
				{#if theme.current === 'dark'}
					<!-- сонце -->
					<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="4.5" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></svg>
				{:else}
					<!-- місяць -->
					<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z" /></svg>
				{/if}
			</button>
			<button
				class="icon-btn burger"
				aria-expanded={open}
				aria-controls="site-nav"
				aria-label={open ? t.nav.close : t.nav.menu}
				onclick={() => (open = !open)}
			>
				<span></span><span></span><span></span>
			</button>
		</div>
	</div>
</header>

<style>
	header {
		position: sticky;
		top: 0;
		z-index: 50;
		height: var(--header-h);
		transition:
			background-color 0.3s,
			box-shadow 0.3s;
	}
	/* backdrop-filter робить header контейнером для position:fixed,
	   тому для відкритого меню його вимикаємо */
	header.scrolled:not(.open) {
		background: color-mix(in srgb, var(--bg) 88%, transparent);
		backdrop-filter: blur(10px);
		-webkit-backdrop-filter: blur(10px);
		box-shadow: 0 1px 0 var(--line);
	}
	.bar {
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 16px;
	}
	.logo {
		display: flex;
		align-items: center;
		gap: 10px;
		text-decoration: none;
		font-family: var(--font-display);
		font-weight: 700;
		font-size: 1.1rem;
		position: relative;
		z-index: 2;
	}
	.stamp {
		display: grid;
		place-items: center;
		width: 40px;
		height: 40px;
		border-radius: 50%;
		border: 2px dashed var(--accent);
		color: var(--primary);
		font-size: 0.9rem;
		transform: rotate(-8deg);
	}
	.logo-text {
		white-space: nowrap;
	}

	nav ul {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		gap: 4px;
	}
	nav a {
		display: block;
		padding: 8px 12px;
		border-radius: 999px;
		text-decoration: none;
		font-weight: 600;
		font-size: 0.95rem;
		color: var(--ink-soft);
		transition: color 0.2s;
	}
	nav a:hover {
		color: var(--accent);
	}

	.tools {
		display: flex;
		align-items: center;
		gap: 6px;
		position: relative;
		z-index: 2;
	}
	.icon-btn {
		display: grid;
		place-items: center;
		width: 44px;
		height: 44px;
		border-radius: 50%;
		border: 1.5px solid var(--line);
		background: var(--surface);
		color: var(--ink);
		cursor: pointer;
		text-decoration: none;
		font-weight: 700;
		font-size: 0.85rem;
		letter-spacing: 0.04em;
		transition:
			border-color 0.2s,
			color 0.2s;
	}
	.icon-btn:hover {
		border-color: var(--accent);
		color: var(--accent);
	}

	.burger {
		display: none;
		gap: 4px;
		align-content: center;
	}
	.burger span {
		display: block;
		width: 18px;
		height: 2px;
		background: currentColor;
		border-radius: 2px;
		transition: transform 0.3s var(--ease), opacity 0.2s;
	}
	.open .burger span:nth-child(1) {
		transform: translateY(6px) rotate(45deg);
	}
	.open .burger span:nth-child(2) {
		opacity: 0;
	}
	.open .burger span:nth-child(3) {
		transform: translateY(-6px) rotate(-45deg);
	}

	@media (max-width: 960px) {
		.burger {
			display: grid;
		}
		nav {
			position: fixed;
			inset: 0;
			height: 100dvh;
			background: var(--bg);
			display: grid;
			place-items: center;
			opacity: 0;
			visibility: hidden;
			transition:
				opacity 0.3s,
				visibility 0.3s;
		}
		/* пунктирний маршрут на фоні меню */
		nav::before {
			content: '';
			position: absolute;
			inset: 15% 10%;
			border: 2px dashed var(--line);
			border-radius: 40% 60% 55% 45%;
			pointer-events: none;
		}
		.open nav {
			opacity: 1;
			visibility: visible;
		}
		nav ul {
			flex-direction: column;
			align-items: center;
			gap: 8px;
		}
		nav a {
			font-family: var(--font-display);
			font-size: 1.9rem;
			color: var(--ink);
			padding: 8px 20px;
		}
		nav li {
			opacity: 0;
			transform: translateY(12px);
			transition:
				opacity 0.4s var(--ease),
				transform 0.4s var(--ease);
			transition-delay: calc(var(--i) * 50ms);
		}
		.open nav li {
			opacity: 1;
			transform: none;
		}
	}
	@media (max-width: 400px) {
		.logo-text {
			display: none;
		}
	}
</style>
