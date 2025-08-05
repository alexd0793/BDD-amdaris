class userSelectors {
    constructor(page) {
      this.page = page;
      this.userProfileButton = this.page.locator('button[aria-label="Open user profile"]');
      this.logoutButton = this.page.locator('button:has-text("Log out")');
    }
  }
  
  module.exports = userSelectors;