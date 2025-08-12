import http from 'k6/http';
import { check, sleep } from 'k6';
import { TokenProvider } from '../TokenProvider.js'; // adjust path as needed

// K6 options for spike testing
export let options = {
  executor: 'ramping-vus',
  stages: [
    { duration: '30s', target: 0 },   // idle start
    { duration: '1m', target: 80 },   // sudden spike to 80 VUs
    { duration: '2m', target: 80 },   // hold the spike
    { duration: '30s', target: 0 },   // cool down
  ],
  // no exec key, will use default function in test runner
};

export function SpikeSearchFilter() {
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
