const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const connectDB = require('./config/db');
require('dotenv').config();

connectDB();

const app = express();

// ✅ FIXED: Specific origins + credentials (no wildcard)
const allowedOrigins = [
  'https://kmkk-ecommerce-app.vercel.app',
  'https://kmkk-ecommerce-mcjfx3fvw-kanimozhikalimuthus-projects.vercel.app',
  'https://kmkk-ecommerce-da14xgkc0-kanimozhikalimuthus-projects.vercel.app',  // ← YOUR NEWEST
  'http://localhost:5173',
  'http://localhost:3000'
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('CORS blocked: ' + origin));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200
}));

app.use(express.json({ limit: '10mb' }));
app.use(cookieParser());

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/cart', require('./routes/cartRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log('✅ CORS origins:', allowedOrigins);
});
