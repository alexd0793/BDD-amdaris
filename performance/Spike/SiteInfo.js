import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  executor: 'ramping-vus',
  stages: [
    { duration: '30s', target: 0 },    // start at 0
    { duration: '1m', target: 80 },    // spike up to 80 users
    { duration: '2m', target: 80 },    // hold at 80
    { duration: '30s', target: 0 },    // ramp down
  ],
  //startTime: '2m',
  // no 'exec', so it runs the default exported function
};

export function SpikeSiteInfo() {
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

  sleep(1); // simulate think time
}
