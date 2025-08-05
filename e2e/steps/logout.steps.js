const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');
const LogoutPage = require('../pages/LogoutPage');

When('I try to access a protected page', async function () {
  await this.page.goto('https://pulsedev.nixonhire.com/company-profile');
});

When('I click the logout button again', async function () {
  this.logoutPage = this.logoutPage || new LogoutPage(this.page);
  await this.logoutPage.logout();
});

Given('a customer is authenticated in two browser tabs', async function () {
  // Open two tabs (pages) in the same browser context (window)
  this.context = await this.browser.newContext();
  this.page1 = await this.context.newPage();
  this.page2 = await this.context.newPage();
  this.loginPage1 = new LoginPage(this.page1);
  this.loginPage2 = new LoginPage(this.page2);
  await this.loginPage1.gotoLoginPage();
  await this.loginPage1.login();
  await this.loginPage2.gotoLoginPage();
  await this.loginPage2.login();
});

When('the customer logs out from the first tab', async function () {
  this.logoutPage1 = new LogoutPage(this.page1);
  await this.logoutPage1.logout();
});

When('the customer attempts to access a protected resource in the second tab', async function () {
  await this.page2.goto('https://pulsedev.nixonhire.com/company-profile');
});

Then('the customer is redirected to the login page in the second tab', async function () {
  await expect(this.page2).toHaveURL(/login/i);
});

When('I click the logout button', async function () {
  this.logoutPage = new LogoutPage(this.page);
  await this.logoutPage.logout();
});

Then('I should be redirected to the login page', async function () {
  await expect(this.page).toHaveURL(/login/i);
});
