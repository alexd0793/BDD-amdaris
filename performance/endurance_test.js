import { options, EnduranceMain } from './Endurance/MainPage.js';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
export { options };
import { EnduranceSearchFilter } from './Endurance/SearchFilter.js';
import { EnduranceLogin } from './Endurance/Login.js';
import { EnduranceSiteInfo } from './Endurance/SiteInfo.js';

export function handleSummary(data) {
  const today = new Date();
  const formattedDate = today.toISOString().slice(0, 10);
  return {
    [`./zReports/Endurance/endurance_${formattedDate}.html`]: htmlReport(data),
  };
}

export default function () {
  //EnduranceMain();
  //EnduranceSearchFilter();
  //EnduranceLogin();
  EnduranceSiteInfo();
}
