import { options, LoadMain } from './Load/MainPage.js';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import {LoadSearchFilter} from './Load/SearchFilter.js';
export { options };
import { LoadLogin } from './Load/Login.js';
import { LoadSiteInfo } from './Load/SiteInfo.js';

export function handleSummary(data) {
  const today = new Date();
  const formattedDate = today.toISOString().slice(0, 10);
  return {
    [`./zReports/Load/load_${formattedDate}.html`]: htmlReport(data),
  };
}

export default function () {
  //LoadMain();
  //LoadSearchFilter();
  //LoadLogin();
  LoadSiteInfo();
}
