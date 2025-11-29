import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import { productsAPI } from '../services/api'

const Filters = ({ onFilterChange, activeFilters = {} }) => {
  const [categories, setCategories] = useState([])
  const [sizes] = useState(['S', 'M', 'L', 'XL'])
  const [priceRange, setPriceRange] = useState({ min: '', max: '' })

  // ✅ SYNC local state with parent filters
  useEffect(() => {
    if (activeFilters.minPrice !== undefined) {
      setPriceRange(prev => ({ 
        ...prev, 
        min: activeFilters.minPrice || '' 
      }))
    }
    if (activeFilters.maxPrice !== undefined) {
      setPriceRange(prev => ({ 
        ...prev, 
        max: activeFilters.maxPrice || '' 
      }))
    }
  }, [activeFilters.minPrice, activeFilters.maxPrice])

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      const response = await productsAPI.getAll({ limit: 0 })
      const uniqueCategories = [...new Set(response.products?.map(p => p.category) || [])]
      setCategories(uniqueCategories)
    } catch (error) {
      console.error('Failed to fetch categories:', error)
      // ✅ Fallback categories
      setCategories(['Electronics', 'Clothing', 'Books', 'Home'])
    }
  }

  const toggleFilter = (type, value) => {
    const currentFilters = activeFilters[type] || []
    let newFilters

    if (currentFilters.includes(value)) {
      // Remove filter
      newFilters = currentFilters.filter(v => v !== value)
    } else {
      // Add filter
      newFilters = [...currentFilters, value]
    }

    // Notify parent
    const updatedFilters = { ...activeFilters }
    if (newFilters.length === 0) {
      delete updatedFilters[type]
    } else {
      updatedFilters[type] = newFilters
    }
    
    onFilterChange(updatedFilters)
  }

  const updatePriceRange = (type, value) => {
    const newPriceRange = { ...priceRange, [type]: value || '' }
    setPriceRange(newPriceRange)
    
    const updatedFilters = { ...activeFilters }
    if (newPriceRange.min || newPriceRange.max) {
      updatedFilters.minPrice = newPriceRange.min || undefined
      updatedFilters.maxPrice = newPriceRange.max || undefined
    } else {
      delete updatedFilters.minPrice
      delete updatedFilters.maxPrice
    }
    
    onFilterChange(updatedFilters)
  }

  const clearAllFilters = () => {
    onFilterChange({})
    setPriceRange({ min: '', max: '' })
  }

  return (
    <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100 sticky top-24 max-h-[calc(100vh-6rem)] overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-100">
        <h3 className="text-2xl font-bold text-gray-900">Filters</h3>
        {Object.keys(activeFilters).length > 0 && (
          <button 
            onClick={clearAllFilters}
            className="flex items-center space-x-2 text-indigo-600 hover:text-indigo-800 font-semibold text-sm bg-indigo-50 px-4 py-2 rounded-xl hover:bg-indigo-100 transition-all duration-200"
          >
            <X size={18} />
            <span>Clear All</span>
          </button>
        )}
      </div>

      {/* Active Filters Preview (DUPLICATE - Products.jsx handles this) */}
      {/* Active filters are shown in Products.jsx header */}

      {/* Categories */}
      <div className="mb-10">
        <h4 className="text-lg font-semibold text-gray-900 mb-6">Categories</h4>
        <div className="space-y-3 max-h-48 overflow-y-auto">
          {categories.map(category => (
            <label key={category} className="flex items-center space-x-3 cursor-pointer p-3 rounded-2xl hover:bg-indigo-50 transition-all group">
              <input
                type="checkbox"
                className="w-5 h-5 text-indigo-600 border-2 border-gray-300 rounded focus:ring-indigo-500 focus:ring-2 transition-all"
                checked={(activeFilters.category || []).includes(category)}
                onChange={() => toggleFilter('category', category)}
              />
              <span className="text-sm font-medium text-gray-900 group-hover:text-indigo-700">
                {category}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Sizes */}
      <div className="mb-10">
        <h4 className="text-lg font-semibold text-gray-900 mb-6">Sizes</h4>
        <div className="grid grid-cols-2 gap-3">
          {sizes.map(size => (
            <label key={size} className="flex items-center space-x-3 cursor-pointer p-3 rounded-2xl hover:bg-indigo-50 transition-all group">
              <input
                type="checkbox"
                className="w-5 h-5 text-indigo-600 border-2 border-gray-300 rounded focus:ring-indigo-500 focus:ring-2 transition-all"
                checked={(activeFilters.size || []).includes(size)}
                onChange={() => toggleFilter('size', size)}
              />
              <span className="text-sm font-bold text-gray-900 group-hover:text-indigo-700">
                {size}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="mb-8">
        <h4 className="text-lg font-semibold text-gray-900 mb-6">Price Range</h4>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Min Price</label>
            <input
              type="number"
              min="0"
              max="1000"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-indigo-200 focus:border-indigo-500 transition-all duration-300 shadow-sm"
              value={priceRange.min}
              onChange={(e) => updatePriceRange('min', e.target.value)}
              placeholder="0"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Max Price</label>
            <input
              type="number"
              min="0"
              max="2000"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-indigo-200 focus:border-indigo-500 transition-all duration-300 shadow-sm"
              value={priceRange.max}
              onChange={(e) => updatePriceRange('max', e.target.value)}
              placeholder="2000"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Filters
