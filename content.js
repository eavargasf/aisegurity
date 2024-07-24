function notifyUser(title, message) {
  chrome.runtime.sendMessage({ type: 'showNotification', title: title, message: message });
}

document.addEventListener('click', (event) => {
  let target = event.target;
  if (target.tagName === 'A' && target.href) {
    if (target.href.includes('unknown') || target.href.includes('suspicious')) {
      notifyUser('Caution', 'Unknown or suspicious-looking email link detected.');
    } else if (target.href.includes('request') && target.href.includes('sensitive')) {
      notifyUser('Caution', 'Website requesting sensitive personal or financial information.');
    }
  }
});

if (navigator.connection && navigator.connection.type === 'wifi') {
  notifyUser('Public Wi-Fi Detected', 'Consider using a VPN to encrypt your traffic.');
}

document.addEventListener('DOMContentLoaded', (event) => {
  if (document.body.innerText.includes('AI-generated content')) {
    notifyUser('AI Content Detected', 'This website has used AI to generate some type of content.');
  }
});
