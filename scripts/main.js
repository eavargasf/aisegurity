document.addEventListener('DOMContentLoaded', function() {
    const registrationForm = document.getElementById('registration-form');
    const loginForm = document.getElementById('login-form');

    const BASE_URL = 'https://your-deployed-url.vercel.app'; // Replace with your Vercel deployment URL

    if (registrationForm) {
        registrationForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const redeemCode = document.getElementById('redeem-code').value;

            const errorDiv = document.getElementById('registration-error');
            errorDiv.textContent = '';

            try {
                const response = await axios.post(`${BASE_URL}/register`, {
                    name,
                    email,
                    password,
                    redeemCode
                });
                alert('Registration successful!');
                window.location.href = 'dashboard.html';
            } catch (error) {
                const errorMessage = error.response && error.response.data ? error.response.data.error : error.message;
                errorDiv.textContent = 'Error registering: ' + errorMessage;
                console.error('Registration error:', errorMessage);
            }
        });
    }

    if (loginForm) {
        loginForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            const email = document.getElementById('email-login').value;
            const password = document.getElementById('password-login').value;

            const errorDiv = document.getElementById('login-error');
            errorDiv.textContent = '';

            try {
                const response = await axios.post(`${BASE_URL}/login`, {
                    email,
                    password
                });
                alert('Login successful!');
                window.location.href = 'dashboard.html';
            } catch (error) {
                const errorMessage = error.response && error.response.data ? error.response.data.error : error.message;
                errorDiv.textContent = 'Error logging in: ' + errorMessage;
                console.error('Login error:', errorMessage);
            }
        });
    }
});
