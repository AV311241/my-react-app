// @ts-check
import { test, expect } from '@playwright/test';

// test('has title', async ({ page }) => {
//   await page.goto('https://playwright.dev/');

//   // Expect a title "to contain" a substring.
//   await expect(page).toHaveTitle(/Playwright/);
// });

// test('get started link', async ({ page }) => {
//   await page.goto('https://playwright.dev/');

//   // Click the get started link.
//   await page.getByRole('link', { name: 'Get started' }).click();

//   // Expects page to have a heading with the name of Installation.
//   await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
// });

test('home page displays mobile info', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Mobile Devices' })).toBeVisible();
  await expect(page.getByText(/smartphones/i)).toBeVisible();
});

test('about page displays app info', async ({ page }) => {
  await page.goto('/about');
  await expect(page.getByRole('heading', { name: 'About This App' })).toBeVisible();
  await expect(page.getByText(/react application/i)).toBeVisible();
});

test('contact page displays contact info', async ({ page }) => {
  await page.goto('/contact');
  await expect(page.getByRole('heading', { name: 'Contact Us' })).toBeVisible();
  await expect(page.getByText(/info@example.com/i)).toBeVisible();
});
