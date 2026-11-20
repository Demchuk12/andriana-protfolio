<script lang="ts">
	import { useI18n } from '#lib/i18n/context.ts';
	import { profile } from '#lib/data/profile.ts';

	const i18n = useI18n();
</script>

<footer>
	<div class="container row">
		<span>© {new Date().getFullYear()} {profile.name[i18n.lang]}</span>
		<span class="hand">{i18n.t.footer.made} ✈</span>
	</div>
</footer>

<style>
	footer {
		border-top: 2px dashed var(--line);
		padding-block: 28px;
		color: var(--ink-faint);
		font-size: 0.9rem;
	}
	.row {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		gap: 8px;
	}
	.hand {
		font-family: var(--font-hand);
		font-size: 1.3rem;
		color: var(--accent);
	}
</style>
