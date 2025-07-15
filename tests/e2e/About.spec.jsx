import { test, expect } from '@playwright/test';

test('about page should display app description', async ({ page }) => {
  await page.goto('/about');

  await expect(page.locator('h2')).toHaveText(/About This App/i);
  await expect(page.locator('text=React 19')).toBeVisible();
  await expect(page.locator('text=Vite').nth(0)).toBeVisible();
});
