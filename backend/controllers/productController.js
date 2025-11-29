const Product = require('../models/Product');

exports.getProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || '';
    const category = req.query.category;
    const size = req.query.size;
    const minPrice = parseFloat(req.query.minPrice) || 0;
    const maxPrice = parseFloat(req.query.maxPrice) || 99999;

    let query = { $and: [] };

    if (search) {
      query.$and.push({
        $or: [
          { name: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } }
        ]
      });
    }

    if (category && category !== 'All') {
      query.$and.push({ category });
    }

    if (size) {
      query.$and.push({ sizes: size });
    }

    if (minPrice || maxPrice !== 99999) {
      query.$and.push({
        price: {
          $gte: minPrice,
          $lte: maxPrice
        }
      });
    }

    if (query.$and.length === 0) {
      delete query.$and;
    }

    const skip = (page - 1) * limit;
    const products = await Product.find(query).skip(skip).limit(limit).lean();
    const total = await Product.countDocuments(query);

    res.json({
      products,
      pagination: {
        page,
        pages: Math.ceil(total / limit),
        total
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
