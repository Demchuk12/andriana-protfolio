<script lang="ts">
	import '@fontsource/playfair-display/latin-700.css';
	import '@fontsource/playfair-display/cyrillic-700.css';
	import '@fontsource/playfair-display/latin-700-italic.css';
	import '@fontsource/playfair-display/cyrillic-700-italic.css';
	import '@fontsource/manrope/latin-400.css';
	import '@fontsource/manrope/cyrillic-400.css';
	import '@fontsource/manrope/latin-600.css';
	import '@fontsource/manrope/cyrillic-600.css';
	import '@fontsource/manrope/latin-700.css';
	import '@fontsource/manrope/cyrillic-700.css';
	import '@fontsource/caveat/latin-600.css';
	import '@fontsource/caveat/cyrillic-600.css';
	import '#lib/styles/global.css';

	let { children } = $props();
</script>

{@render children()}
