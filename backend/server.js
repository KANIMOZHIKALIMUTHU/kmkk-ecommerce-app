const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const connectDB = require('./config/db');
require('dotenv').config();

connectDB();

const app = express();

// 🔥 DYNAMIC CORS - Matches ANY Vercel + localhost (NO MANUAL UPDATES!)
const corsOptions = {
  origin: function(origin, callback) {
    // Allow non-browser requests (Postman, curl, mobile)
    if (!origin) return callback(null, true);
    
    // ✅ PATTERN 1: ANY Vercel deployment
    if (origin.includes('vercel.app')) {
      console.log(`✅ Vercel origin allowed: ${origin}`);
      return callback(null, origin);
    }
    
    // ✅ PATTERN 2: Local development
    if (origin.includes('localhost')) {
      console.log(`✅ Localhost allowed: ${origin}`);
      return callback(null, origin);
    }
    
    console.log(`🚫 Blocked: ${origin}`);
    callback(new Error('CORS: Origin not allowed'));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Cookie']
};

app.use(cors(corsOptions));

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
  console.log('✅ Dynamic CORS: All Vercel + localhost');
});
