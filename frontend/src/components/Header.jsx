// src/components/Header.jsx
import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { ShoppingCart, User, Menu, X } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { user, logout } = useAuth()
  const { cart } = useCart()
  const navigate = useNavigate()
  const location = useLocation()

  const cartItemCount =
    cart?.items?.reduce((total, item) => total + item.quantity, 0) || 0

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => navigate('/')}
            className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent cursor-pointer"
          >
            ClothingStore
          </button>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`hover:text-indigo-600 font-medium ${
                location.pathname === '/' &&
                'text-indigo-600 border-b-2 border-indigo-600 pb-1'
              }`}
            >
              Home
            </Link>
            <Link
              to="/products"
              className={`hover:text-indigo-600 font-medium ${
                location.pathname.startsWith('/products') &&
                'text-indigo-600 border-b-2 border-indigo-600 pb-1'
              }`}
            >
              Products
            </Link>
            <Link
              to="/cart"
              className="hover:text-indigo-600 font-medium flex items-center space-x-1 relative"
            >
              <ShoppingCart size={20} />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
              <span>Cart</span>
            </Link>
          </div>

          {/* Right side: auth + mobile menu */}
          <div className="flex items-center space-x-4">
            {user ? (
              // Logged-in state
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2 px-3 py-1.5 rounded-2xl bg-gray-50 border border-gray-200">
                  <User size={16} className="text-gray-500" />
                  <span className="text-sm text-gray-500">Hi,</span>
                  <span className="text-sm font-semibold text-gray-900">
                    {user.name || user.username || user.email}
                  </span>
                </div>
                <button
                  onClick={logout}
                  className="text-sm font-medium text-red-600 hover:text-red-700 hover:underline"
                >
                  Logout
                </button>
              </div>
            ) : (
              // Logged-out state
              <>
                <Link
                  to="/login"
                  className="text-sm font-medium text-gray-700 hover:text-indigo-600 flex items-center space-x-1"
                >
                  <User size={18} />
                  <span>Login</span>
                </Link>
                <Link
                  to="/register"
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-indigo-700"
                >
                  Sign Up
                </Link>
              </>
            )}

            {/* Mobile menu toggle */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-gray-100"
              onClick={() => setMobileMenuOpen(prev => !prev)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t">
            <Link
              to="/"
              className="block py-2 hover:text-indigo-600"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/products"
              className="block py-2 hover:text-indigo-600"
              onClick={() => setMobileMenuOpen(false)}
            >
              Products
            </Link>
            <Link
              to="/cart"
              className="block py-2 hover:text-indigo-600"
              onClick={() => setMobileMenuOpen(false)}
            >
              Cart ({cartItemCount})
            </Link>

            <div className="mt-3 border-t pt-3">
              {user ? (
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-500">Hi,</span>
                    <span className="text-sm font-semibold text-gray-900">
                      {user.name || user.username || user.email}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      logout()
                      setMobileMenuOpen(false)
                    }}
                    className="text-sm font-medium text-red-600 hover:text-red-700"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex gap-3 mt-2">
                  <Link
                    to="/login"
                    className="flex-1 text-center text-sm font-medium text-gray-700 hover:text-indigo-600 border rounded-lg py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="flex-1 text-center bg-indigo-600 text-white text-sm font-semibold rounded-lg py-2 hover:bg-indigo-700"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}

export default Header
