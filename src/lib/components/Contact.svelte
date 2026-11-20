<script lang="ts">
	import { useI18n } from '#lib/i18n/context.ts';
	import { profile } from '#lib/data/profile.ts';
	import { reveal } from '#lib/reveal.ts';

	const i18n = useI18n();
	const t = $derived(i18n.t);

	const items = $derived([
		{ icon: 'phone', label: t.contact.phone, value: profile.phone, href: profile.phoneHref },
		{ icon: 'mail', label: t.contact.email, value: profile.email, href: `mailto:${profile.email}` },
		{ icon: 'send', label: t.contact.telegram, value: '@' + profile.telegram, href: `https://t.me/${profile.telegram}` }
	]);

	const icons: Record<string, string> = {
		phone: 'M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z',
		mail: 'M4 4h16c1.1 0 2 .9 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6c0-1.1.9-2 2-2z M22 6l-10 7L2 6',
		send: 'M22 2 11 13 M22 2l-7 20-4-9-9-4 20-7z'
	};
</script>

<section class="section" id="contact">
	<div class="container">
		<div class="postcard" use:reveal>
			<div class="left">
				<p class="kicker">{t.contact.kicker}</p>
				<h2 class="section-title">{t.contact.title}</h2>
				<p class="lead">{t.contact.text}</p>
				<p class="hand">{t.contact.greeting}<br />— {profile.name[i18n.lang].split(' ')[0]}</p>
			</div>
			<div class="right">
				<div class="stamp" aria-hidden="true">
					<span>{t.contact.stamp}</span>
					<strong>UA</strong>
				</div>
				<ul>
					{#each items as it (it.label)}
						<li>
							<a href={it.href} target={it.href.startsWith('http') ? '_blank' : undefined} rel="noopener">
								<span class="ico" aria-hidden="true">
									<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d={icons[it.icon]} /></svg>
								</span>
								<span class="txt">
									<span class="lbl">{it.label}</span>
									<span class="val">
										{#if it.icon === 'mail'}
											{it.value.split('@')[0]}<wbr />@{it.value.split('@')[1]}
										{:else}
											{it.value}
										{/if}
									</span>
								</span>
								<span class="arrow" aria-hidden="true">→</span>
							</a>
						</li>
					{/each}
				</ul>
			</div>
		</div>
	</div>
</section>

<style>
	.postcard {
		display: grid;
		background: var(--surface);
		border-radius: var(--radius);
		box-shadow: var(--shadow-lg);
		padding: clamp(24px, 5vw, 56px);
		gap: 32px;
		position: relative;
		/* поштова рамка */
		outline: 2px dashed var(--line);
		outline-offset: -12px;
	}
	@media (min-width: 860px) {
		.postcard {
			grid-template-columns: 1.2fr 1fr;
			gap: 0;
		}
		.right {
			border-left: 1.5px solid var(--line);
			padding-left: 48px;
			margin-left: 48px;
		}
	}
	.left {
		display: grid;
		gap: 14px;
		align-content: start;
	}
	.hand {
		font-family: var(--font-hand);
		font-size: 1.8rem;
		line-height: 1.1;
		color: var(--primary);
		margin-top: 8px;
	}
	.right {
		display: grid;
		align-content: start;
		gap: 24px;
	}
	.stamp {
		justify-self: end;
		width: 88px;
		height: 104px;
		display: grid;
		place-items: center;
		align-content: center;
		background: var(--accent-soft);
		color: var(--accent);
		border: 3px dotted var(--accent);
		transform: rotate(6deg);
		font-weight: 700;
		text-transform: uppercase;
		font-size: 0.7rem;
		letter-spacing: 0.12em;
	}
	.stamp strong {
		font-family: var(--font-display);
		font-size: 2rem;
		letter-spacing: 0;
	}
	ul {
		list-style: none;
		margin: 0;
		padding: 0;
		display: grid;
		gap: 10px;
	}
	li a {
		display: grid;
		grid-template-columns: auto minmax(0, 1fr) auto;
		align-items: center;
		gap: 14px;
		min-height: 64px;
		padding: 10px 16px 10px 10px;
		border-radius: var(--radius-sm);
		border: 1.5px solid var(--line);
		background: var(--surface-2);
		text-decoration: none;
		color: var(--ink);
		transition:
			border-color 0.2s,
			transform 0.2s var(--ease);
	}
	li a:active {
		transform: scale(0.98);
	}
	@media (hover: hover) {
		li a:hover {
			border-color: var(--accent);
		}
		li a:hover .arrow {
			transform: translateX(4px);
		}
	}
	.ico {
		width: 44px;
		height: 44px;
		border-radius: 50%;
		display: grid;
		place-items: center;
		background: var(--accent-soft);
		color: var(--accent);
	}
	.txt {
		display: grid;
		min-width: 0;
	}
	.lbl {
		font-size: 0.7rem;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		font-weight: 700;
		color: var(--ink-faint);
	}
	.val {
		font-size: 1.05rem;
		font-weight: 700;
		overflow-wrap: normal;
		hyphens: manual;
	}
	.arrow {
		color: var(--accent);
		font-weight: 700;
		transition: transform 0.2s var(--ease);
	}

	@media (max-width: 859px) {
		.postcard {
			gap: 24px;
			padding-top: 32px;
		}
		/* марка в кутку листівки, а не окремим рядком */
		.stamp {
			position: absolute;
			top: 22px;
			right: 22px;
			width: 64px;
			height: 76px;
		}
		.stamp strong {
			font-size: 1.5rem;
		}
		.left :global(.kicker) {
			padding-right: 76px;
		}
		.hand {
			font-size: 1.6rem;
		}
	}
</style>
