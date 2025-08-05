const { test, request, expect } = require('@playwright/test');

// Utility to login and extract the auth token from storage
async function getAuthToken(page) {
  await page.goto('https://pulsedev.nixonhire.com');
  await page.getByRole('textbox', { name: 'Email' }).fill('alexandru.dancesc+ERIC_WRIGHT_CIVIL_ENGINEERING_LIMITED@amdaris.com');
  await page.getByRole('textbox', { name: 'Password' }).fill('Autoliv6940!');
  await page.getByRole('button', { name: 'Continue' }).click();
  await page.waitForSelector('input[placeholder="Search for sites"]');
  // Extract token from localStorage or cookies
  const token = await page.evaluate(() => {
    // Try localStorage
    for (let key in window.localStorage) {
      if (key.toLowerCase().includes('token')) {
        return window.localStorage.getItem(key);
      }
    }
    // Try sessionStorage
    for (let key in window.sessionStorage) {
      if (key.toLowerCase().includes('token')) {
        return window.sessionStorage.getItem(key);
      }
    }
    return null;
  });
  return token;
}

test.describe('API Authenticated Endpoints', () => {
  let token;

  test.beforeAll(async ({ browser }) => {
    const page = await browser.newPage();
    token = await getAuthToken(page);
    await page.close();
  });

  test('GET /api/AccountSummary', async ({ request }) => {
    const response = await request.get('https://pulsedev.nixonhire.com/api/AccountSummary', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    expect(response.ok()).toBeTruthy();
    const data = await response.json();
    expect(data).toBeDefined();
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

  test('GET /api/Report/Energy/Site', async ({ request }) => {
    const response = await request.get('https://pulsedev.nixonhire.com/api/Report/Energy/Site?startDate=2025-07-29&endDate=2025-08-05', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    expect(response.ok()).toBeTruthy();
    const data = await response.json();
    expect(data).toBeDefined();
  });
});
