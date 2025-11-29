const Cart = require('../models/Cart');
const Product = require('../models/Product');

exports.addToCart = async (req, res) => {
  try {
    const { productId, size, quantity = 1 } = req.body;
    const userId = req.user?._id;

    let cart = userId 
      ? await Cart.findOne({ user: userId })
      : await Cart.findOne({ guestId: req.headers['x-guest-id'] });

    if (!cart) {
      cart = new Cart({
        user: userId || null,
        guestId: userId ? null : req.headers['x-guest-id'],
        isGuest: !userId,
        items: []
      });
    }

    const itemIndex = cart.items.findIndex(item => 
      item.product.toString() === productId && item.size === size
    );

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      const product = await Product.findById(productId);
      cart.items.push({ product: productId, size, quantity });
    }

    await cart.save();
    const populatedCart = await Cart.findById(cart._id).populate('items.product');
    res.json(populatedCart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getCart = async (req, res) => {
  try {
    const userId = req.user?._id;
    const guestId = req.headers['x-guest-id'];

    const cart = userId 
      ? await Cart.findOne({ user: userId }).populate('items.product')
      : await Cart.findOne({ guestId }).populate('items.product');

    res.json(cart || { items: [], total: 0 });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateCart = async (req, res) => {
  try {
    const { productId, size, quantity } = req.body;
    const userId = req.user._id;

    const cart = await Cart.findOne({ user: userId });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    const itemIndex = cart.items.findIndex(item => 
      item.product.toString() === productId && item.size === size
    );

    if (itemIndex > -1) {
      if (quantity <= 0) {
        cart.items.splice(itemIndex, 1);
      } else {
        cart.items[itemIndex].quantity = quantity;
      }
      await cart.save();
      const populatedCart = await Cart.findById(cart._id).populate('items.product');
      res.json(populatedCart);
    } else {
      res.status(404).json({ message: 'Item not found in cart' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.removeFromCart = async (req, res) => {
  try {
    const { productId, size } = req.body;
    const userId = req.user._id;

    const cart = await Cart.findOne({ user: userId });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    cart.items = cart.items.filter(item => 
      !(item.product.toString() === productId && item.size === size)
    );
    await cart.save();
    const populatedCart = await Cart.findById(cart._id).populate('items.product');
    res.json(populatedCart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.mergeGuestCart = async (req, res) => {
  try {
    const { guestCartItems } = req.body;
    const userId = req.user._id;
    const guestId = req.headers['x-guest-id'];

    const guestCart = await Cart.findOne({ guestId });
    if (!guestCart || !guestCartItems?.length) {
      return res.json({ message: 'No guest cart to merge' });
    }

    let userCart = await Cart.findOne({ user: userId });
    if (!userCart) {
      userCart = new Cart({ user: userId, items: [] });
    }

    for (const guestItem of guestCartItems) {
      const existingItem = userCart.items.find(item => 
        item.product.toString() === guestItem.product && item.size === guestItem.size
      );
      if (existingItem) {
        existingItem.quantity += guestItem.quantity;
      } else {
        userCart.items.push(guestItem);
      }
    }

    await userCart.save();
    await Cart.findOneAndDelete({ guestId });
    const populatedCart = await Cart.findById(userCart._id).populate('items.product');
    res.json(populatedCart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
