import { test, expect } from '@playwright/test';

/**
 * Navigation E2E
 * Ensures top navigation routes to feature pages and content loads.
 */
test('navigate to About page and verify content', async ({ page }) => {
  await page.goto('/');
  await page.click('nav >> text=About');
  await expect(page).toHaveURL(/\/about$/);
  // Wait for motion-driven animation to settle before asserting visibility
  await expect(page.getByRole('heading', { name: 'About Me' })).toBeVisible({ timeout: 7000 });
});

test('navigate to Projects page and verify content', async ({ page }) => {
  await page.goto('/');
  await page.click('nav >> text=Projects');
  await expect(page).toHaveURL(/\/projects$/);
  // Projects section heading is "Featured Projects" in the UI
  await expect(page.getByText('Featured Projects')).toBeVisible();
});