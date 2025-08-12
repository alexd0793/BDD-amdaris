import http from 'k6/http';
import { check, sleep } from 'k6';
import { TokenProvider } from '../TokenProvider.js'; // adjust path as needed

const BEARER_TOKEN = TokenProvider.BEARERTOKEN;

export let options = {
  executor: 'shared-iterations',
  vus: 5,
  iterations: 100,
};

export function EnduranceSearchFilter() {
  
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

  //console.log('Response status:', res.status);
  //console.log('Response body:', res.body);

  check(res, {
    'status is 200': (r) => r.status === 200,
    'response is not empty': (r) => r.body.length > 0,
  });

  sleep(1);
}
