// src/context/CartContext.jsx
import { createContext, useContext, useState, useEffect, useCallback } from 'react'

const CartContext = createContext()

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([])

  const addItem = useCallback((product, size, quantity = 1) => {
    console.log('ADDING TO CART', product.name, size)
    setItems(prevItems => {
      const id = product._id || product.id
      const existingIndex = prevItems.findIndex(
        i => (i.product._id || i.product.id) === id && i.size === size
      )
      
      if (existingIndex !== -1) {
        const updatedItems = [...prevItems]
        updatedItems[existingIndex] = {
          ...updatedItems[existingIndex],
          quantity: updatedItems[existingIndex].quantity + quantity
        }
        return updatedItems
      }
      
      return [...prevItems, { product, size, quantity }]
    })
  }, [])

  const removeItem = useCallback((productId, size) => {
    setItems(prevItems =>
      prevItems.filter(
        i => (i.product._id || i.product.id) !== productId || i.size !== size
      )
    )
  }, [])

  const updateItem = useCallback((productId, size, quantity) => {
    setItems(prevItems =>
      prevItems.map(i =>
        (i.product._id || i.product.id) === productId && i.size === size
          ? { ...i, quantity }
          : i
      ).filter(i => i.quantity > 0)
    )
  }, [])

  const clearCart = useCallback(() => {
    setItems([])
  }, [])

  const getTotal = useCallback(() => {
    return items.reduce((sum, i) => sum + Number(i.product.price) * i.quantity, 0)
  }, [items])

  // Debug log - REMOVE after it works
  useEffect(() => {
    console.log('CART CONTEXT VALUE AFTER UPDATE', items)
  }, [items])

  const value = {
    cart: { items },
    addItem,
    removeItem,
    updateItem,
    clearCart,
    getTotal,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
