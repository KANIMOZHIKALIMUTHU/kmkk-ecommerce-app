// src/pages/ProductDetail.jsx
import { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { Star, ShoppingCart, Heart, Minus, Plus, ArrowLeft } from 'lucide-react'
import { productsAPI } from '../services/api'
import { useCart } from '../context/CartContext'
import { toast } from 'react-hot-toast'

const ProductDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addItem } = useCart()

  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selectedSize, setSelectedSize] = useState('M')
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true)
        setError('')
        // IMPORTANT: implement productsAPI.getById on your API side
        const data = await productsAPI.getById(id)
        if (!data) {
          setError('Product not found')
        } else {
          setProduct(data)
        }
      } catch (e) {
        console.error(e)
        setError('Failed to load product')
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [id])

  const handleAddToCart = () => {
    if (!product) return
    addItem(product, selectedSize, quantity)
    toast.success(`Added ${product.name} (${selectedSize}) x${quantity} to cart`)
  }

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto py-12">
        <div className="animate-pulse grid lg:grid-cols-2 gap-10">
          <div className="h-96 bg-gray-200 rounded-3xl" />
          <div className="space-y-4">
            <div className="h-8 bg-gray-200 rounded-xl w-3/4" />
            <div className="h-6 bg-gray-200 rounded-xl w-1/3" />
            <div className="h-40 bg-gray-200 rounded-2xl" />
            <div className="h-12 bg-gray-200 rounded-2xl w-1/2" />
          </div>
        </div>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="max-w-4xl mx-auto py-16 text-center">
        <p className="text-xl text-red-500 mb-4">{error || 'Product not found'}</p>
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700"
        >
          <ArrowLeft size={18} />
          Back
        </button>
      </div>
    )
  }

  const sizes = product.sizes && product.sizes.length ? product.sizes : ['S', 'M', 'L', 'XL']

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-6xl mx-auto px-4">
        {/* Back + breadcrumb */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-medium"
          >
            <ArrowLeft size={18} />
            Back
          </button>
          <Link
            to="/products"
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            All products
          </Link>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 items-start">
          {/* Image */}
          <div className="bg-white rounded-3xl shadow-xl p-6">
            <img
              src={product.image || 'https://via.placeholder.com/600x700?text=No+Image'}
              alt={product.name}
              className="w-full h-[420px] lg:h-[480px] object-cover rounded-2xl"
            />
          </div>

          {/* Info */}
          <div className="bg-white rounded-3xl shadow-xl p-6 lg:p-8">
            {/* Rating */}
            <div className="flex items-center gap-2 mb-3">
              <div className="flex text-yellow-400">
                {Array(5)
                  .fill()
                  .map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
              </div>
              <span className="text-sm text-gray-500">
                {product.rating || 4.8} • {product.reviews || 120} reviews
              </span>
            </div>

            {/* Name + category */}
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
              {product.name}
            </h1>
            <p className="text-sm text-indigo-600 font-medium uppercase mb-4">
              {product.category || 'Category'}
            </p>

            {/* Price */}
            <div className="flex items-end gap-3 mb-6">
              <span className="text-3xl font-bold text-indigo-600">
                ${product.price}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-gray-400 line-through">
                  ${product.originalPrice}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-gray-600 text-sm lg:text-base mb-6 leading-relaxed">
              {product.description || 'No description available for this product.'}
            </p>

            {/* Size */}
            <div className="mb-6">
              <p className="text-sm font-semibold text-gray-700 mb-2">Size</p>
              <div className="flex flex-wrap gap-2">
                {sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium border ${
                      selectedSize === size
                        ? 'bg-indigo-600 text-white border-indigo-600'
                        : 'bg-gray-50 text-gray-800 border-gray-200 hover:bg-gray-100'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-6">
              <p className="text-sm font-semibold text-gray-700 mb-2">Quantity</p>
              <div className="inline-flex items-center bg-gray-100 rounded-2xl px-2 py-1">
                <button
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="p-2 rounded-xl hover:bg-gray-200"
                >
                  <Minus size={18} />
                </button>
                <span className="px-4 text-lg font-semibold">{quantity}</span>
                <button
                  onClick={() => setQuantity(q => q + 1)}
                  className="p-2 rounded-xl hover:bg-gray-200"
                >
                  <Plus size={18} />
                </button>
              </div>
            </div>

            {/* Buttons */}
            <div className="space-y-3">
              <button
                onClick={handleAddToCart}
                className="w-full inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-2xl font-semibold text-sm"
              >
                <ShoppingCart size={20} />
                Add to Cart
              </button>
              <button
                type="button"
                className="w-full inline-flex items-center justify-center gap-2 bg-gray-900 hover:bg-gray-800 text-white py-3 rounded-2xl font-semibold text-sm"
              >
                <Heart size={20} />
                Add to Wishlist
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
