<script lang="ts">
	import QRCode from '$lib/components/QRCode/QRCode.svelte';
	import Button from '$lib/components/Button/Button.svelte';
	import ComponentCard from '../../ComponentCard.svelte';
	import DocPage from '../../DocPage.svelte';

	const sizes = ['small', 'normal', 'large'] as const;
	const colors = ['primary', 'secondary', 'danger', 'success', 'foreground'] as const;
	const value = 'https://svelai.dev';

	let qr: QRCode;
</script>

<DocPage
	title="QRCode"
	subtitle="Renders a customizable QR code with themed sizes, colors, shapes and downloads."
	component="QRCode"
	features={[
		'Encoded with vendored qrcodegen library',
		'role=img with configurable ariaLabel',
		'SVG, PNG, and JPEG download',
		'Custom module and finder styles',
		'Linear and radial gradient fills'
	]}
>
	<ComponentCard
		description="Default QR code for a URL."
		code={`<QRCode value="https://svelai.dev" />`}
	>
		<QRCode {value} />
	</ComponentCard>

	{#snippet examples()}
	<ComponentCard description="Three size variants: small, normal, and large.">
		{#each sizes as size (size)}
			<QRCode {value} {size} />
		{/each}
	</ComponentCard>

	<ComponentCard description="Themed foreground colors from the design system.">
		{#each colors as color (color)}
			<QRCode {value} {color} size="small" />
		{/each}
	</ComponentCard>

	<ComponentCard description="Custom module styles, finder patterns, and gradient fills.">
		<QRCode
			{value}
			dataModulesSettings={{ style: 'circle' }}
			finderPatternOuterSettings={{ style: 'rounded' }}
			finderPatternInnerSettings={{ style: 'circle' }}
		/>
		<QRCode
			{value}
			dataModulesSettings={{ style: 'circuit-board' }}
			finderPatternOuterSettings={{ style: 'circle' }}
			finderPatternInnerSettings={{ style: 'microchip' }}
		/>
		<QRCode
			{value}
			gradient={{
				type: 'linear',
				rotation: 45,
				stops: [
					{ offset: '0%', color: '#6d78d5' },
					{ offset: '100%', color: '#d56d6d' }
				]
			}}
			dataModulesSettings={{ style: 'rounded' }}
			finderPatternOuterSettings={{ style: 'leaf' }}
			finderPatternInnerSettings={{ style: 'leaf' }}
		/>
		<QRCode
			{value}
			color="primary"
			level="H"
			background="white"
			dataModulesSettings={{ style: 'vertical-line' }}
		/>
	</ComponentCard>

	<ComponentCard description="Download the rendered QR as SVG, PNG, or JPEG." class="flex-col">
		<QRCode bind:this={qr} {value} size="large" />
		<div class="flex gap-2">
			<Button size="small" onClick={() => qr.download()}>SVG</Button>
			<Button size="small" onClick={() => qr.download({ format: 'png' })}>PNG</Button>
			<Button size="small" onClick={() => qr.download({ format: 'jpeg' })}>JPEG</Button>
		</div>
	</ComponentCard>
	{/snippet}
</DocPage>
