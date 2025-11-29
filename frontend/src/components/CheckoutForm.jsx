import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
// eslint-disable-next-line no-unused-vars
import { CreditCard, Mail, MapPin, Phone, User, Lock, ChevronDown } from 'lucide-react'
import { useCart } from '../context/CartContext'

const CheckoutForm = ({ cartItems, total }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    country: 'United States',
    cardNumber: '',
    expiry: '',
    cvv: ''
  })
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { clearCart } = useCart()

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false)
      clearCart()
      navigate('/success')
    }, 2000)
  }

  return (
    <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 max-w-2xl mx-auto">
      <div className="text-center mb-12">
        <div className="w-20 h-20 bg-indigo-100 rounded-3xl flex items-center justify-center mx-auto mb-6">
          <CreditCard className="w-10 h-10 text-indigo-600" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Checkout</h2>
        <div className="flex justify-center text-sm text-gray-500">
          <span>Step {step} of 2</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {step === 1 && (
          <>
            {/* Personal Info */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center">
                  <User className="w-4 h-4 mr-2" />
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-4 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-indigo-200 focus:border-indigo-500 transition-all"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center">
                  <Mail className="w-4 h-4 mr-2" />
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-4 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-indigo-200 focus:border-indigo-500 transition-all"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center">
                <MapPin className="w-4 h-4 mr-2" />
                Address
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-4 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-indigo-200 focus:border-indigo-500 transition-all"
                placeholder="123 Main St"
              />
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-4 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-indigo-200"
                  placeholder="New York"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">ZIP Code</label>
                <input
                  type="text"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-4 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-indigo-200"
                  placeholder="10001"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center">
                  <Phone className="w-4 h-4 mr-2" />
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-4 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-indigo-200"
                  placeholder="+1 (555) 123-4567"
                />
              </div>
            </div>

            <div className="flex justify-between pt-6">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-8 py-4 border border-gray-200 text-gray-700 rounded-2xl hover:bg-gray-50 transition-all font-medium"
              >
                Back to Cart
              </button>
              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-8 py-4 bg-indigo-600 text-white rounded-2xl hover:bg-indigo-700 transition-all font-semibold shadow-lg hover:shadow-xl"
              >
                Continue to Payment
              </button>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            {/* Payment Info */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-6 flex items-center">
                <Lock className="w-4 h-4 mr-2" />
                Payment Information
              </label>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm text-gray-600 mb-3">Card Number</label>
                  <input
                    type="text"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    placeholder="1234 5678 9012 3456"
                    maxLength="19"
                    className="w-full px-4 py-4 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-indigo-200 text-lg tracking-wider"
                  />
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm text-gray-600 mb-3">Expiry Date</label>
                    <input
                      type="text"
                      name="expiry"
                      value={formData.expiry}
                      onChange={handleInputChange}
                      placeholder="MM/YY"
                      maxLength="5"
                      className="w-full px-4 py-4 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-indigo-200"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-3">CVV</label>
                    <input
                      type="text"
                      name="cvv"
                      value={formData.cvv}
                      onChange={handleInputChange}
                      placeholder="123"
                      maxLength="4"
                      className="w-full px-4 py-4 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-indigo-200"
                    />
                  </div>
                  <div className="md:col-span-1 flex items-end">
                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      className="w-full px-4 py-4 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-indigo-200"
                    >
                      <option>United States</option>
                      <option>Canada</option>
                      <option>United Kingdom</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="bg-gray-50 p-6 rounded-2xl">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                Order Summary
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Subtotal ({cartItems.reduce((acc, item) => acc + item.quantity, 0)} items):</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Shipping:</span>
                  <span>$9.99</span>
                </div>
                <hr className="my-3" />
                <div className="flex justify-between text-xl font-bold">
                  <span>Total:</span>
                  <span>${(total + 9.99).toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="flex justify-between pt-6">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-8 py-4 border border-gray-200 text-gray-700 rounded-2xl hover:bg-gray-50 transition-all font-medium"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-12 py-4 bg-green-600 text-white rounded-2xl hover:bg-green-700 transition-all font-semibold shadow-xl hover:shadow-2xl flex items-center space-x-3 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <CreditCard className="w-5 h-5" />
                    <span>Pay Now</span>
                  </>
                )}
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  )
}

export default CheckoutForm
