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
  // Simulate activation of notifications
  alert('Notifications activated!');
}
