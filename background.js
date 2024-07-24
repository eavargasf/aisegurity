chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ safeBrowsingEnabled: true, chromeUpdateCheck: true });
  chrome.declarativeNetRequest.updateDynamicRules({
    removeRuleIds: [1],
    addRules: [
      {
        "id": 1,
        "priority": 1,
        "action": { "type": "block" },
        "condition": { "urlFilter": "*://*/*", "resourceTypes": ["image", "script"] }
      }
    ]
  });
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'checkForUpdates') {
    chrome.runtime.requestUpdateCheck((status, details) => {
      if (status === 'update_available') {
        chrome.runtime.reload();
      } else {
        sendResponse({ status: 'up-to-date' });
      }
    });
    return true;
  } else if (request.type === 'showNotification') {
    chrome.notifications.create({
      type: 'basic',
      iconUrl: 'icons/icon128.png',
      title: request.title,
      message: request.message
    });
  }
});
