import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router'

import Button from '../components/common/Button'
import type { CartItem } from '../types/product'

const CART_KEY = 'nova-cart'

function Cart() {
  const [items, setItems] = useState<CartItem[]>(() => {
    if (typeof window === 'undefined') {
      return []
    }

    try {
      const savedItems = window.localStorage.getItem(CART_KEY)
      return savedItems ? (JSON.parse(savedItems) as CartItem[]) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    window.localStorage.setItem(CART_KEY, JSON.stringify(items))
  }, [items])

  const subtotal = useMemo(
    () => items.reduce((total, item) => total + item.price * item.quantity, 0),
    [items],
  )

  const shipping = items.length === 0 ? 0 : subtotal > 150 ? 0 : 18
  const total = subtotal + shipping

  const updateQuantity = (productId: string, size: string, color: string, delta: number) => {
    setItems((currentItems) =>
      currentItems
        .map((item) =>
          item.productId === productId && item.size === size && item.color === color
            ? { ...item, quantity: Math.max(1, item.quantity + delta) }
            : item,
        )
        .filter((item) => item.quantity > 0),
    )
  }

  const removeItem = (productId: string, size: string, color: string) => {
    setItems((currentItems) =>
      currentItems.filter(
        (item) => !(item.productId === productId && item.size === size && item.color === color),
      ),
    )
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-16 text-center sm:px-6 lg:px-8">
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.22em] text-gray-500">Your bag</p>
        <h1 className="text-4xl font-medium tracking-tight text-black">Your cart is empty</h1>
        <p className="mt-4 text-gray-600">Add a few premium essentials to continue.</p>
        <Link to="/shop" className="mt-8 inline-block">
          <Button>Continue shopping</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8 border-b border-gray-200 pb-6">
        <p className="mb-2 text-xs font-medium uppercase tracking-[0.22em] text-gray-500">Your bag</p>
        <h1 className="text-4xl font-medium tracking-tight text-black">Shopping cart</h1>
      </div>

      <div className="grid gap-10 lg:grid-cols-[1.4fr_0.6fr]">
        <div className="space-y-6">
          {items.map((item) => (
            <div key={`${item.productId}-${item.size}-${item.color}`} className="flex flex-col gap-5 border border-gray-200 bg-white p-4 sm:flex-row">
              <img src={item.image} alt={item.name} className="h-36 w-full object-cover sm:w-32" />

              <div className="flex flex-1 flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-xl font-medium text-black">{item.name}</h2>
                  <p className="mt-2 text-sm text-gray-500">
                    {item.color} · {item.size}
                  </p>
                  <p className="mt-2 text-base font-medium text-black">${item.price}</p>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-gray-300 bg-white">
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.productId, item.size, item.color, -1)}
                      className="h-10 w-10 text-lg text-gray-700 hover:bg-gray-100"
                    >
                      −
                    </button>
                    <span className="w-10 text-center text-sm font-medium text-black">{item.quantity}</span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.productId, item.size, item.color, 1)}
                      className="h-10 w-10 text-lg text-gray-700 hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => removeItem(item.productId, item.size, item.color)}
                    className="text-xs font-medium uppercase tracking-[0.18em] text-gray-500 hover:text-black"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <aside className="border border-gray-200 bg-gray-50 p-6">
          <h2 className="mb-6 text-xl font-medium text-black">Order summary</h2>

          <div className="space-y-4 text-sm text-gray-700">
            <div className="flex items-center justify-between">
              <span>Subtotal</span>
              <span className="text-black">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Shipping</span>
              <span className="text-black">{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
            </div>
            <div className="flex items-center justify-between border-t border-gray-200 pt-4 text-base font-medium text-black">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          <div className="mt-8 space-y-3">
            <Link to="/checkout">
              <Button fullWidth>Checkout</Button>
            </Link>
            <Link to="/shop">
              <Button variant="secondary" fullWidth>
                Continue shopping
              </Button>
            </Link>
          </div>
        </aside>
      </div>
    </div>
  )
}

export default Cart
