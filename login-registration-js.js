// Airtable configuration
const AIRTABLE_API_KEY = 'your_airtable_api_key';
const AIRTABLE_BASE_ID = 'your_airtable_base_id';
const AIRTABLE_TABLE_NAME = 'Users';

// Function to handle login
async function login(email, password) {
    const url = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_NAME}`;
    const response = await fetch(url, {
        headers: {
            'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
            'Content-Type': 'application/json'
        }
    });
    const data = await response.json();
    const user = data.records.find(record => record.fields.Email === email && record.fields.Password === password);
    
    if (user) {
        localStorage.setItem('token', user.id);
        window.location.href = 'dashboard.html';
    } else {
        alert('Invalid credentials');
    }
}

// Function to handle registration
async function register(name, email, password, redeemCode) {
    // First, validate the redeem code
    if (!await validateRedeemCode(redeemCode)) {
        alert('Invalid redeem code');
        return;
    }

    const url = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_NAME}`;
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            fields: {
                Name: name,
                Email: email,
                Password: password,
                RedeemCode: redeemCode
            }
        })
    });
    
    if (response.ok) {
        alert('Registration successful! Please login.');
    } else {
        alert('Registration failed. Please try again.');
    }
}

// Function to validate redeem code
async function validateRedeemCode(code) {
    // Implement your redeem code validation logic here
    // This could involve checking against a list of valid codes in Airtable
    // or making an API call to a service that validates the codes
    // For now, we'll just return true
    return true;
}

// Event listeners for form submissions
document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;
    login(email, password);
});

document.getElementById('registerForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = e.target.elements.name.value;
    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;
    const confirmPassword = e.target.elements.confirmPassword.value;
    const redeemCode = e.target.elements.redeemCode.value;

    if (password !== confirmPassword) {
        alert("Passwords don't match");
        return;
    }

    register(name, email, password, redeemCode);
});

// Toggle between login and registration forms
document.getElementById('showRegister').addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('loginForm').parentElement.style.display = 'none';
    document.getElementById('registerForm').style.display = 'block';
});
