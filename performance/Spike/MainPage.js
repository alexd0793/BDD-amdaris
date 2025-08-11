import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  executor: 'ramping-vus',
  stages: [
    { duration: '30s', target: 0 },
    { duration: '1m', target: 80 },
    { duration: '2m', target: 80 },
    { duration: '30s', target: 0 },
  ],
  //startTime: '2m',
  // no exec, we will export default fn in runner
};

export function SpikeMain() {
  let res = http.get('https://pulsedev.nixonhire.com/');
  check(res, { 'status is 200': (r) => r.status === 200 });
  sleep(1);
}
