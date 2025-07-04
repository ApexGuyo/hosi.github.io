const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const patientRoutes = require('./routes/patients');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/api/patients', patientRoutes);

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
