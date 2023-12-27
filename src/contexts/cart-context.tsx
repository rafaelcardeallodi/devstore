'use client'

import { createContext, ReactNode, useContext, useState } from 'react'

interface CartItem {
  id: string
  quantity: number
}

interface CartContextType {
  items: CartItem[]
  addToCart: (productId: string) => void
}

const CartContext = createContext({} as CartContextType)

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  function addToCart(productId: string) {
    setCartItems((state) => {
      const productInCart = state.some((item) => item.id === productId)

      if (productInCart) {
        return state.map((item) => {
          if (item.id === productId) {
            return {
              ...item,
              quantity: item.quantity + 1,
            }
          }

          return item
        })
      }

      return [...state, { id: productId, quantity: 1 }]
    })
  }

  return (
    <CartContext.Provider
      value={{
        items: cartItems,
        addToCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
