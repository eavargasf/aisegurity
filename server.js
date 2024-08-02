const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const AIRTABLE_API_ENDPOINT = 'https://api.airtable.com/v0/appFZBJefIOmr86zR/Registrations';
const AIRTABLE_API_KEY = 'patvsM7l2QxYV6BSV.e48172c74aea3f9b96ae4918907e30c45f0ca719bbc2ad91173fddbbaa25e426';

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    
    try {
        const response = await axios.get(AIRTABLE_API_ENDPOINT, {
            headers: {
                'Authorization': `Bearer ${AIRTABLE_API_KEY}`
            },
            params: {
                filterByFormula: `AND({Email}='${encodeURIComponent(email)}',{Password}='${encodeURIComponent(password)}')`
            }
        });

        if (response.data.records && response.data.records.length > 0) {
            res.json({ success: true, message: 'Login successful' });
        } else {
            res.status(401).json({ success: false, message: 'Invalid email or password' });
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, message: 'An error occurred' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
