const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const connectDB = require('./config/db');
require('dotenv').config();

connectDB();

const app = express();

// ✅ CORS: Dynamic origin checking for ALL your Vercel deployments + localhost
const allowedOrigins = [
  'https://kmkk-ecommerce-app.vercel.app',
  'https://kmkk-ecommerce-mcjfx3fvw-kanimozhikalimuthus-projects.vercel.app',
  'http://localhost:5173',  // Vite dev
  'http://localhost:3000'   // CRA dev
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow non-browser requests (Postman, mobile apps)
    if (!origin) return callback(null, true);
    
    console.log(`🌐 Request origin: ${origin}`);
    
    if (allowedOrigins.includes(origin)) {
      console.log(`✅ CORS allowed: ${origin}`);
      return callback(null, true);
    } else {
      console.log(`🚫 CORS blocked: ${origin}`);
      return callback(new Error(`CORS: Origin ${origin} not allowed`), false);
    }
  },
  credentials: true,
  optionsSuccessStatus: 200 // For legacy browsers
}));

// Body parsers
app.use(express.json({ limit: '10mb' }));
app.use(cookieParser());

// ✅ Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    origins: allowedOrigins 
  });
});

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/cart', require('./routes/cartRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ message: 'API route not found' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`✅ CORS enabled for origins:`, allowedOrigins.join(', '));
});
