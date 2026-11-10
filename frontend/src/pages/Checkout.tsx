import { useMemo, useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import { Link } from 'react-router'

import Button from '../components/common/Button'
import Input from '../components/common/Input'
import type { CartItem } from '../types/product'

const CART_KEY = 'nova-cart'

function Checkout() {
  const [paymentMethod, setPaymentMethod] = useState('Card')
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
    cardName: '',
    cardNumber: '',
    expiry: '',
    cvc: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const cartItems = useMemo<CartItem[]>(() => {
    if (typeof window === 'undefined') {
      return []
    }

    try {
      const savedItems = window.localStorage.getItem(CART_KEY)
      return savedItems ? (JSON.parse(savedItems) as CartItem[]) : []
    } catch {
      return []
    }
  }, [])

  const subtotal = useMemo(
    () => cartItems.reduce((total, item) => total + item.price * item.quantity, 0),
    [cartItems],
  )

  const shipping = cartItems.length === 0 ? 0 : subtotal > 150 ? 0 : 18
  const total = subtotal + shipping

  const handleChange = (field: keyof typeof formData) => (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    setFormData((current) => ({ ...current, [field]: event.target.value }))
    setErrors((current) => ({ ...current, [field]: '' }))
  }

  const validateForm = () => {
    const nextErrors: Record<string, string> = {}

    if (!formData.fullName.trim()) nextErrors.fullName = 'Full name is required.'
    if (!formData.email.trim()) nextErrors.email = 'Email is required.'
    if (!formData.address.trim()) nextErrors.address = 'Address is required.'
    if (!formData.city.trim()) nextErrors.city = 'City is required.'
    if (!formData.postalCode.trim()) nextErrors.postalCode = 'Postal code is required.'
    if (!formData.country.trim()) nextErrors.country = 'Country is required.'

    if (paymentMethod === 'Card') {
      if (!formData.cardName.trim()) nextErrors.cardName = 'Cardholder name is required.'
      if (!formData.cardNumber.trim()) nextErrors.cardNumber = 'Card number is required.'
      if (!formData.expiry.trim()) nextErrors.expiry = 'Expiry date is required.'
      if (!formData.cvc.trim()) nextErrors.cvc = 'CVC is required.'
    }

    return nextErrors
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const nextErrors = validateForm()

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      return
    }

    setOrderPlaced(true)
    window.localStorage.removeItem(CART_KEY)
  }

  if (orderPlaced) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 lg:px-8">
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.22em] text-gray-500">
          Order confirmation
        </p>
        <h1 className="text-4xl font-medium tracking-tight text-black">Thank you for your order.</h1>
        <p className="mt-4 text-base text-gray-600">
          Your NOVA pieces are being prepared for dispatch. We will send a confirmation email shortly.
        </p>
        <Link to="/shop" className="mt-8 inline-block">
          <Button>Continue shopping</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8 border-b border-gray-200 pb-6 dark:border-gray-800">
        <p className="mb-2 text-xs font-medium uppercase tracking-[0.22em] text-gray-500 dark:text-gray-300">Secure checkout</p>
        <h1 className="text-4xl font-medium tracking-tight text-black dark:text-white">Checkout</h1>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-10 lg:grid-cols-[1.25fr_0.75fr]">
        <div className="space-y-8">
          <section className="border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-[#181818]">
            <h2 className="mb-5 text-xl font-medium text-black dark:text-white">Shipping information</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <Input
                label="Full name"
                value={formData.fullName}
                onChange={handleChange('fullName')}
                error={errors.fullName}
              />
              <Input
                label="Email"
                type="email"
                value={formData.email}
                onChange={handleChange('email')}
                error={errors.email}
              />
            </div>

            <div className="mt-4">
              <Input
                label="Street address"
                value={formData.address}
                onChange={handleChange('address')}
                error={errors.address}
              />
            </div>

            <div className="mt-4 grid gap-4 sm:grid-cols-3">
              <Input
                label="City"
                value={formData.city}
                onChange={handleChange('city')}
                error={errors.city}
              />
              <Input
                label="Postal code"
                value={formData.postalCode}
                onChange={handleChange('postalCode')}
                error={errors.postalCode}
              />
              <Input
                label="Country"
                value={formData.country}
                onChange={handleChange('country')}
                error={errors.country}
              />
            </div>
          </section>

          <section className="border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-[#181818]">
            <h2 className="mb-5 text-xl font-medium text-black dark:text-white">Payment method</h2>
            <div className="flex flex-wrap gap-3">
              {['Card', 'PayPal', 'Cash on delivery'].map((method) => (
                <button
                  key={method}
                  type="button"
                  onClick={() => setPaymentMethod(method)}
                  className={[
                    'border px-4 py-2 text-xs uppercase tracking-[0.18em] transition',
                    paymentMethod === method
                      ? 'border-black bg-black text-white dark:border-white dark:bg-white dark:text-black'
                      : 'border-gray-300 bg-white text-gray-700 hover:border-black dark:border-gray-700 dark:bg-[#1a1a1a] dark:text-gray-200 dark:hover:border-white',
                  ].join(' ')}
                >
                  {method}
                </button>
              ))}
            </div>

            {paymentMethod === 'Card' ? (
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <Input
                    label="Cardholder name"
                    value={formData.cardName}
                    onChange={handleChange('cardName')}
                    error={errors.cardName}
                  />
                </div>
                <div className="sm:col-span-2">
                  <Input
                    label="Card number"
                    value={formData.cardNumber}
                    onChange={handleChange('cardNumber')}
                    error={errors.cardNumber}
                  />
                </div>
                <Input label="Expiry" value={formData.expiry} onChange={handleChange('expiry')} error={errors.expiry} />
                <Input label="CVC" value={formData.cvc} onChange={handleChange('cvc')} error={errors.cvc} />
              </div>
            ) : null}
          </section>
        </div>

        <aside className="border border-gray-200 bg-gray-50 p-6 dark:border-gray-800 dark:bg-[#181818]">
          <h2 className="mb-6 text-xl font-medium text-black dark:text-white">Order summary</h2>

          {cartItems.length === 0 ? (
            <p className="text-sm text-gray-600">Your cart is empty.</p>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={`${item.productId}-${item.size}-${item.color}`} className="flex gap-3 border-b border-gray-200 pb-4">
                  <img src={item.image} alt={item.name} className="h-20 w-20 object-cover" />
                  <div className="flex-1 text-sm text-gray-600 dark:text-gray-300">
                    <p className="font-medium text-black dark:text-white">{item.name}</p>
                    <p>
                      {item.color} · {item.size}
                    </p>
                    <p>
                      Qty {item.quantity}
                    </p>
                  </div>
                  <p className="text-sm font-medium text-black dark:text-white">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>
          )}

          <div className="mt-6 space-y-3 text-sm text-gray-700 dark:text-gray-200">
            <div className="flex items-center justify-between">
              <span>Subtotal</span>
              <span className="text-black dark:text-white">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Shipping</span>
              <span className="text-black dark:text-white">{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
            </div>
            <div className="flex items-center justify-between border-t border-gray-200 pt-4 text-base font-medium text-black dark:border-gray-700 dark:text-white">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          <div className="mt-8">
            <Button type="submit" fullWidth>
              Place order
            </Button>
          </div>
        </aside>
      </form>
    </div>
  )
}

export default Checkout
