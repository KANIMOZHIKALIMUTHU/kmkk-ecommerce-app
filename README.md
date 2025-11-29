# E-Commerce Store
Full-stack e-commerce application with modern React frontend, Node.js/Express backend, and MongoDB database. Features product catalog, filtering, pagination, and responsive design.

## Features
Product Catalog - 34 products across Men, Women, Kids categories

Advanced Filtering - Category, size, price range, search

Server-side Pagination - 12 products per page with 5 total pages

Responsive Design - Mobile-first with Tailwind CSS

Fast Loading - Optimized images from Unsplash + lean queries

Production Ready - Error handling, loading states, empty states

## Tech Stack
Frontend	Backend	Database
React 18	Node.js	MongoDB
Tailwind CSS	Express.js	Mongoose
		
## Repository Structure

ECommerce App/
├── frontend/                 # React + Tailwind
│   ├── src/
│   │   ├── components/       # ProductList, ProductCard, Pagination, Filters
│   │   ├── services/api.js   # API client
│   │   └── App.jsx
│   ├── package.json
│   └── vite.config.js
├── backend/                  # Node.js + Express
│   ├── models/Product.js     # Mongoose schema
│   ├── controllers/productController.js
│   ├── routes/productroutes.js
│   ├── seedProducts.js       # Database seeder
│   └── server.js
└── README.md

## Quick Start
### Prerequisites
Node.js 18+
MongoDB (local or MongoDB Atlas)

1. Clone & Install

git clone (https://github.com/KANIMOZHIKALIMUTHU/kmkk-ecommerce-app)
cd "ECommerce App"

2. Backend Setup
bash
cd backend
# Update .env with MONGO_URI
yarn install
yarn seed          # Run: node seedProducts.js
yarn dev           # Start: http://localhost:5000

3. Frontend Setup
bash
cd ../frontend
yarn install
yarn dev           # Start: http://localhost:5173

4. Access Store
Open http://localhost:5173/products

## API Endpoints
Endpoint	Method	Description
/api/products	GET	Get products with pagination & filters
/api/products/:id	GET	Get single product

## Query Params:
?page=1&limit=12&category=Women&size=M&minPrice=20&maxPrice=50&search=hoodie

## Response:

json
{
  "products": [...],
  "pagination": {
    "page": 1,
    "pages": 5,
    "total": 34
  }
}
## Database Schema
javascript

## Product Schema:
- name: String (required)
- description: String
- price: Number
- image: String (Unsplash URL)
- category: ["Men", "Women", "Kids"] (enum)
- sizes: ["S", "M", "L", "XL"] (enum array)
- stock: Number

## Frontend Features
ProductList - Paginated grid with filters

ProductCard - Product preview cards

Pagination - Page navigation

Filters - Sidebar with category/size/price

Loading States - Skeleton loaders

Error Handling - Retry buttons

## Seeding Database

cd backend
node seedProducts.js
Output:

text
✅ 34 Products seeded!
📊 Men: 12, Women: 12, Kids: 10
🧪 Testing Filters
Filter	Expected Results
All	34 products
Men	12 products
Women	12 products
Kids	10 products
Size: M	~25 products
Price: $20-50	22 products

## Deployment
1. Backend (Render/Heroku)
Push to GitHub

Connect to Render

Add MONGO_URI env var

Run seed script in console

2. Frontend (Vercel/Netlify)
yarn build

Deploy dist/ folder

Set API base URL