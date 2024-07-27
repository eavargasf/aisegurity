// Notify user when AI-generated content is detected (example implementation)
document.addEventListener('DOMContentLoaded', (event) => {
  if (document.body.innerText.includes('AI-generated')) {
    chrome.runtime.sendMessage({notification: 'AI-generated content detected on this page.'});
  }
});
