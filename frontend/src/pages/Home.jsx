/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { productsAPI } from '../services/api'
import ProductCard from '../components/ProductCard'

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchFeaturedProducts()
  }, [])

  const fetchFeaturedProducts = async () => {
    try {
      const response = await productsAPI.getAll({ limit: 8, category: 'Men' })
      setFeaturedProducts(response.products)
    } catch (error) {
      console.error('Failed to fetch featured products')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative h-[500px] md:h-[600px] bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 overflow-hidden rounded-3xl">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10 container mx-auto h-full flex items-center px-4">
          <div className="max-w-lg text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Premium Clothing
              <span className="block bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                For Everyone
              </span>
            </h1>
            <p className="text-xl mb-8 opacity-90">
              Discover the latest trends in fashion. Quality you can trust, style you love.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="/products" 
                className="bg-white text-indigo-600 px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-indigo-50 transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:-translate-y-1"
              >
                Shop Now
              </a>
              <a href="/products" className="border-2 border-white text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-white hover:text-indigo-600 transition-all duration-300">
                View Collection
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section>
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-4">
            Featured Products
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Handpicked collection of our best-selling items
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array(8).fill().map((_, i) => (
              <div key={i} className="animate-pulse bg-white rounded-xl p-6 h-80" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* Categories */}
      <section className="py-20 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-3xl">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Shop by Category</h2>
            <p className="text-xl text-gray-600">Find exactly what you're looking for</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { category: 'Men', color: 'from-blue-500 to-indigo-600', img: '👔' },
              { category: 'Women', color: 'from-pink-500 to-rose-600', img: '👗' },
              { category: 'Kids', color: 'from-emerald-500 to-teal-600', img: '👶' }
            ].map(({ category, color, img }) => (
              <a 
                key={category}
                href={`/products?category=${category.toLowerCase()}`}
                className="group relative bg-gradient-to-br bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 h-64 flex items-center justify-center"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-10 rounded-3xl transition-opacity duration-500`} />
                <div className="relative z-10 text-center">
                  <div className="text-6xl mb-6">{img}</div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-2">{category}</h3>
                  <p className="text-gray-600 group-hover:text-indigo-600 transition-colors">Shop Collection</p>
                  <ArrowRight className="w-6 h-6 mx-auto mt-4 text-indigo-600 group-hover:translate-x-2 transition-transform" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
