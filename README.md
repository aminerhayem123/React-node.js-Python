# Test-React-node.js-python

Small CRUD of Movies react linked with service python and node.js

## Prerequisites

- Node.js and npm installed
- Python and pip installed
- PostgreSQL installed and running

## Database Setup

1. Create a new PostgreSQL database for your project:

   ```sh
   First connect with super user and Password to postgres 
   CREATE DATABASE mydatabase;
   Connect to your new database:
    \c mydatabase;
    Create a table in the database for your items:
    CREATE TABLE items (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL
    );

   ```sh
   git clone  https://github.com/aminerhayem123/React-node.js-python.git
   cd React-node.js-python
Set up the Python Flask backend:

Install dependencies:

pip install flask flask_sqlalchemy

Update app.py with your PostgreSQL database URI:

#this is for the postgress Database connection 
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:your-postgres-password@localhost:5432/mydatabase'   information : User / Password / your database name

Run the Flask server:

python app.py

Set up the Node.js backend:

Install dependencies:

npm install express cors axios body-parser

Run the Node.js server:

node server.js

Set up the React frontend:

Install dependencies:
npm install react react-dom react-modal axios

Run the React development server:

npm start

Access the application at http://localhost:3000 in your web browser.

API Endpoints
GET /items: Retrieve all items
POST /items: Add a new item
PUT /items/:id: Update an item with the specified ID




