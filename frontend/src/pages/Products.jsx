// src/pages/Products.jsx - PROFESSIONAL ECOMMERCE VERSION
import { useState, useEffect, useCallback, useMemo } from 'react'
import { Search, Filter, X, ChevronDown, Grid, List, ShoppingCart, ArrowRight } from 'lucide-react'
import ProductList from '../components/ProductList'
import Filters from '../components/Filters'
import { useCart } from '../context/CartContext'
import { toast } from 'react-hot-toast'
import { Link } from 'react-router-dom'

const Products = () => {
  const [filters, setFilters] = useState({})
  const [showFilters, setShowFilters] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [productsCount, setProductsCount] = useState(0)
  const [viewMode, setViewMode] = useState('grid') // 'grid' | 'list'
  const { cart } = useCart()

  // Stable callbacks
  const updateFilters = useCallback((newFilters) => {
    console.log('🔍 Filters updated:', newFilters)
    setFilters((prevFilters) => {
      const nextFilters = { ...prevFilters, ...newFilters }
      Object.keys(nextFilters).forEach(key => {
        if (Array.isArray(nextFilters[key]) && nextFilters[key].length === 0) {
          delete nextFilters[key]
        }
      })
      return nextFilters
    })
  }, [])

  const removeFilter = useCallback((type, value) => {
    setFilters((prev) => {
      const newFilters = { ...prev }
      if (Array.isArray(newFilters[type])) {
        newFilters[type] = newFilters[type].filter(v => v !== value)
        if (newFilters[type].length === 0) delete newFilters[type]
      } else {
        delete newFilters[type]
      }
      return newFilters
    })
  }, [])

  const removeFilterType = useCallback((type) => {
    setFilters((prev) => {
      const newFilters = { ...prev }
      delete newFilters[type]
      return newFilters
    })
  }, [])

  const clearAllFilters = useCallback(() => {
    setFilters({})
    setSearchTerm('')
    toast.success('Filters cleared!')
  }, [])

  // Debounced search
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchTerm.trim()) {
        updateFilters({ search: searchTerm.trim() })
      } else {
        setFilters(prev => {
          const newFilters = { ...prev }
          delete newFilters.search
          return newFilters
        })
      }
    }, 300)
    return () => clearTimeout(timeoutId)
  }, [searchTerm, updateFilters])

  // Memoized values
  const totalCartItems = useMemo(() => 
    cart.items.reduce((sum, item) => sum + item.quantity, 0), [cart.items]
  )

  const activeFiltersCount = useMemo(() => 
    Object.keys(filters).reduce((count, key) => {
      const values = filters[key]
      return count + (Array.isArray(values) ? values.length : 1)
    }, 0), [filters]
  )

  const activeFilterBadges = useMemo(() => 
    Object.entries(filters).flatMap(([type, values]) =>
      Array.isArray(values) 
        ? values.map(value => (
            <button
              key={`${type}-${value}`}
              onClick={() => removeFilter(type, value)}
              className="group bg-gradient-to-r from-indigo-500/10 to-purple-500/10 backdrop-blur-sm text-indigo-800 border border-indigo-200/50 px-4 py-2.5 rounded-2xl text-sm font-semibold flex items-center space-x-2 shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-200 hover:bg-indigo-500/20"
            >
              <X size={16} className="group-hover:text-indigo-700 transition-colors" />
              <span>{value}</span>
            </button>
          ))
        : (
            <button
              key={type}
              onClick={() => removeFilterType(type)}
              className="group bg-gradient-to-r from-indigo-500/10 to-purple-500/10 backdrop-blur-sm text-indigo-800 border border-indigo-200/50 px-4 py-2.5 rounded-2xl text-sm font-semibold flex items-center space-x-2 shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-200 hover:bg-indigo-500/20"
            >
              <span className="capitalize">{type.replace(/([A-Z])/g, ' $1')}:</span>
              <span>{values}</span>
              <X size={16} className="group-hover:text-indigo-700 transition-colors" />
            </button>
          )
    ), [filters, removeFilter, removeFilterType]
  )

  return (
    <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-12">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Hero Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-3 bg-white/60 backdrop-blur-sm px-8 py-4 rounded-3xl shadow-xl mb-8">
            <div className="w-2 h-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full animate-pulse" />
            <h1 className="text-5xl lg:text-6xl font-black bg-gradient-to-r from-gray-900 via-indigo-900 to-purple-900 bg-clip-text text-transparent leading-tight">
              All Products
            </h1>
          </div>
          <p className="text-xl lg:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed font-medium">
            Discover our premium collection of <span className="font-black text-indigo-600">{productsCount}</span>{' '}
            high-quality products across <span className="font-semibold text-purple-600">20+</span> categories
          </p>
        </div>

        {/* Active Filters */}
        {Object.keys(filters).length > 0 && (
          <div className="mb-12">
            <div className="bg-white/70 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-white/50 sticky top-24 z-10">
              <div className="flex flex-wrap gap-4 items-center justify-center lg:justify-start">
                {activeFilterBadges}
                <button
                  onClick={clearAllFilters}
                  className="bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold text-sm px-8 py-3 rounded-3xl hover:from-red-600 hover:to-pink-600 shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-0.5 hover:scale-[1.02] border-0"
                >
                  Clear All ({activeFiltersCount})
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Controls Bar */}
        <div className="flex flex-col lg:flex-row gap-6 mb-12 items-stretch lg:items-center justify-between bg-white/70 backdrop-blur-sm p-8 rounded-3xl shadow-xl border border-white/50">
          {/* Search */}
          <div className="flex-1 max-w-2xl">
            <div className="relative group">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 w-6 h-6 group-focus-within:text-indigo-500 transition-colors" />
              <input
                type="text"
                placeholder="Search 1000+ products by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-16 pr-6 py-5 border-2 border-gray-200 rounded-3xl focus:ring-4 focus:ring-indigo-200/50 focus:border-indigo-500 transition-all duration-300 shadow-inner text-lg placeholder-gray-500 bg-white/50 backdrop-blur-sm hover:shadow-lg group-focus-within:shadow-xl"
              />
            </div>
          </div>

          {/* View Toggle + Sort */}
          <div className="flex items-center gap-6 self-center">
            {/* View Toggle */}
            <div className="flex items-center gap-2 p-2 bg-gray-100/50 rounded-2xl">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-xl transition-all ${viewMode === 'grid' ? 'bg-indigo-500 text-white shadow-lg' : 'text-gray-600 hover:bg-gray-200 hover:shadow-md'}`}
              >
                <Grid size={20} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-xl transition-all ${viewMode === 'list' ? 'bg-indigo-500 text-white shadow-lg' : 'text-gray-600 hover:bg-gray-200 hover:shadow-md'}`}
              >
                <List size={20} />
              </button>
            </div>

            {/* Sort */}
            <div className="flex items-center gap-3">
              <span className="text-sm font-semibold text-gray-700 hidden lg:block whitespace-nowrap">Sort by:</span>
              <div className="relative group">
                <select 
                  className="appearance-none bg-white/70 backdrop-blur-sm border-2 border-gray-200 rounded-2xl px-6 py-4 pr-10 focus:ring-4 focus:ring-indigo-200/50 focus:border-indigo-500 shadow-lg text-lg font-semibold cursor-pointer hover:shadow-xl transition-all duration-300"
                  onChange={(e) => updateFilters({ sort: e.target.value })}
                >
                  <option value="newest">Newest First</option>
                  <option value="price-low">Price: Low → High</option>
                  <option value="price-high">Price: High → Low</option>
                  <option value="name">Name A → Z</option>
                  <option value="rating">Best Rated</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:rotate-180 transition-transform duration-300 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Mobile Filter Button */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="lg:hidden flex items-center gap-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-5 rounded-3xl font-bold text-lg shadow-2xl hover:shadow-3xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 transform hover:-translate-y-1 border-0"
          >
            <Filter size={24} />
            <span>Filters</span>
            {activeFiltersCount > 0 && (
              <span className="bg-white/30 px-3 py-1 rounded-2xl text-xs font-bold backdrop-blur-sm">
                {activeFiltersCount}
              </span>
            )}
          </button>
        </div>

        {/* Main Layout - PERFECT RESPONSIVE */}
<div className="grid grid-cols-1 lg:grid-cols-[minmax(0,320px)_1fr] xl:grid-cols-[minmax(0,400px)_1fr] gap-6 lg:gap-12">
  {/* Filters Sidebar */}
  <div className={`${showFilters ? 'block lg:block' : 'hidden lg:block'} lg:w-80 xl:w-96 flex-shrink-0`}>
  {/* OUTER: handles sticky + scrolling */}
  <div className="sticky top-32 max-h-[70vh] overflow-y-auto">
    {/* INNER: just the card UI, NO overflow / max-h here */}
    <div className="bg-white/80 backdrop-blur-xl p-6 rounded-3xl shadow-2xl border border-white/50">
      <Filters 
        onFilterChange={updateFilters} 
        activeFilters={filters}
      />
    </div>
  </div>
</div>
  
  {/* Products Grid */}
  <div className="flex-1">
    <ProductList 
      filters={filters} 
      viewMode={viewMode}
      onProductsCountChange={setProductsCount}
    />
  </div>
</div>

      </div>

      {/* Cart Promotion Banner */}
      {totalCartItems > 0 && (
        <div className="mt-16 lg:mt-24">
          <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white p-8 lg:p-12 rounded-3xl shadow-3xl mx-4 lg:mx-auto max-w-6xl backdrop-blur-md border border-white/20">
            <div className="text-center">
              <h3 className="text-4xl lg:text-5xl font-black mb-6 drop-shadow-2xl animate-pulse">
                🛒 <span className="text-5xl lg:text-6xl">{totalCartItems}</span> Items in Cart!
              </h3>
              <p className="text-2xl lg:text-3xl mb-10 opacity-95 font-semibold leading-tight drop-shadow-lg">
                Your perfect selection is ready for checkout
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <Link
                  to="/cart"
                  className="group bg-white text-indigo-700 px-12 lg:px-16 py-6 lg:py-7 rounded-3xl font-black text-xl hover:bg-gray-50 shadow-3xl hover:shadow-4xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 border-0 flex items-center gap-3"
                >
                  View Cart ({totalCartItems})
                  <ShoppingCart size={24} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/checkout"
                  className="bg-transparent/20 backdrop-blur-sm border-2 border-white/50 text-white px-12 lg:px-16 py-6 lg:py-7 rounded-3xl font-black text-xl hover:bg-white/20 hover:border-white hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 flex items-center gap-3"
                >
                  Proceed to Checkout →
                  <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Products
