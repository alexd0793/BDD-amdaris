import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  executor: 'ramping-vus',
  stages: [
    { duration: '2m', target: 50 },    // ramp up to 50
    { duration: '3m', target: 50 },    // hold 50
    { duration: '2m', target: 100 },   // ramp up to 100
    { duration: '3m', target: 100 },   // hold 100
    { duration: '2m', target: 0 },     // ramp down
  ],
  //startTime: '4m',  // optional delay before start
  // no 'exec', defaults to function below
};

export function StressSiteInfo() {
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
