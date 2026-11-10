import Input from '../common/Input'
import Button from '../common/Button'

interface ProductFiltersProps {
  categories: string[]
  sizes: string[]
  selectedCategory: string
  selectedSize: string
  maxPrice: number
  searchTerm: string
  onCategoryChange: (value: string) => void
  onSizeChange: (value: string) => void
  onPriceChange: (value: number) => void
  onSearchChange: (value: string) => void
  onClearFilters: () => void
}

function ProductFilters({
  categories,
  sizes,
  selectedCategory,
  selectedSize,
  maxPrice,
  searchTerm,
  onCategoryChange,
  onSizeChange,
  onPriceChange,
  onSearchChange,
  onClearFilters,
}: ProductFiltersProps) {
  return (
    <aside className="space-y-6 border border-gray-200 bg-white p-5">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-lg font-medium uppercase tracking-[0.18em] text-black">Filters</h2>
        <Button variant="ghost" size="sm" onClick={onClearFilters} className="text-xs uppercase tracking-[0.12em]">
          Reset
        </Button>
      </div>

      <div>
        <Input
          label="Search"
          value={searchTerm}
          placeholder="Search products"
          onChange={(event) => onSearchChange(event.target.value)}
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">Category</label>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => onCategoryChange(category)}
              className={[
                'border px-3 py-2 text-xs uppercase tracking-[0.12em] transition',
                selectedCategory === category
                  ? 'border-black bg-black text-white'
                  : 'border-gray-300 bg-white text-gray-700 hover:border-black',
              ].join(' ')}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">Size</label>
        <div className="flex flex-wrap gap-2">
          {sizes.map((size) => (
            <button
              key={size}
              type="button"
              onClick={() => onSizeChange(size)}
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
        <div className="mb-2 flex items-center justify-between text-sm font-medium text-gray-700">
          <span>Max price</span>
          <span>${maxPrice}</span>
        </div>
        <input
          type="range"
          min="50"
          max="320"
          step="10"
          value={maxPrice}
          onChange={(event) => onPriceChange(Number(event.target.value))}
          className="w-full accent-black"
        />
      </div>
    </aside>
  )
}

export default ProductFilters
