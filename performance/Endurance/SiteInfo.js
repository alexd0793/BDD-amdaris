import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  executor: 'shared-iterations',
  vus: 5,
  iterations: 100,
};

export function EnduranceSiteInfo() {
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

  // Convert params to query string
  const queryString = Object.entries(params)
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
    .join('&');

  const fullUrl = `${url}?${queryString}`;

  const res = http.get(fullUrl);

  check(res, {
    'status is 200': (r) => r.status === 200
  });

  sleep(1);
}
