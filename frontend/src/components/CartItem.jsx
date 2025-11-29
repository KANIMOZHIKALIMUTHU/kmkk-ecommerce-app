import { Trash2, Minus, Plus } from 'lucide-react'

const CartItem = ({ item, onUpdate, onRemove }) => {
  const handleQuantityChange = (newQuantity) => {
    if (newQuantity > 0) {
      onUpdate(item.product._id, item.size, newQuantity)
    }
  }

  return (
    <div className="p-6 border-b last:border-b-0 hover:bg-gray-50 transition-colors">
      <div className="flex items-start space-x-6">
        <div className="flex-shrink-0">
          <img 
            src={item.product.image}
            alt={item.product.name}
            className="w-24 h-24 object-cover rounded-xl shadow-md"
          />
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-lg mb-1 line-clamp-1">{item.product.name}</h3>
          <p className="text-indigo-600 font-semibold text-xl mb-3">${item.product.price}</p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="text-sm font-medium text-gray-700">Size: <span className="font-bold text-gray-900">{item.size}</span></span>
              <span className="text-sm font-medium text-gray-700">Qty: {item.quantity}</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <div className="flex items-center border border-gray-200 rounded-xl p-1">
                <button
                  onClick={() => handleQuantityChange(item.quantity - 1)}
                  className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-lg text-gray-600 hover:text-gray-900"
                >
                  <Minus size={16} />
                </button>
                <span className="w-12 text-center text-lg font-bold px-3">{item.quantity}</span>
                <button
                  onClick={() => handleQuantityChange(item.quantity + 1)}
                  className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-lg text-gray-600 hover:text-gray-900"
                >
                  <Plus size={16} />
                </button>
              </div>
              
              <button
                onClick={() => onRemove(item.product._id, item.size)}
                className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-xl transition-all"
              >
                <Trash2 size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartItem
