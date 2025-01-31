document.getElementById('go-button').addEventListener('click', () => {
  const accessCode = document.getElementById('access-code').value;
  const secretCode = 'AI1532';

  if (accessCode === secretCode) {
    document.getElementById('message').innerText = 'Notifications activated!';
    activateNotifications();
  } else {
    document.getElementById('message').innerText = 'Invalid code. Please purchase the product to activate.';
  }
});

function activateNotifications() {
  // Request notification permission
  if (Notification.permission === 'granted') {
    showNotification('Enhanced safe browsing is turned on.');
    showNotification('Chrome is up-to-date.');
  } else if (Notification.permission !== 'denied') {
    Notification.requestPermission().then(permission => {
      if (permission === 'granted') {
        showNotification('Enhanced safe browsing is turned on.');
        showNotification('Chrome is up-to-date.');
      }
    });
  }

  // Check for AI-generated content (simulate with a timeout)
  setTimeout(() => {
    checkForAIContent();
  }, 2000);
}

function showNotification(message) {
  new Notification('AI Security Alert', {
    body: message,
    icon: 'icons/icon48.png'  // Add the path to your icon file
  });
}

function checkForAIContent() {
  // This is a placeholder for the actual AI content check logic
  const aiContentDetected = Math.random() > 0.5; // Randomly simulate detection

  if (aiContentDetected) {
    showNotification('AI-generated content detected on this page.');
  }
}

// Periodically check for other security events
setInterval(() => {
  // Example: Notify user to use a VPN when on public Wi-Fi (simulated)
  const onPublicWiFi = Math.random() > 0.7; // Randomly simulate condition
  if (onPublicWiFi) {
    showNotification('Consider using a VPN to encrypt your traffic.');
  }
}, 10000); // Check every 10 seconds
