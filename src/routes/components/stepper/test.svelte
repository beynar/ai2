<script>
	import { mode } from 'mode-watcher';
</script>

<Streamdown
	shikiTheme={mode.current === 'dark' ? 'github-dark' : 'github-light'}
	shikiPreloadThemes={['github-dark', 'github-light']}
	{...yourConfig}
/>
