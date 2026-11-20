export type Theme = 'light' | 'dark';

class ThemeState {
	current = $state<Theme>('light');

	/** Зчитує тему, яку вже поставив інлайн-скрипт у app.html */
	init() {
		const t = document.documentElement.dataset.theme;
		this.current = t === 'dark' ? 'dark' : 'light';
	}

	toggle() {
		this.current = this.current === 'dark' ? 'light' : 'dark';
		document.documentElement.dataset.theme = this.current;
		try {
			localStorage.setItem('theme', this.current);
		} catch {
			/* приватний режим: просто не зберігаємо */
		}
	}
}

export const theme = new ThemeState();
