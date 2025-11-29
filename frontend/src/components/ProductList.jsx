import { useState, useEffect, useCallback } from 'react'
import { Loader2 } from 'lucide-react'
import { productsAPI } from '../services/api'
import ProductCard from './ProductCard'
import Pagination from './Pagination'

const ProductList = ({ filters, onProductsCountChange }) => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [pagination, setPagination] = useState({ page: 1, total: 0, limit: 12 })
  const [totalPages, setTotalPages] = useState(1)

  // Reset to page 1 when filters change
  useEffect(() => {
    setPagination(prev => ({ ...prev, page: 1 }))
  }, [filters])

  const fetchProducts = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const params = {
        ...filters,
        page: pagination.page,
        limit: pagination.limit,
      }
      
      console.log('🔍 Fetching with params:', params)
      const response = await productsAPI.getAll(params)
      
      // ✅ Matches your backend format perfectly
      const productsData = response.products || []
      const backendPagination = response.pagination || {}
      const total = backendPagination.total || productsData.length || 0

      setProducts(productsData)
      setTotalPages(backendPagination.pages || Math.ceil(total / pagination.limit))
      setPagination(prev => ({ ...prev, total }))

      if (onProductsCountChange) {
        onProductsCountChange(total)
      }
    } catch (error) {
      console.error('❌ Failed to fetch products:', error)
      setError('Failed to load products. Please try again.')
      setProducts([])
      setPagination(prev => ({ ...prev, total: 0 }))
      if (onProductsCountChange) {
        onProductsCountChange(0)
      }
    } finally {
      setLoading(false)
    }
  }, [filters, pagination.page, pagination.limit, onProductsCountChange]) // ✅ Fixed: removed totalPages

  // ✅ Fixed: useEffect deps now correct
  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array(12).fill().map((_, i) => (
          <div key={i} className="animate-pulse bg-white rounded-3xl p-6 shadow-xl border" />
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-24">
        <div className="w-24 h-24 bg-red-100 rounded-3xl flex items-center justify-center mx-auto mb-8">
          <Loader2 className="w-12 h-12 text-red-500 animate-spin" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-4">{error}</h3>
        <button
          onClick={fetchProducts}
          className="bg-indigo-600 text-white px-8 py-4 rounded-2xl font-semibold hover:bg-indigo-700 transition-all shadow-xl hover:shadow-2xl"
        >
          Try Again
        </button>
      </div>
    )
  }

  return (
    <div>
      {products.length === 0 ? (
        <div className="text-center py-24">
          <Loader2 className="w-16 h-16 animate-spin text-gray-400 mx-auto mb-8" />
          <h3 className="text-3xl font-bold text-gray-900 mb-4">No products found</h3>
          <p className="text-xl text-gray-600 mb-8 max-w-md mx-auto">
            Try adjusting your search or filter options to find what you're looking for.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={fetchProducts}
              className="bg-indigo-600 text-white px-8 py-3 rounded-2xl font-semibold hover:bg-indigo-700 transition-all shadow-xl hover:shadow-2xl"
            >
              Clear Filters
            </button>
            <a href="/products" className="bg-gray-100 text-gray-900 px-8 py-3 rounded-2xl font-semibold hover:bg-gray-200 transition-all shadow-lg">
              Browse All
            </a>
          </div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map(product => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-center mt-12">
              <Pagination
                currentPage={pagination.page}
                totalPages={totalPages}
                onPageChange={page => setPagination(prev => ({ ...prev, page }))}
              />
            </div>
          )}

          <div className="text-center mt-12 text-sm text-gray-500">
            Showing {((pagination.page - 1) * pagination.limit) + 1} to{' '}
            {Math.min(pagination.page * pagination.limit, pagination.total)} of{' '}
            {pagination.total} results
          </div>
        </>
      )}
    </div>
  )
}

export default ProductList
