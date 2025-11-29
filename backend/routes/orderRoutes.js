const express = require('express');
const protect  = require('../middleware/authMiddleware');
const { createOrder, getUserOrders } = require('../controllers/orderController');
const router = express.Router();

router.use(protect);
router.post('/', createOrder);
router.get('/', getUserOrders);

module.exports = router;
