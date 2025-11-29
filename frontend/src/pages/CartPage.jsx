// src/pages/CartPage.jsx
import { Trash2, Minus, Plus, CreditCard } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useState } from 'react'
import { toast } from 'react-hot-toast'

const CartPage = () => {
  const { cart, updateItem, removeItem, getTotal, clearCart } = useCart()
  console.log('CART ITEMS IN PAGE', cart.items)
  const [promoCode, setPromoCode] = useState('')
  const items = cart.items || []
  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0)

  const handleQty = (id, size, qty) => {
    if (qty < 1) {
      removeItem(id, size)
      toast.success('Item removed')
    } else {
      updateItem(id, size, qty)
    }
  }

  if (totalItems === 0) {
    return (
      <div className="max-w-5xl mx-auto py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
        <p className="text-gray-600 mb-8">Add some products to see them here.</p>
        <Link
          to="/products"
          className="inline-block bg-indigo-600 text-white px-8 py-3 rounded-2xl font-semibold hover:bg-indigo-700"
        >
          Browse products
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Shopping Cart ({totalItems})</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map(item => {
            const id = item.product._id || item.product.id
            return (
              <div
                key={`${id}-${item.size}`}
                className="bg-white rounded-2xl shadow p-4 flex gap-4 items-center"
              >
                <img
                  src={item.product.image || 'https://via.placeholder.com/120'}
                  alt={item.product.name}
                  className="w-20 h-20 rounded-xl object-cover"
                />
                <div className="flex-1">
                  <p className="font-semibold">{item.product.name}</p>
                  <p className="text-sm text-gray-500">
                    Size: <span className="font-medium">{item.size}</span>
                  </p>
                  <p className="text-indigo-600 font-bold mt-1">
                    ${item.product.price}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleQty(id, item.size, item.quantity - 1)}
                    className="p-1.5 rounded-full border hover:bg-gray-100"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="w-8 text-center font-semibold">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => handleQty(id, item.size, item.quantity + 1)}
                    className="p-1.5 rounded-full border hover:bg-gray-100"
                  >
                    <Plus size={16} />
                  </button>
                </div>
                <button
                  onClick={() => handleQty(id, item.size, 0)}
                  className="p-2 rounded-full bg-red-50 text-red-600 hover:bg-red-100 ml-2"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            )
          })}
        </div>

        {/* Summary */}
        <div className="bg-white rounded-2xl shadow p-6 h-fit">
          <h2 className="text-xl font-semibold mb-4">Order summary</h2>
          <div className="flex justify-between mb-2 text-sm">
            <span>Items ({totalItems})</span>
            <span>${getTotal().toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-4 text-sm text-gray-500">
            <span>Shipping</span>
            <span>Free</span>
          </div>
          <div className="flex justify-between font-bold text-lg mb-4">
            <span>Total</span>
            <span>${getTotal().toFixed(2)}</span>
          </div>

          <input
            value={promoCode}
            onChange={e => setPromoCode(e.target.value)}
            placeholder="Promo code"
            className="w-full border rounded-xl px-3 py-2 mb-3 text-sm"
          />

          <Link
            to="/checkout"
            className="block w-full text-center bg-indigo-600 text-white py-2.5 rounded-xl font-semibold mb-2"
          >
            <CreditCard className="inline mr-2" size={18} />
            Checkout
          </Link>

          <button
            onClick={clearCart}
            className="w-full text-sm text-gray-500 hover:text-red-500 mt-2"
          >
            Clear cart
          </button>
        </div>
      </div>
    </div>
  )
}

export default CartPage
