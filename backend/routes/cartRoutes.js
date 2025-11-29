const express = require('express');
const  protect  = require('../middleware/authMiddleware');
const { addToCart, getCart, updateCart, removeFromCart, mergeGuestCart } = require('../controllers/cartController');
const router = express.Router();

router.use(protect);
router.post('/add', addToCart);
router.get('/', getCart);
router.put('/update', updateCart);
router.delete('/remove', removeFromCart);
router.post('/merge', mergeGuestCart);

module.exports = router;
