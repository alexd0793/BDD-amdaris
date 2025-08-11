import http from 'k6/http';
import { check, sleep } from 'k6';
import { CodeProvider } from '../TokenProvider.js';

export let options = {
  executor: 'shared-iterations',
  vus: 10,
  iterations: 50,
  // no 'exec' here, since we use default function in runner
};

export function ScalabilityLogin() {
  // You must provide fresh values for these before running the test!
  const code = CodeProvider.CODE;
  const code_verifier = 'd-ZkX39Laka_WTPK8yGVZ7d4wLl-iCpV-iJqELPfMnU';

  const url = 'https://b2cnhpulsedevuks.b2clogin.com/b2cnhpulsedevuks.onmicrosoft.com/b2c_1_sign_up_sign_in/oauth2/v2.0/token';

  const payload = {
    client_id: 'f5b8c793-84a5-4c22-9886-c3375bb42fda',
    scope: 'openid profile offline_access https://b2cnhpulsedevuks.onmicrosoft.com/f5b8c793-84a5-4c22-9886-c3375bb42fda/accessEndpoints',
    code: code,
    redirect_uri: 'https://pulsedev.nixonhire.com',
    grant_type: 'authorization_code',
    code_verifier: code_verifier,
  };

  const params = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  };

  // Convert payload to x-www-form-urlencoded
  const formBody = Object.entries(payload)
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
    .join('&');

  let res = http.post(url, formBody, params);

  check(res, {
    'status is 200': (r) => r.status === 200,
    'received access token': (r) => r.json('access_token') !== undefined,
  });

  sleep(1);
}