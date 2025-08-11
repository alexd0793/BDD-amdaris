class AccessibilityTestHelper {
  constructor(page) {
    this.page = page;
    this.baseURL = 'https://pulsedev.nixonhire.com';
    this.testPaths = [
      { url: '/energy-management/?view=map&startDate=2025-07-31&endDate=2025-08-07&generatorPercentage=50&kilovoltAmperes=60&fuelPrice=1.6&averageWeeklyOperatingHours=168', name: 'Energy management' },
      { url: '/company-profile', name: 'Site info' }
    ];
  }

  async gotoTestUrl(testData) {
    await this.page.goto(this.baseURL + testData.url);
    await this.page.waitForLoadState('networkidle');
  }

  getTestPaths() {
    return this.testPaths;
  }

  getBaseURL() {
    return this.baseURL;
  }
}

module.exports = AccessibilityTestHelper;
