document.getElementById('scanBtn').addEventListener('click', async () => {
  const status = document.getElementById('status');
  status.innerText = 'Scanning...';

  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  
  chrome.tabs.sendMessage(tab.id, { action: "scan" }, (data) => {
    if (chrome.runtime.lastError || !data) {
      status.innerText = 'Error: Make sure you are on LinkedIn/Indeed job page.';
      return;
    }

    chrome.runtime.sendMessage({ action: "sync", data }, (response) => {
      if (response.success) {
        status.innerText = 'Synced successfully!';
      } else {
        status.innerText = 'Sync failed: ' + response.error;
      }
    });
  });
});
