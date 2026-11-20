<script lang="ts">
	import { useI18n } from '#lib/i18n/context.ts';
	import { skills, languages, education, certificate } from '#lib/data/profile.ts';
	import { reveal } from '#lib/reveal.ts';

	const i18n = useI18n();
	const t = $derived(i18n.t);
</script>

<section class="section alt" id="skills">
	<div class="container">
		<div class="section-head" use:reveal>
			<p class="kicker">{t.skills.kicker}</p>
			<h2 class="section-title">{t.skills.title}</h2>
		</div>

		<div class="layout">
			<div class="tags-grid">
				{#each skills as group, i (group.key)}
					<div class="group" use:reveal={i * 60}>
						<h3>{t.skills[group.key]}</h3>
						<ul>
							{#each group.items as item (item.en)}
								<li>{item[i18n.lang]}</li>
							{/each}
						</ul>
					</div>
				{/each}
			</div>

			<aside class="passport" use:reveal={150}>
				<h3>{t.skills.languages}</h3>
				<ul class="stamps">
					{#each languages as l, i (l.code)}
						<li style="--r:{[-8, 6, -3][i]}deg">
							<span class="stamp">
								<span class="code">{l.code}</span>
								<span class="level">{l.level[i18n.lang]}</span>
							</span>
							<span class="name">{l.name[i18n.lang]}</span>
						</li>
					{/each}
				</ul>

				<h3>{t.skills.education}</h3>
				{#each education as e (e.years)}
					<div class="edu">
						<strong>{e.title[i18n.lang]}</strong>
						<span>{e.place[i18n.lang]}</span>
						<span class="year">{e.years}</span>
					</div>
				{/each}

				<h3>{t.skills.certificate}</h3>
				<div class="edu">
					<strong>{certificate.title[i18n.lang]}</strong>
					<span>{certificate.detail[i18n.lang]}</span>
					<span class="year">{certificate.year}</span>
				</div>
			</aside>
		</div>
	</div>
</section>

<style>
	.alt {
		background: var(--bg-alt);
	}
	.layout {
		display: grid;
		grid-template-columns: minmax(0, 1fr);
		gap: 24px;
	}
	@media (min-width: 960px) {
		.layout {
			grid-template-columns: minmax(0, 1.3fr) minmax(0, 1fr);
			align-items: start;
		}
	}
	.tags-grid {
		display: grid;
		grid-template-columns: minmax(0, 1fr);
		gap: 12px;
	}
	@media (min-width: 640px) {
		.tags-grid {
			grid-template-columns: repeat(2, minmax(0, 1fr));
			gap: 16px;
		}
	}
	.group {
		background: var(--surface);
		border-radius: var(--radius);
		padding: 20px;
		box-shadow: var(--shadow);
		/* бирка валізи */
		border-top: 6px solid var(--primary);
	}
	.group:nth-child(even) {
		border-top-color: var(--accent);
	}
	.group:last-child:nth-child(odd) {
		grid-column: 1 / -1;
	}
	h3 {
		font-size: 1.15rem;
		margin-bottom: 12px;
	}
	.group ul {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
	}
	.group li {
		max-width: 100%;
		padding: 6px 12px;
		border-radius: 999px;
		background: var(--surface-2);
		border: 1px solid var(--line);
		font-size: 0.9rem;
		font-weight: 600;
	}

	/* паспорт */
	.passport {
		background: var(--surface);
		border-radius: var(--radius);
		padding: clamp(20px, 3vw, 32px);
		box-shadow: var(--shadow);
		display: grid;
		gap: 12px;
		background-image: radial-gradient(circle at 1px 1px, var(--line) 1px, transparent 0);
		background-size: 18px 18px;
	}
	.passport h3:not(:first-child) {
		margin-top: 16px;
	}
	.stamps {
		list-style: none;
		margin: 0;
		padding: 0;
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 10px;
	}
	.stamps li {
		display: grid;
		justify-items: center;
		gap: 8px;
		color: var(--accent);
		min-width: 0;
	}
	.stamps li:nth-child(2) {
		color: var(--primary);
	}
	.stamps li:nth-child(3) {
		color: var(--olive);
	}
	.stamp {
		display: grid;
		justify-items: center;
		align-content: center;
		width: min(100%, 96px);
		aspect-ratio: 1;
		border: 3px double currentColor;
		border-radius: 50%;
		transform: rotate(var(--r));
		background: var(--surface);
	}
	.stamps li:nth-child(2) .stamp {
		border-radius: 18px;
	}
	.code {
		font-family: var(--font-display);
		font-size: 1.6rem;
		line-height: 1;
	}
	.name {
		font-size: 0.72rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.06em;
		text-align: center;
		hyphens: manual;
		color: var(--ink-soft);
	}
	.level {
		font-family: var(--font-hand);
		font-size: 1.25rem;
		line-height: 1;
	}
	.edu {
		display: grid;
		gap: 2px;
		padding: 14px 16px;
		border-radius: var(--radius-sm);
		background: var(--surface-2);
		border-left: 4px solid var(--olive);
	}
	.edu span {
		color: var(--ink-soft);
		font-size: 0.95rem;
	}
	.edu .year {
		font-family: var(--font-hand);
		font-size: 1.25rem;
		color: var(--accent);
	}
</style>
