const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

dotenv.config();

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
  })
);
app.use(express.json({ limit: '10mb' }));

app.use('/api/tenants', require('./routes/tenantRoutes'));

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (err) {
    if (err.code === 'ECONNREFUSED' && String(err.message).includes('querySrv')) {
      console.error(
        'MongoDB SRV lookup failed. Check local DNS or set MONGODB_DNS_SERVERS in server/.env.'
      );
    }

    console.error(err.message);
    process.exit(1);
  }
};

startServer();
