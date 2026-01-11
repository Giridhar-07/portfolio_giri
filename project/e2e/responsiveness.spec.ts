import { test, expect } from '@playwright/test';

/**
 * Responsiveness E2E
 * Validates mobile menu interaction and navigation on small viewports.
 */
test('mobile menu opens and navigates to Skills', async ({ page, browser }) => {
  const context = await browser.newContext({ viewport: { width: 375, height: 812 } });
  const mobilePage = await context.newPage();
  await mobilePage.goto('/');

  await mobilePage.getByLabel('Toggle mobile menu').click();
  await mobilePage.click('text=Skills');
  await expect(mobilePage).toHaveURL(/\/skills$/);
  await expect(mobilePage.getByText('Skills & Expertise')).toBeVisible();
});