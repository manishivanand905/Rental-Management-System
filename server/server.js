const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

dotenv.config();

const app = express();
const tenantRoutes = require('./routes/tenantRoutes');

const allowedOrigins = Array.from(
  new Set(
    [
      'http://localhost:3000',
      'http://127.0.0.1:3000',
      'https://rental-management-system-psi.vercel.app',
      ...(process.env.CLIENT_URL || '').split(','),
      ...(process.env.CLIENT_URLS || '').split(','),
    ]
      .map((origin) => origin.trim())
      .filter(Boolean)
  )
);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error(`CORS blocked for origin: ${origin}`));
    },
  })
);
app.use(express.json({ limit: '10mb' }));

app.use('/api/tenants', tenantRoutes);
app.use('/tenants', tenantRoutes);

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
