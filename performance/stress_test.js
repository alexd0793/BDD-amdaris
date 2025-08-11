import { options, StressMain } from './Stress/MainPage.js';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import {StressSearchFilter} from './Stress/SearchFilter.js';
export { options };
import {StressLogin} from './Stress/Login.js';
import {StressSiteInfo} from './Stress/SiteInfo.js';

export function handleSummary(data) {
  const today = new Date();
  const formattedDate = today.toISOString().slice(0, 10);
  return {
    [`./zReports/Stress/stress_${formattedDate}.html`]: htmlReport(data),
  };
}

export default function () {
  //StressMain();
  //  StressSearchFilter();
  //StressLogin();
  StressSiteInfo();
}
