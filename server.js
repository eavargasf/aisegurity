require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const AIRTABLE_API_ENDPOINT = process.env.AIRTABLE_API_ENDPOINT;
const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;

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
