
const { test, expect } = require('@playwright/test');
const AxeBuilder = require('@axe-core/playwright').default;
const LoginPage = require('../e2e/pages/LoginPage');
const AccessibilityTestHelper = require('./AccessibilityTestHelper');
const A11yReporter = require('./A11yReporter');

test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.gotoLoginPage();
  await loginPage.login();
});

test.describe('Site-wide Accessibility Tests @a11y', () => {
  test('Accessibility Tests', async ({ page }) => {
    const helper = new AccessibilityTestHelper(page);
    const testPaths = helper.getTestPaths();
    for (let index = 0; index < testPaths.length; index++) {
      const testData = testPaths[index];
      await helper.gotoTestUrl(testData);

      // Run accessibility scan
      const accessibilityScanResults = await new AxeBuilder({ page })
        .exclude('#cookie-banner')
        .exclude('.third-party-widget')
        .withTags(['wcag2a', 'wcag2aa', 'best-practice'])
        .analyze();

      // Log violations using the reporter
      A11yReporter.logViolations(accessibilityScanResults.violations, testData.name);
      expect(accessibilityScanResults.violations).toEqual([]);
    }
  });
});