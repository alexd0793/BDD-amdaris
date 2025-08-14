

class LogoutPage {
    constructor(page) {
        this.page = page;
        // Inline selectors from userSelectors.js
        this.userProfileButton = this.page.locator('button[aria-label="Open user profile"]');
        this.logoutButton = this.page.locator('button:has-text("Log out")');
      }

    async logout() {
        // Wait for the button to appear and click it
  await this.userProfileButton.waitFor({ state: 'visible' });
  await this.userProfileButton.click();

  // Wait for the "Log out" button to appear and click it
  await this.logoutButton.waitFor({ state: 'visible' });
  await this.logoutButton.click();
  await this.page.waitForTimeout(4000); 
        }
}

module.exports = LogoutPage;