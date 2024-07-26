async function fetchUserData() {
    const userId = localStorage.getItem('userId');
    if (!userId) {
        alert('User not logged in.');
        window.location.href = 'login.html';
        return;
    }

    const response = await fetch(`https://api.airtable.com/v0/appFZBJefIOmr86zR/Users?filterByFormula={UserId}='${userId}'`, {
        headers: {
            'Authorization': 'Bearer patvsM7l2QxYV6BSV.e48172c74aea3f9b96ae4918907e30c45f0ca719bbc2ad91173fddbbaa25e426',
            'Content-Type': 'application/json'
        }
    });

    const data = await response.json();
    return data.records[0]?.fields || {};
}

async function fetchFunctionalities() {
    const response = await fetch('https://api.airtable.com/v0/appFZBJefIOmr86zR/Functionalities', {
        headers: {
            'Authorization': 'Bearer patvsM7l2QxYV6BSV.e48172c74aea3f9b96ae4918907e30c45f0ca719bbc2ad91173fddbbaa25e426',
            'Content-Type': 'application/json'
        }
    });

    const data = await response.json();
    return data.records;
}

async function renderDashboard() {
    try {
        const user = await fetchUserData();
        const functionalities = await fetchFunctionalities();

        const functionalitiesContainer = document.getElementById('functionalities-container');
        functionalitiesContainer.innerHTML = '';

        functionalities.forEach(record => {
            const functionality = record.fields;

            const functionalityDiv = document.createElement('div');
            functionalityDiv.classList.add('functionality');

            functionalityDiv.innerHTML = `
                <h3>${functionality.Name}</h3>
                <p>${functionality.Description}</p>
                <p>Status: ${functionality.Active ? 'Active' : 'Inactive'}</p>
                <p>Counter: ${functionality.Counter || 0}</p>
                <img src="${functionality.ImageURL}" alt="${functionality.Name}">
                <button onclick="toggleFunctionality('${record.id}', ${!functionality.Active})">
                    ${functionality.Active ? 'Deactivate' : 'Activate'}
                </button>
            `;

            functionalitiesContainer.appendChild(functionalityDiv);
        });
    } catch (error) {
        console.error('Error rendering dashboard:', error);
        document.getElementById('functionalities-container').textContent = 'Error loading functionalities.';
    }
}

async function toggleFunctionality(id, activate) {
    try {
        const response = await fetch(`https://api.airtable.com/v0/appFZBJefIOmr86zR/Functionalities/${id}`, {
            method: 'PATCH',
            headers: {
                'Authorization': 'Bearer patvsM7l2QxYV6BSV.e48172c74aea3f9b96ae4918907e30c45f0ca719bbc2ad91173fddbbaa25e426',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                fields: {
                    Active: activate
                }
            })
        });

        if (!response.ok) {
            throw new Error('Failed to update functionality.');
        }

        alert(`${activate ? 'Activated' : 'Deactivated'} successfully!`);
        renderDashboard();
    } catch (error) {
        console.error('Error toggling functionality:', error);
        alert('Error toggling functionality.');
    }
}

document.addEventListener('DOMContentLoaded', renderDashboard);
