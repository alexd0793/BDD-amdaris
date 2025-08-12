const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');
const LogoutPage = require('../pages/LogoutPage');

When('the customer logs out', async function () {
  const LogoutPage = require('../pages/LogoutPage');
  this.logoutPage = new LogoutPage(this.page);
  await this.logoutPage.logout();
});

Then('the customer is redirected to the login page', async function () {
  await expect(this.page).toHaveURL(/login/i);
});

When('the customer tries to access a protected page', async function () {
  await this.page.goto('https://pulsedev.nixonhire.com/company-profile');
});
