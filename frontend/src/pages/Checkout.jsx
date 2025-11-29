import { useCart } from '../context/CartContext'
import CheckoutForm from '../components/CheckoutForm'  // ✅ Import from components
import { ShoppingCart, ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const Checkout = () => {
  const { cart } = useCart()
  const navigate = useNavigate()
  
  const subtotal = cart.items.reduce((total, item) => total + (item.product?.price * item.quantity), 0)
  const total = subtotal + 9.99

  if (cart.items.length === 0) {
    return (
      <div className="min-h-screen py-24 text-center">
        <ShoppingCart className="w-24 h-24 text-gray-300 mx-auto mb-8" />
        <h2 className="text-3xl font-bold mb-4">Cart is empty</h2>
        <button 
          onClick={() => navigate('/products')}
          className="bg-indigo-600 text-white px-8 py-4 rounded-2xl font-semibold hover:bg-indigo-700"
        >
          Shop Products
        </button>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-12 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <button
          onClick={() => navigate(-1)}
          className="mb-8 flex items-center text-indigo-600 hover:text-indigo-800 font-medium"
        >
          <ArrowLeft className="mr-2" size={20} />
          Back
        </button>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Checkout Form */}
          <CheckoutForm cartItems={cart.items} total={subtotal} />
          
          {/* Summary Sidebar */}
          <div className="lg:sticky top-24">
            <div className="bg-white p-8 rounded-3xl shadow-xl h-fit">
              <h3 className="text-2xl font-bold mb-6">Order Summary</h3>
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-lg">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg">
                  <span>Shipping</span>
                  <span>$9.99</span>
                </div>
                <hr />
                <div className="flex justify-between text-2xl font-bold text-gray-900">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout
