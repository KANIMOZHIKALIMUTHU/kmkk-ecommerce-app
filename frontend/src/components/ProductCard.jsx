import { Heart, ShoppingCart, Star, ArrowRight } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { toast } from 'react-hot-toast'

const ProductCard = ({ product }) => {
  const [selectedSize, setSelectedSize] = useState('M')
  const [loading, setLoading] = useState(false)
  const { addItem } = useCart()

  const handleAddToCart = () => {
    setLoading(true)
    addItem(product, selectedSize, 1)
    toast.success(`Added ${product.name} (${selectedSize}) to cart`)
    setLoading(false)
  }

  const id = product._id || product.id

  return (
    <div className="group bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col h-full">
      <Link to={`/products/${id}`} className="block h-56 p-4 flex-shrink-0 relative">
        <img
          src={product.image || 'https://via.placeholder.com/300x400?text=No+Image'}
          alt={product.name}
          className="w-full h-full object-cover rounded-2xl group-hover:scale-105 transition-transform duration-300"
        />
        <button className="absolute top-3 right-3 p-2 bg-white/90 hover:bg-white rounded-2xl shadow-lg opacity-0 group-hover:opacity-100 transition-all">
          <Heart className="w-5 h-5 text-gray-600" />
        </button>
      </Link>
      <div className="flex flex-col flex-1 p-6 justify-between">
        <div className="space-y-2">
          <div className="flex items-center">
            <div className="flex text-yellow-400">
              {Array(5).fill().map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
            </div>
            <span className="text-xs text-gray-500 ml-1">(4.8)</span>
          </div>
          <Link to={`/products/${id}`}>
            <h3 className="font-semibold text-lg line-clamp-2 leading-tight hover:text-indigo-600 transition-colors">{product.name}</h3>
          </Link>
          <p className="text-xs text-indigo-600 font-medium uppercase">{product.category}</p>
        </div>
        <p className="text-xl font-bold text-indigo-600 mb-3">${product.price}</p>
        <div className="mb-4">
          <p className="text-xs font-semibold text-gray-600 mb-2">Size</p>
          <div className="flex space-x-1">
            {['S', 'M', 'L', 'XL'].map(size => (
              <button
                key={size}
                onClick={e => {
                  e.preventDefault()
                  e.stopPropagation()
                  setSelectedSize(size)
                }}
                className={`flex-1 px-3 py-1.5 rounded-full text-xs font-medium border ${
                  selectedSize === size
                    ? 'bg-indigo-600 text-white border-indigo-600'
                    : 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
        <div className="space-y-2">
          <button
            onClick={e => {
              e.preventDefault()
              e.stopPropagation()
              handleAddToCart()
            }}
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-3 rounded-2xl text-sm font-semibold flex items-center justify-center space-x-2 hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
            ) : (
              <ShoppingCart size={18} />
            )}
            <span>{loading ? 'Adding...' : 'Add to Cart'}</span>
          </button>
          <Link
            to={`/products/${id}`}
            className="w-full flex items-center justify-center text-xs text-gray-500 hover:text-indigo-600 font-medium space-x-1"
          >
            <span>View details</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
