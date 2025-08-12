const { test, request, expect } = require('@playwright/test');
const { getAuthToken } = require('./auth-helper');

test.describe('API Authenticated Endpoints', () => {
  let token;

  test.beforeAll(async ({ browser }) => {
    const page = await browser.newPage();
    token = await getAuthToken(page);
    await page.close();
  });

  test('GET /api/User/GetByExternalId/{id}', async ({ request }) => {
    // Replace with a valid externalId if needed
    const externalId = 'ff13d1a2-ffef-41b5-be5b-1a54fa88678d';
    const response = await request.get(`https://pulsedev.nixonhire.com/api/User/GetByExternalId/${externalId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    expect(response.ok()).toBeTruthy();
    const data = await response.json();
    expect(data).toBeDefined();
  });

  test('Intercept /api/Report/Energy/Site (UI-driven)', async ({ page }) => {
    // Login via UI using helper
    await getAuthToken(page);
    // Intercept the API call
    const [response] = await Promise.all([
      page.waitForResponse(resp => resp.url().includes('/api/Report/Energy/Site') && resp.status() === 200),
      page.goto('https://pulsedev.nixonhire.com/energy-management?startDate=2025-07-29&endDate=2025-08-05'),
    ]);
    const body = await response.json();
    console.log('Energy Site body:', body);
    expect(body).toBeDefined();
  });
});
