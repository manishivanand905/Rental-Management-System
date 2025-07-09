const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

dotenv.config();

console.log('Client URL:', process.env.CLIENT_URL);

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/tenants', require('./routes/tenantRoutes'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
