const { Given } = require('@cucumber/cucumber');
const LoginPage = require('../pages/LoginPage');

Given('I am logged in', async function () {
  this.page = await this.browser.newPage();
  this.loginPage = new LoginPage(this.page);
  await this.loginPage.gotoLoginPage();
  await this.loginPage.login();
});
