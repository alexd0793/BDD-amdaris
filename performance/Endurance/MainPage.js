import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  executor: 'shared-iterations',
  vus: 5,
  iterations: 100,
  // no exec here or exec: 'default' by default
};

export function EnduranceMain() {
  let res = http.get('https://pulsedev.nixonhire.com/');
  check(res, { 'status is 200': (r) => r.status === 200 });
  sleep(1);
}
