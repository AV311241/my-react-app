import { test, expect } from '@playwright/test';

test('contact page should show contact details', async ({ page }) => {
  await page.goto('/contact');

  await expect(page.locator('h2')).toHaveText(/Contact Us/i);
  await expect(page.locator('text=info@example.com')).toBeVisible();
  await expect(page.locator('text=+1-234-567-8901')).toBeVisible();
});
