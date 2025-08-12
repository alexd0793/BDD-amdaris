const { test, expect } = require('@playwright/test');

test('Login, search for site HU1 1NE, and click on it', async ({ page }) => {
  // Go to the login page
  await page.goto('https://pulsedev.nixonhire.com');

  // Fill in login credentials
  require('dotenv').config();
  await page.getByRole('textbox', { name: 'Email' }).fill(process.env.LOGIN_EMAIL || 'test@example.com');
  await page.getByRole('textbox', { name: 'Password' }).fill(process.env.LOGIN_PASSWORD || 'testpassword');

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
