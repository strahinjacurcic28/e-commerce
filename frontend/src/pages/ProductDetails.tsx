import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router'

import Button from '../components/common/Button'
import ProductCard from '../components/products/ProductCard'
import { products } from '../data/products'
import type { CartItem } from '../types/product'

function ProductDetails() {
  const { id } = useParams()

  const product = useMemo(
    () => products.find((item) => item.id === id),
    [id],
  )

  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedSize, setSelectedSize] = useState('')
  const [selectedColor, setSelectedColor] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [isAdded, setIsAdded] = useState(false)

  useEffect(() => {
    if (!product) return

    setSelectedSize(product.sizes[0])
    setSelectedColor(product.colors[0])
    setSelectedImage(0)
    setQuantity(1)
    setIsAdded(false)
  }, [product])

  if (!product) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 lg:px-8">
        <h1 className="text-3xl font-medium text-black">Product not found</h1>
        <Link to="/shop" className="mt-6 inline-block text-sm font-medium uppercase tracking-[0.18em] text-black">
          Return to shop
        </Link>
      </div>
    )
  }

  const relatedProducts = products
    .filter((item) => item.category === product.category && item.id !== product.id)
    .slice(0, 4)

  const handleAddToCart = () => {
    const storedItems = JSON.parse(localStorage.getItem('nova-cart') ?? '[]') as CartItem[]

    const nextItems = [...storedItems]
    const existingItem = nextItems.find(
      (item) => item.productId === product.id && item.size === selectedSize && item.color === selectedColor,
    )

    if (existingItem) {
      existingItem.quantity += quantity
    } else {
      nextItems.push({
        productId: product.id,
        name: product.name,
        image: product.image,
        price: product.salePrice ?? product.price,
        size: selectedSize,
        color: selectedColor,
        quantity,
      })
    }

    localStorage.setItem('nova-cart', JSON.stringify(nextItems))
    setIsAdded(true)
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-center gap-3 text-sm text-gray-500">
        <Link to="/" className="hover:text-black">
          Home
        </Link>
        <span>/</span>
        <Link to="/shop" className="hover:text-black">
          Shop
        </Link>
        <span>/</span>
        <span className="text-black">{product.name}</span>
      </div>

      <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-4">
          <img src={product.gallery[selectedImage]} alt={product.name} className="h-[660px] w-full object-cover" />

          <div className="grid grid-cols-3 gap-3">
            {product.gallery.map((image, index) => (
              <button key={image} type="button" onClick={() => setSelectedImage(index)} className="overflow-hidden border border-gray-200">
                <img
                  src={image}
                  alt={`${product.name} view ${index + 1}`}
                  className={`h-28 w-full object-cover transition ${selectedImage === index ? 'opacity-100 ring-1 ring-black' : 'opacity-80'}`}
                />
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.22em] text-gray-500">
              {product.category}
            </p>
            <h1 className="text-4xl font-medium tracking-tight text-black">{product.name}</h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-2xl font-semibold text-black">
              ${product.salePrice ?? product.price}
            </div>
            {product.salePrice ? (
              <div className="text-lg text-gray-400 line-through">${product.price}</div>
            ) : null}
            <div className="text-xs font-medium uppercase tracking-[0.18em] text-gray-500">
              {product.rating} / 5 · {product.reviews} reviews
            </div>
          </div>

          <p className="text-base leading-7 text-gray-600">{product.description}</p>

          <div className="space-y-5 border-y border-gray-200 py-6">
            <div>
              <p className="mb-3 text-sm font-medium uppercase tracking-[0.18em] text-gray-700">Size</p>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    className={[
                      'min-w-12 border px-3 py-2 text-xs uppercase tracking-[0.12em] transition',
                      selectedSize === size
                        ? 'border-black bg-black text-white'
                        : 'border-gray-300 bg-white text-gray-700 hover:border-black',
                    ].join(' ')}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="mb-3 text-sm font-medium uppercase tracking-[0.18em] text-gray-700">Color</p>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => setSelectedColor(color)}
                    className={[
                      'border px-3 py-2 text-xs uppercase tracking-[0.12em] transition',
                      selectedColor === color
                        ? 'border-black bg-black text-white'
                        : 'border-gray-300 bg-white text-gray-700 hover:border-black',
                    ].join(' ')}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="flex items-center border border-gray-300 bg-white">
              <button
                type="button"
                onClick={() => setQuantity((current) => Math.max(1, current - 1))}
                className="h-12 w-12 text-xl text-gray-700 transition hover:bg-gray-100"
              >
                −
              </button>
              <span className="w-12 text-center text-sm font-medium text-black">{quantity}</span>
              <button
                type="button"
                onClick={() => setQuantity((current) => current + 1)}
                className="h-12 w-12 text-xl text-gray-700 transition hover:bg-gray-100"
              >
                +
              </button>
            </div>

            <Button onClick={handleAddToCart} size="lg" fullWidth className="sm:w-auto">
              {isAdded ? 'Added to cart' : 'Add to cart'}
            </Button>
          </div>

          <div className="flex items-center gap-3 text-sm text-gray-700">
            <span className="h-2.5 w-2.5 rounded-full bg-green-500" />
            {product.stock > 0 ? `In stock · ${product.stock} available` : 'Out of stock'}
          </div>

          <div className="grid gap-4 border border-gray-200 bg-gray-50 p-5 text-sm text-gray-600">
            <div className="flex items-center justify-between border-b border-gray-200 pb-3">
              <span>Material</span>
              <span className="text-black">{product.material ?? 'Premium fabric'}</span>
            </div>
            <div className="flex items-center justify-between border-b border-gray-200 pb-3">
              <span>Shipping</span>
              <span className="text-black">Free delivery over $150</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Returns</span>
              <span className="text-black">30-day easy return</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-16">
        <div className="mb-8 flex items-center justify-between gap-4 border-b border-gray-200 pb-2">
          <h2 className="text-2xl font-medium tracking-tight text-black">Related pieces</h2>
          <Link to="/shop" className="text-sm font-medium uppercase tracking-[0.18em] text-black">
            View all
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {relatedProducts.map((relatedProduct) => (
            <ProductCard key={relatedProduct.id} product={relatedProduct} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProductDetails
