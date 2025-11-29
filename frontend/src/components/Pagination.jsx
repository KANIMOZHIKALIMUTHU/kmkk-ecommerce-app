import { ChevronLeft, ChevronRight } from 'lucide-react'

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const getVisiblePages = () => {
    const delta = 2
    const range = []
    const rangeWithDots = []
    const l = Math.max(delta + 1, currentPage - delta)
    const r = Math.min(totalPages - delta, currentPage + delta)
    
    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= l && i <= r)) {
        range.push(i)
      }
    }
    
    range.forEach((page, index) => {
      if (range[index - 1] + 1 < page) {
        rangeWithDots.push('...')
        rangeWithDots.push(page)
      } else {
        rangeWithDots.push(page)
      }
    })
    
    return rangeWithDots
  }

  return (
    <div className="flex items-center justify-center space-x-2">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="w-12 h-12 rounded-2xl bg-white border border-gray-200 shadow-lg hover:shadow-xl flex items-center justify-center text-gray-600 hover:text-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
      >
        <ChevronLeft size={20} />
      </button>

      {getVisiblePages().map((page, index) => (
        <button
          key={index}
          onClick={() => typeof page === 'number' && onPageChange(page)}
          disabled={page === '...'}
          className={`w-12 h-12 rounded-2xl font-semibold flex items-center justify-center transition-all ${
            page === currentPage
              ? 'bg-indigo-600 text-white shadow-xl'
              : page === '...'
              ? 'text-gray-400 cursor-default'
              : 'bg-white border border-gray-200 shadow-lg hover:shadow-xl text-gray-700 hover:text-indigo-600'
          }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="w-12 h-12 rounded-2xl bg-white border border-gray-200 shadow-lg hover:shadow-xl flex items-center justify-center text-gray-600 hover:text-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  )
}

export default Pagination
