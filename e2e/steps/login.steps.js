const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');
require('dotenv').config();

Given('a customer is on the login page', async function () {
  this.page = await this.browser.newPage();
  this.loginPage = new LoginPage(this.page);
  await this.loginPage.gotoLoginPage();
});

When('the customer submits valid credentials', async function () {
  await this.loginPage.login();
});


Then('the customer sees the Shell page', async function () {
  // Update to match the actual title after login
  await expect(this.page).toHaveTitle('Nixon Hire Customer Portal');
});


When('the customer submits the login form with no credentials', async function () {
  await this.loginPage.submitEmail();
});

Then('the customer sees an error for missing email', async function () {
  await expect(this.loginPage.usernameError).toBeVisible();
});

When('the customer submits an invalid email', async function () {
  await this.loginPage.loginWrongUser();
});

Then('the customer sees an error for user not found', async function () {
  await expect(this.loginPage.userNotFoundError).toBeVisible();
});

When('the customer submits a valid email and wrong password', async function () {
  await this.loginPage.loginWrongPassword();
});

Then('the customer sees an error for incorrect password', async function () {
  // Print all visible error messages for debugging
  const errorLocator = this.page.locator('.error, .error-message, [class*="error"]');
  const errors = await errorLocator.allTextContents();
  console.log('Visible errors:', errors);
  // Try to match any error containing 'password' (case-insensitive)
  const found = errors.some(text => /password/i.test(text));
  expect(found).toBeTruthy();
});

When('the customer enters a valid email and leaves the password empty', async function () {
  await this.loginPage.enterEmail(process.env.LOGIN_EMAIL);
  await this.loginPage.submitEmail();
  await this.loginPage.enterPassword('');
});

When('the customer submits the login form', async function () {
  await this.loginPage.submitEmail();
});

Then('the customer sees an error for missing password', async function () {
  await expect(this.loginPage.passwordError).toBeVisible();
});

When('the customer enters a valid email and an incorrect password', async function () {
  await this.loginPage.enterEmail(process.env.LOGIN_EMAIL);
  await this.loginPage.enterPassword('wrongpassword');
  await this.page.waitForTimeout(1500);
});

When('the customer enters an invalid email format and a valid password', async function () {
  await this.loginPage.enterEmail('invalid-email');
  await this.loginPage.submitEmail();
  await this.loginPage.enterPassword(process.env.LOGIN_PASSWORD);
});

Then('the customer sees an error for invalid email format', async function () {
  await expect(this.loginPage.usernameError).toBeVisible();
});

