import { expect, test } from '@playwright/test';

test('renders and hydrates every Chart documentation example', async ({ page }) => {
	const serverResponse = await page.request.get('http://localhost:4173/components/chart');
	expect(serverResponse.ok()).toBe(true);
	const serverHtml = await serverResponse.text();
	expect(serverHtml.match(/<svg[^>]*class="ts-chart"/g)).toHaveLength(1);

	const hydrationMessages: string[] = [];
	const pageErrors: string[] = [];
	page.on('console', (message) => {
		if (/hydration|mismatch/i.test(message.text())) hydrationMessages.push(message.text());
	});
	page.on('pageerror', (error) => pageErrors.push(error.message));

	await page.goto('/components/chart');
	await expect(page.locator('[data-slot="chart"]')).toHaveCount(1);
	await expect(page.getByRole('combobox', { name: 'Chart type' })).toHaveText('Line');
	await expect(page.getByRole('img', { name: 'Quarterly revenue line chart' })).toBeVisible();

	const usageChart = page.getByRole('img', { name: 'Quarterly revenue line chart' });
	await usageChart.focus();
	await usageChart.press('ArrowRight');
	await expect(usageChart.locator('..').getByRole('status')).toBeVisible();

	const ratio = await usageChart.evaluate((svg) => {
		const [, , width, height] = (svg.getAttribute('viewBox') ?? '').split(' ').map(Number);
		return width / height;
	});
	expect(ratio).toBeCloseTo(960 / 480, 4);

	await page.getByRole('combobox', { name: 'Chart type' }).click();
	await page.getByRole('option', { name: 'Map', exact: true }).click();
	await expect(page.getByRole('img', { name: 'Regional map chart' })).toBeVisible();

	await page.getByRole('tab', { name: 'Examples' }).click();
	await expect(page.locator('[data-slot="chart"]')).toHaveCount(5);
	await expect(
		page.getByRole('img', { name: 'Monthly actual and forecast revenue' })
	).toBeVisible();
	await expect(
		page.getByRole('img', { name: 'Quarterly revenue grouped by product' })
	).toBeVisible();
	await expect(
		page.getByRole('img', { name: 'Quarterly revenue stacked by product' })
	).toBeVisible();
	await expect(page.getByRole('img', { name: 'Product capability profile' })).toBeVisible();
	await expect(page.getByRole('img', { name: 'API response time' })).toBeVisible();

	expect(hydrationMessages).toEqual([]);
	expect(pageErrors).toEqual([]);
});
