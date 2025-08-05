// @ts-nocheck
import { test, expect } from '@playwright/test';
const LoginPage = require('./pages/LoginPage');
const LogoutPage = require('./pages/LogoutPage');
const LoginSelectors = require('./constants/loginSelectors');
const loginDetails = require('./constants/loginDetails');

test.describe('Logout functionality tests', () => {
    test.beforeEach(async ({ page }) => {
        // We can add setup code here if needed before each test
      });

        test('Successful logout', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const logoutPage = new LogoutPage(page);
        const selectors = new LoginSelectors(page);

        await loginPage.gotoLoginPage();
        await loginPage.login();

        await logoutPage.logout();
        await expect(page).toHaveTitle("Sign In | Nixon Hire");
        await expect(selectors.usernameInput).toBeVisible({ timeout: 5000 });

        await page.goBack();
        await page.reload();
        await expect(page).toHaveTitle("Sign In | Nixon Hire");
        await expect(selectors.usernameInput).toBeVisible({ timeout: 5000 });
    });
})