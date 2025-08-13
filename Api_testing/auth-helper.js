// Utility to login and extract the auth token from storage
async function getAuthToken(page) {
  if (!process.env.LOGIN_EMAIL || !process.env.LOGIN_PASSWORD) {
    throw new Error('LOGIN_EMAIL or LOGIN_PASSWORD environment variable is missing. Please check your .env file or pipeline environment variables.');
  }
  await page.goto('https://pulsedev.nixonhire.com');
  await page.getByRole('textbox', { name: 'Email' }).fill(process.env.LOGIN_EMAIL);
  await page.getByRole('textbox', { name: 'Password' }).fill(process.env.LOGIN_PASSWORD);
  await page.getByRole('button', { name: 'Continue' }).click();
  await page.waitForSelector('button[aria-label="Open user profile"]');
  // Extract token from localStorage or cookies
  const token = await page.evaluate(() => {
    for (let key in window.localStorage) {
      if (key.toLowerCase().includes('token')) {
        return window.localStorage.getItem(key);
      }
    }
    for (let key in window.sessionStorage) {
      if (key.toLowerCase().includes('token')) {
        return window.sessionStorage.getItem(key);
      }
    }
    return null;
  });
  return token;
}

module.exports = { getAuthToken };
