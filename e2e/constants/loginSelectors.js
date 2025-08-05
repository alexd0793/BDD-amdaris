class LoginSelectors {
    constructor(page) {
      this.page = page;
      this.usernameInput = page.locator('#email');
      this.passwordInput = page.locator("input[type='password']");
      this.submitButton = page.locator("#next");
      this.usernameError = page.locator('div.error.itemLevel[aria-hidden="false"]').first();
    this.passwordError = page.locator('div.error.itemLevel[aria-hidden="false"]').last();
    this.userNotFoundError = page.locator('div.error.pageLevel[aria-hidden="false"]');
    }
  }
  
  module.exports = LoginSelectors;
