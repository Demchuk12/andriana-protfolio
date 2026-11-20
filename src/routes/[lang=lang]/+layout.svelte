<script lang="ts">
	import { onMount } from 'svelte';
	import { resolve } from '$app/paths';
	import { setI18n } from '#lib/i18n/context.ts';
	import { langs } from '#lib/i18n/index.ts';
	import { theme } from '#lib/theme.svelte.ts';
	import { SITE_URL } from '#lib/site.ts';
	import Header from '#lib/components/Header.svelte';
	import Footer from '#lib/components/Footer.svelte';

	let { data, children } = $props();

	setI18n({
		get lang() {
			return data.lang;
		},
		get t() {
			return data.t;
		}
	});

	onMount(() => theme.init());

	$effect(() => {
		document.documentElement.lang = data.lang;
	});
</script>

<svelte:head>
	<title>{data.t.meta.title}</title>
	<meta name="description" content={data.t.meta.description} />
	<meta property="og:title" content={data.t.meta.title} />
	<meta property="og:description" content={data.t.meta.description} />
	<meta property="og:type" content="website" />
	<meta property="og:locale" content={data.lang === 'uk' ? 'uk_UA' : 'en_GB'} />
	{#each langs as l (l)}
		<link rel="alternate" hreflang={l} href={SITE_URL + resolve('/[lang=lang]', { lang: l })} />
	{/each}
</svelte:head>

<a class="skip" href="#main">{data.lang === 'uk' ? 'Перейти до змісту' : 'Skip to content'}</a>
<Header />
<main id="main">
	{@render children()}
</main>
<Footer />

<style>
	.skip {
		position: absolute;
		left: 12px;
		top: -60px;
		z-index: 200;
		padding: 10px 16px;
		background: var(--primary);
		color: var(--primary-ink);
		border-radius: 8px;
	}
	.skip:focus {
		top: 12px;
	}
</style>
