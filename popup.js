document.getElementById('go-button').addEventListener('click', () => {
  const accessCode = document.getElementById('access-code').value;
  const secretCode = 'AI1532';

  if (accessCode === secretCode) {
    chrome.storage.sync.set({notificationsEnabled: true}, () => {
      document.getElementById('message').innerText = 'Notifications activated!';
    });
  } else {
    document.getElementById('message').innerText = 'Invalid code. Please purchase the product to activate.';
  }
});

