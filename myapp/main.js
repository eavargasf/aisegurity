document.getElementById('registration-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const redeemCode = document.getElementById('redeem-code').value;

    const errorDiv = document.getElementById('registration-error');
    errorDiv.textContent = '';

    axios.post('http://localhost:3000/register', {
        name,
        email,
        password,
        redeemCode
    })
    .then(response => {
        alert('Registration successful!');
        window.location.href = 'dashboard.html';
    })
    .catch(error => {
        const errorMessage = error.response && error.response.data ? error.response.data.error : error.message;
        errorDiv.textContent = 'Error registering: ' + errorMessage;
    });
});

document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('email-login').value;
    const password = document.getElementById('password-login').value;

    const errorDiv = document.getElementById('login-error');
    errorDiv.textContent = '';

    axios.post('http://localhost:3000/login', {
        email,
        password
    })
    .then(response => {
        alert('Login successful!');
        window.location.href = 'dashboard.html';
    })
    .catch(error => {
        const errorMessage = error.response && error.response.data ? error.response.data.error : error.message;
        errorDiv.textContent = 'Error logging in: ' + errorMessage;
    });
});

