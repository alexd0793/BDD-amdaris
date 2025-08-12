import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  executor: 'shared-iterations',
  vus: 10,
  iterations: 50,
  // no 'exec' here, since we use default function in runner
};

export function ScalabilityMain() {
  let res = http.get('https://pulsedev.nixonhire.com/');
  check(res, { 'status is 200': (r) => r.status === 200 });
  sleep(1);
}
