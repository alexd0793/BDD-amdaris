# BDD Automation Approach for Company Profile, Login, and Logout Features

## Overview
This project uses Behavior-Driven Development (BDD) with Cucumber.js and Playwright to automate end-to-end scenarios for a web application. The main features automated are:
- Company Profile
- Login
- Logout

Each feature is described in a `.feature` file using Gherkin syntax, and the step definitions are implemented in corresponding `.js` files. The automation leverages Playwright for browser control and assertions.

---

## 1. Company Profile
- **Feature File:** `e2e/features/companyprofile.feature`
- **Step Definitions:** `e2e/steps/companyprofile.steps.js`

### Approach
- The feature describes scenarios for viewing the company profile, both when logged in and not logged in.
- Step definitions handle navigation, login state, and assertions for company details.
- Playwright is used to open pages, wait for elements, and assert visibility.
- A custom timeout is set for all steps in this file to handle slow page loads.

---

## 2. Login
- **Feature File:** `e2e/features/login.feature`
- **Step Definitions:** `e2e/steps/login.steps.js`

### Approach
- The feature covers successful and unsuccessful login attempts.
- Step definitions use a `LoginPage` class to encapsulate login logic (filling email, password, and submitting the form).
- Credentials are managed in a constants file for easy updates.
- Playwright waits for fields to be visible before interacting, ensuring reliability.

---

## 3. Logout
- **Feature File:** `e2e/features/logout.feature`
- **Step Definitions:** `e2e/steps/logout.steps.js`

### Approach
- The feature ensures the user can log out and is redirected appropriately.
- Step definitions use Playwright to trigger the logout action and verify the user is no longer authenticated.
- The browser session is managed to ensure a clean state for each scenario.

---

## Common Practices
- **World Constructor:** A custom world is used to manage browser and page objects across steps.
- **Hooks:** `Before` and `After` hooks launch and close the browser for each scenario, ensuring isolation.
- **Timeouts:** Step timeouts are increased where needed to accommodate slow network or application responses.
- **Selectors:** Centralized in constants for maintainability.

---

## Summary
This approach ensures:
- Readable and maintainable test scenarios.
- Robust automation using Playwright's capabilities.
- Easy updates to selectors and credentials.
- Reliable execution with proper session and timeout management.

For more details, see the respective feature and step files in the `e2e/features` and `e2e/steps` directories.
