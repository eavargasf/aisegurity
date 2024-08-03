from flask import Flask, render_template, request, redirect, url_for, session
import os
import requests  # Ensure requests is imported
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
app.secret_key = os.urandom(24)

AIRTABLE_API_ENDPOINT = os.getenv('AIRTABLE_API_ENDPOINT')
AIRTABLE_API_KEY = os.getenv('AIRTABLE_API_KEY')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.form['email']
        password = request.form['password']
        
        headers = {
            'Authorization': f'Bearer {AIRTABLE_API_KEY}',
            'Content-Type': 'application/json'
        }
        response = requests.get(AIRTABLE_API_ENDPOINT, headers=headers)
        
        if response.status_code == 200:
            records = response.json().get('records', [])
            for record in records:
                fields = record['fields']
                if fields.get('Email') == email and fields.get('Password') == password:
                    session['user'] = email
                    return redirect(url_for('dashboard'))
            return "Invalid credentials", 401
        else:
            return "Error connecting to Airtable", 500
    
    return render_template('login.html')

@app.route('/dashboard')
def dashboard():
    if 'user' not in session:
        return redirect(url_for('login'))
    return f"Welcome to the dashboard, {session['user']}!"

# This block should be at the end of the file
if __name__ == '__main__':
    app.run(debug=True, port=5000)
