const mongoose = require('mongoose');
const Product = require('./models/Product');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI);

const products = [
  // MEN (12 products)
  { name: "Men's Cotton T-Shirt Blue", description: "Comfortable cotton t-shirt", price: 19.99, image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400", category: "Men", sizes: ["S", "M", "L", "XL"], stock: 50 },
  { name: "Men's Denim Jacket", description: "Classic denim jacket", price: 49.99, image: "https://images.unsplash.com/photo-1594938298607-63af3b8069b5?w=400", category: "Men", sizes: ["M", "L", "XL"], stock: 30 },
  { name: "Men's Slim Fit Jeans", description: "Slim fit stretch jeans", price: 39.99, image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400", category: "Men", sizes: ["S", "M", "L"], stock: 40 },
  { name: "Men's Hoodie Grey", description: "Cozy fleece hoodie", price: 34.99, image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400", category: "Men", sizes: ["S", "M", "L", "XL"], stock: 25 },
  { name: "Men's Leather Jacket", description: "Premium leather jacket", price: 89.99, image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400", category: "Men", sizes: ["M", "L", "XL"], stock: 15 },
  { name: "Men's Polo Shirt", description: "Classic polo shirt", price: 24.99, image: "https://images.unsplash.com/photo-1520988814404-2e5a32a7a4ca?w=400", category: "Men", sizes: ["S", "M", "L"], stock: 35 },
  { name: "Men's Cargo Pants", description: "Durable cargo pants", price: 44.99, image: "https://images.unsplash.com/photo-1543398267-b071b29b8e90?w=400", category: "Men", sizes: ["M", "L", "XL"], stock: 20 },
  { name: "Men's Winter Coat", description: "Warm puffer coat", price: 79.99, image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400", category: "Men", sizes: ["M", "L"], stock: 12 },
  { name: "Men's Linen Shirt", description: "Breathable linen shirt", price: 34.99, image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=400", category: "Men", sizes: ["S", "M", "L"], stock: 30 },
  { name: "Men's Sports Shorts", description: "Quick-dry training shorts", price: 22.99, image: "https://images.unsplash.com/photo-1517832207067-4db24a2ae47c?w=400", category: "Men", sizes: ["S", "M", "L", "XL"], stock: 45 },
  { name: "Men's Checked Shirt Red", description: "Casual checked shirt", price: 27.99, image: "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=400", category: "Men", sizes: ["S", "M", "L", "XL"], stock: 28 },
  { name: "Men's Knit Sweater Navy", description: "Warm knit crewneck sweater", price: 42.99, image: "https://images.unsplash.com/photo-1534237710431-e2fc698436d0?w=400", category: "Men", sizes: ["S", "M", "L", "XL"], stock: 22 },

  // WOMEN (12 products)
  { name: "Women's Floral Dress", description: "Elegant summer dress", price: 59.99, image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400", category: "Women", sizes: ["S", "M", "L"], stock: 25 },
  { name: "Women's Hoodie Pink", description: "Cozy oversized hoodie", price: 34.99, image: "https://images.unsplash.com/photo-1543339308-bd9de74e8c1f?w=400", category: "Women", sizes: ["S", "M", "L", "XL"], stock: 35 },
  { name: "Women's Maxi Dress", description: "Flowing maxi dress", price: 69.99, image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400", category: "Women", sizes: ["S", "M", "L"], stock: 20 },
  { name: "Women's Crop Top", description: "Trendy crop top", price: 19.99, image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400", category: "Women", sizes: ["S", "M"], stock: 40 },
  { name: "Women's Jeans", description: "High-waisted jeans", price: 49.99, image: "https://images.unsplash.com/photo-1542852389-2957c807c9e9?w=400", category: "Women", sizes: ["S", "M", "L"], stock: 30 },
  { name: "Women's Blazer", description: "Professional blazer", price: 64.99, image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=400", category: "Women", sizes: ["S", "M", "L"], stock: 18 },
  { name: "Women's Sweater", description: "Soft knit sweater", price: 39.99, image: "https://images.unsplash.com/photo-1529139577554-6f5e9e91ff0f?w=400", category: "Women", sizes: ["S", "M", "L", "XL"], stock: 28 },
  { name: "Women's Skirt", description: "Midi skirt", price: 29.99, image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400", category: "Women", sizes: ["S", "M", "L"], stock: 22 },
  { name: "Women's Active Leggings", description: "High-rise workout leggings", price: 34.99, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400", category: "Women", sizes: ["S", "S", "M", "L"], stock: 40 },
  { name: "Women's Satin Blouse", description: "Chic satin blouse", price: 44.99, image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=400", category: "Women", sizes: ["S", "M", "L"], stock: 18 },
  { name: "Women's Trench Coat", description: "Classic beige trench coat", price: 89.99, image: "https://images.unsplash.com/photo-1520986606214-8b456906c813?w=400", category: "Women", sizes: ["S", "M", "L"], stock: 16 },
  { name: "Women's Lounge Set", description: "Two-piece loungewear set", price: 54.99, image: "https://images.unsplash.com/photo-1514996937319-344454492b37?w=400", category: "Women", sizes: ["S", "M", "L", "XL"], stock: 26 },

  // KIDS (10 products)
  { name: "Kids T-Shirt Dino", description: "Fun dinosaur t-shirt", price: 14.99, image: "https://images.unsplash.com/photo-1611100481087-2eb83c6dd97b?w=400", category: "Kids", sizes: ["S", "M", "L"], stock: 60 },
  { name: "Kids Hoodie Unicorn", description: "Magical unicorn hoodie", price: 24.99, image: "https://images.unsplash.com/photo-1578898786977-fd9a1dc7dcd8?w=400", category: "Kids", sizes: ["S", "M", "L"], stock: 45 },
  { name: "Kids Jeans", description: "Stretchy kids jeans", price: 29.99, image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400", category: "Kids", sizes: ["S", "M", "L"], stock: 35 },
  { name: "Kids Dress Princess", description: "Sparkly princess dress", price: 34.99, image: "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?w=400", category: "Kids", sizes: ["S", "M", "L"], stock: 30 },
  { name: "Kids Sweatshirt", description: "Cozy sweatshirt", price: 19.99, image: "https://images.unsplash.com/photo-1515886657613-9f3515b32c03?w=400", category: "Kids", sizes: ["S", "M", "L"], stock: 50 },
  { name: "Kids Jacket", description: "Waterproof jacket", price: 44.99, image: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=400", category: "Kids", sizes: ["S", "M"], stock: 25 },
  { name: "Kids Pajama Set", description: "Printed cotton pajama set", price: 24.99, image: "https://images.unsplash.com/photo-1516815231560-8f41ec531527?w=400", category: "Kids", sizes: ["S", "M", "L"], stock: 42 },
  { name: "Kids Shorts Pack", description: "Pack of 2 jersey shorts", price: 19.99, image: "https://images.unsplash.com/photo-1555561673-137b88b1214a?w=400", category: "Kids", sizes: ["S", "M", "L"], stock: 55 },
  { name: "Kids Raincoat Yellow", description: "Bright yellow raincoat", price: 39.99, image: "https://images.unsplash.com/photo-1498550744921-75f79806b8a7?w=400", category: "Kids", sizes: ["S", "M"], stock: 20 },
  { name: "Kids Sports Set", description: "2-piece sports t-shirt and shorts", price: 29.99, image: "https://images.unsplash.com/photo-1520026146204-3c1f84b2c1c5?w=400", category: "Kids", sizes: ["S", "M", "L"], stock: 38 },

  
];

const seedDB = async () => {
  try {
    await Product.deleteMany({});
    await Product.insertMany(products);
    console.log(`✅ ${products.length} Products seeded successfully!`);
    console.log(
      `📊 Categories: Men(${products.filter(p => p.category === 'Men').length}), ` +
      `Women(${products.filter(p => p.category === 'Women').length}), ` +
      `Kids(${products.filter(p => p.category === 'Kids').length}), ` 
    );
    process.exit(0);
  } catch (error) {
    console.error('❌ Seed failed:', error.message);
    process.exit(1);
  }
};

mongoose.connection.once('open', seedDB);
