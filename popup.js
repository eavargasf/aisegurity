document.getElementById('check-updates').addEventListener('click', () => {
  chrome.runtime.sendMessage({ type: 'checkForUpdates' }, (response) => {
    alert(response.status === 'up-to-date' ? 'Chrome is up-to-date' : 'Updating Chrome...');
  });
});

document.getElementById('safe-browsing').addEventListener('change', (event) => {
  chrome.storage.sync.set({ safeBrowsingEnabled: event.target.checked });
});

document.getElementById('block-ads').addEventListener('change', (event) => {
  chrome.declarativeNetRequest.updateDynamicRules({
    removeRuleIds: [1],
    addRules: [
      {
        "id": 1,
        "priority": 1,
        "action": { "type": event.target.checked ? 'block' : 'allow' },
        "condition": { "urlFilter": "*://*/*", "resourceTypes": ["image", "script"] }
      }
    ]
  });
});
