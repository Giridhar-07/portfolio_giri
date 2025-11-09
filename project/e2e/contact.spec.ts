import { test, expect } from '@playwright/test';

/**
 * Contact E2E
 * Checks that the contact page renders form elements and is accessible via nav.
 */
test('navigate to Contact page and verify form elements', async ({ page }) => {
  await page.goto('/');
  await page.click('nav >> text=Contact');
  await expect(page).toHaveURL(/\/contact$/);
  // Verify key form fields exist
  await expect(page.getByLabel(/name/i)).toBeVisible({ timeout: 5000 });
  await expect(page.getByLabel(/email/i)).toBeVisible({ timeout: 5000 });
  await expect(page.getByRole('button', { name: /send/i })).toBeVisible();
});