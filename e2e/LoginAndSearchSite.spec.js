const { test, expect } = require('@playwright/test');

test('Login, search for site HU1 1NE, and click on it', async ({ page }) => {
  // Go to the login page
  await page.goto('https://pulsedev.nixonhire.com');

  // Fill in login credentials
  await page.getByRole('textbox', { name: 'Email' }).fill('alexandru.dancesc+ERIC_WRIGHT_CIVIL_ENGINEERING_LIMITED@amdaris.com');
  await page.getByRole('textbox', { name: 'Password' }).fill('Autoliv6940!');

  // Click the Continue button
  await page.getByRole('button', { name: 'Continue' }).click();

  // Wait for the search box to appear after login
  await page.waitForSelector('input[placeholder="Search for sites"]');

  // Search for the site
  await page.getByRole('searchbox', { name: 'Search for sites' }).fill('HU1 1NE');
  await page.keyboard.press('Enter');

  // Wait for the map marker to appear and click it
  await page.getByRole('img', { name: 'Map marker' }).click();
});
