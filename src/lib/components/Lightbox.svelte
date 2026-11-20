<script lang="ts">
	import { onMount } from 'svelte';
	import type { Photo } from '#lib/data/gallery.ts';
	import { useI18n } from '#lib/i18n/context.ts';

	let { photos, index = $bindable(0), onclose }: { photos: Photo[]; index?: number; onclose: () => void } =
		$props();

	const i18n = useI18n();
	const t = $derived(i18n.t);
	const photo = $derived(photos[index]);

	let dialog: HTMLDialogElement;
	let startX = 0;

	const go = (step: number) => (index = (index + step + photos.length) % photos.length);

	onMount(() => {
		dialog.showModal();
		document.body.style.overflow = 'hidden';
		return () => (document.body.style.overflow = '');
	});

	function onkeydown(e: KeyboardEvent) {
		if (e.key === 'ArrowRight') go(1);
		if (e.key === 'ArrowLeft') go(-1);
	}
</script>

<dialog
	bind:this={dialog}
	{onkeydown}
	onclose={onclose}
	onclick={(e) => e.target === dialog && dialog.close()}
	aria-label={photo.caption[i18n.lang]}
>
	<figure
		onpointerdown={(e) => (startX = e.clientX)}
		onpointerup={(e) => {
			const dx = e.clientX - startX;
			if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
		}}
	>
		{#key photo.src + index}
			<img src={photo.src} alt={photo.alt[i18n.lang]} draggable="false" />
		{/key}
		<figcaption>
			<span>{photo.caption[i18n.lang]}</span>
			<span class="count">{index + 1} / {photos.length}</span>
		</figcaption>
	</figure>

	<button class="nav prev" onclick={() => go(-1)} aria-label={t.gallery.prev}>‹</button>
	<button class="nav next" onclick={() => go(1)} aria-label={t.gallery.next}>›</button>
	<button class="close" onclick={() => dialog.close()} aria-label={t.gallery.close}>✕</button>
</dialog>

<style>
	dialog {
		border: 0;
		padding: 0;
		background: transparent;
		width: 100vw;
		height: 100dvh;
		max-width: none;
		max-height: none;
		display: grid;
		place-items: center;
		color: #fff;
	}
	dialog::backdrop {
		background: rgb(10 16 24 / 0.9);
		backdrop-filter: blur(4px);
	}
	figure {
		margin: 0;
		display: grid;
		gap: 12px;
		max-width: min(92vw, 1100px);
		touch-action: pan-y;
		user-select: none;
	}
	img {
		max-height: 74dvh;
		width: 100%;
		object-fit: contain;
		margin-inline: auto;
		border-radius: 6px;
		border: 8px solid #fffaf2;
		animation: pop 0.35s var(--ease);
	}
	@keyframes pop {
		from {
			opacity: 0;
			transform: scale(0.97);
		}
	}
	figcaption {
		display: flex;
		justify-content: space-between;
		gap: 16px;
		font-family: var(--font-hand);
		font-size: 1.5rem;
		padding-inline: 8px;
	}
	.count {
		font-family: var(--font-body);
		font-size: 0.9rem;
		opacity: 0.7;
		align-self: center;
	}
	button {
		position: fixed;
		width: 48px;
		height: 48px;
		border-radius: 50%;
		border: 1.5px solid rgb(255 255 255 / 0.4);
		background: rgb(0 0 0 / 0.35);
		color: #fff;
		font-size: 1.6rem;
		line-height: 1;
		cursor: pointer;
		display: grid;
		place-items: center;
	}
	button:hover {
		background: rgb(0 0 0 / 0.6);
	}
	.close {
		top: 16px;
		right: 16px;
		font-size: 1.1rem;
	}
	.prev {
		left: 16px;
		top: 50%;
		translate: 0 -50%;
	}
	.next {
		right: 16px;
		top: 50%;
		translate: 0 -50%;
	}
	@media (max-width: 640px) {
		figure {
			max-width: calc(100vw - 24px);
		}
		img {
			border-width: 6px;
		}
		figcaption {
			font-size: 1.35rem;
		}
		/* кнопки внизу, під великий палець */
		.prev,
		.next {
			top: auto;
			bottom: max(16px, env(safe-area-inset-bottom));
			translate: none;
			width: 56px;
			height: 56px;
		}
		.prev {
			left: calc(50% - 68px);
		}
		.next {
			right: calc(50% - 68px);
		}
		.close {
			top: max(12px, env(safe-area-inset-top));
			right: 12px;
		}
	}
</style>
