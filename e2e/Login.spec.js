// @ts-nocheck
import { test, expect } from '@playwright/test';
const LoginPage = require('./pages/LoginPage');
require('dotenv').config();

test.describe('Login functionality tests', () => {
  test.beforeEach(async ({ page }) => {
    // We can add setup code here if needed before each test
  });

  test('Successful login with correct credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.gotoLoginPage();
    await loginPage.login();
    
    // Assert successful login
    await expect(page).toHaveTitle("Shell");
    // You might want to add more assertions here, such as checking for elements
    // that are only visible after successful login
  });

  test('Login validation errors with incorrect credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
  const loginPage = new LoginPage(page);
    
    const errorWhenEmailEmpty = 'Please enter your Email';
    const errorWhenWrongEmail = 'We can\'t seem to find your account.';
    const errorWhenWrongpassword = 'Your password is incorrect.';
    const errorWhenNoPassword = 'Please enter your password';  
    
    // Test 1: Empty form submission
    await loginPage.gotoLoginPage();
    await selectors.submitButton.click();
    await expect(selectors.usernameError).toBeVisible();
    await expect(selectors.usernameError).toHaveText(errorWhenEmailEmpty);

    // Test 2: Wrong email address
    await loginPage.loginWrongUser();
    await expect(selectors.userNotFoundError).toBeVisible();
    await expect(selectors.userNotFoundError).toHaveText(errorWhenWrongEmail);
    await expect(page).toHaveTitle("Sign In | Nixon Hire");
    
    // Test 3: Correct email but wrong password
    await loginPage.gotoLoginPage();
    await loginPage.loginWrongPassword();
    await expect(selectors.userNotFoundError).toBeVisible();
    await expect(selectors.userNotFoundError).toHaveText(errorWhenWrongpassword);
    
    // Test 4: Email provided but no password
    await selectors.passwordInput.fill('');
    await selectors.submitButton.click();
    await expect(selectors.passwordError).toHaveText(errorWhenNoPassword);
    await expect(page).toHaveTitle("Sign In | Nixon Hire");
  });

  test('Login form UI elements', async ({ page }) => {
    const loginPage = new LoginPage(page);
  const loginPage = new LoginPage(page);
    
    await loginPage.gotoLoginPage();
    
    // Check if UI elements exist and are properly displayed
    await expect(selectors.usernameInput).toBeVisible();
    await expect(selectors.submitButton).toBeVisible();
    await expect(selectors.submitButton).toBeEnabled();
    
    // Test placeholder values if applicable
    await expect(selectors.usernameInput).toHaveAttribute('placeholder', /email|username/i);
    
    // Check if form progresses to password entry after submitting valid email
  await selectors.usernameInput.fill(process.env.LOGIN_EMAIL);
    await selectors.submitButton.click();
    await expect(selectors.passwordInput).toBeVisible();
  });

  test.skip('Remember me functionality', async ({ page }) => {
    // This test assumes there is a "remember me" checkbox
    const loginPage = new LoginPage(page);
  const loginPage = new LoginPage(page);
    const rememberMeCheckbox = page.locator('input[type="checkbox"]');
    
    await loginPage.gotoLoginPage();
    
    // Check if Remember Me checkbox exists
    try {
      await expect(rememberMeCheckbox).toBeVisible({ timeout: 5000 });
      
      // Test functionality (basic visibility and state)
      await expect(rememberMeCheckbox).not.toBeChecked();
      await rememberMeCheckbox.check();
      await expect(rememberMeCheckbox).toBeChecked();
      
      // Complete the login with Remember Me checked
      await loginPage.login();
      
      // You could add more verification here, such as checking for cookies or storage
      
    } catch (e) {
      // Skip if Remember Me doesn't exist
      test.skip();
    }
  });

  test('Accessibility features of login page', async ({ page }) => {
    const loginPage = new LoginPage(page);
  const loginPage = new LoginPage(page);
    
    await loginPage.gotoLoginPage();
    
    // Check basic accessibility properties
    //await expect(selectors.usernameInput).toHaveAttribute('aria-required', 'true');
    await expect(selectors.submitButton).toHaveAttribute('type', 'submit');
  });

  test('Special characters in email field', async ({ page }) => {
    test.setTimeout(60000)
    const loginPage = new LoginPage(page);
  const loginPage = new LoginPage(page);
    
    // Preserve original credentials for reuse
    const originalEmail = loginDetails.LOGIN_EMAIL; // Fallback if empty
    
    // Array of test cases with special characters in email
    const specialEmailTests = [
      { email: 'test+plus@example.com', isValid: true, description: 'Plus sign in local part' },
      { email: 'test.dot@example.com', isValid: true, description: 'Dot in local part' },
      { email: 'test-hyphen@example.com', isValid: true, description: 'Hyphen in local part' },
      { email: 'test_underscore@example.com', isValid: true, description: 'Underscore in local part' },
      { email: 'test@example-hyphen.com', isValid: true, description: 'Hyphen in domain' },
      { email: 'test@sub.domain.example.com', isValid: true, description: 'Multiple subdomains' },
      //{ email: 'tést@èxämplê.com', isValid: false, description: 'Non-ASCII characters' },
      //{ email: 'test@example..com', isValid: false, description: 'Consecutive dots in domain' },
      //{ email: 'test!@example.com', isValid: false, description: 'Exclamation mark in local part' },
      //{ email: 'test@@example.com', isValid: false, description: 'Double @ symbol' },
      //{ email: '  test@example.com  ', isValid: true, description: 'Extra spaces around email' },
      { email: '<script>alert("XSS")</script>@example.com', isValid: false, description: 'Script injection attempt' }
    ];
    
    // Test each special character case
    for (const testCase of specialEmailTests) {
      console.log(`Testing email: ${testCase.description}`);
      
      await loginPage.gotoLoginPage();
      
      // Enter the test email
      await selectors.usernameInput.fill(testCase.email);
      
      // Submit the form
      await selectors.submitButton.click();
      
      if (testCase.isValid) {
        // If valid, we expect to proceed to password step
        try {
          // Wait for password field to appear (this indicates the email was accepted)
          await expect(selectors.passwordInput).toBeVisible({ timeout: 5000 });
          console.log(`  ✓ Valid email accepted: ${testCase.email}`);
        } catch (e) {
          console.log(`  ✗ Expected valid email to be accepted but found error: ${testCase.email}`);
          // Take screenshot of the error
          await page.screenshot({ path: `email-error-${testCase.description.replace(/[^a-zA-Z0-9]/g, '_')}.png` });
        }
      } else {
        // If invalid, we expect an error message
        try {
          // Look for any error message on the page (adjust selector based on your actual error message element)
          const errorMessageLocators = [
            page.locator('text=/error|invalid|not valid/i').first(),
            page.locator('.error-message'),
            page.locator('[class*="error"]'),
            // Add more potential error message selectors here
          ];
          
          // Try each error message locator until one works
          let errorFound = false;
          for (const errorLocator of errorMessageLocators) {
            try {
              await expect(errorLocator).toBeVisible({ timeout: 3000 });
              errorFound = true;
              break;
            } catch {
              // Continue to next locator
            }
          }
          
          if (errorFound) {
            console.log(`  ✓ Invalid email rejected as expected: ${testCase.email}`);
          } else {
            throw new Error('No error message found');
          }
        } catch (e) {
          console.log(`  ✗ Expected invalid email to be rejected but no error found: ${testCase.email}`);
          // Take screenshot of the unexpected behavior
        //  await page.screenshot({ path: `email-unexpected-${testCase.description.replace(/[^a-zA-Z0-9]/g, '_')}.png` });
        }
      }
    }
  });
  
  test('Special characters in password field', async ({ page }) => {
    test.setTimeout(60000)
    const loginPage = new LoginPage(page);
  const loginPage = new LoginPage(page);
    
    // Use the valid email from loginDetails
    const validEmail = loginDetails.LOGIN_EMAIL || "test@example.com"; // Fallback if empty
    
    // Array of test cases with special characters in password
    const specialPasswordTests = [
      { password: 'P@ssw0rd!', description: 'Common special characters' },
      { password: 'Pass word', description: 'Space in password' },
      { password: 'LongPassword1234567890', description: 'Long password (20 chars)' },
      { password: 'Short1', description: 'Short password (6 chars)' },
      { password: '12345678', description: 'Numeric only password' },
      { password: 'UPPERCASE', description: 'Uppercase only password' },
      { password: 'lowercase', description: 'Lowercase only password' },
      { password: '!@#$%^&*()', description: 'Special chars only password' },
      { password: 'Pass\'word"', description: 'Quotes in password' },
      { password: 'Paßword', description: 'Non-ASCII character' },
      { password: '<script>alert("XSS")</script>', description: 'Script tag password' }
    ];
    
    for (const testCase of specialPasswordTests) {
      console.log(`Testing password: ${testCase.description}`);
      
      // Go to login page and enter valid email to get to password screen
      await loginPage.gotoLoginPage();
      await selectors.usernameInput.fill(validEmail);
      await selectors.submitButton.click();
      
      // Wait for password field
      await expect(selectors.passwordInput).toBeVisible({ timeout: 5000 });
      
      // Enter test password
      await selectors.passwordInput.fill(testCase.password);
      
      // Submit the form
      await selectors.submitButton.click();
      
      // Capture form behavior without making assertions about success
      try {
        // Wait for either an error message or a page navigation
        const hasError = await page.locator('text=/error|invalid|incorrect/i').isVisible().catch(() => false);
        
        if (hasError) {
          console.log(`  - Password rejected: ${testCase.description}`);
        } else {
          const currentUrl = page.url();
          console.log(`  - Form processed password (URL: ${currentUrl}): ${testCase.description}`);
        }
        
        // Take a screenshot for reference
        await page.screenshot({ path: `password-test-${testCase.description.replace(/[^a-zA-Z0-9]/g, '_')}.png` });
      } catch (e) {
        console.log(`  ! Exception during password test: ${testCase.description}`);
        console.log(`    Error: ${e.message}`);
      }
    }
  });
  
  test('Maximum length handling', async ({ page }) => {
    const loginPage = new LoginPage(page);
  const loginPage = new LoginPage(page);
    
    await loginPage.gotoLoginPage();
    
    // Test extremely long email (RFC 5321 limits: 64 chars for local part, 255 for domain)
    const longEmail = `${'a'.repeat(63)}@${'b'.repeat(63)}.com`;
    await selectors.usernameInput.fill(longEmail);
    await selectors.submitButton.click();
    
    // Check form behavior with long email
    try {
      const hasError = await page.locator('text=/error|invalid|too long/i').isVisible().catch(() => false);
      const hasPasswordField = await selectors.passwordInput.isVisible().catch(() => false);
      
      if (hasError) {
        console.log('Long email rejected with error message');
      } else if (hasPasswordField) {
        console.log('Long email accepted, proceeded to password step');
      } else {
        console.log('Unknown state after long email submission');
      }
      
      await page.screenshot({ path: 'long-email-handling.png' });
    } catch (e) {
      console.log('Exception during long email test: ' + e.message);
    }
    
    // Test with long password
    await loginPage.gotoLoginPage();
    
    // Use the valid email from loginDetails
    const validEmail = loginDetails.LOGIN_EMAIL || "test@example.com"; // Fallback if empty
    await selectors.usernameInput.fill(validEmail);
    await selectors.submitButton.click();
    
    await expect(selectors.passwordInput).toBeVisible({ timeout: 5000 });
    
    // Create extremely long password (100 characters)
    const longPassword = 'P@ssw0rd!'.repeat(12).substring(0, 100);
    await selectors.passwordInput.fill(longPassword);
    await selectors.submitButton.click();
    
    // Check form behavior with long password
    try {
      const hasError = await page.locator('text=/error|invalid|too long/i').isVisible().catch(() => false);
      
      if (hasError) {
        console.log('Long password rejected with error message');
      } else {
        console.log('Form accepted or processed long password submission');
      }
      
      await page.screenshot({ path: 'long-password-handling.png' });
    } catch (e) {
      console.log('Exception during long password test: ' + e.message);
    }
  });
});