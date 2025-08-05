const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');
const LogoutPage = require('../pages/LogoutPage');

Given('a customer is authenticated', async function () {
  this.page = await this.browser.newPage();
  this.loginPage = new LoginPage(this.page);
  await this.loginPage.gotoLoginPage();
  await this.loginPage.login();
});

When('the customer logs out', async function () {
  this.logoutPage = new LogoutPage(this.page);
  await this.logoutPage.logout();
});

Then('the customer is redirected to the login page', async function () {
  await expect(this.page).toHaveURL(/login/i);
});

When('the customer tries to access a protected page', async function () {
  await this.page.goto('https://pulsedev.nixonhire.com/company-profile');
});
