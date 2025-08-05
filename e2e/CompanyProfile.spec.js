import { test, expect } from '@playwright/test';
const LoginPage = require('./pages/LoginPage');

test.describe('Company profile', () => {
    test.beforeEach(async ({ page }) => {
        // We can add setup code here if needed before each test
      });

        test('Acces information page', async ({ page }) => {
            const loginPage = new LoginPage(page);
            const companyProfileLink = page.getByRole('button', { name: 'Open user profile' });
            const informationLink = page.locator('a[href="/company-profile/"]');

            await loginPage.gotoLoginPage();
            await loginPage.login();

            await expect(companyProfileLink).toBeVisible({ timeout: 5000 });
            await companyProfileLink.click();
                       // After clicking the informationLink
            const siteAgentText = page.locator('p.k-paragraph.k-fs-sm', { hasText: 'Site Agent' });
            const phoneText = page.locator('p.k-paragraph.k-fs-sm', { hasText: '07801144526' });
            
            await expect(siteAgentText).toBeVisible();
            await expect(phoneText).toBeVisible(); 

await informationLink.click();
            
    });
})