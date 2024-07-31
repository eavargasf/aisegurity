const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

const AIRTABLE_API_URL = 'https://api.airtable.com/v0/appFZBJefIOmr86zR/Registrations';
const AIRTABLE_API_KEY = 'patvsM7l2QxYV6BSV.e48172c74aea3f9b96ae4918907e30c45f0ca719bbc2ad91173fddbbaa25e426';

app.post('/register', async (req, res) => {
    try {
        const { name, email, password, redeemCode } = req.body;
        const validRedeemCodes = ['AI1532', 'AI1234', 'AI5678'];

        if (!validRedeemCodes.includes(redeemCode)) {
            return res.status(400).json({ error: 'Invalid Redeem Code' });
        }

        const response = await axios.post(AIRTABLE_API_URL, {
            fields: {
                Name: name,
                Email: email,
                Password: password,
                RedeemCode: redeemCode
            }
        }, {
            headers: {
                'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        res.status(201).json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Error registering user' });
    }
});

app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const response = await axios.get(AIRTABLE_API_URL, {
            headers: {
                'Authorization': `Bearer ${AIRTABLE_API_KEY}`
            }
        });

        const records = response.data.records;
        const user = records.find(record => record.fields.Email === email && record.fields.Password === password);

        if (user) {
            res.status(200).json({ message: 'Login successful' });
        } else {
            res.status(400).json({ error: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error logging in' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

