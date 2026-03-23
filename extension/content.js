function extractJobData() {
  const title = document.querySelector('h1')?.innerText || '';
  const company = document.querySelector('.job-details-jobs-unified-top-card__company-name')?.innerText || '';
  const description = document.querySelector('#job-details')?.innerText || '';
  const url = window.location.href;

  return {
    job_title: title,
    company: company,
    description: description,
    url: url
  };
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "scan") {
    const data = extractJobData();
    sendResponse(data);
  }
});
