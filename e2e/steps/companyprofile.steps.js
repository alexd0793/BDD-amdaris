const { Given, When, Then, setDefaultTimeout } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');
setDefaultTimeout(60 * 1000); // 60 seconds

Given('a customer is authenticated', async function () {
  this.page = await this.browser.newPage();
  this.loginPage = new LoginPage(this.page);
  await this.loginPage.gotoLoginPage();
  await this.loginPage.login();
});

Given('a customer is not authenticated', async function () {
  this.page = await this.browser.newPage();
  await this.page.goto('https://pulsedev.nixonhire.com/logout');
});

When('the customer navigates to the company profile page', async function () {
  await this.page.waitForTimeout(5000); // Wait for 1 second
  await this.page.goto('https://pulsedev.nixonhire.com/company-profile', { waitUntil: 'domcontentloaded', timeout: 20000 });
});

Then('the customer sees the company profile details', async function () {
  const companyName = this.page.locator('p.k-paragraph.k-fs-xl.k-font-weight-light.k-color-tertiary span', { hasText: 'ERIC WRIGHT CIVIL ENGINEERING LIMITED' });
  await expect(companyName).toBeVisible();
});

Then('the customer is redirected to the login page', async function () {
  await expect(this.page).toHaveURL(/login/i);
});

