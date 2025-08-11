import http from 'k6/http';
import { check, sleep } from 'k6';
import { TokenProvider } from '../TokenProvider.js'; // adjust path as needed


// Load test function for Search Filter
export function LoadSearchFilter() {
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

// Load test options for Search Filter
export let options = {
  executor: 'ramping-vus',
  stages: [
    { duration: '1m', target: 20 },  // ramp up
    { duration: '4m', target: 20 },  // hold
    { duration: '1m', target: 0 },   // ramp down
  ],
  exec: 'LoadSearchFilter', // entry point for this script
};
