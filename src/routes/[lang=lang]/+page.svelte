<script lang="ts">
	let { data } = $props();
	import Hero from '#lib/components/Hero.svelte';
	import About from '#lib/components/About.svelte';
	import Experience from '#lib/components/Experience.svelte';
	import Destinations from '#lib/components/Destinations.svelte';
	import Gallery from '#lib/components/Gallery.svelte';
	import Skills from '#lib/components/Skills.svelte';
	import Contact from '#lib/components/Contact.svelte';
</script>

<Hero />
<About />
<Experience />
<Destinations map={data.map} />
<Gallery />
<Skills />
<Contact />
