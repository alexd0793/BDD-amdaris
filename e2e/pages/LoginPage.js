

class LoginPage {
  constructor(page) {
    this.page = page;
    // Inline selectors from loginSelectors.js
    this.usernameInput = page.locator('#email');
    this.passwordInput = page.locator("input[type='password']");
    this.submitButton = page.locator("#next");
    this.usernameError = page.locator('div.error.itemLevel[aria-hidden="false"]').first();
    this.passwordError = page.locator('div.error.itemLevel[aria-hidden="false"]').last();
    this.userNotFoundError = page.locator('div.error.pageLevel[aria-hidden="false"]');
  }

  async gotoLoginPage() {
    await this.page.goto('https://pulsedev.nixonhire.com/');
  }

  async login(email = process.env.LOGIN_EMAIL, password = process.env.LOGIN_PASSWORD) {
    await this.enterEmail(email);
    await this.enterPassword(password);
    await this.submitEmail(); // Only click submit after both fields are filled
  }

  async enterEmail(email) {
  await this.usernameInput.fill(email);
  }


  async submitEmail() {
  await this.submitButton.click();
  }

  async enterPassword(password) {
  await this.passwordInput.waitFor({ state: 'visible', timeout: 10000 });
  await this.passwordInput.fill(password);
  }

  async loginWrongUser(wrongEmail = "wronguser@gmail.com") {
    await this.enterEmail(wrongEmail);
    await this.enterPassword(process.env.LOGIN_PASSWORD);
    await this.submitEmail();
  }

  async loginWrongPassword(wrongPassword = "wrongpassword") {
    await this.enterEmail(process.env.LOGIN_EMAIL);
    await this.enterPassword(wrongPassword);
    await this.submitEmail();
  }

  async waitForSuccessfulLogin(timeout = 10000) {
    // Wait for the dashboard or another element that indicates successful login
    await this.page.waitForSelector('.dashboard-element', { timeout });
  }

  async getErrorMessages() {
    const usernameError = await this.usernameError.isVisible() ? 
      await this.usernameError.textContent() : null;
    
    const passwordError = await this.passwordError.isVisible() ? 
      await this.passwordError.textContent() : null;
    
    return {
      usernameError,
      passwordError
    };
  }
}

module.exports = LoginPage;
