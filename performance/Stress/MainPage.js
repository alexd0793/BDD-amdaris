import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  executor: 'ramping-vus',
  stages: [
    { duration: '2m', target: 50 },
    { duration: '3m', target: 50 },
    { duration: '2m', target: 100 },
    { duration: '3m', target: 100 },
    { duration: '2m', target: 0 },
  ],
  //startTime: '4m',
  // no exec here
};

export function StressMain() {
  let res = http.get('https://pulsedev.nixonhire.com/');
  check(res, { 'status is 200': (r) => r.status === 200 });
  sleep(1);
}
