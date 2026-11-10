import { useMemo, useState } from 'react'
import { Link } from 'react-router'

import ProductFilters from '../components/products/ProductFilters'
import ProductGrid from '../components/products/ProductGrid'
import { products } from '../data/products'
import type { Product } from '../types/product'

function Shop() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedSizes, setSelectedSizes] = useState<string[]>([])
  const [maxPrice, setMaxPrice] = useState(320)
  const [sortBy, setSortBy] = useState<'featured' | 'low-high' | 'high-low' | 'newest'>('featured')

  const sizeOptions = [...new Set(products.flatMap((product) => product.sizes))]

  const filteredProducts = useMemo(() => {
    const normalizedQuery = searchTerm.trim().toLowerCase()

    const filtered = products.filter((product) => {
      const matchesQuery =
        normalizedQuery.length === 0 ||
        product.name.toLowerCase().includes(normalizedQuery) ||
        product.description.toLowerCase().includes(normalizedQuery)

      const matchesCategory =
        selectedCategory === 'All' || product.category === selectedCategory

      const matchesSize =
        selectedSizes.length === 0 || selectedSizes.some((size) => product.sizes.includes(size))

      const matchesPrice = product.salePrice ? product.salePrice <= maxPrice : product.price <= maxPrice

      return matchesQuery && matchesCategory && matchesSize && matchesPrice
    })

    switch (sortBy) {
      case 'low-high':
        return [...filtered].sort((a, b) => (a.salePrice ?? a.price) - (b.salePrice ?? b.price))
      case 'high-low':
        return [...filtered].sort((a, b) => (b.salePrice ?? b.price) - (a.salePrice ?? a.price))
      case 'newest':
        return [...filtered].sort((a, b) => Number(Boolean(b.newArrival)) - Number(Boolean(a.newArrival)))
      default:
        return filtered
    }
  }, [searchTerm, selectedCategory, selectedSizes, maxPrice, sortBy])

  const handleSizeChange = (value: string) => {
    if (value === 'all') {
      setSelectedSizes([])
      return
    }

    setSelectedSizes((currentSizes) =>
      currentSizes.includes(value)
        ? currentSizes.filter((size) => size !== value)
        : [...currentSizes, value],
    )
  }

  const handleClearFilters = () => {
    setSearchTerm('')
    setSelectedCategory('All')
    setSelectedSizes([])
    setMaxPrice(320)
    setSortBy('featured')
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col gap-4 border-b border-gray-200 pb-6 dark:border-gray-800 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.22em] text-gray-500 dark:text-gray-300">
            Premium essentials
          </p>
          <h1 className="text-4xl font-medium tracking-tight text-black dark:text-white">Shop the collection</h1>
        </div>

        <p className="text-sm text-gray-600 dark:text-gray-300">{filteredProducts.length} products</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[280px_minmax(0,1fr)]">
        <ProductFilters
          categories={['All', ...new Set(products.map((product) => product.category))]}
          sizes={sizeOptions}
          selectedCategory={selectedCategory}
          selectedSizes={selectedSizes}
          maxPrice={maxPrice}
          searchTerm={searchTerm}
          onCategoryChange={setSelectedCategory}
          onSizeChange={handleSizeChange}
          onPriceChange={setMaxPrice}
          onSearchChange={setSearchTerm}
          onClearFilters={handleClearFilters}
        />

        <div>
          <div className="mb-6 flex flex-col gap-4 border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-[#181818] sm:flex-row sm:items-center sm:justify-between">
            <div className="text-sm text-gray-600 dark:text-gray-300">
              Showing <span className="font-medium text-black dark:text-white">{filteredProducts.length}</span> items
            </div>

            <label className="flex items-center gap-3 text-sm text-gray-700 dark:text-gray-200">
              <span>Sort by</span>
              <select
                value={sortBy}
                onChange={(event) => setSortBy(event.target.value as 'featured' | 'low-high' | 'high-low' | 'newest')}
                className="border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none focus:border-black dark:border-gray-700 dark:bg-[#1a1a1a] dark:text-white"
              >
                <option value="featured">Featured</option>
                <option value="low-high">Price: Low to High</option>
                <option value="high-low">Price: High to Low</option>
                <option value="newest">Newest</option>
              </select>
            </label>
          </div>

          {filteredProducts.length > 0 ? (
            <ProductGrid products={filteredProducts as Product[]} />
          ) : (
            <div className="border border-dashed border-gray-300 bg-gray-50 p-10 text-center dark:border-gray-700 dark:bg-[#161616]">
              <p className="mb-3 text-xl font-medium text-black dark:text-white">No items match your filters.</p>
              <p className="mb-6 text-gray-600 dark:text-gray-300">Try a different search term or reset your selection.</p>
              <Link to="/shop" onClick={handleClearFilters} className="text-sm font-medium uppercase tracking-[0.2em] text-black dark:text-white">
                Reset filters
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Shop
