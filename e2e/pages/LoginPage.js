const loginDetails = require("../constants/loginDetails");
const LoginSelectors = require("../constants/loginSelectors");

class LoginPage {
  constructor(page) {
    this.page = page;
    this.selectors = new LoginSelectors(page);
  }

  async gotoLoginPage() {
    await this.page.goto('https://pulsedev.nixonhire.com/');
  }

  async login(email = loginDetails.LOGIN_EMAIL, password = loginDetails.LOGIN_PASSWORD) {
    await this.enterEmail(email);
    await this.enterPassword(password);
    await this.submitEmail(); // Only click submit after both fields are filled
  }

  async enterEmail(email) {
    await this.selectors.usernameInput.fill(email);
  }


  async submitEmail() {
    await this.selectors.submitButton.click();
  }

  async enterPassword(password) {
    await this.selectors.passwordInput.waitFor({ state: 'visible', timeout: 10000 });
    await this.selectors.passwordInput.fill(password);
  }


  // submitPassword is not needed for single-page login, keep for compatibility
  async submitPassword() {
    // No-op for single-page login
  }


  // confirmLogin is not needed for single-page login, keep for compatibility
  async confirmLogin() {
    // No-op for single-page login
  }

  async loginWrongUser(wrongEmail = "wronguser@gmail.com") {
    await this.enterEmail(wrongEmail);
    await this.enterPassword(loginDetails.LOGIN_PASSWORD);
    await this.submitEmail();
  }

  async loginWrongPassword(wrongPassword = "wrongpassword") {
    await this.enterEmail(loginDetails.LOGIN_EMAIL);
    await this.enterPassword(wrongPassword);
    await this.submitEmail();
  }

  async waitForSuccessfulLogin(timeout = 10000) {
    // Wait for the dashboard or another element that indicates successful login
    await this.page.waitForSelector('.dashboard-element', { timeout });
  }

  async getErrorMessages() {
    const usernameError = await this.selectors.usernameError.isVisible() ? 
      await this.selectors.usernameError.textContent() : null;
    
    const passwordError = await this.selectors.passwordError.isVisible() ? 
      await this.selectors.passwordError.textContent() : null;
    
    return {
      usernameError,
      passwordError
    };
  }
}

module.exports = LoginPage;
