import { sveltekit } from '@sveltejs/kit/vite';
import adapter from '@sveltejs/adapter-static';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [
		sveltekit({
			adapter: adapter(),
			prerender: {
				// Видалене в адмінці фото не має зупиняти публікацію всього сайту
				handleHttpError: ({ path, message }) => {
					if (!path.startsWith('/photos/')) throw new Error(message);
					console.warn(message);
				}
			}
		})
	]
});
