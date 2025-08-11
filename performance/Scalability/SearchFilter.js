import http from 'k6/http';
import { check, sleep } from 'k6';
import { TokenProvider } from '../TokenProvider.js'; // adjust path as needed

// K6 options for scalability test
export let options = {
  executor: 'shared-iterations',
  vus: 10,             // simulate 10 concurrent virtual users
  iterations: 50,      // total number of iterations (shared among VUs)
  // no `exec`, since default function is used
};

export function ScalabilitySearchFilter() {
  const BEARER_TOKEN = TokenProvider.BEARERTOKEN;

  const startDate = '2025-07-01';
  const endDate = '2025-07-08';
  const query = 'ca38sy';

  const url = `https://pulsedev.nixonhire.com/api/Report/Energy/Site?startDate=${startDate}&endDate=${endDate}&query=${encodeURIComponent(query)}`;

  const params = {
    headers: {
      Authorization: `Bearer ${BEARER_TOKEN}`,
      Accept: 'application/json, text/plain, */*',
    },
  };

  const res = http.get(url, params);

  check(res, {
    'status is 200': (r) => r.status === 200,
    'response is not empty': (r) => r.body.length > 0,
  });

  sleep(1);
}
