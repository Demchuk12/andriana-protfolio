<script lang="ts">
	import { useI18n } from '#lib/i18n/context.ts';
	import { experience } from '#lib/data/profile.ts';
	import { reveal } from '#lib/reveal.ts';

	const i18n = useI18n();
	const t = $derived(i18n.t);
</script>

<section class="section alt" id="experience">
	<div class="container">
		<div class="section-head" use:reveal>
			<p class="kicker">{t.experience.kicker}</p>
			<h2 class="section-title">{t.experience.title}</h2>
		</div>

		<ol class="timeline">
			{#each experience as job, i (i)}
				<li use:reveal={i * 120}>
					<span class="stop" aria-hidden="true"></span>
					<div class="card">
						<p class="when">
							{job.start[i18n.lang]} — {job.end ? job.end[i18n.lang] : t.experience.now}
						</p>
						<h3>{job.title[i18n.lang]}</h3>
						<p class="company">{job.company}</p>
						<ul>
							{#each job.points as p, j (j)}
								<li>{p[i18n.lang]}</li>
							{/each}
						</ul>
					</div>
				</li>
			{/each}
		</ol>
	</div>
</section>

<style>
	.alt {
		background: var(--bg-alt);
	}
	.timeline {
		list-style: none;
		margin: 0;
		padding: 0 0 0 32px;
		position: relative;
		display: grid;
		gap: 32px;
	}
	/* дорога */
	.timeline::before {
		content: '';
		position: absolute;
		left: 9px;
		top: 8px;
		bottom: 8px;
		border-left: 3px dashed var(--accent);
		opacity: 0.6;
	}
	.timeline > li {
		position: relative;
	}
	.stop {
		position: absolute;
		left: -32px;
		top: 22px;
		width: 22px;
		height: 22px;
		border-radius: 50%;
		background: var(--bg-alt);
		border: 4px solid var(--accent);
	}
	.card {
		background: var(--surface);
		border-radius: var(--radius);
		padding: clamp(20px, 3vw, 32px);
		box-shadow: var(--shadow);
	}
	.when {
		font-family: var(--font-hand);
		font-size: 1.4rem;
		color: var(--accent);
		line-height: 1.1;
	}
	h3 {
		font-size: clamp(1.4rem, 3vw, 1.8rem);
		margin-top: 4px;
	}
	.company {
		color: var(--ink-faint);
		font-weight: 700;
		font-size: 0.85rem;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		margin-top: 4px;
	}
	ul {
		margin: 16px 0 0;
		padding: 0;
		list-style: none;
		display: grid;
		gap: 8px;
		color: var(--ink-soft);
	}
	ul li {
		padding-left: 22px;
		position: relative;
	}
	ul li::before {
		content: '';
		position: absolute;
		left: 0;
		top: 0.7em;
		width: 10px;
		border-top: 2px solid var(--olive);
	}
	@media (min-width: 900px) {
		.timeline {
			grid-template-columns: 1fr 1fr;
			padding: 32px 0 0;
		}
		.timeline::before {
			left: 0;
			right: 0;
			top: 10px;
			bottom: auto;
			border-left: 0;
			border-top: 3px dashed var(--accent);
		}
		.stop {
			left: 24px;
			top: -33px;
		}
	}
</style>
