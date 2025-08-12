const { test, expect } = require('@playwright/test');
const { getAuthToken } = require('./auth-helper');


test.describe('API Main Sections (UI-driven)', () => {
  test.beforeEach(async ({ page }) => {
    await getAuthToken(page);
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
