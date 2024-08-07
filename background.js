chrome.runtime.onInstalled.addListener(() => {
  console.log('AI Security Extension installed');
});

// Turn on Enhanced Safe Browsing
chrome.webRequest.onBeforeRequest.addListener(
  (details) => {
    return {cancel: true};  // Blocking requests as an example
  },
  {urls: ["<all_urls>"]},
  ["blocking"]
);

// Check for Chrome updates
chrome.runtime.onStartup.addListener(() => {
  chrome.runtime.requestUpdateCheck((status) => {
    if (status === 'update_available') {
      chrome.runtime.reload();
    }
  });
});

// Notifications
function showNotification(message) {
  chrome.notifications.create({
    type: 'basic',
    iconUrl: 'icons/icon48.png',
    title: 'AI Security Alert',
    message: message,
  });
}

// Check for suspicious links, sensitive info requests, public Wi-Fi, and AI-generated content
chrome.webRequest.onCompleted.addListener(
  (details) => {
    // Example checks
    if (details.url.includes('suspicious') || details.url.includes('sensitive-info')) {
      showNotification('Caution: Suspicious activity detected.');
    }
  },
  {urls: ["<all_urls>"]}
);

// Block tracking cookies and ads
chrome.webRequest.onBeforeRequest.addListener(
  (details) => {
    return {cancel: true};  // Blocking ad and tracking requests
  },
  {urls: ["*://*.doubleclick.net/*", "*://*.google-analytics.com/*"]},
  ["blocking"]
);

