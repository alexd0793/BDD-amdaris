import http from 'k6/http';
import { check, sleep } from 'k6';
import { TokenProvider } from '../TokenProvider.js'; // adjust path as needed

export let options = {
  executor: 'ramping-vus',
  stages: [
    { duration: '2m', target: 50 },   // ramp-up to 50 users
    { duration: '3m', target: 50 },   // hold at 50 users
    { duration: '2m', target: 100 },  // ramp-up to 100 users
    { duration: '3m', target: 100 },  // hold at 100 users
    { duration: '2m', target: 0 },    // ramp-down
  ],
  // no 'exec' because we use default function
};

export function StressSearchFilter() {
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
