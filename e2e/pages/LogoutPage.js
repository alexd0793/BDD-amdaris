const logoutSelectors = require('../constants/userSelectors.js');

class LogoutPage {
    constructor(page) {
        this.page = page;
        this.selectors = new logoutSelectors(page);
      }

    async logout() {
        // Wait for the button to appear and click it
        await this.selectors.userProfileButton.waitFor({ state: 'visible' });
        await this.selectors.userProfileButton.click();

        // Wait for the "Log out" button to appear and click it
        await this.selectors.logoutButton.waitFor({ state: 'visible' });
        await this.selectors.logoutButton.click();
        await this.page.waitForTimeout(4000); 
        }
}

module.exports = LogoutPage;