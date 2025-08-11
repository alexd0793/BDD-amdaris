
const { test, expect } = require('@playwright/test');

test.describe('API Main Sections (UI-driven)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://pulsedev.nixonhire.com');
  const { LOGIN_EMAIL, LOGIN_PASSWORD } = require('../e2e/constants/loginDetails');
  await page.getByRole('textbox', { name: 'Email' }).fill(LOGIN_EMAIL);
  await page.getByRole('textbox', { name: 'Password' }).fill(LOGIN_PASSWORD);
    await page.getByRole('button', { name: 'Continue' }).click();
    await page.waitForSelector('input[placeholder="Search for sites"]');
  });

  test('Intercept /api/Homepage/Payments', async ({ page }) => {
    const [response] = await Promise.all([
      page.waitForResponse(resp => resp.url().includes('/api/Homepage/Payments') && resp.status() === 200),
      page.goto('https://pulsedev.nixonhire.com/dashboard'),
    ]);
    const body = await response.json();
    console.log('Payments body:', body);
    expect(body).toBeDefined();
  });

  test('Intercept /api/Homepage/Organization', async ({ page }) => {
    const [response] = await Promise.all([
      page.waitForResponse(resp => resp.url().includes('/api/Homepage/Organization') && resp.status() === 200),
      page.goto('https://pulsedev.nixonhire.com/dashboard'),
    ]);
    const body = await response.json();
    console.log('Organization body:', body);
    expect(body).toBeDefined();
  });

  test('Intercept /api/AccountSummary', async ({ page }) => {
    const [response] = await Promise.all([
      page.waitForResponse(resp => resp.url().includes('/api/AccountSummary') && resp.status() === 200),
      page.goto('https://pulsedev.nixonhire.com/dashboard'),
    ]);
    const body = await response.json();
    console.log('AccountSummary body:', body);
    expect(body).toBeDefined();
  });
});
