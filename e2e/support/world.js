const { setWorldConstructor } = require('@cucumber/cucumber');
const { chromium } = require('playwright');


class CustomWorld {
  async launchBrowser() {
    console.log('Launching browser...');
    this.browser = await chromium.launch({ headless: false });
  }
  async closeBrowser() {
    if (this.browser) {
      await this.browser.close();
    }
  }
}

setWorldConstructor(CustomWorld);
