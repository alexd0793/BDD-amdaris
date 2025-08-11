import http from 'k6/http';
import { check, sleep } from 'k6';

// Load test function called by k6
export function LoadMain() {
  let res = http.get('https://pulsedev.nixonhire.com/');
  check(res, { 'status is 200': (r) => r.status === 200 });
  sleep(1); // Simulate user think time
}

// Export options for this test
export let options = {
  executor: 'ramping-vus',
  stages: [
    { duration: '1m', target: 20 },  // ramp-up to 20 users
    { duration: '4m', target: 20 },  // stay at 20 users
    { duration: '1m', target: 0 },   // ramp-down to 0 users
  ],
  //startTime: '60s', // delay start by 60 seconds
  exec: 'loadTest', // function to execute
};
