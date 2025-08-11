import { options, ScalabilityMain } from './Scalability/MainPage.js';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import {ScalabilitySearchFilter} from './Scalability/SearchFilter.js';
export { options };
import { ScalabilityLogin } from './Scalability/Login.js';
import { ScalabilitySiteInfo } from './Scalability/SiteInfo.js';

export function handleSummary(data) {
  const today = new Date();
  const formattedDate = today.toISOString().slice(0, 10);
  return {
    [`./zReports/Scalability/scalability_${formattedDate}.html`]: htmlReport(data),
  };
}

// Default function that k6 runs
export default function () {
  //ScalabilityMain();
  //ScalabilitySearchFilter();
  //ScalabilityLogin();
  ScalabilitySiteInfo();
}
