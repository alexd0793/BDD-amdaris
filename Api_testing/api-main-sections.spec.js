const { test, expect } = require('@playwright/test');
const { getAuthToken } = require('./auth-helper');


test.describe('API Main Sections (UI-driven)', () => {
  test.beforeEach(async ({ page }) => {
    await getAuthToken(page);
    await page.goto('https://pulsedev.nixonhire.com/dashboard');
  });

  test('Intercept /api/Homepage/Payments', async ({ page }) => {
    const response = await page.waitForResponse(resp => resp.url().includes('/api/Homepage/Payments') && resp.status() === 200, { timeout: 60000 });
    const body = await response.json();
    console.log('Payments body:', body);
    expect(body).toBeDefined();
  });

  test('Intercept /api/Homepage/Organization', async ({ page }) => {
    const response = await page.waitForResponse(resp => resp.url().includes('/api/Homepage/Organization') && resp.status() === 200, { timeout: 60000 });
    const body = await response.json();
    console.log('Organization body:', body);
    expect(body).toBeDefined();
  });
});
