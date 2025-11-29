// src/context/AuthContext.jsx 
import { createContext, useContext, useState, useEffect } from 'react'
import { authAPI } from '../services/api'
import { toast } from 'react-hot-toast'

const AuthContext = createContext(null)

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // LOGIN
  const login = async (email, password) => {
    try {
      const res = await authAPI.login({ email, password })
      // res IS the object you logged: { _id, name, email, token }
      console.log('LOGIN RESPONSE RAW:', res)

      const token = res.token
      const userData = {
        _id: res._id,
        name: res.name,
        email: res.email,
      }

      setUser(userData)
      if (token) {
        localStorage.setItem('token', token)
      }
      localStorage.setItem('user', JSON.stringify(userData))

      toast.success('Login successful!')
      return { success: true }
    } catch (error) {
      console.error('LOGIN ERROR:', error)
      toast.error(error?.response?.data?.message || 'Login failed')
      throw error
    }
  }

  // REGISTER
  const register = async (userData) => {
    try {
      await authAPI.register(userData)
      toast.success('Account created! Please login.')
      return { success: true }
    } catch (error) {
      console.error('REGISTER ERROR:', error)
      toast.error(error?.response?.data?.message || 'Registration failed')
      throw error
    }
  }

  // LOGOUT
  const logout = () => {
    setUser(null)
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    toast.success('Logged out successfully')
    return { success: true }
  }

  // RESTORE SESSION ON REFRESH
  useEffect(() => {
    const token = localStorage.getItem('token')
    const storedUser = localStorage.getItem('user')

    if (token && storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch {
        setUser(null)
        localStorage.removeItem('user')
      }
    } else {
      setUser(null)
    }

    setLoading(false)
  }, [])

  const value = {
    user,
    loading,
    login,
    register,
    logout,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
