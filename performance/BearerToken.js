const { chromium } = require('playwright');
const axios = require('axios');

const CLIENT_ID = 'f5b8c793-84a5-4c22-9886-c3375bb42fda';
const TENANT_DOMAIN = 'b2cnhpulsedevuks';
const POLICY = 'b2c_1_sign_up_sign_in';
const REDIRECT_URI = 'https://pulsedev.nixonhire.com';

const CODE_VERIFIER = 'd-ZkX39Laka_WTPK8yGVZ7d4wLl-iCpV-iJqELPfMnU';
const CODE_CHALLENGE = 'd-ZkX39Laka_WTPK8yGVZ7d4wLl-iCpV-iJqELPfMnU'; // Use same if using 'plain'

async function getBearerToken() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  const authUrl = `https://${TENANT_DOMAIN}.b2clogin.com/${TENANT_DOMAIN}.onmicrosoft.com/${POLICY}/oauth2/v2.0/authorize` +
    `?client_id=${CLIENT_ID}` +
    `&redirect_uri=${encodeURIComponent(REDIRECT_URI)}` +
    `&response_type=code` +
    `&scope=openid profile offline_access https://${TENANT_DOMAIN}.onmicrosoft.com/${CLIENT_ID}/accessEndpoints` +
    `&code_challenge=${CODE_CHALLENGE}` +
    `&code_challenge_method=plain`;

  console.log('Navigating to login page...');
  await page.goto(authUrl);

  require('dotenv').config();
  await page.fill('input[type="email"]', process.env.LOGIN_EMAIL || 'test@example.com');
  await page.fill('input[type="password"]', process.env.LOGIN_PASSWORD || 'testpassword');
  await page.waitForTimeout(1000);
  await page.locator('#next').click();

  await page.waitForFunction(() => window.location.href.includes('code='), { timeout: 60000 });

  const redirectedUrl = page.url();
  const urlParams = new URLSearchParams(redirectedUrl.split('?')[1]);
  const code = urlParams.get('code');

  if (!code) {
    console.error('❌ Authorization code not found.');
    await browser.close();
    return null;
  }

  console.log('✅ Authorization code obtained:', code);

  const tokenEndpoint = `https://${TENANT_DOMAIN}.b2clogin.com/${TENANT_DOMAIN}.onmicrosoft.com/${POLICY}/oauth2/v2.0/token`;

  try {
    const payload = new URLSearchParams();
    payload.append('grant_type', 'authorization_code');
    payload.append('client_id', CLIENT_ID);
    payload.append('redirect_uri', REDIRECT_URI);
    payload.append('code', code);
    payload.append('code_verifier', CODE_VERIFIER);
    payload.append('scope', `https://${TENANT_DOMAIN}.onmicrosoft.com/${CLIENT_ID}/accessEndpoints openid profile offline_access`);

    const response = await axios.post(tokenEndpoint, payload.toString(), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });

    const token = response.data.access_token;
    console.log('🎉 Bearer token:', token);

    await browser.close();

    return { token, code };

  } catch (err) {
    console.error('❌ Failed to fetch token:', err.response?.data || err.message);
    await browser.close();
    return null;
  }
}

module.exports = getBearerToken;

// Optional self-invoking runner for direct testing
if (require.main === module) {
  (async () => {
    const result = await getBearerToken();
    if (result) {
      console.log('✅ Token:', result.token);
      console.log('✅ Code:', result.code);
    } else {
      console.log('❌ Failed to get token.');
    }
  })();
}
