<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';

	// Без JS спрацює meta refresh; з JS обираємо мову браузера
	onMount(() => {
		const lang = navigator.language?.toLowerCase().startsWith('uk') ? 'uk' : 'en';
		goto(resolve('/[lang=lang]', { lang }), { replaceState: true });
	});
</script>

<svelte:head>
	<meta http-equiv="refresh" content="0; url=./uk/" />
	<link rel="canonical" href="./uk/" />
	<title>Andriana Datsko</title>
</svelte:head>
