import type { Action } from 'svelte/action';

/** Плавна поява елемента, коли він потрапляє у видиму область */
export const reveal: Action<HTMLElement, number | undefined> = (node, delay = 0) => {
	node.classList.add('reveal');
	node.style.transitionDelay = `${delay}ms`;
	const io = new IntersectionObserver(
		(entries) => {
			for (const e of entries) {
				if (e.isIntersecting) {
					node.classList.add('in');
					io.disconnect();
				}
			}
		},
		{ rootMargin: '0px 0px -10% 0px' }
	);
	io.observe(node);
	return { destroy: () => io.disconnect() };
};
