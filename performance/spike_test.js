import { options, SpikeMain } from './Spike/MainPage.js';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import {SpikeSearchFilter} from './Spike/SearchFilter.js';
export { options };
import { SpikeLogin } from './Spike/Login.js';
import { SpikeSiteInfo } from './Spike/SiteInfo.js';

export function handleSummary(data) {
  const today = new Date();
  const formattedDate = today.toISOString().slice(0, 10);
  return {
    [`./zReports/Spike/spike_${formattedDate}.html`]: htmlReport(data),
  };
}

export default function () {
  //SpikeMain();
  //SpikeSearchFilter();
  //SpikeLogin();
  SpikeSiteInfo();
}
