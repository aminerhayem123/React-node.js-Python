const express = require('express');
const cors = require('cors');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const pythonServiceUrl = 'http://127.0.0.1:5000';

app.get('/items', (req, res) => {
  axios.get(`${pythonServiceUrl}/items`)
    .then(response => res.json(response.data))
    .catch(error => res.status(500).json({ error: error.message }));
});

app.post('/items', (req, res) => {
  axios.post(`${pythonServiceUrl}/items`, req.body)
    .then(response => res.json(response.data))
    .catch(error => res.status(500).json({ error: error.message }));
});

app.put('/items/:id', (req, res) => {
  const { id } = req.params;
  axios.put(`${pythonServiceUrl}/items/${id}`, req.body)
    .then(response => res.json(response.data))
    .catch(error => res.status(500).json({ error: error.message }));
});

app.listen(3001, () => {
  console.log('Node.js service running on port 3001');
});
