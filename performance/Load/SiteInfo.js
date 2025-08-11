import http from 'k6/http';
import { check, sleep } from 'k6';

// Load test options
export let options = {
  executor: 'ramping-vus',
  stages: [
    { duration: '1m', target: 20 },  // ramp up to 20 VUs
    { duration: '4m', target: 20 },  // hold at 20 VUs
    { duration: '1m', target: 0 },   // ramp down
  ],
  exec: 'LoadSiteInfo',  // name of test function
};

// Test function executed by VUs
export function LoadSiteInfo() {
  const url = 'https://pulsedev.nixonhire.com/energy-management/';

  const params = {
    view: 'map',
    startDate: '2025-07-08',
    endDate: '2025-07-15',
    site: 'HU1 1NE',
    fuelPrice: '1.6',
    kilovoltAmperes: '60',
    generatorPercentage: '50'
  };

  const queryString = Object.entries(params)
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
    .join('&');

  const fullUrl = `${url}?${queryString}`;

  const res = http.get(fullUrl);

  check(res, {
    'status is 200': (r) => r.status === 200
  });

  sleep(1); // simulate user think time
}
