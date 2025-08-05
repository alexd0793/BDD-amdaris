const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');
const LoginSelectors = require('../constants/loginSelectors');
const loginDetails = require('../constants/loginDetails');

Given('a customer is on the login page', async function () {
  this.page = await this.browser.newPage();
  this.loginPage = new LoginPage(this.page);
  await this.loginPage.gotoLoginPage();
});

When('the customer submits valid credentials', async function () {
  await this.loginPage.login();
});

Then('the customer sees the Shell page', async function () {
  await expect(this.page).toHaveTitle('Sites Map | Nixon Hire Customer Portal');
});

When('the customer submits the login form with no credentials', async function () {
  const selectors = new LoginSelectors(this.page);
  await selectors.submitButton.click();
});

Then('the customer sees an error for missing email', async function () {
  const selectors = new LoginSelectors(this.page);
  await expect(selectors.usernameError).toBeVisible();
});

When('the customer submits an invalid email', async function () {
  await this.loginPage.loginWrongUser();
});

Then('the customer sees an error for user not found', async function () {
  const selectors = new LoginSelectors(this.page);
  await expect(selectors.userNotFoundError).toBeVisible();
});

When('the customer submits a valid email and wrong password', async function () {
  await this.loginPage.loginWrongPassword();
});

Then('the customer sees an error for incorrect password', async function () {
  await this.page.waitForSelector('text=/password is incorrect/i', { timeout: 10000 });
  await expect(this.page.locator('text=/password is incorrect/i')).toBeVisible();
});

When('the customer enters a valid email and leaves the password empty', async function () {
  await this.loginPage.enterEmail('alexandru.dancesc+ERIC_WRIGHT_CIVIL_ENGINEERING_LIMITED@amdaris.com');
  await this.loginPage.submitEmail();
  await this.loginPage.enterPassword('');
});

When('the customer submits the login form', async function () {
  await this.loginPage.submitPassword();
});

Then('the customer sees an error for missing password', async function () {
  await expect(this.loginPage.selectors.passwordError).toBeVisible();
});

When('the customer enters a valid email and an incorrect password', async function () {
  await this.loginPage.enterEmail('alexandru.dancesc+ERIC_WRIGHT_CIVIL_ENGINEERING_LIMITED@amdaris.com');
  await this.loginPage.enterPassword('wrongpassword');
});

When('the customer enters an invalid email format and a valid password', async function () {
  await this.loginPage.enterEmail('invalid-email');
  await this.loginPage.submitEmail();
  await this.loginPage.enterPassword('Autoliv6940!');
});

Then('the customer sees an error for invalid email format', async function () {
  await expect(this.loginPage.selectors.usernameError).toBeVisible();
});

