
const { Given, When, Then, setDefaultTimeout } = require('@cucumber/cucumber');
setDefaultTimeout(60 * 1000); // 60 seconds
const { expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');

Given('I am not logged in', async function () {
  this.page = await this.browser.newPage();
  await this.page.goto('https://pulsedev.nixonhire.com/logout');
});


When('I navigate to the company profile page', async function () {
  await this.page.waitForTimeout(2000); // Wait for 1 second to ensure the page is ready
  await this.page.goto('https://pulsedev.nixonhire.com/company-profile', { waitUntil: 'domcontentloaded', timeout: 20000 });
});

Then('I should see the company profile details', async function () {
  console.log('In Then step: checking for company name...');
  // Check for the company name
  const companyName = this.page.locator('p.k-paragraph.k-fs-xl.k-font-weight-light.k-color-tertiary span', { hasText: 'ERIC WRIGHT CIVIL ENGINEERING LIMITED' });
  await expect(companyName).toBeVisible();
  console.log('Company name is visible!');
});
