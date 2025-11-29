const Order = require('../models/Order');
const Cart = require('../models/Cart');
const { sendOrderEmail } = require('../utils/sendEmail');

exports.createOrder = async (req, res) => {
  try {
    const userId = req.user._id;
    const cart = await Cart.findOne({ user: userId }).populate('items.product');

    if (!cart || !cart.items.length) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    const orderItems = cart.items.map(item => ({
      product: item.product._id,
      name: item.product.name,
      size: item.size,
      quantity: item.quantity,
      price: item.product.price
    }));

    const totalPrice = cart.items.reduce((total, item) => 
      total + (item.product.price * item.quantity), 0
    );

    const order = await Order.create({
      user: userId,
      items: orderItems,
      totalPrice,
      orderId: `ORD-${Date.now()}`
    });

    // Clear cart
    await Cart.findOneAndUpdate({ user: userId }, { items: [] });

    // Send email
    const user = await User.findById(userId);
    await sendOrderEmail(order, user);

    const populatedOrder = await Order.findById(order._id).populate('items.product');
    res.status(201).json(populatedOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate('items.product')
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
