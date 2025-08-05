
const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');
const LoginSelectors = require('../constants/loginSelectors');
const loginDetails = require('../constants/loginDetails');

When('I enter a valid email and leave the password empty', async function () {
  await this.loginPage.enterEmail('alexandru.dancesc+ERIC_WRIGHT_CIVIL_ENGINEERING_LIMITED@amdaris.com');
  await this.loginPage.submitEmail();
  await this.loginPage.enterPassword('');
});

When('I enter a valid email and an incorrect password', async function () {
  await this.loginPage.enterEmail('alexandru.dancesc+ERIC_WRIGHT_CIVIL_ENGINEERING_LIMITED@amdaris.com');
  await this.loginPage.enterPassword('wrongpassword');
    await this.loginPage.submitEmail();
});

When('I enter an invalid email format and a valid password', async function () {
  await this.loginPage.enterEmail('invalid-email');
  await this.loginPage.enterPassword('Autoliv6940!');
    await this.loginPage.submitEmail();
});

When('I submit the login form', async function () {
  await this.loginPage.submitPassword();
});

Then('I should see an error for missing password', async function () {
  await expect(this.loginPage.selectors.passwordError).toBeVisible();
});
/*
Then('I should see an error for incorrect password', async function () {
  await expect(this.loginPage.selectors.passwordError).toBeVisible();
});
*/
Then('I should see an error for invalid email format', async function () {
  await expect(this.loginPage.selectors.usernameError).toBeVisible();
});

Given('I am on the login page', async function () {
  this.page = await this.browser.newPage();
  this.loginPage = new LoginPage(this.page);
  await this.loginPage.gotoLoginPage();
});

When('I login with valid credentials', async function () {
  await this.loginPage.login();
});

Then('I should see the Shell page', async function () {
  await expect(this.page).toHaveTitle('Sites Map | Nixon Hire Customer Portal');
});

When('I submit the login form with no credentials', async function () {
  const selectors = new LoginSelectors(this.page);
  await selectors.submitButton.click();
});

Then('I should see an error for missing email', async function () {
  const selectors = new LoginSelectors(this.page);
  await expect(selectors.usernameError).toBeVisible();
});

When('I login with an invalid email', async function () {
  await this.loginPage.loginWrongUser();
});

Then('I should see an error for user not found', async function () {
  const selectors = new LoginSelectors(this.page);
  await expect(selectors.userNotFoundError).toBeVisible();
});

When('I login with a valid email and wrong password', async function () {
  await this.loginPage.loginWrongPassword();
});

Then('I should see an error for incorrect password', async function () {

  // Wait for the error message to be attached to the DOM before asserting visibility (case-insensitive regex)
  await this.page.waitForSelector('text=/password is incorrect/i', { timeout: 10000 });
  await expect(this.page.locator('text=/password is incorrect/i')).toBeVisible();
});
