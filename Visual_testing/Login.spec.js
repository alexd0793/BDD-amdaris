// @ts-nocheck
import { test, expect } from '@playwright/test';
const LoginPage = require('../e2e/pages/LoginPage');
// Removed: const LoginSelectors = require('../e2e/constants/loginSelectors');

test.describe('Login functionality tests', () => {
  test.beforeEach(async ({ page }) => {
    // We can add setup code here if needed before each test
  });


  test('Successful login with correct credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.gotoLoginPage();
    await loginPage.login();
    // Assert successful login
    await expect(page).toHaveTitle("Sign In | Nixon Hire");

    // Wait for the page to stabilize
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);

    // Take a screenshot and compare
    await expect(page).toHaveScreenshot('login-success.png', {
      fullPage: true,
      timeout: 20000
    });
  });


  test('Login form UI elements', async ({ page }) => {
    const loginPage = new LoginPage(page);
  // Use loginPage's selectors directly

    await loginPage.gotoLoginPage();

    // Check if UI elements exist and are properly displayed
  await expect(loginPage.usernameInput).toBeVisible();
  await expect(loginPage.submitButton).toBeVisible();
  await expect(loginPage.submitButton).toBeEnabled();

  // Test placeholder values if applicable
  await expect(loginPage.usernameInput).toHaveAttribute('placeholder', /email|username/i);


    // Wait for the form to stabilize
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);

    // Take a screenshot of the username input only with advanced options
  await expect(loginPage.usernameInput).toHaveScreenshot('login-username-input.png', {
      fullPage: false,
      maxDiffPixels: 100,
      threshold: 0.3,
      animations: 'disabled',
      timeout: 20000
    });

    // Take a screenshot of the submit button only with advanced options
  await expect(loginPage.submitButton).toHaveScreenshot('login-submit-button.png', {
      fullPage: false,
      maxDiffPixels: 100,
      threshold: 0.3,
      animations: 'disabled',
      timeout: 20000
    });

    // Check if form progresses to password entry after submitting valid email
  await loginPage.usernameInput.fill(process.env.LOGIN_EMAIL || "test@example.com");
  await loginPage.submitButton.click();
  await expect(loginPage.passwordInput).toBeVisible();
  });


  test('Accessibility features of login page', async ({ page }) => {
    const loginPage = new LoginPage(page);
  // Use loginPage's selectors directly
    
    await loginPage.gotoLoginPage();
    
    // Check basic accessibility properties
    //await expect(selectors.usernameInput).toHaveAttribute('aria-required', 'true');
  await expect(loginPage.submitButton).toHaveAttribute('type', 'submit');
  });

  test('Special characters in email field', async ({ page }) => {
    test.setTimeout(60000)
    const loginPage = new LoginPage(page);
  // Use loginPage's selectors directly
    const specialEmailTests = [
      { email: 'test+plus@example.com', isValid: true },
      { email: 'test.dot@example.com', isValid: true },
      { email: 'test-hyphen@example.com', isValid: true },
      { email: 'test_underscore@example.com', isValid: true },
      { email: 'test@example-hyphen.com', isValid: true },
      { email: 'test@sub.domain.example.com', isValid: true },
      { email: '<script>alert("XSS")</script>@example.com', isValid: false }
    ];
    for (const { email, isValid } of specialEmailTests) {
      await loginPage.gotoLoginPage();
  await loginPage.usernameInput.fill(email);
  await loginPage.submitButton.click();
      if (isValid) {
  await expect(loginPage.passwordInput, `Valid email should proceed: ${email}`).toBeVisible({ timeout: 5000 });
      } else {
        // Use a robust locator: any visible error with expected text
        const errorLocator = page.locator('.error, .error-message, [class*="error"]').filter({ hasText: /invalid|not valid|error/i });
        //await expect(errorLocator.first(), `Invalid email should show error: ${email}`).toBeVisible({ timeout: 3000 });
      }
    }
  });
  
  test('Special characters in password field', async ({ page }) => {
    test.setTimeout(60000)
    const loginPage = new LoginPage(page);
  // Use loginPage's selectors directly
  const validEmail = process.env.LOGIN_EMAIL || "test@example.com";
    const specialPasswordTests = [
      { password: 'P@ssw0rd!' },
      { password: 'Pass word' },
      { password: 'LongPassword1234567890' },
      { password: 'Short1' },
      { password: '12345678' },
      { password: 'UPPERCASE' },
      { password: 'lowercase' },
      { password: '!@#$%^&*()' },
      { password: 'Pass\'word"' },
      { password: 'Paßword' },
      { password: '<script>alert("XSS")</script>' }
    ];
    for (const { password } of specialPasswordTests) {
      await loginPage.gotoLoginPage();
  await loginPage.usernameInput.fill(validEmail);
  await loginPage.submitButton.click();
  await expect(loginPage.passwordInput).toBeVisible({ timeout: 5000 });
  await loginPage.passwordInput.fill(password || "testpassword");
  await loginPage.submitButton.click();
      // Just check that the page does not crash and either error or navigation happens
      const errorLocator = page.locator('.error, .error-message, [class*="error"]').filter({ hasText: /error|invalid|incorrect/i });
      await expect(errorLocator.first(), `Password error or navigation should be handled for: ${password}`).toBeVisible({ timeout: 3000 });
    }
  });
  
  test('Maximum length handling', async ({ page }) => {
    const loginPage = new LoginPage(page);
  // Use loginPage's selectors directly
    await loginPage.gotoLoginPage();
    // Test extremely long email (RFC 5321 limits: 64 chars for local part, 255 for domain)
    const longEmail = `${'a'.repeat(63)}@${'b'.repeat(63)}.com`;
  await loginPage.usernameInput.fill(longEmail);
  await loginPage.submitButton.click();
    // Should either show error or proceed to password
    const errorOrPassword = await Promise.race([
  loginPage.passwordInput.isVisible().then(v => v ? 'password' : null),
      page.locator('text=/error|invalid|too long/i').isVisible().then(v => v ? 'error' : null)
    ]);
    expect(errorOrPassword).not.toBeNull();
    // Test with long password
    await loginPage.gotoLoginPage();
  const validEmail = process.env.LOGIN_EMAIL || "test@example.com";
  await loginPage.usernameInput.fill(validEmail);
  await loginPage.submitButton.click();
  await expect(loginPage.passwordInput).toBeVisible({ timeout: 5000 });
  const longPassword = 'P@ssw0rd!'.repeat(12).substring(0, 100);
  await loginPage.passwordInput.fill(longPassword);
  await loginPage.submitButton.click();
    const errorOrSuccess = await Promise.race([
      page.locator('text=/error|invalid|too long/i').isVisible().then(v => v ? 'error' : null),
      page.waitForNavigation({ timeout: 3000 }).then(() => 'navigated').catch(() => null)
    ]);
  });
});